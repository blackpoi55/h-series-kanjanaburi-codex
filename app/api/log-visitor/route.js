export async function POST(req) {
    const ip = req.headers.get('x-forwarded-for') || req.ip || 'ไม่ทราบ IP';
    const body = await req.json();
  
    console.log('📥 LOG ผู้เข้าชมแบบละเอียด');
    console.log('IP:', ip);
    console.dir(body, { depth: null });
  
    // TODO: เก็บลง DB ที่นี่ เช่น MongoDB, Supabase, Firebase
  
    return new Response(JSON.stringify({ status: 'ok' }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  }