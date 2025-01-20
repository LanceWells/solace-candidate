"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import AdvocateTable from "./_components/advocateTable";

const queryClient = new QueryClient();

export default function Home() {
  return (
    <main className="grid grid-rows-[max-content_max-content]">
      <h1 className="p-4 text-xl bg-base-300">Solace Advocates</h1>
      <QueryClientProvider client={queryClient}>
        <AdvocateTable />
      </QueryClientProvider>
    </main>
  );
}
