export default function handler(req, res) {
    const { name, address, cardNumber, phone } = req.body;
    // Here, you would process the payment information.
    res.status(200).json({ message: 'Checkout successful' });
  }
  