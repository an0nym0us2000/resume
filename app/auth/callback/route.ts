import { createClient } from '@/lib/supabase/server';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get('code');
  const plan = requestUrl.searchParams.get('plan');

  if (code) {
    const supabase = await createClient();
    await supabase.auth.exchangeCodeForSession(code);
  }

  // Redirect to dashboard or checkout if plan is specified
  if (plan && plan !== 'free') {
    return NextResponse.redirect(
      new URL(`/checkout?plan=${plan}`, requestUrl.origin)
    );
  }

  return NextResponse.redirect(new URL('/dashboard', requestUrl.origin));
}
