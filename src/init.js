import "dotenv/config";
import "./db";  // connecting to Mongo
import "./models/Video";
import "./models/User";
import app from "./server";

const PORT = 4000;

const handleListening = () =>
    console.log(`โServer listening on port http://localhost:${PORT}๐`);

app.listen(PORT, handleListening);    // callback์ ๊ธฐ๋ณธ์ ์ผ๋ก ์๋ฒ๊ฐ ์์๋  ๋ ์๋ํ๋ ํจ์
