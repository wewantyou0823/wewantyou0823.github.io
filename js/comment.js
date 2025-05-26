const scriptURL = 'https://script.google.com/macros/s/AKfycbxW2rFfVa_dU1rok8P7NgSycQxerFBK2e2iL77adEdi8ZksbQ3vNhVFtkrGxEXkv0As/exec';

document.getElementById('submit-comment').addEventListener('click', () => {
  const name = document.getElementById('comment-name').value.trim() || "익명";
  const comment = document.getElementById('comment-input').value.trim();

  if (!comment) {
    alert("댓글을 입력해주세요!");
    return;
  }

  fetch(scriptURL, {
    method: 'POST',
    body: JSON.stringify({ name, comment }),
    headers: {
      'Content-Type': 'application/json'
    }
  })
  .then(() => {
    document.getElementById('comment-input').value = '';
    document.getElementById('comment-name').value = '';
    loadComments();
  })
  .catch(err => {
    alert("댓글 저장 중 오류가 발생했습니다.");
    console.error(err);
  });
});

function loadComments() {
  fetch(scriptURL)
    .then(res => res.json())
    .then(data => {
      const list = document.getElementById('comment-list');
      list.innerHTML = '';
      data.forEach(entry => {
        const div = document.createElement('div');
        div.className = 'comment';
        div.innerHTML = `<strong>${entry.name}</strong>: ${entry.comment}<br/>
                         <span class="comment-time">${new Date(entry.time).toLocaleString()}</span>`;
        list.appendChild(div);
      });
    });
}

// 초기 로딩 시 실행
loadComments();
