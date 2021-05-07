import express from "express";

const PORT = 4000;

const app = express();  // create express application
/* 
    server? -> 항상 켜져 있는 (온라인) 컴퓨터
    request를 listening하고 있음
*/

// get request에 respond하는 function
// First argument: request Object, Second argument: response Object
const handleHome = (req, res) => {
    return res.send("I still love you");
};
const handleLogin = (req, res) => {
    return res.send("Login here");
};
// 누군가가 root page로 get request를 보낸다면 function 하나 작동
app.get("/", handleHome);
app.get("/login", handleLogin);
const handleListening = () => console.log(`✅Server listening on port http://localhost:${PORT}🚀`);

app.listen(PORT, handleListening);    // callback은 기본적으로 서버가 시작될 때 작동하는 함수

// (/) -> root
// GET? -> HTTP method, HTTP? -> 우리/서버가 서버와 소통하는 방법
// GET-> 어떤 페이지를 GET해줘(가져다줘) (브라우저는 나를 대신해서 웹사이트를 request하고 페이지를 가져다줌)
