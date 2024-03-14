import { createClient } from "@/utils/supabase/server";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  // The `/auth/callback` route is required for the server-side auth flow implemented
  // by the SSR package. It exchanges an auth code for the user's session.
  // https://supabase.com/docs/guides/auth/server-side/nextjs
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get("code");
  const origin = requestUrl.origin;

  if (code) {
    const supabase = createClient();
    await supabase.auth.exchangeCodeForSession(code);
  }

  if (code) {
  const supabase = createClient();
  try {
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    if (error) {
      console.error('Error exchanging code for session:', error.message);
      return NextResponse.redirect(`${origin}/error?message=${encodeURIComponent(error.message)}`);
    }
  } catch (error) {
    console.error('Unexpected error:', error);
    return NextResponse.redirect(`${origin}/error`);
  }
}


  // URL to redirect to after sign up process completes
  return NextResponse.redirect(`${origin}/protected`);
}
