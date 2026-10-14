"use client";

import { useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4">
      <div className="w-full max-w-md rounded-xl border border-border bg-card p-8 font-mono">
        <p className="text-sm text-muted-foreground">
          <span className="text-amber-fg">$</span> run portfolio --production
        </p>
        <p className="mt-2 text-sm text-chart-3">
          ✗ unhandled exception{" "}
          {error.digest ? `(${error.digest.slice(0, 8)})` : ""}
        </p>
        <h1 className="mt-6 text-2xl font-semibold tracking-tight">
          Something crashed
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          It&apos;s not you, it&apos;s my code. Try again — or head back home.
        </p>
        <div className="mt-6 flex gap-3">
          <Button onClick={reset} className="font-mono text-sm">
            retry
          </Button>
          <Button asChild variant="outline" className="font-mono text-sm">
            <Link href="/">cd ~</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
