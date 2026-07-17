import * as Sentry from "@sentry/nextjs";

export async function register() {
  const dsn = process.env.DSN_KEY || process.env.NEXT_PUBLIC_DSN_KEY;
  if (!dsn || !dsn.startsWith("https://")) {
    return;
  }

  if (process.env.NEXT_RUNTIME === "nodejs") {
    Sentry.init({
      dsn,
      tracesSampleRate: 0.01,
    });
  }

  if (process.env.NEXT_RUNTIME === "edge") {
    Sentry.init({
      dsn,
      tracesSampleRate: 0.01,
    });
  }
}

export const onRequestError = Sentry.captureRequestError;
