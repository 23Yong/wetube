import express from "express";

const PORT = 4000;

const app = express();  // create express application
// server? -> 항상 켜져 있는 (온라인) 컴퓨터
// request를 listening하고 있음
const handleListening = () => console.log(`✅Server listening on port http://localhost:${PORT}🚀`);

app.listen(PORT, handleListening);    // callback은 기본적으로 서버가 시작될 때 작동하는 함수
