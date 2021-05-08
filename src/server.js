import express from "express";

const PORT = 4000;

const app = express();  // create express application

const logger = (req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
};

const handleHome = (req, res) => {  // get request에 respond하는 function
    return res.send("I love middlewares");
};

app.get("/", logger, handleHome);   // 누군가가 root page로 get request를 보낸다면 function 하나 작동

const handleListening = () => 
    console.log(`✅Server listening on port http://localhost:${PORT}🚀`);

app.listen(PORT, handleListening);    // callback은 기본적으로 서버가 시작될 때 작동하는 함수
