import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  env: {
    JIRA_CLIENT_ID: process.env.JIRA_CLIENT_ID,
    JIRA_CLIENT_SECRET: process.env.JIRA_CLIENT_SECRET,
  },
  sassOptions: {
    quietDeps: true, // Option zum Stummschalten der Sass-Ausgaben
  },
};

export default nextConfig;
