const videoContainer = document.getElementById("videoContainer");
const form = document.getElementById("commentForm");

const deleteComment = (event) => {
    event.preventDefault();
    
};

const addComment = (text, id) => {
    const videoComments = document.querySelector(".video__comments ul");
    const newComment = document.createElement("li");
    newComment.dataset.id = id;
    const delBtn = document.createElement("button");
    const span = document.createElement("span");
    const span2 = document.createElement("span");
    const icon = document.createElement("i");
    
    icon.className = "fas fa-comment";
    newComment.className = "video__comment";
    span.innerText = ` ${text}`;
    span2.innerText = "❌";
    delBtn.className = "video__comment-delBtn";

    newComment.appendChild(icon);
    newComment.appendChild(span);
    newComment.appendChild(delBtn);
    delBtn.appendChild(span2);
    videoComments.prepend(newComment);
};

const handleSubmit = async(event) => {
    event.preventDefault();
    const textarea = form.querySelector("textarea");
    const text = textarea.value;
    const videoId = videoContainer.dataset.id;
    if(text === "") { return; }
    const response = await fetch(`/api/videos/${videoId}/comment`, {   // URL 변경 없이 JS를 통해서 request를 보낼 수 있게 해준다.
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ text }),
    });
    textarea.value = "";
    
    const { newCommentId } = await response.json();
    if (response.status === 201) { addComment(text, newCommentId); }
};

if(form) {
    form.addEventListener("submit", handleSubmit);
}