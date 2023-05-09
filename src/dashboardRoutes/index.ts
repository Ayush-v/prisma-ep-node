import { Router } from "express";
const router = Router();
import userRoutes from "./users";
import platformRoutes from "./platform";
import courseRoutes from "./course";
import moduleRoutes from "./module";

router.get("/", (req, res) => {
  res.json({ message: "Hey web DEV" });
});

router.use("/users", userRoutes);
router.use("/platform", platformRoutes);
router.use("/course", courseRoutes);
router.use("/module", moduleRoutes);

export default router;
