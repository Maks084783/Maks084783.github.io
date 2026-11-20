// ЛР 3.3: «медленный» динамический API — имитация обработки 1 секунду
export async function onRequest(ctx) {
  const started = Date.now();
  await new Promise(r => setTimeout(r, 1000)); // задержка 1 секунда
  return Response.json({
    current_time: new Date().toISOString(),
    data: 'Это динамический ответ с задержкой',
    processing_ms: Date.now() - started,
    edge_colo: (ctx.request.cf || {}).colo
  }, { headers: { 'Cache-Control': 'no-store' } });
}
