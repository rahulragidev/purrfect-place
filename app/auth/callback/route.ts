import { createClient } from "@/utils/supabase/server";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
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
  
  return NextResponse.redirect(`${origin}/app`);
}
