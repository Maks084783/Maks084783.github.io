// ЛР 3.2: скрипт нагрузочного теста k6 (запуск: k6 run k6-test.js)
import http from 'k6/http';
import { sleep } from 'k6';

export const options = {
  stages: [
    { duration: '1m', target: 10 }, // плавно наращиваем до 10 виртуальных пользователей
    { duration: '2m', target: 10 }, // держим 10 пользователей 2 минуты
    { duration: '1m', target: 0 },  // плавно снижаем до 0
  ],
};

export default function () {
  http.get('https://maks084783-cdn.pages.dev/');
  http.get('https://maks084783-cdn.pages.dev/image.jpg');
  sleep(1);
}
