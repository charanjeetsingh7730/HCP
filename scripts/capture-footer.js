const { spawn } = require('child_process');
const fs = require('fs');
const http = require('http');

async function testFooter() {
  const chrome = spawn('C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe', [
    '--headless=new',
    '--remote-debugging-port=9444',
    '--user-data-dir=C:\\temp\\footer_test_' + Date.now(),
    '--disable-gpu',
    '--window-size=1280,1000',
    'http://localhost:3030'
  ]);
  await new Promise(r => setTimeout(r, 2500));
  try {
    const list = await new Promise((res, rej) => {
      http.get('http://127.0.0.1:9444/json', r => {
        let d = ''; r.on('data', c => d += c); r.on('end', () => res(JSON.parse(d)));
      }).on('error', rej);
    });
    const target = list.find(t => t.type === 'page');
    const ws = new WebSocket(target.webSocketDebuggerUrl);
    await new Promise(r => ws.onopen = r);
    let id = 1;
    function send(m, p = {}) {
      return new Promise(r => {
        const reqId = id++;
        const onM = e => {
          const msg = JSON.parse(e.data);
          if (msg.id === reqId) { ws.removeEventListener('message', onM); r(msg.result); }
        };
        ws.addEventListener('message', onM);
        ws.send(JSON.stringify({ id: reqId, method: m, params: p }));
      });
    }

    await send('Runtime.evaluate', {
      expression: `
        window.scrollTo(0, document.body.scrollHeight);
      `
    });
    await new Promise(r => setTimeout(r, 1500));

    const shot = await send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync('footer_current.png', Buffer.from(shot.data, 'base64'));
    console.log('Saved footer_current.png');
    ws.close();
  } finally {
    chrome.kill();
  }
}
testFooter().catch(console.error);
