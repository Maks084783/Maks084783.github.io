// ЛР 3.3: запрос с edge-сервера Cloudflare к Origin (GitHub Pages) по сети Cloudflare
export async function onRequest(ctx) {
  const t0 = Date.now();
  const r = await fetch('https://maks084783.github.io/?nocache=' + t0, { cf: { cacheTtl: 0 } });
  const body = await r.text();
  return Response.json({
    origin: 'https://maks084783.github.io/',
    origin_status: r.status,
    edge_to_origin_ms: Date.now() - t0,
    bytes: body.length,
    edge_colo: (ctx.request.cf || {}).colo
  }, { headers: { 'Cache-Control': 'no-store' } });
}
