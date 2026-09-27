import { Article, TrendingTopic, HeatmapItem, StoryNode } from '../types';

export const INITIAL_ARTICLES: Article[] = [
  {
    id: 'omx-001',
    title: 'Global Coalition Unveils Next-Gen Open Frontier AI Safety Framework',
    summary: 'Over 28 nations and top AI research labs convene to establish real-time evaluation protocols and compute monitoring standards for frontier models.',
    content: `GENEVA — In a landmark international summit on artificial intelligence governance, representatives from 28 nations, joined by researchers from leading AI institutions, ratified the "Frontier Verification Accord." The framework introduces automated red-teaming criteria, standardized benchmark reporting, and early warning thresholds for autonomous agent actions.

The agreement comes amidst rapid advancements in multi-modal autonomous systems capable of executing complex multi-step digital workflows. Unlike previous non-binding memorandums, the new accord outlines technical verification tooling developed jointly with open-source communities to ensure smaller research teams and developing nations maintain access to high-tier computational audits.

Key delegates emphasized that safety protocols must not stifle scientific experimentation or global open-source innovation. A permanent technical working council will oversee quarterly benchmark updates.`,
    category: 'AI',
    source: 'Omnix Tech Wire',
    sourceUrl: 'https://omnix.ai/sources/wire',
    author: 'Dr. Elena Vance & Marcus Vance',
    publishedAt: new Date(Date.now() - 1000 * 60 * 12).toISOString(), // 12 mins ago
    updatedAt: new Date(Date.now() - 1000 * 60 * 3).toISOString(),
    readTimeMinutes: 4,
    trendingScore: 98,
    isBreaking: true,
    isEditorsPick: true,
    imageUrl: '/src/assets/images/hero_ai_accord_1790499474025.jpg',
    location: {
      city: 'Geneva',
      country: 'Switzerland',
      region: 'Europe'
    },
    tags: ['AI Governance', 'Open Source', 'Safety Standards', 'Compute Clusters'],
    keyFacts: [
      '28 sovereign nations signed the initial verification charter.',
      'Automated red-teaming criteria will be open-sourced for research institutes.',
      'Includes mandatory disclosure for compute clusters exceeding 10^26 FLOPs.',
      'Quarterly peer-reviewed audits will be published openly.'
    ],
    whyItMatters: 'Establishes the first unified technical benchmark for high-capability models instead of vague policy statements, giving engineers clear safety targets.',
    keyPeople: [
      { name: 'Dr. Aris Thorne', role: 'Chair of International AI Safety Council' },
      { name: 'Mei Lin', role: 'Chief Technical Delegate, Frontier Alliance' }
    ],
    timeline: [
      { time: '08:30 UTC', event: 'Summit opening session begins with keynote from delegate leadership.' },
      { time: '11:15 UTC', event: 'Drafting committee finalizes compute transparency clause.' },
      { time: '14:00 UTC', event: 'Consensus reached on open-source safety toolkit distribution.' },
      { time: '16:45 UTC', event: 'Official charter signing ceremony concludes in Geneva.' }
    ],
    whatChanged: {
      earlier: 'Safety discussions were non-binding and primarily driven by bilateral corporate talks.',
      now: 'Standardized automated testing harness ratified with cross-national consensus.',
      changed: 'Mandatory technical verification requirements now replace voluntary self-reporting.'
    },
    cluster: {
      topic: 'Frontier AI Safety Verification Accord',
      consensusPoints: [
        'Compute disclosure threshold set at 10^26 FLOPs',
        'Open-source evaluation tooling must be publicly maintained',
        'Independent third-party audits required prior to nationwide release'
      ],
      keyDifferences: [
        'European delegates favored strict pre-deployment approvals',
        'US and Asian delegates negotiated expedited exemptions for academic labs'
      ],
      timeline: [
        { time: '09:00', event: 'Consortium releases draft specifications', source: 'Omnix Wire' },
        { time: '11:30', event: 'Open Source Initiative submits amendments', source: 'TechDispatch' },
        { time: '15:20', event: 'Accord approved with majority consensus', source: 'Global Monitor' }
      ],
      sources: [
        {
          sourceName: 'Omnix Tech Wire',
          headline: 'Nations Agree on Unified Autonomous Agent Benchmarks',
          publishedTime: '15 min ago',
          summary: 'Focuses on the technical tooling and automated sandbox tests mandated for foundation models.',
          confirmedPoints: ['Open testbed repository created', '28 signatory nations']
        },
        {
          sourceName: 'Global Policy Review',
          headline: 'The Geopolitics Behind the Geneva Frontier AI Accord',
          publishedTime: '35 min ago',
          summary: 'Examines diplomatic negotiations between compute-producing countries and emerging economies.',
          confirmedPoints: ['Compute disclosure framework', 'Quarterly advisory meetings']
        },
        {
          sourceName: 'DevStack Daily',
          headline: 'What the Geneva AI Safety Mandate Means for Developers',
          publishedTime: '1 hour ago',
          summary: 'Practical developer implications for local inference, API providers, and open weights models.',
          confirmedPoints: ['Models under the compute threshold remain exempt']
        }
      ]
    },
    recommendationReason: 'Trending #1 globally in Technology & Artificial Intelligence'
  },
  {
    id: 'omx-002',
    title: 'ISRO Gears Up for Next-Phase Deep Lunar Habitat & Rover Mission',
    summary: 'Indian Space Research Organisation outlines payloads and cryogenic propulsion tests for upcoming long-duration robotic lunar exploration.',
    content: `BENGALURU — The Indian Space Research Organisation (ISRO) has confirmed successful integration milestones for its next-generation lunar exploration architecture. Building upon the legacy of Chandrayaan achievements, the new phase focuses on long-duration nocturnal surface operations, subsurface ice drilling, and precision robotic rover traverse.

Speaking at the ISRO Telemetry, Tracking and Command Network (ISTRAC) facility in Bengaluru, senior scientists detailed the enhanced semi-cryogenic upper stage designed to double translunar injection payload capacity. The mission will deploy a high-resolution polar mineralogy spectrometer and an autonomous rover equipped with real-time navigational machine vision.

International collaboration plays a strategic role, with payload contributions slated from global aerospace partners. The landing zone selected in the Moon’s southern polar crater rim is expected to provide extended illumination windows for solar arrays.`,
    category: 'Space',
    source: 'Space Dynamics India',
    sourceUrl: 'https://omnix.ai/sources/space-india',
    author: 'Kavitha Ramachandran',
    publishedAt: new Date(Date.now() - 1000 * 60 * 38).toISOString(),
    updatedAt: new Date(Date.now() - 1000 * 60 * 15).toISOString(),
    readTimeMinutes: 5,
    trendingScore: 94,
    isBreaking: false,
    isEditorsPick: true,
    imageUrl: '/src/assets/images/hero_isro_lunar_1790499488750.jpg',
    location: {
      city: 'Bengaluru',
      state: 'Karnataka',
      country: 'India',
      region: 'Asia'
    },
    tags: ['ISRO', 'Space Exploration', 'Lunar Habitat', 'Chandrayaan', 'Deep Space'],
    keyFacts: [
      'Semi-cryogenic engine test achieved 100% rated thrust duration.',
      'Rover designed to withstand continuous 14-day lunar night using radioisotope thermal units.',
      'Subsurface drill capable of extracting core samples down to 2 meters depth.',
      'Primary landing target chosen near Malapert Mountain.'
    ],
    whyItMatters: 'Paves the way for permanent automated scientific stations on the Moon and expands India’s sovereign deep-space logistics capability.',
    keyPeople: [
      { name: 'Dr. S. Somnath', role: 'Chairman, ISRO' },
      { name: 'Dr. Preeti Nair', role: 'Mission Director, Lunar Systems' }
    ],
    timeline: [
      { time: 'Last Month', event: 'Cryogenic stage qualification test completed at Mahendragiri.' },
      { time: '2 Days Ago', event: 'Spectrometer payload passed environmental vacuum tests.' },
      { time: 'Today', event: 'Official mission schedule and lunar descent trajectory revealed.' }
    ],
    whatChanged: {
      earlier: 'Previous missions were limited to single lunar-day operations of 14 Earth days.',
      now: 'Thermal heating modules will enable multi-cycle survival through severe lunar nights.',
      changed: 'Payload capability scaled up from 25kg to over 120kg scientific instruments.'
    },
    recommendationReason: 'Because you follow Space & Indian Science'
  },
  {
    id: 'omx-003',
    title: 'Davanagere Unveils 400-Acre Smart Textile & Solar Agri-Tech Industrial Hub',
    summary: 'The historic textile hub of Davanagere transitions into high-tech sustainable weaving, IoT agri-processing, and renewable microgrids.',
    content: `DAVANAGERE — Karnataka’s historical "Manchester of Karnataka" has embarked on a bold revitalization with the formal inauguration of the Davanagere Green Agro-Textile Innovation Corridor. Spanning over 400 acres adjacent to the Pune-Bengaluru economic corridor, the facility pairs modernized high-speed automated loomed fabrics with solar rooftop microgrids and zero-liquid discharge water recycling.

The project, spearheaded by state industrial development authorities in partnership with local agricultural cooperatives, aims to employ over 15,000 skilled workers and revitalize local cotton and maize value chains. In addition to textiles, an integrated agri-tech incubation center will test drone-assisted crop monitoring and precision irrigation for central Karnataka farmers.

Local officials noted that the integration of digital supply chains allows Davanagere-produced organic cotton apparel to connect directly with global export markets while conserving groundwater resources in the Tungabhadra river basin.`,
    category: 'Davanagere',
    source: 'Karnataka Express',
    sourceUrl: 'https://omnix.ai/sources/kar-exp',
    author: 'Sunil Shivananjappa',
    publishedAt: new Date(Date.now() - 1000 * 60 * 55).toISOString(),
    updatedAt: new Date(Date.now() - 1000 * 60 * 20).toISOString(),
    readTimeMinutes: 3,
    trendingScore: 89,
    isBreaking: false,
    isEditorsPick: true,
    imageUrl: '/src/assets/images/hero_davanagere_1790499503262.jpg',
    location: {
      city: 'Davanagere',
      state: 'Karnataka',
      country: 'India',
      region: 'Central Karnataka'
    },
    tags: ['Davanagere', 'Karnataka Economy', 'AgriTech', 'Sustainable Textiles', 'Solar Energy'],
    keyFacts: [
      '400-acre specialized corridor located along NH-48 Pune-Bengaluru highway.',
      'Zero-liquid discharge facility recovers 95% of industrial processing water.',
      'Targeting 15,000 new jobs in technical textiles and high-efficiency apparel.',
      'Agri-tech center provides free soil-health and drone scanning to regional farmers.'
    ],
    whyItMatters: 'Demonstrates decentralized industrial development outside Tier-1 metros, reviving historical industrial clusters with clean energy.',
    keyPeople: [
      { name: 'M. B. Patil', role: 'Minister for Large and Medium Industries, Karnataka' },
      { name: 'Rajeshwar Hegde', role: 'President, Davanagere Chamber of Commerce' }
    ],
    timeline: [
      { time: '6 Months Ago', event: 'Environmental clearance and land allotment finalized.' },
      { time: 'Yesterday', event: 'Trial runs of 50-megawatt captive solar array completed.' },
      { time: 'Today', event: 'First phase of modernized weaving and incubation park operational.' }
    ],
    recommendationReason: 'Regional focus for Karnataka & Davanagere community'
  },
  {
    id: 'omx-004',
    title: 'Silicon Photonics Breakthrough Slashes AI Data Center Energy by 60%',
    summary: 'Engineers demonstrate optical inter-chip communication replacing copper wires, dramatically reducing latency and cooling costs.',
    content: `SANTA CLARA — A consortium of semiconductor researchers and optoelectronic foundries has revealed a commercially viable monolithic silicon photonics transceiver chip. By transmitting high-bandwidth training data via microscopic laser pulses directly on the silicon wafer rather than traditional copper interconnects, the architecture cuts inter-GPU power consumption by over 60%.

The dramatic rise of trillion-parameter neural network training has placed unprecedented demands on regional power grids. Copper interconnects suffer from signal degradation and extreme thermal dissipation at high frequencies. The optical transceiver operates with near-zero latency degradation across cluster distances up to 2 kilometers, enabling distributed supercomputers to function as a unified virtual compute fabric.

Early pilot tests conducted at hyper-scaler testbeds confirmed sustained data transmission rates exceeding 3.2 Terabits per second per transceiver link. Volume manufacturing is scheduled to ramp at leading foundry partners later this year.`,
    category: 'Technology',
    source: 'Next Silicon Review',
    sourceUrl: 'https://omnix.ai/sources/silicon',
    author: 'Rachel Chen',
    publishedAt: new Date(Date.now() - 1000 * 60 * 75).toISOString(),
    updatedAt: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
    readTimeMinutes: 4,
    trendingScore: 92,
    isBreaking: false,
    isEditorsPick: true,
    imageUrl: '/src/assets/images/hero_silicon_1790499515978.jpg',
    location: {
      city: 'Santa Clara',
      state: 'California',
      country: 'USA',
      region: 'North America'
    },
    tags: ['Silicon Photonics', 'Semiconductors', 'Green Computing', 'Data Centers', 'Hardware'],
    keyFacts: [
      'Optical transmission slashes inter-chip power draw by 62%.',
      'Achieves 3.2 Tbps bandwidth per optical channel.',
      'Allows server racks to be distributed up to 2 kilometers apart with zero signal degradation.',
      'Compatible with existing standard CMOS manufacturing lines.'
    ],
    whyItMatters: 'Solves the looming power and thermal bottleneck threatening to cap the scaling of next-generation artificial intelligence data centers.',
    keyPeople: [
      { name: 'Dr. Gregory Thorne', role: 'Lead Architect, OpticFabric Systems' },
      { name: 'Ananya Deshmukh', role: 'VP of Engineering, Photonic Silicon' }
    ],
    timeline: [
      { time: 'Q1 2025', event: 'First monolithic micro-ring resonator successfully etched.' },
      { time: 'Last Week', event: 'Multi-datacenter 10,000-hour stress testing concludes.' },
      { time: 'Today', event: 'Peer-reviewed architecture benchmarks published in IEEE journal.' }
    ],
    recommendationReason: 'Trending in Hardware & Clean Tech'
  },
  {
    id: 'omx-005',
    title: 'Reserve Bank of India Accelerates Offline Retail CBDC Pilots Across Rural Hubs',
    summary: 'Digital Rupee adds feature phone NFC touch-and-pay and encrypted acoustic wave transactions to operate reliably without internet coverage.',
    content: `MUMBAI — In a major financial inclusion initiative, the Reserve Bank of India (RBI) has expanded its Central Bank Digital Currency (e₹) retail pilot to support offline peer-to-peer and merchant transactions. The updated protocol utilizes dual-key encrypted secure elements stored on basic feature phones and smart cards, allowing instant micro-payments without active 4G or 5G connectivity.

Testing has begun in 45 designated rural and semi-urban pilot districts across Karnataka, Maharashtra, Odisha, and Uttar Pradesh. Transactions validate through localized secure proximity handshakes and synchronize with the distributed ledger once either transacting party enters network connectivity.

Financial technology analysts emphasize that overcoming connectivity dead zones in agricultural produce markets (mandis) and transport corridors is essential for mainstream digital currency adoption. Zero-transaction-fee merchant settlements have also boosted retailer sign-ups.`,
    category: 'Finance',
    source: 'Financial Express Live',
    sourceUrl: 'https://omnix.ai/sources/fin-exp',
    author: 'Vikramaditya Rao',
    publishedAt: new Date(Date.now() - 1000 * 60 * 95).toISOString(),
    updatedAt: new Date(Date.now() - 1000 * 60 * 40).toISOString(),
    readTimeMinutes: 4,
    trendingScore: 86,
    isBreaking: false,
    isEditorsPick: false,
    imageUrl: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&w=1200&q=80',
    location: {
      city: 'Mumbai',
      state: 'Maharashtra',
      country: 'India',
      region: 'South Asia'
    },
    tags: ['RBI', 'Digital Rupee', 'Fintech', 'Financial Inclusion', 'CBDC'],
    keyFacts: [
      'Offline transactions execute via secure proximity hardware tokens.',
      'Pilot deployed across 45 agricultural market clusters.',
      'Zero transaction fees for micro-merchants.',
      'Reconciliation protocol prevents double-spending through cryptographic counter-signing.'
    ],
    whyItMatters: 'Enables genuine financial sovereignty for remote communities without requiring continuous high-speed cellular data.',
    keyPeople: [
      { name: 'Shaktikanta Das', role: 'Governor, Reserve Bank of India' },
      { name: 'Naveen Sen', role: 'Executive Director of FinTech Regulation' }
    ],
    timeline: [
      { time: 'Phase 1', event: 'Initial wholesale inter-bank trials established.' },
      { time: 'Phase 2', event: 'Metro QR-code retail pilot rolled out.' },
      { time: 'Current', event: 'Full offline device-to-device feature launched.' }
    ],
    recommendationReason: 'Because you follow Indian Economy & Banking'
  },
  {
    id: 'omx-006',
    title: 'Solid-State Sodium Batteries Enter Commercial Electric Vehicle Fleet Trials',
    summary: 'Eliminating lithium, cobalt, and nickel, the new sodium-ion packs promise cold-weather reliability, 15-minute fast charging, and 40% lower cell costs.',
    content: `STOCKHOLM / TOKYO — The next frontier of energy storage has moved beyond lab prototypes as automotive consortia begin road-testing solid-state sodium-ion batteries in commercial delivery vans and commuter vehicles. With zero dependence on scarce lithium or cobalt supply chains, the cells leverage abundant table-salt derivatives.

Engineers report that the solid-state electrolyte design eliminates thermal runaway risk, allowing the battery packs to operate at 90% capacity even at freezing temperatures of -30°C. Fast-charging tests showed a 10% to 80% charge achieved in just 14 minutes using standard 250kW charging dispensers.

While the volumetric energy density is roughly 15% lower than top-tier nickel-manganese-cobalt chemistries, the dramatically reduced raw material cost and unlimited abundance of sodium make it an ideal solution for urban mobility, commercial fleets, and grid-scale storage.`,
    category: 'Automotive',
    source: 'Clean Energy & Mobility',
    sourceUrl: 'https://omnix.ai/sources/ev-mobility',
    author: 'Astrid Lindholm',
    publishedAt: new Date(Date.now() - 1000 * 60 * 120).toISOString(),
    updatedAt: new Date(Date.now() - 1000 * 60 * 45).toISOString(),
    readTimeMinutes: 4,
    trendingScore: 88,
    isBreaking: false,
    isEditorsPick: true,
    imageUrl: 'https://images.unsplash.com/photo-1558441719-f308365f5a89?auto=format&fit=crop&w=1200&q=80',
    location: {
      city: 'Stockholm',
      country: 'Sweden',
      region: 'Europe'
    },
    tags: ['Sodium Battery', 'Electric Vehicles', 'Clean Tech', 'Solid State', 'Energy Storage'],
    keyFacts: [
      'Cells contain zero lithium, nickel, or cobalt.',
      'Charges from 10% to 80% in 14 minutes.',
      'Retains 90% discharge capacity at -30°C cold climates.',
      'Estimated manufacturing cost 40% lower than traditional LFP cells.'
    ],
    whyItMatters: 'Removes global supply chain bottlenecks for affordable clean transportation and renewable energy grid buffering.',
    keyPeople: [
      { name: 'Dr. Hiroshi Tanaka', role: 'Head of Battery Chemistry, SolSodium' },
      { name: 'Dr. Clara Meyer', role: 'Automotive Systems Lead' }
    ],
    timeline: [
      { time: 'Last Year', event: 'Laboratory proof-of-concept achieved 1,500 cycle life.' },
      { time: '3 Months Ago', event: 'First pilot gigafactory line commissioned in Scandinavia.' },
      { time: 'Today', event: '500-vehicle commercial road fleet trials commence.' }
    ],
    recommendationReason: 'Trending in Clean Energy & Automotive'
  },
  {
    id: 'omx-007',
    title: 'Karnataka Bio-Innovation Hub Secures $250M for AI Protein Therapeutics',
    summary: 'Bengaluru and Mysuru research corridors combine high-performance computing with biological synthesis to target rare tropical diseases.',
    content: `BENGALURU — Karnataka’s state biotechnology council and a coalition of venture partners have launched a $250 million Bio-Compute Acceleration Fund. The program targets the development of novel peptide therapeutics and targeted cancer antibodies using generative molecular modeling platforms.

The initiative connects clinical researchers at the Indian Institute of Science (IISc), the National Centre for Biological Sciences (NCBS), and regional biotech startups with dedicated compute clusters at the Supercomputing Education and Research Centre.

State officials highlighted that Karnataka currently houses over 60% of India’s registered biotechnology patents. By accelerating lead candidate discovery from an average of 4.5 years down to under 8 months, the hub aims to dramatically lower drug synthesis costs for endemic infectious illnesses and oncology treatments across the Global South.`,
    category: 'Karnataka',
    source: 'Deccan Chronicle Tech',
    sourceUrl: 'https://omnix.ai/sources/dec-chr',
    author: 'K. R. Venugopal',
    publishedAt: new Date(Date.now() - 1000 * 60 * 140).toISOString(),
    updatedAt: new Date(Date.now() - 1000 * 60 * 60).toISOString(),
    readTimeMinutes: 3,
    trendingScore: 84,
    isBreaking: false,
    isEditorsPick: false,
    imageUrl: 'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?auto=format&fit=crop&w=1200&q=80',
    location: {
      city: 'Bengaluru',
      state: 'Karnataka',
      country: 'India',
      region: 'South India'
    },
    tags: ['Karnataka', 'Biotechnology', 'AI Medicine', 'IISc', 'Startups'],
    keyFacts: [
      '$250 million public-private innovation corpus allocated.',
      'Involves IISc, NCBS, and over 40 indigenous biotech startups.',
      'Slashes drug lead discovery timelines from 4.5 years to 8 months.',
      'Focuses on affordable therapies for neglected tropical diseases.'
    ],
    whyItMatters: 'Transforms India from generic manufacturing into frontier drug design and novel molecular engineering.',
    keyPeople: [
      { name: 'Dr. Priyamvada Rao', role: 'Director, Karnataka Bio-Innovation Council' },
      { name: 'Dr. Anand Kumar', role: 'Head of Molecular Synthesis' }
    ],
    timeline: [
      { time: 'January', event: 'Bio-IT policy whitepaper presented to state cabinet.' },
      { time: 'Last Week', event: 'Anchor compute agreements signed with cloud partners.' },
      { time: 'Today', event: 'Applications open for first cohort of 25 research teams.' }
    ],
    recommendationReason: 'Regional focus for Karnataka State'
  },
  {
    id: 'omx-008',
    title: 'James Webb Space Telescope Detects Atmospheric Water Vapor on Habitable-Zone Exoplanet',
    summary: 'Spectroscopic data reveals methane, carbon dioxide, and clouds on temperate super-Earth LP 890-9c, located 105 light-years away.',
    content: `BALTIMORE — Astrophysics teams analyzing deep transmission spectra from the James Webb Space Telescope (JWST) have reported the definitive signature of water vapor, methane, and carbon dioxide in the upper atmosphere of exoplanet LP 890-9c.

Located approximately 105 light-years away in the constellation Eridanus, the planet orbits an ultra-cool red dwarf star within its conservative liquid-water habitable zone. With a radius roughly 1.37 times that of Earth, the planet receives an irradiance similar to Earth’s outer solar boundary.

While researchers cautioned that atmospheric water and greenhouse gases do not constitute biological proof, the observations confirm that rocky super-Earths around low-mass stars can maintain substantial volatile atmospheres despite intense stellar flare activity during their youth. Follow-up observations with high-contrast transit spectroscopy are scheduled for late autumn.`,
    category: 'Science',
    source: 'Astrophysical Journal Today',
    sourceUrl: 'https://omnix.ai/sources/astro-j',
    author: 'Prof. Danielle Ross',
    publishedAt: new Date(Date.now() - 1000 * 60 * 180).toISOString(),
    updatedAt: new Date(Date.now() - 1000 * 60 * 80).toISOString(),
    readTimeMinutes: 5,
    trendingScore: 95,
    isBreaking: false,
    isEditorsPick: true,
    imageUrl: 'https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?auto=format&fit=crop&w=1200&q=80',
    location: {
      city: 'Baltimore',
      state: 'Maryland',
      country: 'USA',
      region: 'Space Science'
    },
    tags: ['JWST', 'Exoplanet', 'Astronomy', 'Space Science', 'Water Vapor'],
    keyFacts: [
      'Exoplanet LP 890-9c orbits in the conservative habitable zone.',
      'Strong absorption bands detected for H2O, CH4, and CO2.',
      'Target is 105 light-years from Earth around a red dwarf star.',
      'Proves rocky planets around M-dwarfs can retain dense atmospheres.'
    ],
    whyItMatters: 'Brings humanity one step closer to characterizing potentially habitable worlds beyond our solar system.',
    keyPeople: [
      { name: 'Dr. Martin Delacroix', role: 'Principal Investigator, Exoplanet Survey' },
      { name: 'Dr. Sonia Bhattacharya', role: 'Spectroscopy Data Lead' }
    ],
    timeline: [
      { time: '6 Months Ago', event: 'Webb completed three separate transit observation windows.' },
      { time: 'Last Month', event: 'Independent validation teams eliminated stellar contamination artifacts.' },
      { time: 'Today', event: 'Full findings presented at International Astronomical Union briefing.' }
    ],
    recommendationReason: 'Trending in Astronomy & Deep Science'
  },
  {
    id: 'omx-009',
    title: 'UN Climate Summit Finalizes $100B Global Loss and Damage Mechanism Rules',
    summary: 'Developing nations secure direct grant access and transparent payout triggers linked to verified meteorological satellite sensor data.',
    content: `BONN — Negotiators at the intersessional climate convention in Bonn have established the governance charter for the global Loss and Damage Fund. The fund, capitalized with over $100 billion in committed sovereign pledges, introduces an algorithmic payout mechanism triggered by verified climate extremes such as category-5 cyclones, prolonged droughts, and catastrophic flash floods.

Delegates from island states and vulnerable agricultural regions celebrated the inclusion of direct grant transfers rather than debt-inducing loans. By utilizing verified satellite rainfall grids and ocean temperature sensors, disbursements can be expedited within 72 hours of an extreme weather disaster, bypassing protracted bureaucratic claims.

The initial operational phase will establish regional disaster coordination centers across the Pacific, the Caribbean, the Horn of Africa, and South Asia.`,
    category: 'Climate',
    source: 'World Climate Observer',
    sourceUrl: 'https://omnix.ai/sources/climate-obs',
    author: 'Fatima Al-Mansoor',
    publishedAt: new Date(Date.now() - 1000 * 60 * 220).toISOString(),
    updatedAt: new Date(Date.now() - 1000 * 60 * 110).toISOString(),
    readTimeMinutes: 4,
    trendingScore: 87,
    isBreaking: false,
    isEditorsPick: false,
    imageUrl: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=1200&q=80',
    location: {
      city: 'Bonn',
      country: 'Germany',
      region: 'Europe'
    },
    tags: ['Climate Finance', 'Loss and Damage', 'COP', 'Global South', 'Sustainability'],
    keyFacts: [
      'Funds disbursed as 100% non-repayable grants, not debt.',
      'Automated satellite triggers release initial capital within 72 hours.',
      'Initial capitalization surpasses $100 billion committed by international partners.',
      'Regional coordination centers assigned to high-vulnerability coastal zones.'
    ],
    whyItMatters: 'Provides rapid emergency liquidity to vulnerable frontline communities without exacerbating national debt burdens.',
    keyPeople: [
      { name: 'Amara Koné', role: 'Spokesperson, Alliance of Small Island States' },
      { name: 'Lars Bergstrom', role: 'Co-chair, Loss and Damage Transitional Board' }
    ],
    timeline: [
      { time: 'COP28', event: 'Initial political agreement to operationalize the fund.' },
      { time: 'Last Week', event: 'Dispute over World Bank hosting terms resolved.' },
      { time: 'Today', event: 'Technical governance charter formally adopted in Bonn.' }
    ],
    recommendationReason: 'Global interest in Climate Policy & Resilience'
  },
  {
    id: 'omx-010',
    title: 'Cybersecurity Alert: Global Cloud Provider Thwarts Record 8.5 Tbps DDoS Attack',
    summary: 'Autonomous AI mitigation systems neutralize the largest distributed volumetric packet flood in internet history within 1.2 seconds.',
    content: `SAN FRANCISCO — Cloud infrastructure engineers and internet security researchers have documented the successful suppression of an unprecedented 8.5 Terabit-per-second distributed denial-of-service (DDoS) attack. The assault, orchestrated by an advanced Mirai-variant botnet consisting of over 380,000 compromised edge IoT routers, targeted critical financial and telecommunication gateways.

According to technical advisories, the threat actors deployed hyper-volumetric UDP amplification combined with randomized SYN-ACK floods designed to overwhelm stateful firewalls. Automated neural threat filters deployed at the edge intercepted the anomaly, re-routing malicious packets to multi-terabit anycast scrubbing nodes within 1,200 milliseconds.

Zero customer outages were recorded during the 18-minute bombardment. Cybersecurity authorities have issued global patches to consumer router firmware to seal the zero-day protocol vulnerability exploited in the botnet recruitment drive.`,
    category: 'Security',
    source: 'Cyber Defense Dispatch',
    sourceUrl: 'https://omnix.ai/sources/cyber-disp',
    author: 'Nathaniel Cross',
    publishedAt: new Date(Date.now() - 1000 * 60 * 260).toISOString(),
    updatedAt: new Date(Date.now() - 1000 * 60 * 120).toISOString(),
    readTimeMinutes: 3,
    trendingScore: 91,
    isBreaking: false,
    isEditorsPick: true,
    imageUrl: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1200&q=80',
    location: {
      city: 'San Francisco',
      state: 'California',
      country: 'USA',
      region: 'North America'
    },
    tags: ['Cybersecurity', 'DDoS', 'Cloud Infrastructure', 'Network Security', 'IoT'],
    keyFacts: [
      'Peak traffic hit 8.5 Terabits per second, a record volumetric flood.',
      'Involved over 380,000 compromised IoT micro-gateways.',
      'AI edge scrubber suppressed the spike in under 1.2 seconds.',
      'No core services or payment gateways experienced downtime.'
    ],
    whyItMatters: 'Demonstrates the indispensability of autonomous machine-speed defense in safeguarding digital banking and power grids.',
    keyPeople: [
      { name: 'Sarah Sterling', role: 'Chief Information Security Officer' },
      { name: 'Kenji Sato', role: 'Threat Intelligence Lead' }
    ],
    timeline: [
      { time: '02:14 UTC', event: 'Botnet begins synchronized traffic ramp across 40 countries.' },
      { time: '02:14:01', event: 'Edge neural filters flag anomalous packet payload signatures.' },
      { time: '02:14:02', event: 'Traffic scrubbing complete; malicious packets discarded.' },
      { time: '02:32 UTC', event: 'Attack vectors completely dissipate.' }
    ],
    recommendationReason: 'Trending in Infrastructure & Cybersecurity'
  },
  {
    id: 'omx-011',
    title: 'Davanagere Cotton Yields Surge 35% with Indigenous AI Soil Moisture Sensors',
    summary: 'Local university engineers deploy low-cost solar acoustic soil probes that help Davanagere farmers save water while doubling harvest efficiency.',
    content: `DAVANAGERE — Cotton and groundnut farmers across the Mayakonda and Harihar taluks of Davanagere district are celebrating a record-breaking harvest, attributed to the deployment of indigenous soil probes developed by the University of Agricultural Sciences and Bapuji Institute of Engineering.

The devices, which cost less than ₹600 each, use ultrasonic acoustic pulse resonance to measure root-zone moisture tension and salinity in real time. Readings are relayed via regional LoRaWAN antennas to an automated WhatsApp advisory system in Kannada, telling farmers exactly how many liters of irrigation water to apply and when to schedule bio-fertilizer dosing.

Initial field audits across 1,200 acres confirmed a 35% increase in cotton boll weight and an impressive 42% reduction in borewell electricity consumption. The district administration has announced plans to expand the sensor subsidy to over 20,000 farmers before the next monsoon sowing season.`,
    category: 'Agriculture',
    source: 'Karnataka Kisan Patrika',
    sourceUrl: 'https://omnix.ai/sources/kar-agri',
    author: 'Basavaraj Marulasiddappa',
    publishedAt: new Date(Date.now() - 1000 * 60 * 310).toISOString(),
    updatedAt: new Date(Date.now() - 1000 * 60 * 150).toISOString(),
    readTimeMinutes: 3,
    trendingScore: 82,
    isBreaking: false,
    isEditorsPick: false,
    imageUrl: 'https://images.unsplash.com/photo-1592982537447-6f2a6a0c5c1c?auto=format&fit=crop&w=1200&q=80',
    location: {
      city: 'Davanagere',
      state: 'Karnataka',
      country: 'India',
      region: 'Central Karnataka'
    },
    tags: ['Davanagere', 'Agriculture', 'Smart Farming', 'Water Conservation', 'Karnataka'],
    keyFacts: [
      'Sub-$8 acoustic ultrasonic probes designed locally in Davanagere.',
      'Average cotton yield jumped 35% across 1,200 pilot acres.',
      'Groundwater consumption reduced by 42% via micro-dosing.',
      'Kannada voice and text advisories broadcast via localized LoRaWAN.'
    ],
    whyItMatters: 'Demonstrates how grassroots technology empowers smallholder farmers facing climate shifts without expensive proprietary software.',
    keyPeople: [
      { name: 'Prof. Mallikarjun Swamy', role: 'Lead Researcher, BIET Davanagere' },
      { name: 'Gangadharappa', role: 'Progressive Farmer, Mayakonda' }
    ],
    timeline: [
      { time: 'May 2025', event: 'First batch of 150 probes installed in soil test plots.' },
      { time: 'August', event: 'Drought dry spell successfully navigated using precision water pulse.' },
      { time: 'Today', event: 'District Commissioner announces full-scale subsidy expansion.' }
    ],
    recommendationReason: 'Local Karnataka Agriculture Spotlight'
  },
  {
    id: 'omx-012',
    title: 'World Cup 2026 Preparations: Host Cities Test Biometric High-Speed Transit Gates',
    summary: 'Airports and stadium transit lines implement contactless facial biometrics and digital credential passes to process 100,000 fans per hour.',
    content: `NEW YORK / MEXICO CITY / TORONTO — With the expanded 48-team FIFA World Cup fast approaching across the United States, Mexico, and Canada, regional transportation agencies have unveiled next-generation high-throughput transit gates. The system integrates digital passport credentials and stadium mobile tickets into an encrypted sub-second biometric tap-and-go corridor.

During stress-testing at MetLife Stadium and Mexico City’s Estadio Azteca, the automated turnstiles processed upwards of 1,800 passengers per gate per hour without bottlenecks. Fans can link their travel visa, stadium ticket, and subway fare through a single decentralized digital wallet.

Organizers underscored strict biometric privacy guarantees: facial embeddings are hashed locally on hardware security modules and purged immediately following exit validation, addressing civil liberties concerns raised during earlier sports tournaments.`,
    category: 'Sports',
    source: 'Global Stadium Digest',
    sourceUrl: 'https://omnix.ai/sources/stadium-dig',
    author: 'Javier Morales',
    publishedAt: new Date(Date.now() - 1000 * 60 * 360).toISOString(),
    updatedAt: new Date(Date.now() - 1000 * 60 * 180).toISOString(),
    readTimeMinutes: 4,
    trendingScore: 85,
    isBreaking: false,
    isEditorsPick: false,
    imageUrl: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=1200&q=80',
    location: {
      city: 'New York',
      state: 'New York',
      country: 'USA',
      region: 'North America'
    },
    tags: ['World Cup 2026', 'Sports Tech', 'Transit', 'Biometrics', 'FIFA'],
    keyFacts: [
      'Gates clear 1,800 fans per hour per turnstile.',
      'Single digital pass combines transit fare, stadium entry, and border ID.',
      'Decentralized encryption ensures no facial imagery is stored on centralized servers.',
      'Unified deployment across 16 host cities in US, Mexico, and Canada.'
    ],
    whyItMatters: 'Sets the technological benchmark for mega-event crowd logistics and seamless cross-border spectator journeys.',
    keyPeople: [
      { name: 'Gianni Infantino', role: 'President, FIFA' },
      { name: 'Maria Santos', role: 'North American Mobility Director' }
    ],
    timeline: [
      { time: 'Last Year', event: 'Joint trilateral security and customs accord ratified.' },
      { time: '2 Weeks Ago', event: 'Subway station simulations conducted in Toronto.' },
      { time: 'Today', event: 'Public demonstrations held at MetLife Stadium.' }
    ],
    recommendationReason: 'Trending in Global Sports & Entertainment'
  }
];

