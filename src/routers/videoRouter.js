import express from "express";
import {
    watch,
    getUpload,
    postUpload,
    getEdit,
    postEdit,
    deleteVideo
} from "../controllers/videoController";
import { protectorMiddleware, videoUpload } from "../middlewares";

const videoRouter = express.Router();

videoRouter.get("/:id([0-9a-f]{24})", watch); // 숫자만 받아오도록
videoRouter.route("/:id([0-9a-f]{24})/edit").all(protectorMiddleware).get(getEdit).post(postEdit);
videoRouter.route("/:id([0-9a-f]{24})/delete").all(protectorMiddleware).get(deleteVideo);
videoRouter.route("/upload")
    .all(protectorMiddleware)
    .get(getUpload)
    .post(videoUpload.fields([
        { name: "video" },
        { name: "thumb" }
    ]), postUpload);

export default videoRouter;