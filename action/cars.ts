"use server";

import { serverFetch } from "@/utils/lib/api-server";

export async function getCars(payload: any) {
  return await serverFetch("/test-cars-list", {
    method: "POST",
    body: JSON.stringify(payload)
  });
}
