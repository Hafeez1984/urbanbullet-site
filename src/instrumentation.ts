import * as Sentry from "@sentry/nextjs";

export async function register() {
  if (process.env.NEXT_RUNTIME === "nodejs") {
    Sentry.init({
      dsn: process.env.DSN_KEY || process.env.NEXT_PUBLIC_DSN_KEY,
      tracesSampleRate: 0.01,
    });
  }

  if (process.env.NEXT_RUNTIME === "edge") {
    Sentry.init({
      dsn: process.env.DSN_KEY || process.env.NEXT_PUBLIC_DSN_KEY,
      tracesSampleRate: 0.01,
    });
  }
}

export const onRequestError = Sentry.captureRequestError;
