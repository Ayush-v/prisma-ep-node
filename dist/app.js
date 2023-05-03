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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const client_1 = require("@prisma/client");
const dotenv_1 = __importDefault(require("dotenv"));
const morgan_1 = __importDefault(require("morgan"));
const app = (0, express_1.default)();
const prisma_1 = require("./prisma");
const dashboardRoutes_1 = __importDefault(require("./dashboardRoutes"));
const mobileRoutes_1 = __importDefault(require("./mobileRoutes"));
dotenv_1.default.config();
app.use(express_1.default.json());
app.use((0, morgan_1.default)("dev"));
const PORT = process.env.PORT || "8080";
app.post("/testSerialNumber", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, srNo } = req.body;
    console.log(name, srNo);
    try {
        const data = yield prisma_1.prisma.testSerialNumber.create({
            data: {
                name: name,
                SrNo: srNo,
            },
        });
        res.send(data);
    }
    catch (err) {
        console.log(err);
        res.send(err);
    }
}));
app.use("/api", dashboardRoutes_1.default);
app.use("/mobileApi", mobileRoutes_1.default);
app.use((err, req, res, next) => {
    if (err instanceof client_1.Prisma.PrismaClientKnownRequestError) {
        // Handle known Prisma errors
        if (err.code === "P2002") {
            res.json("There is a unique constraint violation");
            console.log("There is a unique constraint violation");
        }
    }
    else {
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
//# sourceMappingURL=app.js.map