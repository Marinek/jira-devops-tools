import NextAuth from 'next-auth';
import { Session } from 'next-auth';

const JiraProvider = {
  id: "jira",
  name: "JIRA",
  type: "oauth",
  version: "2.0",
  scope: "write:jira-work read:jira-work read:jira-user read:me",
  params: { grant_type: "authorization_code" },
  accessTokenUrl: "https://localhost:8443/oauth/token",
  authorizationUrl: "https://localhost:8443/oauth/authorize?response_type=code",
  profileUrl: "https://localhost:8443/rest/api/2/myself",
  profile: (profile) => {
    return {
      id: profile.accountId,
      name: profile.displayName,
      email: profile.emailAddress,
    };
  },
  clientId: "92aafb9ca874121a046aab8d31fd1531",
  clientSecret: "bf92b7297fdc537e9659b022d75fc8a924bf82b5c9b9ccae264f29e01085274f",
};

declare module 'next-auth' {
  interface Session {
    jira: {
      accessToken: string;
      user: string;
    };
  }
}

export default NextAuth({
  providers: [
    JiraProvider,
  ],
  debug: true,
  callbacks: {
    async jwt({ token, account }) {
      if (account) {
        token.accessToken = account.access_token;
      }
      return token;
    },
    async session({ session, token }) {
      session.jira = {
        accessToken: token.accessToken,
        user: token.name,
      };
      return session;
    },
  },
});