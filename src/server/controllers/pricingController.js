// src/server/controllers/pricingController.js
import Pricing from "../models/Pricing.js";

/**
 * Create a new pricing entry for the authenticated tutor
 * POST /api/tutor/pricing
 * Body: { subject, batchType, fee, notes? }
 */
export const createPricing = async (req, res) => {
  try {
    const tutorId = req.user.id;
    const { subject, batchType, fee, notes } = req.body;

    // Basic validation
    if (!subject || !batchType || !fee) {
      return res.status(400).json({ message: "subject, batchType and fee are required" });
    }
    if (!["Weekly", "Monthly"].includes(batchType)) {
      return res.status(400).json({ message: "batchType must be 'Weekly' or 'Monthly'" });
    }

    const pricing = await Pricing.create({
      tutor: tutorId,
      subject,
      batchType,
      fee,
      notes,
    });

    return res.status(201).json({ message: "Pricing created", pricing });
  } catch (err) {
    console.error("createPricing error:", err);
    return res.status(500).json({ message: "Server error" });
  }
};

/**
 * Get pricing entries for authenticated tutor
 * GET /api/tutor/pricing
 */
export const getMyPricing = async (req, res) => {
  try {
    const tutorId = req.user.id;
    const items = await Pricing.find({ tutor: tutorId }).sort({ createdAt: -1 });
    return res.json({ pricing: items });
  } catch (err) {
    console.error("getMyPricing error:", err);
    return res.status(500).json({ message: "Server error" });
  }
};

/**
 * Update a pricing entry belonging to this tutor
 * PUT /api/tutor/pricing/:id
 */
export const updatePricing = async (req, res) => {
  try {
    const tutorId = req.user.id;
    const { id } = req.params;

    const pricing = await Pricing.findById(id);
    if (!pricing) return res.status(404).json({ message: "Pricing not found" });
    if (pricing.tutor.toString() !== tutorId)
      return res.status(403).json({ message: "You cannot edit this item" });

    const { subject, batchType, fee, notes, active } = req.body;
    if (subject !== undefined) pricing.subject = subject;
    if (batchType !== undefined) pricing.batchType = batchType;
    if (fee !== undefined) pricing.fee = fee;
    if (notes !== undefined) pricing.notes = notes;
    if (active !== undefined) pricing.active = active;

    await pricing.save();
    return res.json({ message: "Pricing updated", pricing });
  } catch (err) {
    console.error("updatePricing error:", err);
    return res.status(500).json({ message: "Server error" });
  }
};

/**
 * Delete a pricing entry (soft-delete could be done by active=false)
 * DELETE /api/tutor/pricing/:id
 */
export const deletePricing = async (req, res) => {
  try {
    const tutorId = req.user.id;
    const { id } = req.params;

    const pricing = await Pricing.findById(id);
    if (!pricing) return res.status(404).json({ message: "Pricing not found" });
    if (pricing.tutor.toString() !== tutorId)
      return res.status(403).json({ message: "You cannot delete this item" });

    await pricing.deleteOne();
    return res.json({ message: "Pricing deleted" });
  } catch (err) {
    console.error("deletePricing error:", err);
    return res.status(500).json({ message: "Server error" });
  }
};
