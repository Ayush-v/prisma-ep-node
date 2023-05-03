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
router.get("/", (_, res) => __awaiter(void 0, void 0, void 0, function* () {
    const allPlatforms = yield prisma_1.prisma.platform.findMany({
        include: {
            courseTypes: true,
        },
    });
    res.json({ message: "All Platforms", data: allPlatforms });
}));
// type CourseType = {
//   id: string;
//   index: number;
//   type: string;
//   active: boolean;
// };
router
    .route("/edit/:id")
    .get((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const platformData = yield prisma_1.prisma.platform.findUnique({
        where: {
            id,
        },
        include: {
            courseTypes: true,
        },
    });
    res.json({ data: platformData });
}))
    .put((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { label, name, subTitle, active, image, courseTypes } = req.body;
    const updatedPlatformData = yield prisma_1.prisma.platform.update({
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
                updateMany: courseTypes.map((courseType) => ({
                    where: { id: courseType.id },
                    data: {
                        index: courseType.index,
                        type: courseType.type,
                        active: courseType.active,
                    },
                })),
            },
        },
        include: {
            courseTypes: true,
        },
    });
    res.json({ data: updatedPlatformData });
}));
router.delete("/delete/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const deletePlatform = yield prisma_1.prisma.platform.delete({
        where: {
            id,
        },
    });
    res.json({ message: "success", data: deletePlatform });
}));
router.post("/create", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { label, name, subTitle, courseTypes } = req.body;
    const platform = yield prisma_1.prisma.platform
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
}));
exports.default = router;
//# sourceMappingURL=platform.js.map