const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');

const app = express();
const PORT = 3000;
const JWT_SECRET = 'pink-gaming-secret-2026';

app.use(cors());
app.use(express.json());

// Login
app.post('/api/auth/login', (req, res) => {
  const { id, pseudo } = req.body;
  if (!id || !pseudo) {
    return res.status(400).json({ message: "ID et pseudo requis" });
  }
  const token = jwt.sign({ userId: id, pseudo }, JWT_SECRET, { expiresIn: '24h' });
  res.json({ token });
});

// Créer commande
app.post('/api/orders', (req, res) => {
  const { userId, packId } = req.body;
  const orderId = 'CMD' + Math.floor(100000 + Math.random() * 900000);
  res.json({
    orderId: orderId,
    status: 'pending'
  });
});

// Lancer paiement
app.post('/api/payment/pay', (req, res) => {
  const { orderId, method } = req.body;
  res.json({
    message: `Paiement lancé avec ${method}`,
    status: 'processing'
  });
});

// Vérifier statut
app.get('/api/orders/:orderId', (req, res) => {
  const { orderId } = req.params;
  const statuses = ['pending', 'processing', 'delivered'];
  const status = statuses[Math.floor(Math.random() * statuses.length)];

  res.json({
    orderId: orderId,
    status: status
  });
});

app.listen(PORT, () => {
  console.log(`Backend PINK GAMING démarré sur http://localhost:${PORT}`);
});