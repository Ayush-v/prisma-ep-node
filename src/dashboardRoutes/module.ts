import { Router } from "express";
const router = Router();
import { prisma } from "../prisma";

router.get("/:platformName/:courseName/modules", async (req, res) => {
  const { platformName, courseName } = req.params;

  try {
    // Find the Course object based on both the name and platformName parameters
    const course = await prisma.course.findFirst({
      where: {
        AND: [{ name: courseName }, { platformName: platformName }],
      },
    });

    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    // Retrieve the Modules related to the Course object based on its courseId
    const modules = await prisma.modules.findMany({
      where: {
        courseId: course.id,
      },
    });

    return res.status(200).json(modules);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

router.post("/:platformName/:courseName/create-module", async (req, res) => {
  const { platformName, courseName } = req.params;
  const { name, image, active, layoutType } = req.body;

  try {
    // Find the Course object based on both the name and platformName parameters
    const course = await prisma.course.findFirst({
      where: {
        AND: [{ name: courseName }, { platformName: platformName }],
        // name: courseName,
        // platformName: platformName,
      },
    });

    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    // Create a new Module object and link it to the Course object
    const newModule = await prisma.modules.create({
      data: {
        name,
        image,
        active,
        layoutType,
        course: {
          connect: {
            id: course.id,
          },
        },
      },
    });

    return res.status(200).json(newModule);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

export default router;
