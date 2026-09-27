import React, { useState, useEffect, useRef } from 'react';
import {
  Mic,
  MicOff,
  Radio,
  X,
  Volume2,
  VolumeX,
  Activity,
  Sparkles,
  Wifi,
  WifiOff,
  RotateCcw,
  Zap,
  Globe,
  Sliders,
  MessageSquare
} from 'lucide-react';
import { LiveAudioQueuePlayer, pcmFloat32ToInt16Base64 } from '../utils/audio';

interface LiveVoiceModalProps {
  onClose: () => void;
  onOpenChatWithTopic?: (topic: string) => void;
}

export const LiveVoiceModal: React.FC<LiveVoiceModalProps> = ({
  onClose,
  onOpenChatWithTopic,
}) => {
  const [connectionStatus, setConnectionStatus] = useState<
    'connecting' | 'connected' | 'disconnected' | 'error'
  >('connecting');
  const [isMicMuted, setIsMicMuted] = useState(false);
  const [isModelSpeaking, setIsModelSpeaking] = useState(false);
  const [userTranscript, setUserTranscript] = useState('');
  const [modelTranscript, setModelTranscript] = useState('');
  const [voiceName, setVoiceName] = useState('Zephyr');
  const [statusMessage, setStatusMessage] = useState('Connecting to OMNIX Live API...');
  const [audioLevel, setAudioLevel] = useState(0);

  const wsRef = useRef<WebSocket | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const mediaStreamRef = useRef<MediaStream | null>(null);
  const processorRef = useRef<ScriptProcessorNode | null>(null);
  const playerRef = useRef<LiveAudioQueuePlayer | null>(null);
  const animationFrameRef = useRef<number | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);

  useEffect(() => {
    // Initialize 24kHz audio playback queue for Gemini Live output
    playerRef.current = new LiveAudioQueuePlayer((playing) => {
      setIsModelSpeaking(playing);
    });

    startLiveSession();

    return () => {
      cleanupSession();
    };
  }, []);

  const startLiveSession = async () => {
    try {
      setConnectionStatus('connecting');
      setStatusMessage('Initializing Gemini Live connection...');

      const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
      const wsUrl = `${protocol}//${window.location.host}/live`;
      const ws = new WebSocket(wsUrl);
      wsRef.current = ws;

      ws.onopen = async () => {
        setConnectionStatus('connected');
        setStatusMessage('Connected to OMNIX Live. Listening...');
        await initMicrophoneCapture(ws);
      };

      ws.onmessage = (event) => {
        try {
          const msg = JSON.parse(event.data);

          if (msg.error) {
            setStatusMessage(msg.error);
            return;
          }

          if (msg.interrupted) {
            playerRef.current?.handleInterruption();
            setIsModelSpeaking(false);
          }

          if (msg.audio) {
            playerRef.current?.enqueueChunk(msg.audio);
          }

          if (msg.outputTranscript) {
            setModelTranscript((prev) =>
              prev ? `${prev} ${msg.outputTranscript}` : msg.outputTranscript
            );
          }

          if (msg.inputTranscript) {
            setUserTranscript((prev) =>
              prev ? `${prev} ${msg.inputTranscript}` : msg.inputTranscript
            );
          }
        } catch (e) {
          console.warn('Error processing Live message:', e);
        }
      };

      ws.onerror = (e) => {
        console.warn('Live WebSocket error:', e);
        setConnectionStatus('error');
        setStatusMessage('Live Voice session connection note: Using local voice mode.');
      };

      ws.onclose = () => {
        setConnectionStatus('disconnected');
        setStatusMessage('Live session ended.');
      };
    } catch (err: any) {
      setConnectionStatus('error');
      setStatusMessage('Could not connect to Live server: ' + err.message);
    }
  };

  const initMicrophoneCapture = async (ws: WebSocket) => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: {
          channelCount: 1,
          sampleRate: 16000,
          echoCancellation: true,
          noiseSuppression: true,
        },
      });
      mediaStreamRef.current = stream;

      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      const audioCtx = new AudioCtx({ sampleRate: 16000 });
      audioContextRef.current = audioCtx;

      const source = audioCtx.createMediaStreamSource(stream);
      const analyser = audioCtx.createAnalyser();
      analyser.fftSize = 64;
      analyserRef.current = analyser;

      // 4096 buffer size for real-time PCM capture
      const processor = audioCtx.createScriptProcessor(4096, 1, 1);
      processorRef.current = processor;

      source.connect(analyser);
      analyser.connect(processor);
      processor.connect(audioCtx.destination);

      processor.onaudioprocess = (e) => {
        if (isMicMuted) return;
        if (ws.readyState !== WebSocket.OPEN) return;

        const inputChannelData = e.inputBuffer.getChannelData(0);
        const base64Pcm = pcmFloat32ToInt16Base64(inputChannelData);

        ws.send(JSON.stringify({ audio: base64Pcm }));
      };

      // Audio waveform visualizer loop
      const updateVisualizer = () => {
        if (analyserRef.current && !isMicMuted) {
          const dataArray = new Uint8Array(analyserRef.current.frequencyBinCount);
          analyserRef.current.getByteFrequencyData(dataArray);
          let sum = 0;
          for (let i = 0; i < dataArray.length; i++) {
            sum += dataArray[i];
          }
          const average = sum / dataArray.length;
          setAudioLevel(Math.min(100, Math.round((average / 128) * 100)));
        } else {
          setAudioLevel(0);
        }
        animationFrameRef.current = requestAnimationFrame(updateVisualizer);
      };
      updateVisualizer();
    } catch (err: any) {
      console.warn('Microphone access note:', err.message);
      setStatusMessage('Microphone access unavailable or denied. Check permissions.');
    }
  };

  const cleanupSession = () => {
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }
    if (processorRef.current) {
      processorRef.current.disconnect();
      processorRef.current = null;
    }
    if (mediaStreamRef.current) {
      mediaStreamRef.current.getTracks().forEach((track) => track.stop());
      mediaStreamRef.current = null;
    }
    if (audioContextRef.current && audioContextRef.current.state !== 'closed') {
      audioContextRef.current.close().catch(() => {});
      audioContextRef.current = null;
    }
    if (playerRef.current) {
      playerRef.current.close();
      playerRef.current = null;
    }
    if (wsRef.current) {
      wsRef.current.close();
      wsRef.current = null;
    }
  };

  const handleInterrupt = () => {
    playerRef.current?.handleInterruption();
    setIsModelSpeaking(false);
  };

  const suggestedVoicePrompts = [
    'What are today’s biggest world stories?',
    'Explain the Geneva Frontier AI Accord.',
    'Tell me what happened in Davanagere today.',
    'Summarize the economy news in 30 seconds.',
    'What is happening in space science right now?',
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xl animate-in fade-in">
      <div className="relative w-full max-w-2xl bg-gray-950 border border-cyan-500/30 rounded-3xl shadow-2xl shadow-cyan-950/60 overflow-hidden flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="p-5 border-b border-cyan-900/30 flex items-center justify-between bg-gradient-to-r from-gray-900 via-gray-950 to-gray-900">
          <div className="flex items-center space-x-3">
            <div className="relative w-10 h-10 rounded-2xl bg-gradient-to-tr from-cyan-500 via-teal-400 to-blue-600 p-[1.5px] shadow-lg shadow-cyan-500/30">
              <div className="w-full h-full bg-gray-950 rounded-[14px] flex items-center justify-center">
                <Radio className="w-5 h-5 text-cyan-400 animate-pulse" />
              </div>
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h2 className="text-lg font-bold text-white font-mono flex items-center gap-2">
                  OMNIX Live Voice
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 font-sans uppercase">
                    gemini-3.8-live
                  </span>
                </h2>
              </div>
              <p className="text-xs text-cyan-300/70">
                Low-latency, real-time conversational voice experience
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <div
              className={`flex items-center space-x-1.5 px-2.5 py-1 rounded-full text-xs font-mono border ${
                connectionStatus === 'connected'
                  ? 'bg-emerald-500/10 text-emerald-300 border-emerald-500/30'
                  : connectionStatus === 'connecting'
                  ? 'bg-amber-500/10 text-amber-300 border-amber-500/30 animate-pulse'
                  : 'bg-red-500/10 text-red-300 border-red-500/30'
              }`}
            >
              {connectionStatus === 'connected' ? (
                <>
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
                  <span>LIVE</span>
                </>
              ) : connectionStatus === 'connecting' ? (
                <>
                  <span className="w-2 h-2 rounded-full bg-amber-400"></span>
                  <span>CONNECTING</span>
                </>
              ) : (
                <>
                  <WifiOff className="w-3 h-3 text-red-400" />
                  <span>OFFLINE</span>
                </>
              )}
            </div>

            <button
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-white rounded-xl hover:bg-white/10 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Central Voice Visualizer Orb */}
        <div className="flex-1 overflow-y-auto p-6 flex flex-col items-center justify-center text-center">
          {/* Animated Glowing Orb */}
          <div className="relative my-6 flex items-center justify-center">
            {/* Outer pulse circles */}
            <div
              className={`absolute rounded-full transition-all duration-300 ${
                isModelSpeaking
                  ? 'w-48 h-48 bg-teal-500/20 animate-ping'
                  : audioLevel > 15
                  ? 'w-44 h-44 bg-cyan-500/20'
                  : 'w-36 h-36 bg-cyan-900/10'
              }`}
            />
            <div
              className={`absolute rounded-full transition-all duration-200 ${
                isModelSpeaking
                  ? 'w-40 h-40 bg-teal-400/30 blur-md'
                  : audioLevel > 15
                  ? 'w-36 h-36 bg-cyan-400/30 blur-md'
                  : 'w-28 h-28 bg-cyan-500/10'
              }`}
            />

            {/* Core Orb */}
            <div
              className={`relative z-10 w-28 h-28 rounded-full flex items-center justify-center transition-all duration-300 border ${
                isModelSpeaking
                  ? 'bg-gradient-to-tr from-teal-500 via-emerald-400 to-cyan-400 border-teal-300 shadow-2xl shadow-teal-500/60 scale-110'
                  : audioLevel > 15
                  ? 'bg-gradient-to-tr from-cyan-500 to-blue-600 border-cyan-300 shadow-xl shadow-cyan-500/50 scale-105'
                  : 'bg-gradient-to-tr from-gray-900 via-cyan-950 to-gray-900 border-cyan-500/40 shadow-lg shadow-cyan-950/40'
              }`}
            >
              {isModelSpeaking ? (
                <Volume2 className="w-12 h-12 text-gray-950 animate-bounce" />
              ) : isMicMuted ? (
                <MicOff className="w-10 h-10 text-red-400" />
              ) : (
                <Mic
                  className={`w-10 h-10 transition-colors ${
                    audioLevel > 15 ? 'text-white' : 'text-cyan-400'
                  }`}
                />
              )}
            </div>
          </div>

          {/* Dynamic State Badge */}
          <div className="mb-4">
            {isModelSpeaking ? (
              <span className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-teal-500/20 text-teal-300 border border-teal-500/40 animate-pulse">
                <Volume2 className="w-3.5 h-3.5" />
                <span>OMNIX is speaking...</span>
              </span>
            ) : audioLevel > 15 ? (
              <span className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-cyan-500/20 text-cyan-300 border border-cyan-500/40">
                <Mic className="w-3.5 h-3.5 text-cyan-400" />
                <span>Listening to you...</span>
              </span>
            ) : (
              <span className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full text-xs text-gray-400 bg-white/5 border border-white/10">
                <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                <span>Speak naturally or tap a topic below</span>
              </span>
            )}
          </div>

          <p className="text-xs text-gray-400 max-w-md mb-4">{statusMessage}</p>

          {/* Live Subtitles / Transcription Feed */}
          {(userTranscript || modelTranscript) && (
            <div className="w-full bg-white/5 border border-cyan-500/20 rounded-2xl p-4 text-left max-h-36 overflow-y-auto mb-4 space-y-2 text-xs">
              {userTranscript && (
                <div className="text-gray-300">
                  <span className="text-cyan-400 font-mono font-semibold">You: </span>
                  {userTranscript}
                </div>
              )}
              {modelTranscript && (
                <div className="text-teal-200">
                  <span className="text-teal-400 font-mono font-semibold">OMNIX: </span>
                  {modelTranscript}
                </div>
              )}
            </div>
          )}

          {/* Quick Voice Prompts */}
          <div className="w-full">
            <span className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider block mb-2 text-left">
              Try asking:
            </span>
            <div className="flex flex-wrap gap-1.5 justify-start">
              {suggestedVoicePrompts.map((prompt, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    if (onOpenChatWithTopic) {
                      cleanupSession();
                      onClose();
                      onOpenChatWithTopic(prompt);
                    }
                  }}
                  className="text-xs px-3 py-1.5 rounded-xl bg-white/5 hover:bg-cyan-500/10 text-gray-300 hover:text-cyan-300 border border-white/10 hover:border-cyan-500/30 transition-all text-left"
                >
                  "{prompt}"
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Control Bar */}
        <div className="p-4 border-t border-cyan-900/30 bg-gray-900/80 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            {/* Mic Mute / Unmute */}
            <button
              onClick={() => setIsMicMuted(!isMicMuted)}
              className={`flex items-center space-x-1.5 px-3 py-2 rounded-xl text-xs font-semibold transition-all ${
                isMicMuted
                  ? 'bg-red-500/20 text-red-300 border border-red-500/30'
                  : 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 hover:bg-cyan-500/30'
              }`}
            >
              {isMicMuted ? (
                <>
                  <MicOff className="w-4 h-4 text-red-400" />
                  <span>Unmute Mic</span>
                </>
              ) : (
                <>
                  <Mic className="w-4 h-4 text-cyan-400" />
                  <span>Mute Mic</span>
                </>
              )}
            </button>

            {/* Interrupt Button */}
            {isModelSpeaking && (
              <button
                onClick={handleInterrupt}
                className="flex items-center space-x-1 px-2.5 py-2 rounded-xl text-xs bg-amber-500/20 text-amber-300 border border-amber-500/30 hover:bg-amber-500/30 transition-all"
                title="Stop current speech"
              >
                <VolumeX className="w-4 h-4" />
                <span>Interrupt</span>
              </button>
            )}
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={() => {
                cleanupSession();
                startLiveSession();
              }}
              className="p-2 text-gray-400 hover:text-cyan-300 rounded-xl hover:bg-white/5 transition-colors"
              title="Reconnect Session"
            >
              <RotateCcw className="w-4 h-4" />
            </button>

            <button
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs font-semibold bg-white/10 hover:bg-white/20 text-white transition-all"
            >
              Done
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
