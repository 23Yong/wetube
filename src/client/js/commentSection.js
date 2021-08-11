import fetch from "node-fetch";

const videoContainer = document.getElementById("videoContainer");
const form = document.getElementById("commentForm");
const delBtns = document.querySelectorAll(".comment-delBtn")

const deleteComment = async (event) => {
    event.preventDefault();
    const comment = event.target.parentElement;
    const videoId = videoContainer.dataset.id;
    const commentId = comment.dataset.id;

    const response = await fetch(`/api/${videoId}/comment/${commentId}/delete`, {
        method: "DELETE",
    });

    if(response.status === 200) {
        comment.remove();
    }
}

const addComment = (text, id) => {
    const videoComments = document.querySelector(".video__comments ul");
    const newComment = document.createElement("li");

    newComment.dataset.id = id;
    newComment.className = "video__comment";

    const div = document.createElement("div");
    const icon = document.createElement("i");
    const span = document.createElement("span");
    const span2 = document.createElement("span");

    icon.className = "fas fa-comment";
    span.innerText = ` ${text}`;
    span2.innerText = "❌";
    span2.className = "comment-delBtn";

    span2.addEventListener("click", deleteComment);

    newComment.appendChild(div);
    div.appendChild(icon);
    div.appendChild(span);
    newComment.appendChild(span2);
    
    videoComments.prepend(newComment);
};

const handleSubmit = async(event) => {
    event.preventDefault();
    const textarea = form.querySelector("textarea");
    const text = textarea.value;
    const videoId = videoContainer.dataset.id;
    console.log('add comment');
    if(text === "") { return; }
    const response = await fetch(`/api/videos/${videoId}/comment`, {   // URL 변경 없이 JS를 통해서 request를 보낼 수 있게 해준다.
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ text }),
    });
    
    if (response.status === 201) { 
        textarea.value="";
        const { newCommentId } = await response.json();
        addComment(text, newCommentId); 
    }
};

if(form) {
    form.addEventListener("submit", handleSubmit);
}

delBtns.forEach((delBtn, idx, delBtns) => {
    delBtn.addEventListener("click", deleteComment);
})