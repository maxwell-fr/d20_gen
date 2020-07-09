const express = require('express');
const path = require('path');

const { getPassphrase, getCodedPassphrase } = require('./lib');

const app = express();

app.get('/generate/:phr_sel', async (req, res) => {
  try {
    if(isNaN(req.params.phr_sel)) {
      const passphrase = getCodedPassphrase(req.params.phr_sel);
    }
    else {
      const passphrase = await getPassphrase(req.params.phr_sel);
    }
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
