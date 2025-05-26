document.addEventListener("DOMContentLoaded", function () {
    const input = document.getElementById('comment-input');
    const author = document.getElementById('comment-author');
    const button = document.getElementById('submit-comment');
    const list = document.getElementById('comment-list');

    function loadComments() {
        const saved = JSON.parse(localStorage.getItem('comments') || '[]');
        list.innerHTML = '';
        saved.reverse().forEach(comment => {
            const div = document.createElement('div');
            div.className = 'comment section8-main';
            div.style.color = 'black'; // 텍스트 색상 검정
            div.innerHTML = `<div>${comment.text} - <strong>${comment.author}</strong></div>
                             <div class="comment-time">${new Date(comment.time).toLocaleString()}</div>`;
            list.appendChild(div);
        });
    }

    function saveComment(text, authorName) {
        const existing = JSON.parse(localStorage.getItem('comments') || '[]');
        existing.push({ text: text.trim(), author: authorName.trim(), time: Date.now() });
        localStorage.setItem('comments', JSON.stringify(existing));
    }

    if (button) {
        button.addEventListener('click', () => {
            const text = input.value.trim();
            const authorName = author.value.trim() || '익명';
            if (text === '') {
                alert('메시지를 입력해주세요!');
                return;
            }
            saveComment(text, authorName);
            input.value = '';
            author.value = '';
            loadComments();
        });
    }

    loadComments();
});
