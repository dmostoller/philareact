import NextAuth, { DefaultSession } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import { NextAuthOptions } from 'next-auth';

// Extend the Session type to include user id
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
  pages: {
    signIn: '/auth/signin', // Custom sign-in page
  },
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.sub ?? '';
        const adminEmails = process.env.ADMIN_EMAILS?.split(',') ?? [];
        session.user.role = adminEmails.includes(session.user.email!) ? 'ADMIN' : 'USER';
      }
      return session;
    },
    async redirect({ baseUrl }) {
      return baseUrl; // Redirect to homepage after sign-in
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };