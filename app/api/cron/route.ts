export async function GET() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/health`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${process.env.CRON_SECRET}`, // optional security
      },
    });

    const data = await res.text();

    return new Response(JSON.stringify({ success: true, data }), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ success: false, error: String(error) }), { status: 500 });
  }
}
