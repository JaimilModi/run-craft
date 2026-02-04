import { AuthConfig } from "convex/server";

export default {
  providers: [
    {
      domain: "https://musical-scorpion-3.clerk.accounts.dev/",
      applicationID: "convex",
    },
  ],
} satisfies AuthConfig;
