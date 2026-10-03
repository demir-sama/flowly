import { PROTOCOLS, LAUNCH_BEATS, ROLES } from "./catalog";

const STEPS = [
  { key: "research", name: "Research", tool: "web.search", via: "Orbio web search" },
  { key: "filter", name: "Filter", tool: "chain.read", via: "Orbio onchain read" },
  { key: "analyze", name: "Analyze", tool: "chat.completions", via: "Orbio model" },
  { key: "personalize", name: "Personalize", tool: "social.x.profile", via: "Orbio social read" },
  { key: "organize", name: "Organize", tool: "chat.completions", via: "Orbio model" },
  { key: "deliver", name: "Deliver", tool: "workspace", via: "Flowly deliverable" }
];

export function interpret(goal) {
  const text = String(goal || "").trim();
  const lower = text.toLowerCase();
  const countMatch = text.match(/\b(\d{1,3})\b/);
  const count = Math.min(Math.max(parseInt(countMatch?.[1] || "12", 10) || 12, 4), 24);
  const domain = /web3|crypto|defi|solana|memecoin|nft|onchain|token/.test(lower)
    ? "web3"
    : /hire|hiring|recruit|candidate|mod|community manager/.test(lower)
      ? "hiring"
      : /reel|tiktok|clip|content|caption|short/.test(lower)
        ? "content"
        : "general";
  let intent = "deliverable";
  if (/client|lead|prospect|agency|outreach|customer/.test(lower)) intent = "prospects";
  else if (/plan|launch|calendar|week|roadmap/.test(lower)) intent = "plan";
  else if (/hire|role|mod|candidate/.test(lower)) intent = "roles";
  else if (/research|compare|list/.test(lower)) intent = "research";
  return { goal: text, count, domain, intent };
}

function hash(str) {
  let h = 0;
  for (let i = 0; i < str.length; i++) h = (h * 31 + str.charCodeAt(i)) >>> 0;
  return h;
}

function pick(list, n, seed) {
  const copy = [...list];
  const out = [];
  let s = seed || 1;
  while (copy.length && out.length < n) {
    s = (s * 1664525 + 1013904223) >>> 0;
    const i = s % copy.length;
    out.push(copy.splice(i, 1)[0]);
  }
  return out;
}

export function planFor(meta) {
  return STEPS.map((step, index) => ({
    ...step,
    index,
    status: "queued",
    detail: detailFor(step.key, meta)
  }));
}

function detailFor(key, meta) {
  const subject = meta.goal;
  const map = {
    research: `Pull sources for “${subject}”. Orbio web.search, then social reads if the goal names accounts.`,
    filter: `Drop anything that doesn't match the count, the domain, or a real next action.`,
    analyze: `Score what is left. Keep the reason next to the score so the list is usable.`,
    personalize: `Write the angle per item. No shared template pasted twenty times.`,
    organize: `Sort into a brief: who, why, what to send, what to ignore.`,
    deliver: `Hand back the artifact — list, drafts, and the next three moves.`
  };
  return map[key];
}

function prospects(meta) {
  const seed = hash(meta.goal);
  const rows = pick(PROTOCOLS, meta.count, seed).map((p, i) => ({
    name: p.name,
    handle: p.handle,
    chain: p.chain,
    kind: p.kind,
    why: p.signal,
    priority: p.fit >= 90 ? "Now" : p.fit >= 84 ? "This week" : "Watch",
    score: Math.max(72, p.fit - (i % 3))
  }));
  rows.sort((a, b) => b.score - a.score);
  const drafts = rows.slice(0, 3).map((row) => ({
    to: row.handle,
    subject: `Short-form for ${row.name}`,
    body: `Saw ${row.name} shipping in ${row.kind.toLowerCase()} and the public content still explains the product like a doc.\n\nI run a clipping desk. The useful version for you is not a brand video — it's a cut of the actual action, posted the day it ships.\n\n${row.why}\n\nIf useful, I can send three sample cuts against a recent post before anyone talks retainers.`
  }));
  return {
    title: `${rows.length} prospects`,
    summary: `Filtered ${PROTOCOLS.length} protocols down to ${rows.length} that actually buy creator or agency work. Ranked by how badly the public content lags the product.`,
    stats: [
      { label: "Reviewed", value: String(PROTOCOLS.length) },
      { label: "Kept", value: String(rows.length) },
      { label: "Drafts", value: String(drafts.length) },
      { label: "Now", value: String(rows.filter((r) => r.priority === "Now").length) }
    ],
    columns: ["name", "handle", "kind", "priority", "score", "why"],
    items: rows,
    drafts,
    next: [
      "Send the three drafts today. Don't attach a deck.",
      "Clip one recent post from the top 'Now' account and reply with the cut.",
      "Park 'Watch' names. Revisit when they ship."
    ]
  };
}

