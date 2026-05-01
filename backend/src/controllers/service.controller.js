const Service = require("../models/Service");

async function createService(req, res, next) {
  try {
    const { title, description, price, category } = req.body;

    if (req.user.role !== "provider") {
      const err = new Error("Only providers can create services");
      err.statusCode = 403;
      throw err;
    }

    if (!title || !description || price === undefined) {
      const err = new Error("title, description, and price are required");
      err.statusCode = 400;
      throw err;
    }

    const service = await Service.create({
      title,
      description,
      price,
      category,
      providerId: req.user.sub,
    });

    return res.status(201).json({ service });
  } catch (e) {
    return next(e);
  }
}

async function getServices(req, res, next) {
  try {
    const { providerId } = req.query;
    const filter = {};
    if (providerId) {
      filter.providerId = providerId;
    }

    const services = await Service.find(filter).populate("providerId", "name company");
    return res.json({ services });
  } catch (e) {
    return next(e);
  }
}

module.exports = { createService, getServices };
