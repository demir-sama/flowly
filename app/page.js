import Link from "next/link";

const STEPS = [
  ["Research", "web.search"],
  ["Filter", "chain.read"],
  ["Analyze", "model"],
  ["Personalize", "social.x"],
  ["Organize", "model"],
  ["Deliver", "artifact"]
];

export default function HomePage() {
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
          <a className="hide" href="#how">How it works</a>
          <a className="hide" href="#orbio">Orbio</a>
          <Link href="/workspace">Workspace</Link>
          <span className="pill">powered by <strong>Orbio</strong></span>
        </div>
      </nav>

      <section className="hero">
        <div>
          <div className="kicker">AI that gets the work done</div>
          <h1>From idea to execution.</h1>
          <p className="lede">
            Give Flowly a goal. It figures out the steps, calls the right Orbio tools, and hands you finished work — not a chat.
          </p>
          <form className="composer" action="/workspace" method="get">
            <input
              name="goal"
              placeholder="Find 20 potential Web3 clients for my agency"
              aria-label="Goal"
              defaultValue="Find 20 potential Web3 clients for my agency"
            />
            <button className="btn" type="submit">Run it</button>
          </form>
          <div className="chips">
            <Link className="chip" href="/workspace?goal=Draft%20a%207-day%20launch%20plan%20for%20a%20memecoin">7-day launch plan</Link>
            <Link className="chip" href="/workspace?goal=Research%2010%20Solana%20protocols%20that%20need%20a%20clipping%20desk">Solana clipping desk</Link>
            <Link className="chip" href="/workspace?goal=Write%20the%20first-week%20brief%20for%20a%20community%20mod%20hire">Mod hire brief</Link>
          </div>
        </div>
        <aside className="run-card" aria-label="Example run">
          <header>
            <span>Example run</span>
            <span>6 steps</span>
          </header>
          <p style={{ margin: "0 0 8px", fontSize: 15 }}>Find 20 potential Web3 clients for my agency.</p>
          {STEPS.map(([name, tool], i) => (
            <div className="step-row" key={name}>
              <span className={i < 5 ? "dot on" : "dot"} />
              <span>{name}</span>
              <span className="tool">{tool}</span>
            </div>
          ))}
        </aside>
      </section>

      <div className="band">
        <div><strong>1 goal</strong><span>You say what done looks like.</span></div>
        <div><strong>6 steps</strong><span>Research through deliver. No extra theater.</span></div>
        <div><strong>1 key</strong><span>Orbio models, search, social, chain.</span></div>
        <div><strong>1 file</strong><span>A list, drafts, and the next move.</span></div>
      </div>

      <section className="section" id="how">
        <h2>Work that moves itself.</h2>
        <p className="sub">Flowly is the workspace. Orbio is the infrastructure — reasoning, tools, and the meter.</p>
        <div className="grid-3">
          <article className="card">
            <em>01</em>
            <h3>Tell it the goal</h3>
            <p>A sentence is enough. “Find 20 Web3 clients.” “Plan the launch week.” “Brief a mod hire.”</p>
          </article>
          <article className="card">
            <em>02</em>
            <h3>It picks the tools</h3>
            <p>Search, filter, score, personalize. Each step maps to an Orbio tool — web.search, social reads, chain.read, a model.</p>
          </article>
          <article className="card">
            <em>03</em>
            <h3>You get the work</h3>
            <p>A ranked list, outreach that names the gap, and three next actions. Copy it or download it.</p>
          </article>
        </div>
      </section>

      <section className="section" id="orbio" style={{ paddingTop: 0 }}>
        <div className="split">
          <div>
            <div className="kicker">Orbio integration</div>
            <h2>The meter behind the work.</h2>
            <p className="sub">
              Flowly does not invent a second model stack. Planning and tool calls go through the Orbio gateway — one key, models plus web, social, and onchain reads, metered in CREDIT.
            </p>
            <Link className="btn" href="/workspace">Open the workspace</Link>
          </div>
          <div className="paper">
            <h3>Goal in. File out.</h3>
            <p>The original creator-outreach job, expanded.</p>
            <ol>
              <li>Research the field with web.search.</li>
              <li>Filter to accounts that actually buy the work.</li>
              <li>Analyze the gap between product and content.</li>
              <li>Personalize three drafts. No shared paste.</li>
              <li>Organize the rest as Now / This week / Watch.</li>
              <li>Deliver the list.</li>
            </ol>
          </div>
        </div>
      </section>

      <footer className="site">
        <span>Flowly · from idea to execution</span>
        <span>Built on Orbio · @orbiodotso</span>
      </footer>
    </>
  );
}
