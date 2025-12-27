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
app.use('/api/luxmall-infra', require('./routes/yop.cjs'));
app.use('/api/luxmall-infra', require('./routes/support-agent.cjs'));
app.use('/api/luxmall-staff', require('./routes/applet.cjs'));
app.use('/api/luxmall-staff', require('./routes/auth.cjs'));
app.use('/api/luxmall-staff', require('./routes/staff-info.cjs'));
app.use('/api/luxmall-staff', require('./routes/memberRealname.cjs'));
app.use('/api/luxmall-product', require('./routes/product.cjs'));
app.use('/api/luxmall-product', require('./routes/public-price.cjs'));
app.use('/api/luxmall-operation', require('./routes/operation.cjs'));
app.use('/api/luxmall-org', require('./routes/org.cjs'));
app.use('/api/luxmall-settlement', require('./routes/settlement.cjs'));
app.use('/api/luxmall-invoice', require('./routes/invoice.cjs'));
app.use('/api/luxmall-contract', require('./routes/contract.cjs'));

app.listen(port, () => {
  console.log(`Mock server is running on port ${port}`);
});
