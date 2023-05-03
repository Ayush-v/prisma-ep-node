import { Router } from "express";
const router = Router();
import { prisma } from "../prisma";

router.get("/", (_, res) => {
  res.json({ message: "Hey admin" });
});

router.get("/allUsers", async (_, res) => {
  try {
    const users = await prisma.dashBoardUser.findMany();
    res.json({ message: "Hey admin", users });
  } catch (error) {
    res.status(401).json(error);
  }
});

export default router;
