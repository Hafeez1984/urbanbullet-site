import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_DSN_KEY,
  tracesSampleRate: 0.01,
  integrations: (integrations) => {
    return integrations.filter((integration) => integration.name !== "BrowserSession");
  },
});
