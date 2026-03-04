const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.get('/api/hello', (req, res) => {
  res.json({
    message: 'Hello from the server!',
    timestamp: new Date(),
    confetti: true,
  });
});

app.get('/api/confetti', (req, res) => {
  res.json({
    colors: ['#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A', '#98D8C8'],
    particles: 100,
    duration: 3000,
  });
});

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'OK', app: 'hello-world-confetti' });
});

// Error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`📡 API available at http://localhost:${PORT}/api/hello`);
});
