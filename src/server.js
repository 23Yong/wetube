import express from "express";
import morgan from "morgan";    // morgan은 node.js 용 request logger middleware
import session from "express-session";
import rootRouter from "./routers/rootRouter";
import videoRouter from "./routers/videoRouter";
import userRouter from "./routers/userRouter";
import { localsMiddleware } from "./middlewares";

const app = express();  // create express application
const logger = morgan("dev"); // morgan함수는 middleware를 return, next()를 가지고 있음.

app.set("view engine", "pug");
app.set("views", process.cwd() + "/src/views"); // 기본 디렉토리를 변경
app.use(logger);
app.use(express.urlencoded({ extended: true }));

app.use(session({
    secret: "Hello!",
    resave: true,
    saveUninitialized: true
}));

app.use(localsMiddleware);
app.use("/", rootRouter);
app.use("/videos", videoRouter);    // 누군가가 "/videos"로 시작하는 url에 접근하면 videoRouter에 있는 controller를 찾게함.
app.use("/users", userRouter);

export default app;