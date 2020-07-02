const express = require('express');
const path = require('path');

const { getPassphrase } = require('./lib');

const app = express();

app.get('/generate/:numWords', async (req, res) => {
  try {
    const passphrase = await getPassphrase(req.params.numWords);
    res.json({ success: true, passphrase });
  } catch (error) {
    res.status(500).send('Server Error');
  }
});

// Serve static assets in production
if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static('client/build'));

  app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  );
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
