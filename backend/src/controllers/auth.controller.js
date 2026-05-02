const bcrypt = require("bcryptjs");
const { OAuth2Client } = require("google-auth-library");

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
    if (!user || !user.passwordHash) {
      console.error(`❌ Login failed: User not found or missing password hash for ${email}`);
      const err = new Error("Invalid credentials");
      err.statusCode = 401;
      throw err;
    }

    // Defensive check to prevent "Illegal arguments: string, undefined"
    const ok = await bcrypt.compare(String(password), String(user.passwordHash));
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
    console.error("❌ Auth Error:", e.message);
    return next(e);
  }
}

async function googleLogin(req, res, next) {
  try {
    const { token } = req.body || {};
    if (!token) {
      const err = new Error("Google token is required");
      err.statusCode = 400;
      throw err;
    }

    const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();
    const { email, name, picture, sub: googleId } = payload;

    let user = await User.findOne({ email: email.toLowerCase() });

    if (!user) {
      // Create new user if they don't exist
      user = await User.create({
        name,
        email: email.toLowerCase(),
        passwordHash: await bcrypt.hash(Math.random().toString(36), 12), // Random password
        role: req.body.role || "client", 
        googleId,
        avatar: picture,
      });
      console.log(`✅ New user created via Google: ${email} as ${user.role}`);
    }

    const jwtToken = signAccessToken({
      sub: user._id.toString(),
      role: user.role,
      email: user.email,
    });

    return res.json({ token: jwtToken, user: sanitizeUser(user) });
  } catch (e) {
    console.error("❌ Google Auth Error:", e.message);
    return next(e);
  }
}

module.exports = { register, login, googleLogin };

