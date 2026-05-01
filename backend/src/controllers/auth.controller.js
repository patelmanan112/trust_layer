const bcrypt = require("bcryptjs");

const { User, ROLES } = require("../models/User");
const { signAccessToken } = require("../utils/tokens");

function sanitizeUser(userDoc) {
  return {
    id: userDoc._id.toString(),
    name: userDoc.name,
    company: userDoc.company,
    email: userDoc.email,
    role: userDoc.role,
    industry: userDoc.industry,
    trustScore: userDoc.trustScore,
    createdAt: userDoc.createdAt,
    updatedAt: userDoc.updatedAt,
  };
}

async function register(req, res, next) {
  try {
    const { name, company, email, password, role, industry } = req.body || {};

    if (!email || !password || !role) {
      const err = new Error("email, password, and role are required");
      err.statusCode = 400;
      throw err;
    }
    if (!ROLES.includes(role)) {
      const err = new Error(`role must be one of: ${ROLES.join(", ")}`);
      err.statusCode = 400;
      throw err;
    }
    if (typeof password !== "string" || password.length < 8) {
      const err = new Error("password must be at least 8 characters");
      err.statusCode = 400;
      throw err;
    }

    const existing = await User.findOne({ email: String(email).toLowerCase().trim() });
    if (existing) {
      const err = new Error("Email already registered");
      err.statusCode = 409;
      throw err;
    }

    const passwordHash = await bcrypt.hash(password, 12);
    const user = await User.create({
      name,
      company,
      email,
      passwordHash,
      role,
      industry,
    });

    const token = signAccessToken({
      sub: user._id.toString(),
      role: user.role,
      email: user.email,
    });

    return res.status(201).json({ token, user: sanitizeUser(user) });
  } catch (e) {
    return next(e);
  }
}

async function login(req, res, next) {
  try {
    const { email, password } = req.body || {};
    if (!email || !password) {
      const err = new Error("email and password are required");
      err.statusCode = 400;
      throw err;
    }

    const user = await User.findOne({ email: String(email).toLowerCase().trim() });
    if (!user) {
      const err = new Error("Invalid credentials");
      err.statusCode = 401;
      throw err;
    }

    const ok = await bcrypt.compare(password, user.passwordHash);
    if (!ok) {
      const err = new Error("Invalid credentials");
      err.statusCode = 401;
      throw err;
    }

    const token = signAccessToken({
      sub: user._id.toString(),
      role: user.role,
      email: user.email,
    });

    return res.json({ token, user: sanitizeUser(user) });
  } catch (e) {
    return next(e);
  }
}

module.exports = { register, login };

