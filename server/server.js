const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const dotenv = require('dotenv');
const path = require('path');
const fs = require('fs');

dotenv.config();

// Ensure uploads directory exists
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
  console.log('✅ Uploads directory created');
}

const app = express();

// Trust proxy for Render / Vercel
app.set('trust proxy', 1);

// Middleware
app.use(cors({
  origin: [
    process.env.ADMIN_URL
  ].filter(Boolean), // prevents undefined issues
  credentials: true
}));

app.use(helmet());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 300,
  standardHeaders: true,
  legacyHeaders: false,
  message: { message: 'Too many requests, please try again later.' }
});

const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10,
  standardHeaders: true,
  legacyHeaders: false,
  message: { message: 'Too many login attempts, please try again later.' }
});

app.use('/api', apiLimiter);
app.use('/api/auth/login', loginLimiter);

// Serve static files
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// MongoDB connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(async () => {
    console.log('MongoDB connected');

    // Auto-seed admin user if enabled and doesn't exist
    if (process.env.SEED_ADMIN === 'true') {
      try {
        const User = require('./models/User');
        const bcrypt = require('bcryptjs');

        const existingAdmin = await User.findOne({ role: 'admin' });
        if (!existingAdmin) {
          const hashedPassword = await bcrypt.hash(
            process.env.ADMIN_PASSWORD || 'admin123',
            10
          );

          const adminUser = new User({
            username: process.env.ADMIN_USERNAME || 'admin',
            email: process.env.ADMIN_EMAIL || 'admin@manavseva.com',
            password: hashedPassword,
            role: 'admin'
          });

          await adminUser.save();
          console.log('✅ Admin user auto-seeded successfully');
          console.log('Email:', adminUser.email);
          console.log('⚠️  Remember to set SEED_ADMIN=false after first deployment');
        } else {
          console.log('ℹ️  Admin user already exists, skipping auto-seed');
        }
      } catch (error) {
        console.error('❌ Error auto-seeding admin:', error);
      }
    }
  })
  .catch(err => {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  });

// Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/child-marriage-cases', require('./routes/childMarriageCaseRoutes'));
app.use('/api/users', require('./routes/userRoutes.js'));
app.use('/api/seed-distributions', require('./routes/seedDistributionRoutes'));



// Error handler (keep LAST)
app.use((err, req, res, next) => {
  console.error('Server error:', err);
  res.status(err.status || 500).json({
    message: err.message || 'Internal Server Error'
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`Server running on port ${PORT}`)
);
