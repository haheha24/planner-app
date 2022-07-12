import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import bcrypt from "bcrypt";
import User from "../../../models/user";
import { mongoConnect } from "./../../../middleware";
import clientPromise from "../../../utility/mongodb";

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
        try {
          //lookup DB email
          mongoConnect();
          const getUser = await User.findOne(
            {
              email: credentials!.email,
            },
            "name email cards image password"
          );
          if (getUser == null || !getUser.password) {
            return null;
          }

          //Compare credential password to DB password
          const comparePassword = await bcrypt.compare(
            credentials!.password,
            getUser.password
          );

          // if password match, return user object with insensitive data.
          if (comparePassword) {
            const user = {
              name: getUser.name,
              email: getUser.email,
              image: getUser.image || null,
              cards: getUser.cards || [],
            };
            return user;
          }
          // Return null if user data could not be retrieved
          return null;
        } catch (error) {
          console.log(error);
          return null;
        }
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
  adapter: MongoDBAdapter(clientPromise),
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
    strategy: "jwt",
  },
  pages: {
    signIn: "/auth/signin",
  },
});
