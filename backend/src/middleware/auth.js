const jwt = require("jsonwebtoken");

function requireAuth(req, _res, next) {
  try {
    const header = req.headers.authorization || "";
    const token = header.startsWith("Bearer ") ? header.slice(7) : null;
    if (!token) {
      const err = new Error("Missing Authorization Bearer token");
      err.statusCode = 401;
      throw err;
    }

    const secret = process.env.JWT_SECRET;
    if (!secret) {
      const err = new Error("JWT_SECRET is required");
      err.statusCode = 500;
      throw err;
    }

    const decoded = jwt.verify(token, secret);
    req.user = decoded; // { sub, role, email, ... }
    return next();
  } catch (_e) {
    const err = new Error("Unauthorized");
    err.statusCode = 401;
    return next(err);
  }
}

function requireRole(roles) {
  const allow = Array.isArray(roles) ? roles : [roles];
  return (req, _res, next) => {
    if (!req.user?.role || !allow.includes(req.user.role)) {
      const err = new Error("Forbidden");
      err.statusCode = 403;
      return next(err);
    }
    return next();
  };
}

module.exports = { requireAuth, requireRole };

