import { Model } from "mongoose";
import Video from "../models/Video";

//Video.find({}, (error, videos) => {}); - callback

export const home = async (req, res) => {
    const videos = await Video.find({});
    console.log(videos);
    return res.render("home", { pageTitle: "Home", videos });
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

export const postUpload = async (req, res) => {
    const { title, description, hashtags } = req.body;
    try {
        await Video.create({
            title,
            description,
            hashtags: hashtags.split(",").map(word => `#${word}`),
        });
    } catch (error) {
        return res.render("upload", { pageTitle: "Upload Video", errorMessage: error._message });
    }

    return res.redirect("/");
};