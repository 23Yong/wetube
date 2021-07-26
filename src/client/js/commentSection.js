const { default: fetch } = require("node-fetch");

const videoContainer = document.getElementById("videoContainer");
const form = document.getElementById("commentForm");

const handleSubmit = (event) => {
    event.preventDefault();
    const textarea = form.querySelector("textarea");
    const text = textarea.value;
    const videoId = videoContainer.dataset.id;
    if(text === "") { return; }
    fetch(`/api/videos/${videoId}/comment`, {   // URL 변경 없이 JS를 통해서 request를 보낼 수 있게 해준다.
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ text }),
    })
};

if(form) {
    form.addEventListener("submit", handleSubmit);
}