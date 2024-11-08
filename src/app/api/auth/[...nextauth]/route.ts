import NextAuth, { DefaultSession } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github";
import { NextAuthOptions } from "next-auth";
import prisma from "../../../../lib/prisma";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      role: string;
    } & DefaultSession["user"];
  }
}

const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!
    }),
    GithubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!
    })
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.sub!;
        const adminEmails = process.env.ADMIN_EMAILS?.split(",") ?? [];
        session.user.role = adminEmails.includes(session.user.email!) ? "ADMIN" : "USER";
      }
      return session;
    },
    async jwt({ token, account }) {
      if (account) {
        token.sub = account.providerAccountId;
      }
      return token;
    },
    async signIn({ user, account }) {
      if (!user?.email || !account?.providerAccountId) {
        return false;
      }

      await prisma.user.upsert({
        where: { email: user.email },
        update: {
          name: user.name,
          id: account.providerAccountId
        },
        create: {
          id: account.providerAccountId,
          email: user.email,
          name: user.name
        }
      });

      return true;
    }
  },
  pages: {
    signIn: "/auth/signin"
  }
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
