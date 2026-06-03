const express = require('express');
const cors = require('cors');
const app = express();
app.use(express.json());
app.use(cors());

// Enable CORS for all routes
app.post('/sum', (req, res) => {
  const { a, b } = req.body || {} || req.query || {};
  const sum = parseInt(a) + parseInt(b);
  res.json({ sum });
});
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});