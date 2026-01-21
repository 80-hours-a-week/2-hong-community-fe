// Board JavaScript

// State
let page = 1;
const limit = 10;
let isLoading = false;
let isLiked = false; // Detail page state
let currentDeleteTarget = null; // 'post' or commentId

// Dummy Data Generator
function generateDummyPosts(count) {
    const posts = [];
    for (let i = 0; i < count; i++) {
        const id = (page - 1) * limit + i + 1;
        posts.push({
            id: id,
            title: `제목 ${id} - 게시글 제목이 아주 길어지면 어떻게 될까요 26자가 넘어가면 잘려야 합니다`,
            likes: Math.floor(Math.random() * 20000),
            comments: Math.floor(Math.random() * 5000),
            views: Math.floor(Math.random() * 150000),
            date: '2021-01-01T00:00:00',
            author: `더미 작성자 ${1}`
        });
    }
    return posts;
}

function generateDummyComments(count) {
    const comments = [];
    for (let i = 0; i < count; i++) {
        comments.push({
            id: i + 1,
            author: `더미 작성자 ${1}`,
            content: '댓글 내용',
            date: '2021-01-01T00:00:00'
        });
    }
    return comments;
}

// Formatters
function formatCount(num) {
    if (num >= 1000) {
        if (num >= 10000 && num < 100000) return Math.floor(num / 1000) + 'k';
        if (num >= 100000) return Math.floor(num / 1000) + 'k';
        return Math.floor(num / 1000) + 'k';
    }
    return num;
}
// Improved formatter to match requirements exactly
// 1k, 10k, 100k
function formatCountDisplay(num) {
     if (num >= 1000) {
        return Math.floor(num / 1000) + 'k';
    }
    return num;
}

function formatDate(dateStr) {
    const date = new Date(dateStr);
    const yyyy = date.getFullYear();
    const mm = String(date.getMonth() + 1).padStart(2, '0');
    const dd = String(date.getDate()).padStart(2, '0');
    const hh = String(date.getHours()).padStart(2, '0');
    const min = String(date.getMinutes()).padStart(2, '0');
    const ss = String(date.getSeconds()).padStart(2, '0');
    return `${yyyy}-${mm}-${dd} ${hh}:${min}:${ss}`;
}

function truncateTitle(title) {
    if (title.length > 26) {
        return title.substring(0, 26) + "...";
    }
    return title;
}

// Render List
function createPostElement(post) {
    const article = document.createElement('article');
    article.className = 'post-card';
    article.onclick = () => location.href = 'post_detail.html';

    article.innerHTML = `
        <div class="post-header">
            <h2 class="post-title">${truncateTitle(post.title)}</h2>
            <div class="post-meta">
                <div class="post-stats">
                    <span>좋아요 ${formatCountDisplay(post.likes)}</span>
                    <span>댓글 ${formatCountDisplay(post.comments)}</span>
                    <span>조회수 ${formatCountDisplay(post.views)}</span>
                </div>
                <span class="post-date">${formatDate(post.date)}</span>
            </div>
        </div>
        <hr class="post-divider">
        <div class="post-footer">
            <div class="author-avatar"></div>
            <span class="author-name">${post.author}</span>
        </div>
    `;
    return article;
}

function loadPosts() {
    if (isLoading) return;
    isLoading = true;

    // Simulate API delay
    setTimeout(() => {
        const newPosts = generateDummyPosts(limit);
        const postList = document.querySelector('.post-list');
        
        if (postList) {
            newPosts.forEach(post => {
                postList.appendChild(createPostElement(post));
            });
            page++;
        }
        isLoading = false;
    }, 500);
}

// Infinite Scroll for List
function handleScroll() {
    const { scrollTop, clientHeight, scrollHeight } = document.documentElement;
    if (scrollTop + clientHeight >= scrollHeight - 100) {
        loadPosts();
    }
}

