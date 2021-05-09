import express from "express";
import morgan from "morgan";    // morgan은 node.js 용 request logger middleware

const PORT = 4000;

const app = express();  // create express application
const logger = morgan("dev"); // morgan함수는 middleware를 return, next()를 가지고 있음.

const home = (req, res) => {
    console.log("I will respond");
    return res.send("hello");
}
const login = (req, res) => {
    return res.send("login");
}

app.use(logger); 
app.get("/", home);   // 누군가가 root page로 get request를 보낸다면 function 하나 작동
app.get("/login", login);

const handleListening = () => 
    console.log(`✅Server listening on port http://localhost:${PORT}🚀`);

app.listen(PORT, handleListening);    // callback은 기본적으로 서버가 시작될 때 작동하는 함수