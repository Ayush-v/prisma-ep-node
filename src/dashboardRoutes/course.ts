import { Router } from "express";
const router = Router();
import { prisma } from "../prisma";

router.get("/:platformName", async (req, res) => {
  const { platformName } = req.params;

  const allCourses = await prisma.course.findMany({
    include: {
      platform: {
        select: {
          name: true,
        },
      },
      courseType: {
        select: {
          type: true,
        },
      },
    },
    where: {
      platformName,
    },
    // select: {
    //   platform: {
    //     select: {
    //       name: true,
    //     },
    //   },
    //   courseType: {
    //     select: {
    //       type: true,
    //     },
    //   },
    //   name: true,
    //   active: true,
    //   color: true,
    //   id: true,
    //   image: true,
    //   paid: true,
    //   rating: true,
    //   showTimer: true,
    //   top: true,
    // },
  });

  // const { platform, courseType, ...rest } = await allCourses.forEach(
  //   (element: any) => {
  //     return element;
  //   }
  // );

  // console.log(platform);

  // const response = await {
  //   platform_name: platform.name,
  //   courseType_name: courseType.type,
  //   ...rest,
  // };

  // const modified = await allCourses.map((course: any) => {
  //   return {
  //     platform_name: course.platform.name,
  //     courseTypeName: course.courseType.type,
  //     ...course,
  //   };
  // });

  res.json({ message: "All Course", data: allCourses });
});

router.post("/create", async (req, res) => {
  const { name, platformName, courseTypeId } = req.body;

  try {
    const newCourse = await prisma.course.create({
      data: {
        name,
        courseTypeId,
        platformName,
      },
    });

    res.json({ newCourse });
  } catch (error: any) {
    console.error(error.meta.message);
    res.status(500).send(`Internal Server Error ${error.meta.message}`);
  }
});

export default router;
