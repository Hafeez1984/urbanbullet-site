import * as Sentry from "@sentry/nextjs";

const dsn = process.env.NEXT_PUBLIC_DSN_KEY;

if (dsn && dsn.startsWith("https://")) {
  Sentry.init({
    dsn,
    tracesSampleRate: 0.01,
    integrations: (integrations) => {
      return integrations.filter((integration) => integration.name !== "BrowserSession");
    },
  });
}
