import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { decrypt } from "@/lib/auth";

const protectedRoutes = ["/dashboard", "/mitra"];
const publicRoutes = ["/login", "/mitra/register", "/"];

export default async function middleware(req: NextRequest) {
    const path = req.nextUrl.pathname;
    const isProtectedRoute = protectedRoutes.some(route => path.startsWith(route));
    const isPublicRoute = publicRoutes.includes(path);

    const cookie = req.cookies.get("session")?.value;
    let session = null;
    if (cookie) {
        try {
            session = await decrypt(cookie);
        } catch (e) {
            // invalid session
        }
    }

    // Redirect to login if not authenticated on protected routes
    if (isProtectedRoute && !session) {
        return NextResponse.redirect(new URL("/login", req.nextUrl));
    }

    // Redirect to respective dash if already logged in on login page
    if (isPublicRoute && session && path === "/login") {
        if (session.user.role === 'ADMIN') return NextResponse.redirect(new URL("/dashboard", req.nextUrl));
        if (session.user.role === 'PARTNER') return NextResponse.redirect(new URL("/mitra", req.nextUrl));
        return NextResponse.redirect(new URL("/", req.nextUrl));
    }

    return NextResponse.next();
}

// Routes Middleware should not run on
export const config = {
    matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
