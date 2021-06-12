import { Model } from "mongoose";
import Video from "../models/Video";

//Video.find({}, (error, videos) => {}); - callback

export const home = async (req, res) => {
    try {
        const videos = await Video.find({});
        return res.render("home", { pageTitle: "Home", videos });
    } catch {
        return res.render("server-error");
    }
};

export const watch = (req, res) => {
    const { id } = req.params;
    return res.render("watch", { pageTitle: `Watching:` });
};
export const getEdit = (req, res) => { // form을 화면에 출력
    const { id } = req.params;
    return res.render("edit", { pageTitle: `Editing:` });
};
export const postEdit = (req, res) => { // 변경사항을 저장
    const { id } = req.params;
    const { title } = req.body;
    return res.redirect(`/videos/${id}`);
};

export const getUpload = (req, res) => {
    return res.render("upload", { pageTitle: "Upload Video" });
};

export const postUpload = (req, res) => {
    const { title } = req.body;
    return res.redirect("/");
};