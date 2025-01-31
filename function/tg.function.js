import fetch from 'node-fetch';
import 'dotenv/config'

const token = process.env.BOT_API_KEY;
const botUrl = `https://api.telegram.org/bot${token}`;
const webhookUrl = process.env.WEBHOOK_URL;


async function setWebhook() {
    const URL=`${botUrl}/setWebhook?url=${webhookUrl}/api/v1/admin/tg`
    await fetch(URL);
    console.log('Webhook set .');
}



async function sendMessage(chatId, text) {
    const url = `https://api.telegram.org/bot${token}/sendMessage`;
    const body = JSON.stringify({
      chat_id: chatId,
      text: text,
    });
  
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: body,
    });
    if (!response.ok) {
      console.log('Failed to send message', response);
    }
  }

export {setWebhook,sendMessage}