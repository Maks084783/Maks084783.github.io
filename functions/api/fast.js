// ЛР 3.3: тот же динамический ответ, но без задержки (для сравнения)
export async function onRequest(ctx) {
  return Response.json({
    current_time: new Date().toISOString(),
    data: 'Динамический ответ без задержки',
    edge_colo: (ctx.request.cf || {}).colo
  }, { headers: { 'Cache-Control': 'no-store' } });
}
