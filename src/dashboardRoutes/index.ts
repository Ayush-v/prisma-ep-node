import { Router } from "express";
const router = Router();
import userRoutes from "./users";
import platformRoutes from "./platform";
import courseRoutes from "./course";

router.get("/", (req, res) => {
  res.json({ message: "Hey web DEV" });
});

router.use("/users", userRoutes);
router.use("/platform", platformRoutes);
router.use("/course", courseRoutes);

export default router;
