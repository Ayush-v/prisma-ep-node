import { Router } from "express";
const router = Router();

router.get("/", (req, res) => {
  res.json({ message: "Hey mobile DEV" });
});

export default router;
