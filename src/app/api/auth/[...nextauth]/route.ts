// app/api/auth/[...nextauth]/route.ts
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { query } from "../../../../utils/db";
import bcrypt, { compare } from "bcrypt";

export const authOptions = {
  session: {
    strategy: "jwt",
  },

  pages: {
    signIn: "/login",
  },

  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {},
        password: {},
      },
      async authorize(credentials, req) {
        console.log(`credentials`, credentials);
        console.log("This ran")
        const response = await query(
          `SELECT * FROM users WHERE email=$1`,
          [credentials?.email]
        );
        const user = response.rows[0];
        console.log(`user`, user);
        if (!user) {
          throw new Error("No user found");
        }
        const passwordCorrect = await compare(
          credentials?.password || "",
          user.password
        );
        console.log("credentials", credentials);
        
        if (passwordCorrect) {
          console.log("Correct password");
          return {
            id: user.id,
            email: user.email,
            role: user.role,
          };
        } else {
          console.log("Incorrect password");
          return null;
        }
      },
    }),
    // Providers.Credentials({
    //   async authorize(credentials) {
    //     const { email, password } = credentials;

    //     const result = await query('SELECT * FROM Users WHERE email = $1', [email]);
    //     const user = result.rows[0];

    //     if (user && bcrypt.compareSync(password, user.password)) {
    //       return { id: user.id, email: user.email, role: user.role };
    //     } else {
    //       throw new Error('Invalid email or password');
    //     }
    //   },
    // }),
  ],
  callbacks: {
    async session(session, user) {
      session.user.id = user.id;
      session.user.role = user.role;
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};
const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };