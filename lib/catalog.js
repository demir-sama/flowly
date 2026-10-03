export const PROTOCOLS = [
  { name: "Jupiter", handle: "@JupiterExchange", chain: "Solana", kind: "DEX aggregator", signal: "Always shipping product drops. Needs creator explainers more than banner ads.", fit: 96 },
  { name: "Phantom", handle: "@phantom", chain: "Solana", kind: "Wallet", signal: "Consumer brand. Short clips that show a tap, not a whitepaper.", fit: 94 },
  { name: "Kamino", handle: "@KaminoFinance", chain: "Solana", kind: "Lending / vaults", signal: "Yield is hard to explain. Visual walkthroughs convert better than threads.", fit: 91 },
  { name: "Drift", handle: "@DriftProtocol", chain: "Solana", kind: "Perps", signal: "Trader audience. Clip the setup, not the logo.", fit: 90 },
  { name: "Helium", handle: "@helium", chain: "Solana", kind: "DePIN", signal: "Real-world story. Hardware unboxings and city maps outperform price talk.", fit: 88 },
  { name: "Jito", handle: "@jito_sol", chain: "Solana", kind: "MEV / staking", signal: "Technical buyers. Need a plain-language series, not more dashboards.", fit: 87 },
  { name: "Sanctum", handle: "@sanctumso", chain: "Solana", kind: "LST", signal: "Crowded category. Differentiation lives in creator voice.", fit: 86 },
  { name: "Tensor", handle: "@tensor_hq", chain: "Solana", kind: "NFT marketplace", signal: "Culture product. Memes and trader clips move volume.", fit: 85 },
  { name: "Magic Eden", handle: "@MagicEden", chain: "Multi", kind: "Marketplace", signal: "Already spends on culture. Agency work is additive, not a cold start.", fit: 84 },
  { name: "Pyth", handle: "@PythNetwork", chain: "Multi", kind: "Oracle", signal: "Infra is invisible. Needs a 'why your trade used this' series.", fit: 83 },
  { name: "Wormhole", handle: "@wormhole", chain: "Multi", kind: "Bridge", signal: "Trust is the product. Founder clips and incident explainers.", fit: 82 },
  { name: "LayerZero", handle: "@LayerZero_Labs", chain: "Multi", kind: "Messaging", signal: "Dev-first brand. Short build-in-public clips for app teams.", fit: 82 },
  { name: "Ethena", handle: "@ethena_labs", chain: "Ethereum", kind: "Synthetic dollar", signal: "Narrative is the moat. Needs calm explainers when the timeline is loud.", fit: 89 },
  { name: "Pendle", handle: "@pendle_fi", chain: "Ethereum", kind: "Yield trading", signal: "Power users already get it. Top-of-funnel is the gap.", fit: 86 },
  { name: "EigenLayer", handle: "@eigenlayer", chain: "Ethereum", kind: "Restaking", signal: "Complex mechanism. One visual metaphor per feature.", fit: 84 },
  { name: "Hyperliquid", handle: "@HyperliquidX", chain: "L1", kind: "Perps L1", signal: "Cult following. Native creators outperform paid banners.", fit: 93 },
  { name: "Polymarket", handle: "@Polymarket", chain: "Polygon", kind: "Prediction", signal: "News cycle is the content calendar. Speed matters.", fit: 92 },
  { name: "Base", handle: "@base", chain: "L2", kind: "L2", signal: "Consumer onboarding. Mini-apps and creator collabs are the motion.", fit: 90 },
  { name: "Farcaster", handle: "@farcaster_xyz", chain: "Social", kind: "Social protocol", signal: "Already a creator network. Clips that pull people onchain.", fit: 88 },
  { name: "Zora", handle: "@zora", chain: "Ethereum", kind: "Onchain media", signal: "The product is the post. Needs editors, not media buyers.", fit: 87 },
  { name: "Berachain", handle: "@berachain", chain: "L1", kind: "L1", signal: "Meme-native. Agency has to match the voice or it dies.", fit: 86 },
  { name: "Monad", handle: "@monad_xyz", chain: "L1", kind: "L1", signal: "Pre and post launch content gap. Technical + culture split.", fit: 85 },
  { name: "Abstract", handle: "@AbstractChain", chain: "L2", kind: "Consumer L2", signal: "Portal product. Short 'I opened the app' clips.", fit: 84 },
  { name: "Raydium", handle: "@RaydiumProtocol", chain: "Solana", kind: "AMM", signal: "LP education is underserved. Series beats one-off posts.", fit: 80 },
  { name: "Marinade", handle: "@MarinadeFinance", chain: "Solana", kind: "Staking", signal: "Quiet brand. Room for a creator who can make staking feel obvious.", fit: 78 },
  { name: "Aevo", handle: "@aevoxyz", chain: "Ethereum", kind: "Options / perps", signal: "Options are a content desert. First clear series wins.", fit: 81 },
  { name: "Scroll", handle: "@Scroll_ZKP", chain: "L2", kind: "zk L2", signal: "Builder grants plus thin consumer story.", fit: 76 },
  { name: "Celestia", handle: "@CelestiaOrg", chain: "Modular", kind: "DA", signal: "Modular stack needs a visual. Founders already post; clips lag.", fit: 79 },
  { name: "World", handle: "@worldcoin", chain: "Ethereum", kind: "Identity", signal: "High scrutiny. Tone has to be precise. Agency fit is narrow and valuable.", fit: 77 },
  { name: "Pump.fun", handle: "@pumpdotfun", chain: "Solana", kind: "Launchpad", signal: "Attention is the business. Clippers are the distribution.", fit: 95 }
];

export const LAUNCH_BEATS = [
  { day: "Day 0", name: "Lock the line", detail: "One sentence the product can repeat. Kill every extra claim." },
  { day: "Day 1", name: "Seed the proof", detail: "Three clips: the problem, the tap, the result. No logo open." },
  { day: "Day 2", name: "Founder cut", detail: "60 seconds, unscripted, answering the objection people actually have." },
  { day: "Day 3", name: "List the rooms", detail: "Ten accounts that already talk to the buyer. Draft, don't spray." },
  { day: "Day 4", name: "Ship the artifact", detail: "A one-page brief, a thread, and a short the same afternoon." },
  { day: "Day 5", name: "Reply loop", detail: "Answer every real comment. Quote the best ones. Ignore the bait." },
  { day: "Day 6", name: "Cut the winner", detail: "Take the post that moved and make three variants." },
  { day: "Day 7", name: "Hand off", detail: "A folder: clips, captions, who replied, what to do Monday." }
];

export const ROLES = [
  { role: "Community mod", where: "Discord + X", note: "Night coverage, tone match, escalation rules written down." },
  { role: "Clip editor", where: "Short-form", note: "Turns AMAs and spaces into 20-second cuts the same day." },
  { role: "Alpha caller", where: "Telegram / X", note: "Posts the setup, not the slogan. Track record visible." },
  { role: "Community manager", where: "Owned channels", note: "Calendar, replies, weekly read on what the room actually asked." }
];