export const TRENDING_TOPICS: TrendingTopic[] = [
  {
    id: 'tt-1',
    name: 'Frontier AI Accord',
    category: 'AI',
    articleCount: 142,
    trendVelocity: 'rapid',
    percentageChange: 340,
    sparkline: [20, 35, 45, 60, 85, 120, 142]
  },
  {
    id: 'tt-2',
    name: 'ISRO Deep Lunar Mission',
    category: 'Space',
    articleCount: 98,
    trendVelocity: 'rising',
    percentageChange: 185,
    sparkline: [30, 42, 50, 68, 75, 88, 98]
  },
  {
    id: 'tt-3',
    name: 'Davanagere Smart Hub',
    category: 'Davanagere',
    articleCount: 45,
    trendVelocity: 'rising',
    percentageChange: 210,
    sparkline: [8, 12, 18, 25, 32, 40, 45]
  },
  {
    id: 'tt-4',
    name: 'Silicon Photonics 3.2Tbps',
    category: 'Technology',
    articleCount: 116,
    trendVelocity: 'rapid',
    percentageChange: 280,
    sparkline: [25, 40, 58, 70, 92, 105, 116]
  },
  {
    id: 'tt-5',
    name: 'Offline Digital Rupee',
    category: 'Finance',
    articleCount: 76,
    trendVelocity: 'steady',
    percentageChange: 95,
    sparkline: [40, 45, 52, 58, 64, 70, 76]
  },
  {
    id: 'tt-6',
    name: 'Sodium Solid-State Cells',
    category: 'Automotive',
    articleCount: 88,
    trendVelocity: 'rising',
    percentageChange: 160,
    sparkline: [15, 28, 42, 55, 68, 79, 88]
  }
];

