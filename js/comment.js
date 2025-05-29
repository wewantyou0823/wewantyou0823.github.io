document.addEventListener("DOMContentLoaded", () => {
  const authorInput = document.getElementById("comment-author");
  const commentInput = document.getElementById("comment-input");
  const submitButton = document.getElementById("submit-comment");
  const commentList = document.getElementById("comment-list");

  const dbRef = firebase.database().ref("comments");

  // 댓글 작성
  submitButton.addEventListener("click", () => {
    const author = authorInput.value.trim() || "익명";
    const message = commentInput.value.trim();
    if (!message) return;

    const timestamp = new Date().toISOString();

    dbRef.push({
      author,
      message,
      timestamp
    });

    commentInput.value = "";
  });

  // 댓글 표시 (최신순 정렬)
  dbRef.orderByChild("timestamp").on("value", (snapshot) => {
    const comments = snapshot.val();
    commentList.innerHTML = "";

    const commentArray = comments
      ? Object.entries(comments).sort((a, b) => b[1].timestamp.localeCompare(a[1].timestamp))
      : [];

    commentArray.forEach(([id, comment]) => {
      const time = new Date(comment.timestamp).toLocaleString("ko-KR", {
        dateStyle: "short",
        timeStyle: "short"
      });

      const commentBox = document.createElement("div");
      commentBox.style.marginBottom = "1em";
      commentBox.innerHTML = `
        <div style="
          white-space: pre-wrap;
          font-weight: 500;
          font-size: 1.1em;
          font-family: 'Noto Sans KR', sans-serif;
          color: #222;
        ">${comment.message}</div>
        <div style="font-size: 0.9em; color: gray; margin-top: 0.3em;">
          — ${comment.author}, ${time}
        </div>
        <hr style="border: none; border-top: 1px solid #ddd; margin: 0.8em 0;">
      `;
      commentList.appendChild(commentBox);
    });
  });
});
