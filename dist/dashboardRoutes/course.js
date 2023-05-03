"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
const prisma_1 = require("../prisma");
router.get("/:platformName", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { platformName } = req.params;
    const allCourses = yield prisma_1.prisma.course.findMany({
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
}));
router.post("/create", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, platformName, courseTypeId } = req.body;
    try {
        const newCourse = yield prisma_1.prisma.course.create({
            data: {
                name,
                courseTypeId,
                platformName,
            },
        });
        res.json({ newCourse });
    }
    catch (error) {
        console.error(error.meta.message);
        res.status(500).send(`Internal Server Error ${error.meta.message}`);
    }
}));
exports.default = router;
//# sourceMappingURL=course.js.map