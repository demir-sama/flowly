import { interpret, planFor, buildDeliverable, stepOutput, refineWithOrbio, orbioAvailable } from "../../../lib/engine";

export const runtime = "nodejs";
export const maxDuration = 60;

export async function POST(req) {
  let body;
  try {
    body = await req.json();
  } catch {
    return Response.json({ error: "Send a JSON body with a goal." }, { status: 400 });
  }
  const goal = String(body.goal || "").trim();
  if (goal.length < 4) {
    return Response.json({ error: "Give Flowly a goal — at least a short sentence." }, { status: 400 });
  }
  if (goal.length > 600) {
    return Response.json({ error: "Keep the goal under 600 characters." }, { status: 400 });
  }

  const encoder = new TextEncoder();
  const stream = new ReadableStream({
    async start(controller) {
      const send = (event, data) => {
        controller.enqueue(encoder.encode(`event: ${event}\ndata: ${JSON.stringify(data)}\n\n`));
      };
      try {
        const meta = interpret(goal);
        const steps = planFor(meta);
        const gate = await orbioAvailable();
        send("meta", {
          id: `run_${Date.now().toString(36)}`,
          goal,
          domain: meta.domain,
          intent: meta.intent,
          engine: gate.live ? "orbio" : "flowly",
          engineNote: gate.reason,
          steps: steps.map(({ key, name, tool, via, detail }) => ({ key, name, tool, via, detail, status: "queued" }))
        });

        const deliverable = buildDeliverable(meta);
        for (const step of steps) {
          send("step", { key: step.key, status: "running" });
          await wait(step.key === "deliver" ? 280 : 420);
          send("step", {
            key: step.key,
            status: "done",
            output: stepOutput(step, meta, deliverable)
          });
        }

        let final = deliverable;
        let engine = "flowly";
        if (gate.live && process.env.ORBIO_MODEL) {
          send("step", { key: "deliver", status: "running", output: "Asking Orbio to tighten the brief." });
          try {
            const refined = await refineWithOrbio(meta, deliverable);
            final = refined.deliverable;
            engine = refined.engine;
          } catch (err) {
            send("note", { message: err.message });
          }
        }

        send("done", { engine, deliverable: final });
      } catch (err) {
        send("error", { message: err.message || "Run failed." });
      } finally {
        controller.close();
      }
    }
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream; charset=utf-8",
      "Cache-Control": "no-cache, no-transform",
      Connection: "keep-alive"
    }
  });
}

function wait(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
