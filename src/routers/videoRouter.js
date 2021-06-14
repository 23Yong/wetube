import express from "express";
import { watch, getUpload, postUpload, getEdit, postEdit } from "../controllers/videoController";

const videoRouter = express.Router();

videoRouter.get("/:id([0-9a-f]{24})", watch); // 숫자만 받아오도록
videoRouter.route("/:id([0-9a-f]{24)}/edit").get(getEdit).post(postEdit);
videoRouter.route("/upload").get(getUpload).post(postUpload);

export default videoRouter;