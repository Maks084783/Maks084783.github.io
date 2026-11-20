// ЛР 3.2: логирование каждого запроса (аналог Cloudflare Logs для pages.dev)
export async function onRequest(ctx) {
  const t0 = Date.now();
  const res = await ctx.next();
  const cf = ctx.request.cf || {};
  const url = new URL(ctx.request.url);
  console.log(JSON.stringify({
    ClientRequestURI: url.pathname,
    ClientRequestMethod: ctx.request.method,
    ClientCountry: cf.country,
    EdgeColo: cf.colo,
    ClientHttpProtocol: cf.httpProtocol,
    EdgeResponseStatus: res.status,
    EdgeTimeMs: Date.now() - t0,
    UserAgent: (ctx.request.headers.get('user-agent') || '').slice(0, 60)
  }));
  const out = new Response(res.body, res);
  out.headers.set('x-edge-colo', cf.colo || '');
  out.headers.set('x-client-country', cf.country || '');
  out.headers.set('x-edge-time-ms', String(Date.now() - t0));
  out.headers.set('Timing-Allow-Origin', '*');
  return out;
}
