import { orbioAvailable, orbioModels } from "../../../lib/engine";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  const [gate, models] = await Promise.all([orbioAvailable(), orbioModels()]);
  return Response.json({
    product: "Flowly",
    tagline: "From idea to execution.",
    orbio: {
      configured: gate.live,
      note: gate.reason,
      catalogue: models.ok,
      models: models.models
    }
  });
}
