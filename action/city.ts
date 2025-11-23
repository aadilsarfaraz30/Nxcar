"use server";

import { serverFetch } from "@/utils/lib/api-server";

export async function getCities() {
  return await serverFetch("/test-avail-cities", {
    method: "GET",
    // body: JSON.stringify(payload)
  });
}
