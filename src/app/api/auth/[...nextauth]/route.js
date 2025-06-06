import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"

const handler = NextAuth({
     providers: [
        CredentialsProvider({ 
             name: 'credentials',
             credentials: {
                email: { label: "Email", type: "email", placeholder: "your email" },
                password: { label: "Password", type: "password" }
             },
            async authorize(credentials){ 
                // get access token (login)
                const loginRes = await fetch('https://api.escuelajs.co/api/v1/auth/login', {
                    method: 'POST',
                    headers: {"Content-Type": "application/json" },
                    body: JSON.stringify({
                        email: credentials.email,
                        password: credentials.password,
                    })
                });
                
                if (!loginRes.ok) return null;
                const loginData = await loginRes.json();
                console.log("Login data:", loginData);

                if (!loginData.access_token) return null;

                // access token (profile)
                const profileRes = await fetch('https://api.escuelajs.co/api/v1/auth/profile', {
                    method: 'GET',
                    headers: {
                        "Authorization": `Bearer ${loginData.access_token}`,
                        "Content-Type": "application/json"
                    }
                });
                

                if (!profileRes.ok) return null;
                const profile = await profileRes.json();
                console.log("Profile data:", profile);
                
                let userRole = 'customer'; // default
                    
                if (profile.role) {
                    userRole = profile.role;
                    console.log("Role from API:", profile.role); }
                    const user = {
                        id: profile.id?.toString() || 'unknown',
                        email: profile.email || credentials.email,
                        name: profile.name || credentials.email,
                        image: profile.avatar || null,
                        role: userRole, // Make sure this is set correctly
                        accessToken: loginData.access_token
                    };
                    console.log("Returning user object:", user);
                    return user;

            },
        }),
     ],
     session: {
        strategy: "jwt"
     },
     callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.accessToken = user.accessToken;
                token.id = user.id;
                token.name = user.name;
                token.email = user.email;
                token.picture = user.image; 
                token.role = user.role;
            }
            return token; // uses cache
          },
          async session({ session, token }) {
            session.accessToken = token.accessToken;
            session.user = {
                id: token.id,
                email: token.email,
                name: token.name,
                image: token.picture,
                role: token.role,
            };
            return session;
        },
    },
    pages: {
        signIn: "/login" 
    },
});

export { handler as GET, handler as POST }