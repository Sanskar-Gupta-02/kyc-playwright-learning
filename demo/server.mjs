import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
const html = await readFile(new URL('./index.html', import.meta.url));
createServer((req, res) => {
  if (req.url === '/' || req.url === '/index.html') {
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    res.end(html);
  } else {
    res.writeHead(404); res.end('Not found');
  }
}).listen(3000, '127.0.0.1', () => console.log('Learning demo: http://127.0.0.1:3000'));
