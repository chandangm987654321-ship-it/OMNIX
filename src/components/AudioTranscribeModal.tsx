import React, { useState, useRef } from 'react';
import {
  FileText,
  Mic,
  Square,
  Upload,
  Sparkles,
  Volume2,
  Copy,
  Check,
  Download,
  Share2,
  X,
  Play,
  Pause,
  Clock,
  Languages,
  Tag,
  Users,
  CheckCircle2,
  MessageSquare,
  AlertCircle
} from 'lucide-react';
import { AudioTranscriptionResult } from '../types';
import { fileToBase64, playTtsAudio, stopTtsAudio } from '../utils/audio';

interface AudioTranscribeModalProps {
  onClose: () => void;
  onDiscussInChat?: (transcriptContext: string) => void;
}

export const AudioTranscribeModal: React.FC<AudioTranscribeModalProps> = ({
  onClose,
  onDiscussInChat,
}) => {
  const [activeTab, setActiveTab] = useState<'upload' | 'record' | 'samples'>('record');
  const [isRecording, setIsRecording] = useState(false);
  const [recordingSeconds, setRecordingSeconds] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);
  const [result, setResult] = useState<AudioTranscriptionResult | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [isPlayingTts, setIsPlayingTts] = useState(false);

  // References
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const recordedChunksRef = useRef<Blob[]>([]);
  const timerRef = useRef<number | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // Live recording handlers
  const startRecording = async () => {
    try {
      setErrorMsg(null);
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      recordedChunksRef.current = [];

      const mimeType = MediaRecorder.isTypeSupported('audio/webm')
        ? 'audio/webm'
        : 'audio/mp4';

      const mediaRecorder = new MediaRecorder(stream, { mimeType });
      mediaRecorderRef.current = mediaRecorder;

      mediaRecorder.ondataavailable = (e) => {
        if (e.data && e.data.size > 0) {
          recordedChunksRef.current.push(e.data);
        }
      };

      mediaRecorder.onstop = async () => {
        stream.getTracks().forEach((track) => track.stop());
        const audioBlob = new Blob(recordedChunksRef.current, { type: mimeType });
        await transcribeBlob(audioBlob, mimeType, 'live_recording.webm');
      };

      mediaRecorder.start(250);
      setIsRecording(true);
      setRecordingSeconds(0);

      timerRef.current = window.setInterval(() => {
        setRecordingSeconds((prev) => prev + 1);
      }, 1000);
    } catch (err: any) {
      console.warn('Microphone error:', err);
      setErrorMsg('Could not access microphone: ' + err.message);
    }
  };

  const stopRecording = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  // Upload handler
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 20 * 1024 * 1024) {
      setErrorMsg('File size exceeds 20MB limit. Please upload a shorter clip.');
      return;
    }

    await transcribeBlob(file, file.type || 'audio/mp3', file.name);
  };

  const transcribeBlob = async (
    blobOrFile: Blob | File,
    mimeType: string,
    fileName: string
  ) => {
    try {
      setIsProcessing(true);
      setErrorMsg(null);

      const base64Data = await fileToBase64(blobOrFile);

      const response = await fetch('/api/transcribe-audio', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          audioBase64: base64Data,
          mimeType: mimeType || 'audio/webm',
          fileName: fileName,
        }),
      });

      if (!response.ok) {
        throw new Error('Transcription request failed with status ' + response.status);
      }

      const data = await response.json();
      setResult(data);
    } catch (err: any) {
      console.error('Transcription error:', err);
      setErrorMsg('Transcription notice: ' + (err.message || 'Server error'));
    } finally {
      setIsProcessing(false);
    }
  };

  // Sample audio handler
  const handleLoadSample = async (sampleType: string) => {
    setIsProcessing(true);
    setErrorMsg(null);

    // Mock high-fidelity realistic response directly
    setTimeout(() => {
      if (sampleType === 'geneva') {
        setResult({
          transcript:
            "Today in Geneva, delegations from 28 nations concluded the historic International Frontier AI Accord. Under the treaty, unified benchmark harnesses and rigorous safety evaluations will be mandatory for foundational models trained with over 10 to the 26th floating point operations. The European Commission and the Indian Ministry of Electronics and IT both confirmed active participation in the joint oversight body.",
          summary:
            "28 nations in Geneva ratified the International Frontier AI Accord, establishing automated compliance benchmarks and compute thresholds for next-generation foundation models.",
          detectedLanguage: "English (US)",
          speakers: [
            { speaker: "Chief Diplomat", segment: "We have reached unanimous consent on the 28-nation Frontier Verification Framework.", timestamp: "0:00 - 0:18" },
            { speaker: "Tech Delegate", segment: "The unified testing harness ensures models are evaluated for cybersecurity resilience prior to public release.", timestamp: "0:18 - 0:42" }
          ],
          keyTakeaways: [
            "Mandates compute transparency for models trained with >10^26 FLOPs.",
            "Establishes unified global evaluation harness.",
            "Ratified by 28 nations including India, UK, Japan, and EU member states.",
            "Joint operations center to be hosted in Geneva."
          ],
          sentiment: "Constructive & Forward-Looking",
          entities: [
            { name: "Geneva Frontier Accord", type: "Treaty" },
            { name: "Geneva", type: "Location" },
            { name: "10^26 FLOPs", type: "Standard" }
          ],
          fileName: "geneva_accord_briefing.mp3",
        });
      } else if (sampleType === 'davanagere') {
        setResult({
          transcript:
            "Reporting live from Davanagere, Karnataka. The state government along with national infrastructure partners has formally commissioned the 400-acre Smart Agro-Textile Corridor. Integrating automated solar microgrids and high-throughput weaving clusters along National Highway 48, the hub is projected to generate 15,000 skilled jobs and reduce regional freight transit times by 35%.",
          summary:
            "Davanagere launched its 400-acre Smart Agro-Textile Corridor with integrated solar microgrids, creating 15,000 regional jobs along NH-48.",
          detectedLanguage: "English / Kannada",
          speakers: [
            { speaker: "Regional Anchor", segment: "The 400-acre facility marks Davanagere's transition into a high-tech sustainable textile capital.", timestamp: "0:00 - 0:24" },
            { speaker: "Project Director", segment: "By linking direct solar power with localized cold chains and automated looms, energy costs drop by 40%.", timestamp: "0:24 - 0:48" }
          ],
          keyTakeaways: [
            "400-acre sustainable textile and agri-corridor along NH-48.",
            "15,000 regional jobs generated across Central Karnataka.",
            "Solar microgrids reduce operational manufacturing energy costs by 40%.",
            "Freight logistics integrated with national dedicated freight routes."
          ],
          sentiment: "Bullish & Developmental",
          entities: [
            { name: "Davanagere", type: "City" },
            { name: "Karnataka", type: "State" },
            { name: "NH-48 Corridor", type: "Infrastructure" }
          ],
          fileName: "davanagere_agro_corridor.wav",
        });
      } else {
        setResult({
          transcript:
            "ISRO mission control at ISTRAC has confirmed successful ground hot-fire tests for the next-generation long-duration lunar polar lander engine. The engine demonstrated throttle capability between 30 and 100 percent thrust during an extended 800-second sequence, preparing India for autonomous robotic sample retrieval operations.",
          summary:
            "ISRO successfully completed hot-fire qualification tests for an extended-duration throttleable rocket engine destined for lunar polar robotic missions.",
          detectedLanguage: "English",
          speakers: [
            { speaker: "Mission Controller", segment: "Propulsion burn completed with nominal telemetry across all chamber pressure parameters.", timestamp: "0:00 - 0:30" }
          ],
          keyTakeaways: [
            "800-second deep throttling hot fire completed successfully.",
            "Engine destined for upcoming lunar polar exploration missions.",
            "Enables soft descent and prolonged surface hovering."
          ],
          sentiment: "Precise & Celebratory",
          entities: [
            { name: "ISRO", type: "Agency" },
            { name: "ISTRAC", type: "Facility" },
            { name: "Lunar Polar Mission", type: "Project" }
          ],
          fileName: "isro_polar_propulsion.mp3",
        });
      }
      setIsProcessing(false);
    }, 700);
  };

  const handleCopy = () => {
    if (!result) return;
    navigator.clipboard.writeText(result.transcript);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleExportMarkdown = () => {
    if (!result) return;
    const md = `# OMNIX Audio Intelligence Transcript
**File:** ${result.fileName || 'Audio Recording'}
**Language:** ${result.detectedLanguage || 'English'} | **Tone:** ${result.sentiment || 'Objective'}

## Executive Summary
${result.summary}

## Verbatim Transcript
${result.transcript}

## Key Takeaways
${result.keyTakeaways?.map((k) => `- ${k}`).join('\n')}

---
*Transcribed with Gemini 3.5 Transcribe on OMNIX ("News that talks back")*
`;

    const blob = new Blob([md], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${result.fileName || 'transcript'}.md`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleReadAloud = async () => {
    if (isPlayingTts) {
      stopTtsAudio();
      setIsPlayingTts(false);
      return;
    }

    if (!result) return;
    setIsPlayingTts(true);
    const textToRead = `${result.summary}. Full transcript: ${result.transcript.slice(0, 400)}`;
    await playTtsAudio(
      null,
      textToRead,
      () => setIsPlayingTts(true),
      () => setIsPlayingTts(false)
    );
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xl animate-in fade-in">
      <div className="relative w-full max-w-4xl bg-gray-950 border border-cyan-500/30 rounded-3xl shadow-2xl shadow-cyan-950/60 overflow-hidden flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="p-5 border-b border-cyan-900/30 flex items-center justify-between bg-gradient-to-r from-gray-900 via-gray-950 to-gray-900">
          <div className="flex items-center space-x-3">
            <div className="relative w-10 h-10 rounded-2xl bg-gradient-to-tr from-cyan-500 via-teal-400 to-blue-600 p-[1.5px] shadow-lg shadow-cyan-500/30">
              <div className="w-full h-full bg-gray-950 rounded-[14px] flex items-center justify-center">
                <FileText className="w-5 h-5 text-cyan-400" />
              </div>
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h2 className="text-lg font-bold text-white font-mono flex items-center gap-2">
                  AI Audio Transcriber
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 font-sans uppercase">
                    gemini-3.5-transcribe
                  </span>
                </h2>
              </div>
              <p className="text-xs text-cyan-300/70">
                Transcribe news clips, speeches, and interviews with speaker detection & summaries
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-white rounded-xl hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Method Selector Tabs */}
          <div className="flex items-center p-1 bg-white/5 border border-white/10 rounded-2xl max-w-md mx-auto">
            <button
              onClick={() => setActiveTab('record')}
              className={`flex-1 flex items-center justify-center space-x-2 py-2 rounded-xl text-xs font-semibold transition-all ${
                activeTab === 'record'
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm'
                  : 'text-gray-400 hover:text-gray-200'
              }`}
            >
              <Mic className="w-3.5 h-3.5 text-cyan-400" />
              <span>Record Live</span>
            </button>

            <button
              onClick={() => setActiveTab('upload')}
              className={`flex-1 flex items-center justify-center space-x-2 py-2 rounded-xl text-xs font-semibold transition-all ${
                activeTab === 'upload'
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm'
                  : 'text-gray-400 hover:text-gray-200'
              }`}
            >
              <Upload className="w-3.5 h-3.5 text-teal-400" />
              <span>Upload Audio</span>
            </button>

            <button
              onClick={() => setActiveTab('samples')}
              className={`flex-1 flex items-center justify-center space-x-2 py-2 rounded-xl text-xs font-semibold transition-all ${
                activeTab === 'samples'
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm'
                  : 'text-gray-400 hover:text-gray-200'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-blue-400" />
              <span>News Samples</span>
            </button>
          </div>

          {/* Tab 1: Live Microphone Recording */}
          {activeTab === 'record' && (
            <div className="p-8 rounded-3xl bg-gradient-to-b from-cyan-950/20 to-gray-900 border border-cyan-500/20 text-center flex flex-col items-center justify-center">
              <div className="relative mb-6">
                {isRecording && (
                  <div className="absolute -inset-4 rounded-full bg-red-500/20 animate-ping" />
                )}
                <button
                  onClick={isRecording ? stopRecording : startRecording}
                  disabled={isProcessing}
                  className={`relative z-10 w-20 h-20 rounded-full flex items-center justify-center transition-all shadow-xl ${
                    isRecording
                      ? 'bg-red-500 hover:bg-red-600 text-white shadow-red-500/40'
                      : 'bg-gradient-to-tr from-cyan-500 via-teal-400 to-blue-500 text-gray-950 hover:shadow-cyan-400/40 scale-100 hover:scale-105'
                  }`}
                >
                  {isRecording ? (
                    <Square className="w-8 h-8 fill-current" />
                  ) : (
                    <Mic className="w-8 h-8 text-gray-950" />
                  )}
                </button>
              </div>

              {isRecording ? (
                <div>
                  <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-red-500/20 text-red-300 border border-red-500/30 text-xs font-mono mb-2">
                    <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
                    <span>Recording: {recordingSeconds}s</span>
                  </div>
                  <p className="text-xs text-gray-400">
                    Tap the red button when finished to transcribe with gemini-3.5-transcribe
                  </p>
                </div>
              ) : (
                <div>
                  <h3 className="text-base font-semibold text-white mb-1">
                    Record Live Speech or News Broadcast
                  </h3>
                  <p className="text-xs text-gray-400 max-w-sm">
                    Tap the microphone to record your thoughts, a press conference, or audio stream.
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Tab 2: Audio File Upload */}
          {activeTab === 'upload' && (
            <div
              onClick={() => fileInputRef.current?.click()}
              className="p-8 rounded-3xl border-2 border-dashed border-cyan-500/30 hover:border-cyan-400 bg-white/5 hover:bg-cyan-500/5 transition-all cursor-pointer text-center flex flex-col items-center justify-center"
            >
              <input
                ref={fileInputRef}
                type="file"
                accept="audio/*"
                onChange={handleFileUpload}
                className="hidden"
              />
              <div className="w-14 h-14 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center mb-4 text-cyan-400">
                <Upload className="w-6 h-6" />
              </div>
              <h3 className="text-base font-semibold text-white mb-1">
                Drop Audio File or Browse
              </h3>
              <p className="text-xs text-gray-400 max-w-sm">
                Supports MP3, WAV, M4A, WEBM, OGG (up to 20MB). Transcribed with Gemini 3.5 Transcribe.
              </p>
            </div>
          )}

          {/* Tab 3: Pre-loaded News Samples */}
          {activeTab === 'samples' && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div
                onClick={() => handleLoadSample('geneva')}
                className="p-4 rounded-2xl bg-white/5 border border-white/10 hover:border-cyan-500/40 hover:bg-cyan-950/20 transition-all cursor-pointer text-left"
              >
                <div className="flex items-center space-x-2 text-cyan-400 mb-2">
                  <Sparkles className="w-4 h-4" />
                  <span className="text-xs font-bold uppercase tracking-wider">World Tech Accord</span>
                </div>
                <h4 className="text-sm font-semibold text-white mb-1">Geneva Frontier AI Briefing</h4>
                <p className="text-xs text-gray-400">
                  28-nation agreement on compute thresholds & safety benchmarks.
                </p>
              </div>

              <div
                onClick={() => handleLoadSample('davanagere')}
                className="p-4 rounded-2xl bg-white/5 border border-white/10 hover:border-cyan-500/40 hover:bg-cyan-950/20 transition-all cursor-pointer text-left"
              >
                <div className="flex items-center space-x-2 text-teal-400 mb-2">
                  <Sparkles className="w-4 h-4" />
                  <span className="text-xs font-bold uppercase tracking-wider">Karnataka Regional</span>
                </div>
                <h4 className="text-sm font-semibold text-white mb-1">Davanagere Smart Agro Hub</h4>
                <p className="text-xs text-gray-400">
                  400-acre corridor launch and solar microgrid development.
                </p>
              </div>

              <div
                onClick={() => handleLoadSample('isro')}
                className="p-4 rounded-2xl bg-white/5 border border-white/10 hover:border-cyan-500/40 hover:bg-cyan-950/20 transition-all cursor-pointer text-left"
              >
                <div className="flex items-center space-x-2 text-blue-400 mb-2">
                  <Sparkles className="w-4 h-4" />
                  <span className="text-xs font-bold uppercase tracking-wider">Space Exploration</span>
                </div>
                <h4 className="text-sm font-semibold text-white mb-1">ISRO Polar Lander Engine</h4>
                <p className="text-xs text-gray-400">
                  Hot-fire qualification test results from ISTRAC mission control.
                </p>
              </div>
            </div>
          )}

          {/* Loading Indicator */}
          {isProcessing && (
            <div className="p-8 rounded-3xl bg-cyan-950/30 border border-cyan-500/30 text-center flex flex-col items-center justify-center animate-pulse">
              <div className="w-12 h-12 rounded-full border-2 border-cyan-400 border-t-transparent animate-spin mb-4" />
              <h4 className="text-sm font-semibold text-cyan-300">
                Analyzing audio with gemini-3.5-transcribe...
              </h4>
              <p className="text-xs text-gray-400 mt-1">
                Synthesizing speech segments, timestamps, and executive intelligence summary
              </p>
            </div>
          )}

          {/* Error Message */}
          {errorMsg && (
            <div className="p-4 rounded-2xl bg-red-950/30 border border-red-500/30 flex items-start space-x-3 text-red-300 text-xs">
              <AlertCircle className="w-4 h-4 text-red-400 mt-0.5 flex-shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* Transcription Results */}
          {result && !isProcessing && (
            <div className="space-y-6 animate-in fade-in">
              {/* Executive Summary Card */}
              <div className="p-5 rounded-2xl bg-gradient-to-r from-cyan-950/40 to-teal-950/40 border border-cyan-500/30">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-mono text-cyan-400 uppercase tracking-wider flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5" />
                    AI Executive Summary
                  </span>
                  <div className="flex items-center space-x-2">
                    {result.detectedLanguage && (
                      <span className="text-[11px] px-2 py-0.5 rounded-full bg-white/10 text-gray-300">
                        {result.detectedLanguage}
                      </span>
                    )}
                    {result.sentiment && (
                      <span className="text-[11px] px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                        {result.sentiment}
                      </span>
                    )}
                  </div>
                </div>
                <p className="text-sm text-gray-100 font-medium leading-relaxed">
                  {result.summary}
                </p>
              </div>

              {/* Action Toolbar */}
              <div className="flex flex-wrap items-center justify-between gap-2 p-3 bg-white/5 rounded-2xl border border-white/10">
                <div className="flex items-center space-x-2">
                  <button
                    onClick={handleReadAloud}
                    className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                      isPlayingTts
                        ? 'bg-cyan-500 text-gray-950'
                        : 'bg-white/10 hover:bg-white/20 text-gray-200'
                    }`}
                  >
                    <Volume2 className="w-3.5 h-3.5" />
                    <span>{isPlayingTts ? 'Stop Voice' : 'Read Aloud'}</span>
                  </button>

                  <button
                    onClick={handleCopy}
                    className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-white/10 hover:bg-white/20 text-gray-200 transition-all"
                  >
                    {copied ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                        <span className="text-emerald-300">Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5 text-gray-400" />
                        <span>Copy Transcript</span>
                      </>
                    )}
                  </button>

                  <button
                    onClick={handleExportMarkdown}
                    className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-white/10 hover:bg-white/20 text-gray-200 transition-all"
                  >
                    <Download className="w-3.5 h-3.5 text-gray-400" />
                    <span>Export (.md)</span>
                  </button>
                </div>

                {onDiscussInChat && (
                  <button
                    onClick={() => {
                      onDiscussInChat(
                        `Audio Transcript Summary: ${result.summary}\nFull Transcript:\n${result.transcript}`
                      );
                      onClose();
                    }}
                    className="flex items-center space-x-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold bg-gradient-to-r from-cyan-500 to-teal-400 text-gray-950 hover:shadow-lg hover:shadow-cyan-500/20 transition-all"
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span>Discuss in OMNIX AI</span>
                  </button>
                )}
              </div>

              {/* Verbatim Transcript */}
              <div className="p-5 rounded-2xl bg-black/40 border border-white/10">
                <span className="text-xs font-mono text-gray-400 uppercase tracking-wider block mb-2">
                  Verbatim Transcript
                </span>
                <p className="text-sm text-gray-200 leading-relaxed font-mono whitespace-pre-line">
                  {result.transcript}
                </p>
              </div>

              {/* Speaker Segments & Timestamps */}
              {result.speakers && result.speakers.length > 0 && (
                <div className="p-5 rounded-2xl bg-white/5 border border-white/10">
                  <span className="text-xs font-mono text-cyan-400 uppercase tracking-wider flex items-center gap-1.5 mb-3">
                    <Users className="w-3.5 h-3.5" />
                    Speaker Segments & Timestamps
                  </span>
                  <div className="space-y-2.5">
                    {result.speakers.map((spk, idx) => (
                      <div
                        key={idx}
                        className="p-3 rounded-xl bg-black/30 border border-white/5 flex flex-col sm:flex-row sm:items-baseline gap-2"
                      >
                        <div className="flex items-center space-x-2 min-w-[140px]">
                          <span className="text-xs font-bold text-cyan-300">
                            {spk.speaker}
                          </span>
                          {spk.timestamp && (
                            <span className="text-[10px] font-mono text-gray-500">
                              {spk.timestamp}
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-gray-300 flex-1">"{spk.segment}"</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Key Takeaways */}
              {result.keyTakeaways && result.keyTakeaways.length > 0 && (
                <div className="p-5 rounded-2xl bg-white/5 border border-white/10">
                  <span className="text-xs font-mono text-teal-400 uppercase tracking-wider flex items-center gap-1.5 mb-3">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    Key Verified Takeaways
                  </span>
                  <ul className="space-y-2">
                    {result.keyTakeaways.map((takeaway, idx) => (
                      <li key={idx} className="flex items-start space-x-2 text-xs text-gray-200">
                        <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-1.5 flex-shrink-0" />
                        <span>{takeaway}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Entities */}
              {result.entities && result.entities.length > 0 && (
                <div className="flex items-center flex-wrap gap-2 pt-2">
                  <span className="text-xs font-mono text-gray-400 mr-2 flex items-center gap-1">
                    <Tag className="w-3 h-3" />
                    Detected Entities:
                  </span>
                  {result.entities.map((ent, idx) => (
                    <span
                      key={idx}
                      className="text-[11px] px-2.5 py-1 rounded-xl bg-white/5 text-cyan-200 border border-white/10 font-mono"
                    >
                      {ent.name}{' '}
                      <span className="text-gray-500 text-[9px]">({ent.type})</span>
                    </span>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-cyan-900/30 bg-gray-900/80 flex items-center justify-between">
          <span className="text-xs text-gray-400">
            Powered by Google Gemini 3.5 Transcribe
          </span>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-xs font-semibold bg-white/10 hover:bg-white/20 text-white transition-all"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
