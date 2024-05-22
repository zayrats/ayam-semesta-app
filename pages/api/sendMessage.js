const twilio = require('twilio');

const accountSid = 'ACa16aed0212477b1b2f33071be39abb39';
const authToken = 'c8aa81c907ceb1d3028e62133ef9876e'; // Auth Token Anda yang disimpan di variabel lingkungan
const client = twilio(accountSid, authToken);

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { phoneNumber, message } = req.body;

    try {
      const twilioResponse = await client.messages.create({
        body: message,
        from: 'whatsapp:+14155238886', // Nomor WhatsApp Twilio Anda
        to: `whatsapp:${phoneNumber}`
      });
      res.status(200).json({ success: true, sid: twilioResponse.sid });
    } catch (error) {
      console.error('Error sending WhatsApp message:', error);
      res.status(500).json({ success: false, error: error.message });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
