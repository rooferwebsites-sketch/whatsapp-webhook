const express = require('express');
const app = express();
app.use(express.json());

const VERIFY_TOKEN = 'brightflow123';
const N8N_WEBHOOK = 'https://tradies.app.n8n.cloud/webhook/ba6b9e67-a57d-42db-aabd-7bb459cd7442';
app.get('/webhook', (req, res) => {
  const mode = req.query['hub.mode'];
  const token = req.query['hub.verify_token'];
  const challenge = req.query['hub.challenge'];
  if (mode === 'subscribe' && token === VERIFY_TOKEN) {
    res.status(200).send(challenge);
  } else {
    res.sendStatus(403);
  }
});

app.post('/webhook', async (req, res) => {
  res.sendStatus(200);
  try {
    await fetch(N8N_WEBHOOK, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(req.body)
    });
  } catch (e) {
    console.error('Forward error:', e);
  }
});

setInterval(() => {
  fetch('https://whatsapp-webhook-kblp.onrender.com/webhook')
    .catch(() => {});
}, 14 * 60 * 1000);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log('Server running on port', PORT));
