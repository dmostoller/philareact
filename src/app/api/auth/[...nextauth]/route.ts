import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import { NextAuthOptions } from 'next-auth';

export const authOptions: NextAuthOptions = {
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
    async session({ session, token, user }) {
      session.user.id = token.sub;
      return session;
    },
    async redirect({ url, baseUrl }) {
      return baseUrl; // Redirect to homepage after sign-in
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
