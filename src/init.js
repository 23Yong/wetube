import "dotenv/config";
import "./db";  // connecting to Mongo
import "./models/Video";
import "./models/User";
import "./models/Comment";
import app from "./server";

const PORT = 4000;

const handleListening = () =>
    console.log(`✅Server listening on port http://localhost:${PORT}🚀`);

app.listen(PORT, handleListening);    // callback은 기본적으로 서버가 시작될 때 작동하는 함수
