import { Router } from "express";
const router = Router();
import { prisma } from "../prisma";
import { Prisma } from "@prisma/client";

router.get("/", async (_, res) => {
  const allPlatforms = await prisma.platform.findMany({
    include: {
      courseTypes: true,
    },
  });

  res.json({ message: "All Platforms", data: allPlatforms });
});

router
  .route("/edit/:id")
  .get(async (req, res) => {
    const { id } = req.params;

    const platformData = await prisma.platform.findUnique({
      where: {
        id,
      },
      include: {
        courseTypes: true,
      },
    });

    res.json({ data: platformData });
  })
  .put(async (req, res) => {
    const { id } = req.params;

    const { label, name, subTitle, active, image, courseTypes } = req.body;

    const updatedPlatformData = await prisma.platform.update({
      where: {
        id,
      },
      data: {
        label,
        name,
        subTitle,
        active,
        image,
        courseTypes: {
          updateMany: courseTypes.map(
            (courseType: Prisma.CourseTypeCountAggregateOutputType) => ({
              where: { id: courseType.id },
              data: {
                index: courseType.index,
                type: courseType.type,
                active: courseType.active,
              },
            })
          ),
        },
      },
      include: {
        courseTypes: true,
      },
    });
    res.json({ data: updatedPlatformData });
  });

router.delete("/delete/:id", async (req, res) => {
  const { id } = req.params;

  const deletePlatform = await prisma.platform.delete({
    where: {
      id,
    },
  });

  res.json({ message: "success", data: deletePlatform });
});

router.post("/create", async (req, res) => {
  const { label, name, subTitle, courseTypes } = req.body;

  const platform = await prisma.platform
    .create({
      include: { courseTypes: true },
      data: {
        label,
        name,
        subTitle,
        courseTypes: {
          createMany: {
            data: courseTypes,
          },
        },
      },
    })
    .then((data) => {
      res.json(data);
    })
    .catch((error) => {
      res.json(error);
    });
});

export default router;
