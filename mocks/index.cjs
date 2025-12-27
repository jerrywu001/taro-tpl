const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3003;

// Middleware
app.use(cors());
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));

// Routes
app.use('/api/luxmall-infra', require('./routes/files.cjs'));
app.use('/api/luxmall-infra', require('./routes/upload.cjs'));
app.use('/api/luxmall-staff', require('./routes/applet.cjs'));
app.use('/api/luxmall-staff', require('./routes/auth.cjs'));

app.listen(port, () => {
  console.log(`Mock server is running on port ${port}`);
});
