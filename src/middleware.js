import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(request) {
    const path = request.nextUrl.pathname;
    console.log(`Middleware processing request to: ${path}`);

    // Get the NextAuth JWT token
    const token = await getToken({ 
        req: request, 
        secret: process.env.NEXTAUTH_SECRET 
    });
    
    const isAuthenticated = Boolean(token);
    const userRole = token?.role;
    
    console.log("Authentication status:", isAuthenticated);
    console.log("User role:", userRole);
    console.log("User email:", token?.email);

    // Admin page access
    if (path.startsWith("/admin")) {
        console.log("Admin page access requested...");
        
        if (!isAuthenticated) {
            console.log("Not authenticated - redirecting to login");
            return NextResponse.redirect(new URL("/unauthorized", request.url));
        }
        
        if (userRole !== "admin") {
            console.log(`Non-admin user (${userRole}) trying to access admin - redirecting to unauthorized`);
            return NextResponse.redirect(new URL("/unauthorized", request.url));
        }
        
        console.log("Admin access granted - proceeding to admin page");
        return NextResponse.next();
    }

    // CHECKOUT PAGE ACCESS CONTROL
    if (path.startsWith("/checkout")) {
        console.log("Checkout page access requested...");
        
        if (!isAuthenticated) {
            console.log("Not authenticated - redirecting to login");
            const loginUrl = new URL("/login", request.url);
            loginUrl.searchParams.set("redirect", path);
            return NextResponse.redirect(loginUrl);
        }
        
        console.log(`Authenticated user (${userRole}) accessing checkout - allowing access`);
        return NextResponse.next();
    }

    // Allow all other stuff be accessed
    return NextResponse.next();
}

export const config = {
    matcher: [
        "/admin/:path*",     // All admin routes
        "/checkout/:path*"   // All checkout routes
    ],
};