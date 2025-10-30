import 'dotenv/config';
import express from 'express';
import { connectDb } from './config/db.js';
import User from './domains/users/models.js';
import bcrypt from 'bcryptjs';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// GET /users - list users (exclude password)
app.get('/users', async (req, res) => {
  try {
    const users = await User.find({}, { password: 0 });
    return res.status(200).json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    return res.status(500).json({ message: 'Error fetching users' });
  }
});

// POST /users - create a new user (hash password)
app.post('/users', async (req, res) => {
  try {
    // Debug: log headers and body to help diagnose 400 Bad Request
    console.log('POST /users - Headers:', req.headers);
    console.log('POST /users - Body:', req.body);

    const { name, email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        error: 'Validation Error',
        message: 'Email e senha são obrigatórios',
        fields: {
          email: !email ? 'Email é obrigatório' : null,
          password: !password ? 'Senha é obrigatória' : null,
        },
      });
    }

    // check duplicate
    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(409).json({ message: 'Email already registered' });
    }

    // hash password
    const saltRounds = 10;
    const hashed = bcrypt.hashSync(password, saltRounds);

    const newUserDoc = await User.create({ name, email, password: hashed });

    // don't return password
    const { password: _pw, ...userSafe } = newUserDoc.toObject();
    return res.status(200).json(userSafe);
  } catch (error) {
    console.error('Error creating user:', error);
    return res.status(500).json({ message: 'Error creating user' });
  }
});

// POST /users/debug - create user and return id, name and the plain password (for testing only)
app.post('/users/debug', async (req, res) => {
  try {
    let { name, email, password } = req.body;

    if (!email) {
      return res.status(400).json({ message: 'email is required' });
    }

    // generate a password if not provided (8 chars)
    const plainPassword = password || Math.random().toString(36).slice(-8);

    // check duplicate
    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(409).json({ message: 'Email already registered' });
    }

    const saltRounds = 10;
    const hashed = bcrypt.hashSync(plainPassword, saltRounds);

    const newUserDoc = await User.create({
      name: name || email.split('@')[0],
      email,
      password: hashed,
    });

    return res.status(200).json({
      id: newUserDoc._id,
      name: newUserDoc.name,
      password: plainPassword,
    });
  } catch (error) {
    console.error('Error creating debug user:', error);
    return res.status(500).json({ message: 'Error creating debug user' });
  }
});

// POST /users/login - authenticate user using hashed password
app.post('/users/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log('POST /users/login - Body:', req.body);

    if (!email || !password) {
      return res.status(400).json({
        error: 'Validation Error',
        message: 'Email e senha são obrigatórios',
      });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({
        error: 'Authentication Error',
        message: 'Email ou senha incorretos',
      });
    }

    const match = bcrypt.compareSync(password, user.password);
    if (!match) {
      return res.status(401).json({
        error: 'Authentication Error',
        message: 'Email ou senha incorretos',
      });
    }

    // successful login - return user info (no password)
    const { password: _pw, ...userSafe } = user.toObject();
    return res
      .status(200)
      .json({ message: 'Login successful', user: userSafe });
  } catch (error) {
    console.error('Error during login:', error);
    return res.status(500).json({ message: 'Error during login' });
  }
});

// Start server after connecting to DB
connectDb()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('Failed to start server due to DB connection error', err);
    process.exit(1);
  });
