"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const http_1 = __importDefault(require("http"));
const dotenv_1 = __importDefault(require("dotenv"));
const helmet_1 = __importDefault(require("helmet"));
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const index_1 = __importDefault(require("./api/routes/index"));
const MongoDb_1 = __importDefault(require("./api/config/MongoDb"));
dotenv_1.default.config();
const app = (0, express_1.default)();
// mongoose.connect("mongodb+srv://jaiykneepharr:Donscorp1711*@cluster0.uzo1swk.mongodb.net/hotel").then(()=>{
// 	console.log("mongodb connected")
// })
(0, MongoDb_1.default)(mongoose_1.default);
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, cors_1.default)());
app.use((0, helmet_1.default)());
app.use('/api/v1', index_1.default);
app.get("/", (req, res) => {
    res.send("all endpoints are active");
});
const server = http_1.default.createServer(app);
const PORT = process.env.PORT || 4000;
server.listen(process.env.PORT, () => console.log(`listening on port: ${PORT}`));
