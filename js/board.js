// Board JavaScript

// State
let page = 1;
const limit = 10;
let isLoading = false;

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
            author: `더미 작성자 ${1}` // Assuming static author for dummy
        });
    }
    return posts;
}

// Formatters
function formatCount(num) {
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

// Render
function createPostElement(post) {
    const article = document.createElement('article');
    article.className = 'post-card';
    article.onclick = () => location.href = 'post_detail.html';

    article.innerHTML = `
        <div class="post-header">
            <h2 class="post-title">${truncateTitle(post.title)}</h2>
            <div class="post-meta">
                <div class="post-stats">
                    <span>좋아요 ${formatCount(post.likes)}</span>
                    <span>댓글 ${formatCount(post.comments)}</span>
                    <span>조회수 ${formatCount(post.views)}</span>
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
        
        newPosts.forEach(post => {
            postList.appendChild(createPostElement(post));
        });

        page++;
        isLoading = false;
    }, 500);
}

// Infinite Scroll
function handleScroll() {
    const { scrollTop, clientHeight, scrollHeight } = document.documentElement;
    if (scrollTop + clientHeight >= scrollHeight - 100) {
        loadPosts();
    }
}

// Init
document.addEventListener('DOMContentLoaded', () => {
    // Clear existing static content if any (optional, but good for cleanup)
    const postList = document.querySelector('.post-list');
    if (postList) {
        postList.innerHTML = '';
        loadPosts();
    }
    
    window.addEventListener('scroll', handleScroll);
});