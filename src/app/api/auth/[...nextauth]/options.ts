import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import connectDB from "@/lib/connectDB";
import UserModel from "@/models/user";
import CredentialsProvider from "next-auth/providers/credentials";
export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        emailOrUsername: {
          label: "Email or Username",
          type: "text",
          placeholder: "you@example.com",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials) return null;

        await connectDB();

        // Find user by email or username
        const user = await UserModel.findOne({
          $or: [
            { email: credentials.emailOrUsername },
            { username: credentials.emailOrUsername },
          ],
        });

        if (!user) {
          throw new Error("No user found with this email/username");
        }

        // Verify password
        const isValid = await user.comparePassword(credentials.password);
        if (!isValid) {
          throw new Error("Invalid password");
        }

        return {
          id: user._id.toString(),
          name: user.name,
          email: user.email,
          provider: "credentials",
        };
      },
    }),

    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
  ],
  pages: {
    signIn: "/user/login",
  },
  callbacks: {
    async signIn({ user, account }) {
      await connectDB();
      const existingUser = await UserModel.findOne({ email: user.email });

      if (!existingUser) {
        // Generate username from Google name
        let generatedUsername =
          user.name?.trim().replace(/\s+/g, "").toLowerCase() || "user";

        generatedUsername = generatedUsername.substring(0, 12);

        let finalUsername = generatedUsername;
        let counter = 1;
        while (await UserModel.findOne({ username: finalUsername })) {
          finalUsername = `${generatedUsername.slice(
            0,
            12 - counter.toString().length
          )}${counter}`;
          counter++;
        }
        await UserModel.create({
          username: finalUsername,
          name: user.name,
          email: user.email,
          image: user.image,
          provider: account?.provider,
        });
      }
      return true;
    },
   
  },
};
