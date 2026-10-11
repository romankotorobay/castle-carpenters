"use client";

import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from "react";

type TurnstileApi = {
  render: (
    element: HTMLElement,
    options: {
      sitekey: string;
      theme?: "light" | "dark" | "auto";
      appearance?: "always" | "execute" | "interaction-only";
      callback: (token: string) => void;
      "error-callback"?: () => void;
      "expired-callback"?: () => void;
    },
  ) => string;
  reset: (widgetId?: string) => void;
  remove: (widgetId?: string) => void;
};

declare global {
  interface Window {
    turnstile?: TurnstileApi;
  }
}

export type TurnstileFieldHandle = {
  reset: () => void;
};

type TurnstileFieldProps = {
  onToken: (token: string) => void;
};

function loadTurnstileScript() {
  if (window.turnstile) return Promise.resolve();

  return new Promise<void>((resolve, reject) => {
    const existing = document.querySelector<HTMLScriptElement>(
      'script[src*="challenges.cloudflare.com/turnstile"]',
    );
    if (existing) {
      existing.addEventListener("load", () => resolve(), { once: true });
      existing.addEventListener("error", () => reject(new Error("Turnstile failed to load")), { once: true });
      return;
    }

    const script = document.createElement("script");
    script.src = "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";
    script.async = true;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error("Turnstile failed to load"));
    document.head.appendChild(script);
  });
}

const TurnstileField = forwardRef<TurnstileFieldHandle, TurnstileFieldProps>(function TurnstileField(
  { onToken },
  ref,
) {
  const containerRef = useRef<HTMLDivElement>(null);
  const widgetIdRef = useRef<string | null>(null);
  const onTokenRef = useRef(onToken);
  const [status, setStatus] = useState("");
  onTokenRef.current = onToken;

  useImperativeHandle(ref, () => ({
    reset() {
      if (widgetIdRef.current && window.turnstile) {
        window.turnstile.reset(widgetIdRef.current);
      }
      onTokenRef.current("");
    },
  }));

  useEffect(() => {
    let cancelled = false;

    async function mount() {
      const response = await fetch("/api/contact");
      const data = (await response.json().catch(() => null)) as { siteKey?: string } | null;
      if (cancelled) return;
      if (!response.ok || !data?.siteKey || !containerRef.current) {
        setStatus("The security check is not available yet.");
        return;
      }

      await loadTurnstileScript();
      if (cancelled || !containerRef.current || !window.turnstile) return;

      widgetIdRef.current = window.turnstile.render(containerRef.current, {
        sitekey: data.siteKey,
        theme: "light",
        appearance: "interaction-only",
        callback: (token) => onTokenRef.current(token),
        "error-callback": () => onTokenRef.current(""),
        "expired-callback": () => onTokenRef.current(""),
      });
    }

    mount().catch(() => {
      if (!cancelled) setStatus("The security check could not be loaded.");
      onTokenRef.current("");
    });

    return () => {
      cancelled = true;
      if (widgetIdRef.current && window.turnstile) {
        window.turnstile.remove(widgetIdRef.current);
        widgetIdRef.current = null;
      }
    };
  }, []);

  return (
    <div className="space-y-2">
      <div ref={containerRef} />
      {status ? <p className="font-sans text-sm text-brand-primary">{status}</p> : null}
    </div>
  );
});

export default TurnstileField;