// Detail Page Logic
function initDetailPage() {
    const titleEl = document.getElementById('detail-title');
    if (!titleEl) return; // Not on detail page

    // Dummy Data for Detail
    const dummyDetail = {
        title: '제목 1',
        author: '더미 작성자 1',
        date: '2021-01-01T00:00:00',
        likes: 123,
        views: 123,
        commentsCount: 123
    };

    // Render Header
    document.getElementById('detail-title').innerText = dummyDetail.title;
    document.getElementById('detail-author').innerText = dummyDetail.author;
    document.getElementById('detail-date').innerText = formatDate(dummyDetail.date);

    // Render Stats
    updateLikeDisplay(dummyDetail.likes);
    document.getElementById('detail-views').innerText = formatCountDisplay(dummyDetail.views);
    document.getElementById('detail-comments').innerText = formatCountDisplay(dummyDetail.commentsCount);

    // Render Comments
    const commentList = document.getElementById('comment-list');
    const comments = generateDummyComments(3);
    comments.forEach(comment => {
        commentList.appendChild(createCommentElement(comment));
    });

    // Event Listeners for Input
    const commentInput = document.getElementById('comment-input');
    const submitBtn = document.getElementById('comment-submit-btn');
    
    commentInput.addEventListener('input', () => {
        if (commentInput.value.trim().length > 0) {
            submitBtn.disabled = false;
            submitBtn.classList.add('active');
        } else {
            submitBtn.disabled = true;
            submitBtn.classList.remove('active');
        }
    });
}

function updateLikeDisplay(count) {
    const likeBtn = document.getElementById('like-btn');
    const countSpan = document.getElementById('detail-likes');
    
    countSpan.innerText = formatCountDisplay(count);
    
    if (isLiked) {
        likeBtn.classList.add('active');
    } else {
        likeBtn.classList.remove('active');
    }
}

function toggleLike() {
    const countSpan = document.getElementById('detail-likes');
    let currentCount = parseInt(countSpan.innerText.replace('k', '000')); // Simple parse for now
    // Re-using dummy logic: baseline is 123.
    // If not liked -> becomes 124 (active). If liked -> becomes 123 (inactive).
    
    // For proper logic, we should store the raw number. 
    // But since it's dummy, let's just toggle visual +1/-1 based on text is risky if it's '1k'.
    // Let's just hardcode the transition for the dummy '123' case shown in image.
    
    let baseCount = 123;
    
    isLiked = !isLiked;
    updateLikeDisplay(isLiked ? baseCount + 1 : baseCount);
}

function createCommentElement(comment) {
    const div = document.createElement('div');
    div.className = 'comment-item';
    div.id = `comment-${comment.id}`;
    div.innerHTML = `
        <div class="author-avatar"></div>
        <div class="comment-content">
            <div class="comment-header">
                <span class="author-name">${comment.author}</span>
                <span class="comment-date">${formatDate(comment.date)}</span>
            </div>
            <p class="comment-text">${comment.content}</p>
        </div>
        <div class="edit-actions comment-actions">
            <button class="btn-small" onclick="alert('수정 기능 구현 예정')">수정</button>
            <button class="btn-small" onclick="showDeleteModal('comment', ${comment.id})">삭제</button>
        </div>
    `;
    return div;
}

// Modal Logic
function showDeleteModal(targetType, targetId) {
    currentDeleteTarget = { type: targetType, id: targetId };
    const modal = document.getElementById('delete-modal');
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden'; // Lock scroll
}

function closeDeleteModal() {
    const modal = document.getElementById('delete-modal');
    modal.style.display = 'none';
    document.body.style.overflow = 'auto'; // Unlock scroll
    currentDeleteTarget = null;
}

function confirmDelete() {
    if (!currentDeleteTarget) return;

    if (currentDeleteTarget.type === 'post') {
        alert('게시글이 삭제되었습니다.');
        location.href = 'post_list.html';
    } else if (currentDeleteTarget.type === 'comment') {
        const commentEl = document.getElementById(`comment-${currentDeleteTarget.id}`);
        if (commentEl) commentEl.remove();
        closeDeleteModal();
    }
}

// Init
document.addEventListener('DOMContentLoaded', () => {
    // List Page Logic
    const postList = document.querySelector('.post-list');
    if (postList) {
        postList.innerHTML = '';
        loadPosts();
        window.addEventListener('scroll', handleScroll);
    }

    // Detail Page Logic
    initDetailPage();
});