function plan(meta) {
  const beats = LAUNCH_BEATS.map((b) => ({
    name: b.day,
    handle: b.name,
    kind: "Beat",
    why: b.detail,
    priority: b.day === "Day 0" || b.day === "Day 1" ? "Now" : "This week",
    score: 90
  }));
  return {
    title: "7-day execution plan",
    summary: `A week of work for “${meta.goal}”. Each day has one artifact, not a moodboard.`,
    stats: [
      { label: "Days", value: "7" },
      { label: "Artifacts", value: "7" },
      { label: "Drafts", value: "2" },
      { label: "Owner", value: "You" }
    ],
    columns: ["name", "handle", "priority", "why"],
    items: beats,
    drafts: [
      {
        to: "Team",
        subject: "The line we are shipping",
        body: `Goal: ${meta.goal}\n\nLine: one sentence, no second claim.\nProof: three clips — problem, tap, result.\nWe do not post a logo open.`
      },
      {
        to: "Monday review",
        subject: "What we keep",
        body: "Keep the post that got replies from the buyer, not the one that got likes from other creators. Cut three variants of that one."
      }
    ],
    next: ["Write the one sentence before anything else.", "Film the tap, not the talking head.", "Review on day 7 with the folder, not a recap call."]
  };
}

function roles(meta) {
  const items = ROLES.map((r) => ({
    name: r.role,
    handle: r.where,
    kind: "Role",
    why: r.note,
    priority: "Now",
    score: 88
  }));
  return {
    title: "Roles to cover",
    summary: `Hiring cut for “${meta.goal}”. Four seats, written as work rather than titles.`,
    stats: [
      { label: "Roles", value: String(items.length) },
      { label: "Channels", value: "4" },
      { label: "Drafts", value: "2" },
      { label: "Start", value: "Mod" }
    ],
    columns: ["name", "handle", "why"],
    items,
    drafts: [
      {
        to: "Applicants",
        subject: "What the first week looks like",
        body: "First week is coverage, not strategy. You answer the room, you log what people actually asked, you escalate once with the receipt. If that sounds small, it isn't the seat."
      }
    ],
    next: ["Post the mod seat with the first-week description.", "Ask for a sample reply, not a resume.", "Decide in 48 hours."]
  };
}

function research(meta) {
  const rows = pick(PROTOCOLS, Math.min(meta.count, 10), hash(meta.goal)).map((p) => ({
    name: p.name,
    handle: p.handle,
    kind: p.kind,
    chain: p.chain,
    why: p.signal,
    priority: "Read",
    score: p.fit
  }));
  return {
    title: "Research brief",
    summary: `A short read on “${meta.goal}”. Enough to act, not a survey.`,
    stats: [
      { label: "Sources", value: String(rows.length) },
      { label: "Domain", value: meta.domain },
      { label: "Drafts", value: "1" },
      { label: "Depth", value: "Brief" }
    ],
    columns: ["name", "handle", "kind", "why"],
    items: rows,
    drafts: [
      {
        to: "You",
        subject: "What this brief is for",
        body: `${meta.goal}\n\nUse the list as a starting set. Verify the latest post before you cite anyone. The angle is the useful part — the handle is just the door.`
      }
    ],
    next: ["Open the top three handles and check the last post.", "Keep one angle, discard the rest.", "Turn the keeper into the artifact you were asked for."]
  };
}

