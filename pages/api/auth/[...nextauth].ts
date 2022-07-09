import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";

export default NextAuth({
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "credentials",
      credentials: {
        email: { label: "email", type: "text" },
        password: { label: "password", type: "password" },
      },
      async authorize(credentials) {
        const res = await fetch("http://localhost:3000/api/user/signInDB", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: credentials?.email,
            password: credentials?.password,
          }),
        });

        const userRes = await res.json();

        const user = {
          _id: userRes.user._id,
          name: userRes.user.name,
          email: userRes.user.email,
          cards: userRes.user.cards,
        };

        // if user found, return user. Actual user is wrapped inside an object and must be accessed.
        if (res.ok && user !== null) {
          return user;
        }
        // Return null if user data could not be retrieved
        return null;
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.cards = user.cards;
      }
      return token;
    },
    async session({ session, token }) {
      session.user = token;
      return session;
    },
    async redirect({ baseUrl, url }) {
      return url.startsWith(baseUrl) ? baseUrl : url;
    },
  },
  session: {
    // Set to jwt in order for CredentialsProvider to work properly
    strategy: "jwt",
  },
  pages: {
    signIn: "/auth/signin",
  },
});
