require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const compression = require('compression');
const rateLimit = require('express-rate-limit');

const userRoutes = require('./routes/user');
const { auth } = require('./middleware/auth');
const { formatResponse } = require('./middleware/formatResponse');
const { errorHandler } = require('./middleware/errorHandler');

const app = express();

// Middleware پایه
app.use(express.json());
app.use(express.static('public'));
app.use(helmet());
app.use(compression());
app.use(morgan('combined'));

// CORS داینامیک
const allowedOrigins = process.env.ALLOWED_ORIGINS.split(',');
app.use(cors({
  origin: function(origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) callback(null, true);
    else callback(new Error('Not allowed by CORS'));
  }
}));

// Rate Limit
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 دقیقه
  max: 100,
  message: { success: false, error: { message: 'Too many requests', status: 429 } }
});
app.use(limiter);

// Routes
app.use('/api/users', auth, userRoutes);

// Middleware خروجی و خطا
app.use(formatResponse);
app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
