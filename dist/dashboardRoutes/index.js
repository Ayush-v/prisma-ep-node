"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
const users_1 = __importDefault(require("./users"));
const platform_1 = __importDefault(require("./platform"));
const course_1 = __importDefault(require("./course"));
router.get("/", (req, res) => {
    res.json({ message: "Hey web DEV" });
});
router.use("/users", users_1.default);
router.use("/platform", platform_1.default);
router.use("/course", course_1.default);
exports.default = router;
//# sourceMappingURL=index.js.map