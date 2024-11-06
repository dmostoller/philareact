import NextAuth, { DefaultSession } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import { NextAuthOptions } from 'next-auth';
import prisma from '../../../../lib/prisma';

declare module 'next-auth' {
  interface Session {
    user: {
      id: string;
      role: string;
    } & DefaultSession['user'];
  }
}

const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.sub!;
        const adminEmails = process.env.ADMIN_EMAILS?.split(',') ?? [];
        session.user.role = adminEmails.includes(session.user.email!) ? 'ADMIN' : 'USER';
      }
      return session;
    },
    async signIn({ user }) {
      if (!user?.email) return false;

      // Create the user if they don't exist
      await prisma.user.upsert({
        where: { id: user.id },
        update: { name: user.name },
        create: {
          id: user.id,
          email: user.email,
          name: user.name,
        },
      });

      return true;
    },
  },
  pages: {
    signIn: '/auth/signin',
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
