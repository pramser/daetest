import { getAllRuns } from "../services/run_service.ts";

export async function getRuns({ response }: any) {
  response.body = await getAllRuns();
}
