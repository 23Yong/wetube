import express from "express";
import morgan from "morgan";    // morgan은 node.js 용 request logger middleware - log 기록을 남김
import session from "express-session";
import MongoStore from "connect-mongo";
import rootRouter from "./routers/rootRouter";
import videoRouter from "./routers/videoRouter";
import userRouter from "./routers/userRouter";
import apiRouter from "./routers/apiRouter";
import { localsMiddleware } from "./middlewares";

const app = express();  // create express application
const logger = morgan("dev"); // morgan함수는 middleware를 return, next()를 가지고 있음.
                              // 미리 정의된 문자열

app.set("view engine", "pug");  //  사용할 템플리트 엔진 설정(pug)
app.set("views", process.cwd() + "/src/views"); // 기본 디렉토리를 변경 (node모듈을 호출한 작업디렉토리의 절대경로 + "파일위치")
app.use(logger);
app.use(express.urlencoded({ extended: true }));    // 중첩된 개체 허용

app.use(session({
    secret: process.env.COOKIE_SECRET,   // cookie에 sign할 때 사용하는 string
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: process.env.DB_URL })
}));

app.use(localsMiddleware);
app.use("/uploads", express.static("uploads"));
app.use("/static", express.static("assets"));
app.use("/", rootRouter);
app.use("/videos", videoRouter);    // 누군가가 "/videos"로 시작하는 url에 접근하면 videoRouter에 있는 controller를 찾게함.
app.use("/users", userRouter);
app.use("/api", apiRouter);

export default app;