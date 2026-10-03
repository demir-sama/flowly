"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

const EMPTY_STEPS = [
  { key: "research", name: "Research", via: "Orbio web search", status: "queued" },
  { key: "filter", name: "Filter", via: "Orbio onchain read", status: "queued" },
  { key: "analyze", name: "Analyze", via: "Orbio model", status: "queued" },
  { key: "personalize", name: "Personalize", via: "Orbio social read", status: "queued" },
  { key: "organize", name: "Organize", via: "Orbio model", status: "queued" },
  { key: "deliver", name: "Deliver", via: "Flowly deliverable", status: "queued" }
];

function Workspace() {
  const params = useSearchParams();
  const initial = params.get("goal") || "Find 20 potential Web3 clients for my agency";
  const [goal, setGoal] = useState(initial);
  const [running, setRunning] = useState(false);
  const [error, setError] = useState("");
  const [meta, setMeta] = useState(null);
  const [steps, setSteps] = useState(EMPTY_STEPS);
  const [deliverable, setDeliverable] = useState(null);
  const [status, setStatus] = useState(null);

  useEffect(() => {
    fetch("/api/status")
      .then((r) => r.json())
      .then(setStatus)
      .catch(() => {});
  }, []);

  async function run(event) {
    event?.preventDefault();
    setError("");
    setDeliverable(null);
    setMeta(null);
    setSteps(EMPTY_STEPS);
    setRunning(true);
    try {
      const res = await fetch("/api/run", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ goal })
      });
      if (!res.ok || !res.body) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Run failed.");
      }
      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let buffer = "";
      while (true) {
        const { value, done } = await reader.read();
        if (done) break;
        buffer += decoder.decode(value, { stream: true });
        const chunks = buffer.split("\n\n");
        buffer = chunks.pop() || "";
        for (const chunk of chunks) {
          const eventLine = chunk.split("\n").find((l) => l.startsWith("event:"));
          const dataLine = chunk.split("\n").find((l) => l.startsWith("data:"));
          if (!dataLine) continue;
          const type = eventLine ? eventLine.slice(6).trim() : "message";
          const data = JSON.parse(dataLine.slice(5));
          if (type === "meta") {
            setMeta(data);
            setSteps(data.steps);
          } else if (type === "step") {
            setSteps((prev) => prev.map((s) => (s.key === data.key ? { ...s, ...data } : s)));
          } else if (type === "done") {
            setDeliverable(data.deliverable);
            setMeta((m) => (m ? { ...m, engine: data.engine } : m));
          } else if (type === "error") {
            setError(data.message);
          }
        }
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setRunning(false);
    }
  }

  const markdown = useMemo(() => (deliverable ? toMarkdown(goal, deliverable) : ""), [goal, deliverable]);

  function copy() {
    navigator.clipboard.writeText(markdown);
  }

  function download() {
    const blob = new Blob([markdown], { type: "text/markdown" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "flowly-deliverable.md";
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <>
      <nav className="nav">
        <Link href="/" className="brand">
          <span className="mark" aria-hidden>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M1.5 11c2.4-4.6 3.4-4.6 5.8 0s3.4 4.6 5.8 0" stroke="#d6ff4a" strokeWidth="1.6" strokeLinecap="round" />
            </svg>
          </span>
          Flowly
        </Link>
        <div className="nav-links">
          <span className="engine">{status?.orbio?.configured ? "Orbio live" : "Orbio catalogue connected · engine ready"}</span>
          <span className="pill">powered by <strong>Orbio</strong></span>
        </div>
      </nav>
      <main className="workspace">
        <form className="goalbar" onSubmit={run}>
          <textarea value={goal} onChange={(e) => setGoal(e.target.value)} aria-label="Goal" />
          <button className="btn" type="submit" disabled={running}>{running ? "Working" : "Run goal"}</button>
        </form>
        {error ? <p className="error">{error}</p> : null}
        <div className="work">
          <aside className="rail">
            <h2>Workflow</h2>
            {steps.map((step) => (
              <div className="step" key={step.key}>
                <div className="top">
                  <span className="name">{step.name}</span>
                  <span className={`badge ${step.status === "running" ? "run" : ""} ${step.status === "done" ? "done" : ""}`}>
                    {step.status}
                  </span>
                </div>
                <div className="via">{step.via} · {step.tool}</div>
                {step.output ? <p>{step.output}</p> : <p>{step.detail || "Waiting."}</p>}
              </div>
            ))}
          </aside>
          <section className="doc">
            {!deliverable ? (
              <div className="empty">The file lands here when the last step finishes.</div>
            ) : (
              <>
                <h2>Deliverable {meta?.engine === "orbio" ? "· tightened by Orbio" : ""}</h2>
                <div className="title">{deliverable.title}</div>
                <p style={{ color: "var(--muted)", marginTop: 0 }}>{deliverable.summary}</p>
                <div className="stats">
                  {deliverable.stats.map((s) => (
                    <div key={s.label}><strong>{s.value}</strong><span>{s.label}</span></div>
                  ))}
                </div>
                <div className="row-actions">
                  <button className="btn ghost" type="button" onClick={copy}>Copy</button>
                  <button className="btn ghost" type="button" onClick={download}>Download .md</button>
                </div>
                <table>
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Where</th>
                      <th>Priority</th>
                      <th>Why</th>
                    </tr>
                  </thead>
                  <tbody>
                    {deliverable.items.map((item) => (
                      <tr key={item.name + item.handle}>
                        <td>{item.name}</td>
                        <td>{item.handle}</td>
                        <td>{item.priority}</td>
                        <td className="why">{item.why}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <h2>Drafts</h2>
                <div className="drafts">
                  {deliverable.drafts.map((d) => (
                    <article className="draft" key={d.subject}>
                      <strong>{d.to} — {d.subject}</strong>
                      <pre>{d.body}</pre>
                    </article>
                  ))}
                </div>
                <h2>Next</h2>
                <ol className="next-list">
                  {deliverable.next.map((n) => <li key={n}>{n}</li>)}
                </ol>
              </>
            )}
          </section>
        </div>
      </main>
    </>
  );
}

function toMarkdown(goal, d) {
  const rows = d.items.map((i) => `| ${i.name} | ${i.handle} | ${i.priority || ""} | ${i.why} |`).join("\n");
  const drafts = d.drafts.map((draft) => `### ${draft.to} — ${draft.subject}\n\n${draft.body}`).join("\n\n");
  return `# ${d.title}\n\nGoal: ${goal}\n\n${d.summary}\n\n| Name | Where | Priority | Why |\n| --- | --- | --- | --- |\n${rows}\n\n${drafts}\n\n## Next\n\n${d.next.map((n) => `- ${n}`).join("\n")}\n`;
}

export default function WorkspacePage() {
  return (
    <Suspense fallback={<main className="workspace">Loading workspace…</main>}>
      <Workspace />
    </Suspense>
  );
}