export const NEWS_HEATMAP: HeatmapItem[] = [
  { name: 'Artificial Intelligence', category: 'AI', score: 98, trend: 'up_fast', delta: '+42%' },
  { name: 'Semiconductors & Photonics', category: 'Technology', score: 91, trend: 'up_fast', delta: '+38%' },
  { name: 'Space Exploration', category: 'Space', score: 89, trend: 'up', delta: '+22%' },
  { name: 'Central Karnataka AgriTech', category: 'Davanagere', score: 84, trend: 'up', delta: '+29%' },
  { name: 'Solid State Batteries', category: 'Automotive', score: 81, trend: 'up', delta: '+19%' },
  { name: 'Global Climate Loss Fund', category: 'Climate', score: 79, trend: 'stable', delta: '+8%' },
  { name: 'Central Bank Digital Currencies', category: 'Finance', score: 75, trend: 'stable', delta: '+6%' },
  { name: 'Traditional Global Trade', category: 'Business', score: 54, trend: 'down', delta: '-12%' }
];

export const STORY_NODES: StoryNode[] = [
  { id: 'node-ai', label: 'Frontier AI Accord', type: 'topic', category: 'AI', connections: ['node-compute', 'node-gov', 'node-labs'] },
  { id: 'node-compute', label: '10^26 FLOPs Clusters', type: 'topic', category: 'Technology', connections: ['node-ai', 'node-photonics'] },
  { id: 'node-photonics', label: 'Silicon Photonics', type: 'topic', category: 'Technology', connections: ['node-compute', 'node-datacenters'] },
  { id: 'node-datacenters', label: 'Data Center Energy', type: 'topic', category: 'Environment', connections: ['node-photonics', 'node-sodium'] },
  { id: 'node-sodium', label: 'Sodium Solid-State', type: 'topic', category: 'Automotive', connections: ['node-datacenters', 'node-ev'] },
  { id: 'node-ev', label: 'Commercial Fleets', type: 'topic', category: 'Business', connections: ['node-sodium'] },
  { id: 'node-gov', label: 'Geneva 28-Nation Treaty', type: 'event', category: 'World', connections: ['node-ai'] },
  { id: 'node-labs', label: 'Open Research Labs', type: 'company', category: 'AI', connections: ['node-ai'] },
  { id: 'node-isro', label: 'ISRO Chandrayaan Next', type: 'company', category: 'Space', connections: ['node-moon', 'node-bengaluru'] },
  { id: 'node-moon', label: 'Lunar Habitat Malapert', type: 'place', category: 'Space', connections: ['node-isro'] },
  { id: 'node-bengaluru', label: 'Bengaluru Tech Hub', type: 'place', category: 'Karnataka', connections: ['node-isro', 'node-davanagere', 'node-bio'] },
  { id: 'node-davanagere', label: 'Davanagere Agri-Textile Park', type: 'place', category: 'Davanagere', connections: ['node-bengaluru', 'node-cotton'] },
  { id: 'node-cotton', label: 'Smart Cotton & Ultrasonic Probes', type: 'topic', category: 'Agriculture', connections: ['node-davanagere'] },
  { id: 'node-bio', label: 'Karnataka Bio-Compute Fund', type: 'topic', category: 'Karnataka', connections: ['node-bengaluru'] }
];

export const CATEGORIES_LIST = [
  'All',
  'World',
  'India',
  'Karnataka',
  'Davanagere',
  'Politics',
  'Business',
  'Technology',
  'AI',
  'Science',
  'Space',
  'Health',
  'Education',
  'Sports',
  'Entertainment',
  'Environment',
  'Startups',
  'Finance',
  'Security',
  'Automotive',
  'Agriculture',
  'Climate'
] as const;