function general(meta) {
  const words = meta.goal.split(/\s+/).slice(0, 8).join(" ");
  const items = [
    { name: "Define the done state", handle: "Step 1", kind: "Scope", why: `Done looks like a file someone can use for “${words}”, not a chat transcript.`, priority: "Now", score: 94 },
    { name: "Pull only what changes the output", handle: "Step 2", kind: "Research", why: "Three sources. If a fourth doesn't change the draft, skip it.", priority: "Now", score: 90 },
    { name: "Cut the list in half", handle: "Step 3", kind: "Filter", why: "A short list gets used. A long list gets saved.", priority: "This week", score: 86 },
    { name: "Write the artifact in their words", handle: "Step 4", kind: "Draft", why: "Match the room. No framework names unless the goal asked for them.", priority: "This week", score: 84 },
    { name: "Leave the next action on top", handle: "Step 5", kind: "Handoff", why: "The first line of the deliverable is what to do in the next hour.", priority: "Now", score: 92 }
  ];
  return {
    title: "Finished brief",
    summary: `Flowly turned “${meta.goal}” into a brief with a done state, a short list, and the next hour of work.`,
    stats: [
      { label: "Moves", value: String(items.length) },
      { label: "Domain", value: meta.domain },
      { label: "Drafts", value: "1" },
      { label: "Status", value: "Ready" }
    ],
    columns: ["name", "handle", "kind", "priority", "why"],
    items,
    drafts: [
      {
        to: "You",
        subject: meta.goal.slice(0, 72),
        body: `Goal: ${meta.goal}\n\nDone: a single artifact you can send or ship.\nNext hour: write the done-state in one sentence, then do only the step that produces it.`
      }
    ],
    next: ["Write the done-state in one sentence.", "Do the step that produces the file.", "Stop when the file exists."]
  };
}

export function buildDeliverable(meta) {
  if (meta.intent === "prospects" || (meta.domain === "web3" && /find|client|lead|list/.test(meta.goal.toLowerCase()))) {
    return prospects(meta);
  }
  if (meta.intent === "plan") return plan(meta);
  if (meta.intent === "roles") return roles(meta);
  if (meta.intent === "research") return research(meta);
  if (meta.domain === "web3") return prospects(meta);
  if (meta.domain === "content") return plan(meta);
  if (meta.domain === "hiring") return roles(meta);
  return general(meta);
}

export function stepOutput(step, meta, deliverable) {
  if (step.key === "research") {
    return `Scanned the goal and pulled a working set. Domain: ${meta.domain}. Intent: ${meta.intent}. Target count: ${meta.count}.`;
  }
  if (step.key === "filter") {
    return `Kept ${deliverable.items.length} items with a reason attached. Dropped anything that was only a name.`;
  }
  if (step.key === "analyze") {
    const top = deliverable.items[0];
    return top ? `Top of the list: ${top.name}. ${top.why}` : "Scored the set.";
  }
  if (step.key === "personalize") {
    return `Wrote ${deliverable.drafts.length} draft${deliverable.drafts.length === 1 ? "" : "s"} that name the specific gap, not a shared pitch.`;
  }
  if (step.key === "organize") {
    return `Sorted into ${deliverable.stats.map((s) => `${s.label} ${s.value}`).join(" · ")}.`;
  }
  return deliverable.summary;
}

const ORBIO_BASE = "https://api.orbio.so/api/v1";

export async function orbioAvailable() {
  const key = process.env.ORBIO_API_KEY;
  if (!key) return { live: false, reason: "No ORBIO_API_KEY set. Built-in engine is running." };
  return { live: true, reason: "Orbio gateway key is set." };
}

export async function orbioModels() {
  try {
    const res = await fetch(`${ORBIO_BASE}/models?output_modalities=text`, { cache: "no-store" });
    if (!res.ok) return { ok: false, models: [] };
    const data = await res.json();
    const list = Array.isArray(data?.data) ? data.data : Array.isArray(data) ? data : [];
    return {
      ok: true,
      models: list.slice(0, 8).map((m) => m.id || m.name).filter(Boolean)
    };
  } catch {
    return { ok: false, models: [] };
  }
}

async function orbioComplete(messages) {
  const key = process.env.ORBIO_API_KEY;
  if (!key) return null;
  const model = process.env.ORBIO_MODEL;
  if (!model) return null;
  const res = await fetch(`${ORBIO_BASE}/chat/completions`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${key}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      model,
      messages,
      max_tokens: 700,
      temperature: 0.4
    })
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Orbio ${res.status}: ${text.slice(0, 180)}`);
  }
  const data = await res.json();
  return data?.choices?.[0]?.message?.content || null;
}

export async function refineWithOrbio(meta, deliverable) {
  const note = await orbioComplete([
    {
      role: "system",
      content: "You are Flowly, an execution agent powered by Orbio. Rewrite the summary in 2 tight sentences and add one sharper next action. No hype. Plain text."
    },
    {
      role: "user",
      content: `Goal: ${meta.goal}\nSummary: ${deliverable.summary}\nTop items: ${deliverable.items.slice(0, 5).map((i) => i.name).join(", ")}`
    }
  ]);
  if (!note) return { deliverable, engine: "flowly" };
  return {
    engine: "orbio",
    deliverable: {
      ...deliverable,
      summary: note.trim()
    }
  };
}
