require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const compression = require('compression');
const rateLimit = require('express-rate-limit');

const userRoutes = require('./routes/user');
const auth = require('./middleware/auth');
const errorHandler = require('./middleware/errorHandler');
const formatResponse = require('./middleware/formatResponse');

const app = express();

// -------------------------
// CORS دینامیک
// -------------------------
const allowedOrigins = process.env.ALLOWED_ORIGINS.split(',');

app.use(cors({
    origin: function (origin, callback) {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    }
}));

// -------------------------
// Helmet برای امنیت
// -------------------------
app.use(helmet());

// -------------------------
// Morgan برای لاگ حرفه‌ای
// -------------------------
app.use(morgan('combined'));

// -------------------------
// Compression
// -------------------------
app.use(compression());

// -------------------------
// Rate Limit
// -------------------------
app.use(rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    message: 'Too many requests'
}));

// -------------------------
app.use(express.json());
app.use(auth);
app.use(formatResponse);

// -------------------------
app.use('/api/users', userRoutes);

// -------------------------
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on ${PORT}`));
