import express, { Application, NextFunction, Request, Response } from "express";
import { Prisma } from "@prisma/client";
import dotenv from "dotenv";
import morgan from "morgan";
const app: Application = express();

import { default as dashboardRoutes } from "./dashboardRoutes";
import { default as mobileApi } from "./mobileRoutes";

dotenv.config();
app.use(express.json());
app.use(morgan("dev"));

const PORT = process.env.PORT || "8080";

app.use("/api", dashboardRoutes);
app.use("/mobileApi", mobileApi);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof Prisma.PrismaClientKnownRequestError) {
    // Handle known Prisma errors
    if (err.code === "P2002") {
      res.json("There is a unique constraint violation");
      console.log("There is a unique constraint violation");
    }
  } else {
    // Handle other errors
    res.status(500).json({ message: "Something went wrong." });
  }
});

app.use("*", (req, res) => {
  res.status(404).send(`${req.originalUrl} not found on this *server*`);
});

app.listen(PORT, () => {
  console.log(`Server Running at ${PORT} 🚀`);
});
