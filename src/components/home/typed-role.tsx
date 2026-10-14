"use client";

import { useEffect, useState } from "react";

// timing constants in ms
const TYPE_SPEED = 62;
const ERASE_SPEED = 32;
const HOLD_COMPLETE = 2200;
const HOLD_EMPTY = 350;

export function TypedRole({ roles }: { roles: readonly string[] }) {
  const [roleIndex, setRoleIndex] = useState(0);
  const [text, setText] = useState(roles[0] ?? "");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }

    const current = roles[roleIndex % roles.length];
    const done = !deleting && text === current;
    const emptied = deleting && text === "";

    const delay = done
      ? HOLD_COMPLETE
      : emptied
        ? HOLD_EMPTY
        : deleting
          ? ERASE_SPEED
          : TYPE_SPEED;

    const t = setTimeout(() => {
      if (done) setDeleting(true);
      else if (emptied) {
        setDeleting(false);
        setRoleIndex((i) => (i + 1) % roles.length);
      } else {
        setText(
          deleting
            ? current.slice(0, text.length - 1)
            : current.slice(0, text.length + 1)
        );
      }
    }, delay);

    return () => clearTimeout(t);
  }, [text, deleting, roleIndex, roles]);

  const currentRole = roles[roleIndex % roles.length];

  return (
    <p
      aria-label={`Role: ${currentRole}`}
      className="font-mono text-sm text-muted-foreground sm:text-base"
    >
      <span className="text-amber-fg">$</span> whoami{" "}
      <span className="text-amber-fg" aria-hidden>
        ❯
      </span>{" "}
      <span className="text-foreground">
        {text}
        <span className="caret-blink text-amber-fg" aria-hidden>
          ▌
        </span>
      </span>
    </p>
  );
}
