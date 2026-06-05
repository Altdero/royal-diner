import { swaggerSpec } from "@/src/lib/swagger";

export function GET() {
  return Response.json(swaggerSpec);
}
