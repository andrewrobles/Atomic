import express from "express";

const router = express.Router();

// Define a simple ping endpoint
router.get("/", (req, res) => {
  res.status(200).json({ message: "pong" });
});

export default router;
