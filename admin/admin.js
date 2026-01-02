// Admin Panel JavaScript

// Initialize admin credentials if not exists
function initializeAdminCredentials() {
    if (!localStorage.getItem('adminCredentials')) {
        const defaultCredentials = {
            username: 'admin', //TODO: Change to the actual username
            password: 'admin123' //TODO: Change to the actual password
        };
        localStorage.setItem('adminCredentials', JSON.stringify(defaultCredentials));
    }
}

// Check if user is logged in
function checkAuth() {
    const isLoggedIn = sessionStorage.getItem('adminLoggedIn');
    const currentPage = window.location.pathname;
    
    if (currentPage.includes('dashboard.html')) {
        if (!isLoggedIn) {
            window.location.href = '/admin/login.html';
            return false;
        }
        return true;
    } else if (currentPage.includes('login.html')) {
        if (isLoggedIn) {
            window.location.href = '/admin/dashboard.html';
            return false;
        }
    }
    return true;
}

// Login functionality
function handleLogin() {
    const loginForm = document.getElementById('adminLoginForm');
    if (!loginForm) return;

    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        const errorDiv = document.getElementById('loginError');
        const loginBtn = document.getElementById('loginBtn');
        const btnText = loginBtn.querySelector('.btn-text');
        const btnLoader = loginBtn.querySelector('.btn-loader');
        
        // Show loading state
        loginBtn.disabled = true;
        btnText.style.display = 'none';
        btnLoader.style.display = 'inline-flex';
        errorDiv.style.display = 'none';
        
        // Simulate network delay for better UX
        setTimeout(() => {
            const storedCredentials = JSON.parse(localStorage.getItem('adminCredentials'));
            
            if (username === storedCredentials.username && password === storedCredentials.password) {
                sessionStorage.setItem('adminLoggedIn', 'true');
                sessionStorage.setItem('adminUsername', username);
                window.location.href = '/admin/dashboard.html';
            } else {
                loginBtn.disabled = false;
                btnText.style.display = 'inline-flex';
                btnLoader.style.display = 'none';
                errorDiv.textContent = 'Invalid username or password!';
                errorDiv.style.display = 'block';
                setTimeout(() => {
                    errorDiv.style.display = 'none';
                }, 3000);
            }
        }, 500);
    });
}

// Toggle password visibility
function setupPasswordToggle() {
    const toggleBtn = document.getElementById('togglePassword');
    const passwordInput = document.getElementById('password');
    
    if (toggleBtn && passwordInput) {
        toggleBtn.addEventListener('click', function() {
            const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
            passwordInput.setAttribute('type', type);
            toggleBtn.querySelector('i').classList.toggle('fa-eye');
            toggleBtn.querySelector('i').classList.toggle('fa-eye-slash');
        });
    }
}

// Logout functionality
function handleLogout() {
    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', function() {
            if (confirm('Are you sure you want to logout?')) {
                sessionStorage.removeItem('adminLoggedIn');
                sessionStorage.removeItem('adminUsername');
                window.location.href = '/admin/login.html';
            }
        });
    }
}

// Dashboard navigation
function setupNavigation() {
    const navItems = document.querySelectorAll('.nav-item');
    const sections = document.querySelectorAll('.admin-section');
    const pageTitle = document.getElementById('pageTitle');
    
    const sectionTitles = {
        'posts': 'Posts Management',
        'create-notice': 'Create Notice',
        'create-news': 'Create News & Activity',
        'settings': 'Settings'
    };
    
    navItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            const targetSection = this.getAttribute('data-section');
            
            // Update active nav item
            navItems.forEach(nav => nav.classList.remove('active'));
            this.classList.add('active');
            
            // Show corresponding section
            sections.forEach(section => section.classList.remove('active'));
            const targetElement = document.getElementById(targetSection + '-section');
            if (targetElement) {
                targetElement.classList.add('active');
            }
            
            // Update page title
            if (pageTitle && sectionTitles[targetSection]) {
                pageTitle.textContent = sectionTitles[targetSection];
            }
        });
    });
}

// Post Management Functions
function getPosts() {
    const notices = JSON.parse(localStorage.getItem('notices') || '[]');
    const news = JSON.parse(localStorage.getItem('news') || '[]');
    return { notices, news };
}

function loadPostsList() {
    const postsList = document.getElementById('postsList');
    if (!postsList) return;
    
    const { notices, news } = getPosts();
    const activeFilter = document.querySelector('.filter-tab.active')?.getAttribute('data-filter') || 'all';
    
    let postsToShow = [];
    if (activeFilter === 'all') {
        postsToShow = [
            ...notices.map(p => ({ ...p, type: 'notice' })),
            ...news.map(p => ({ ...p, type: 'news' }))
        ];
    } else if (activeFilter === 'notice') {
        postsToShow = notices.map(p => ({ ...p, type: 'notice' }));
    } else if (activeFilter === 'news') {
        postsToShow = news.map(p => ({ ...p, type: 'news' }));
    }
    
    // Sort by date (newest first)
    postsToShow.sort((a, b) => new Date(b.date) - new Date(a.date));
    
    if (postsToShow.length === 0) {
        postsList.innerHTML = '<div class="empty-state"><i class="fas fa-inbox"></i><p>No posts found</p></div>';
        return;
    }
    
    postsList.innerHTML = postsToShow.map(post => `
        <div class="post-card">
            <div class="post-card-header">
                <span class="post-type-badge ${post.type}">${post.type === 'notice' ? 'Notice' : 'News'}</span>
                <div class="post-actions">
                    <button class="btn-edit" onclick="editPost('${post.id}', '${post.type}')">
                        <i class="fas fa-edit"></i> Edit
                    </button>
                    <button class="btn-delete" onclick="deletePost('${post.id}', '${post.type}')">
                        <i class="fas fa-trash"></i> Delete
                    </button>
                </div>
            </div>
            <div class="post-card-body">
                <h3>${escapeHtml(post.heading)}</h3>
                <p class="post-date"><i class="fas fa-calendar"></i> ${formatDate(post.date)}</p>
                ${post.image ? `<img src="${post.image}" alt="${escapeHtml(post.heading)}" class="post-card-image">` : ''}
                <p class="post-content-preview">${escapeHtml(post.content.substring(0, 150))}${post.content.length > 150 ? '...' : ''}</p>
            </div>
        </div>
    `).join('');
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
}

// Filter tabs
function setupFilterTabs() {
    const filterTabs = document.querySelectorAll('.filter-tab');
    filterTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            filterTabs.forEach(t => t.classList.remove('active'));
            this.classList.add('active');
            loadPostsList();
        });
    });
}

// Create Notice
function setupCreateNotice() {
    const form = document.getElementById('createNoticeForm');
    if (!form) return;
    
    const imageInput = document.getElementById('noticeImage');
    if (imageInput) {
        imageInput.addEventListener('change', function(e) {
            handleImagePreview(e, 'notice');
        });
    }
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const heading = document.getElementById('noticeHeading').value;
        const date = document.getElementById('noticeDate').value;
        const content = document.getElementById('noticeContent').value;
        const imageFile = document.getElementById('noticeImage').files[0];
        
        if (!heading || !date || !content) {
            showNotification('Please fill all required fields!', 'error');
            return;
        }
        
        let imageData = null;
        if (imageFile) {
            const reader = new FileReader();
            reader.onload = function(e) {
                imageData = e.target.result;
                saveNotice(heading, date, content, imageData);
            };
            reader.readAsDataURL(imageFile);
        } else {
            saveNotice(heading, date, content, null);
        }
    });
}

function saveNotice(heading, date, content, image) {
    const notices = JSON.parse(localStorage.getItem('notices') || '[]');
    const newNotice = {
        id: Date.now().toString(),
        heading: heading,
        date: date,
        content: content,
        image: image,
        createdAt: new Date().toISOString()
    };
    
    notices.push(newNotice);
    localStorage.setItem('notices', JSON.stringify(notices));
    
    showNotification('Notice published successfully!', 'success');
    document.getElementById('createNoticeForm').reset();
    document.getElementById('noticeImagePreview').style.display = 'none';
    
    // Switch to posts section
    document.querySelector('.nav-item[data-section="posts"]').click();
    loadPostsList();
}

// Create News
function setupCreateNews() {
    const form = document.getElementById('createNewsForm');
    if (!form) return;
    
    const imageInput = document.getElementById('newsImage');
    if (imageInput) {
        imageInput.addEventListener('change', function(e) {
            handleImagePreview(e, 'news');
        });
    }
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const heading = document.getElementById('newsHeading').value;
        const date = document.getElementById('newsDate').value;
        const content = document.getElementById('newsContent').value;
        const imageFile = document.getElementById('newsImage').files[0];
        
        if (!heading || !date || !content) {
            showNotification('Please fill all required fields!', 'error');
            return;
        }
        
        let imageData = null;
        if (imageFile) {
            const reader = new FileReader();
            reader.onload = function(e) {
                imageData = e.target.result;
                saveNews(heading, date, content, imageData);
            };
            reader.readAsDataURL(imageFile);
        } else {
            saveNews(heading, date, content, null);
        }
    });
}

function saveNews(heading, date, content, image) {
    const news = JSON.parse(localStorage.getItem('news') || '[]');
    const newNews = {
        id: Date.now().toString(),
        heading: heading,
        date: date,
        content: content,
        image: image,
        createdAt: new Date().toISOString()
    };
    
    news.push(newNews);
    localStorage.setItem('news', JSON.stringify(news));
    
    showNotification('News published successfully!', 'success');
    document.getElementById('createNewsForm').reset();
    document.getElementById('newsImagePreview').style.display = 'none';
    
    // Switch to posts section
    document.querySelector('.nav-item[data-section="posts"]').click();
    loadPostsList();
}

// Image preview
function handleImagePreview(event, type) {
    const file = event.target.files[0];
    if (!file) return;
    
    if (file.size > 5 * 1024 * 1024) {
        showNotification('Image size should be less than 5MB', 'error');
        event.target.value = '';
        return;
    }
    
    const reader = new FileReader();
    reader.onload = function(e) {
        const previewId = type === 'notice' ? 'noticePreviewImg' : type === 'news' ? 'newsPreviewImg' : 'editPreviewImg';
        const previewDivId = type === 'notice' ? 'noticeImagePreview' : type === 'news' ? 'newsImagePreview' : 'editImagePreview';
        
        document.getElementById(previewId).src = e.target.result;
        document.getElementById(previewDivId).style.display = 'block';
    };
    reader.readAsDataURL(file);
}

// Remove image preview
function removeImagePreview(type) {
    const previewDivId = type === 'notice' ? 'noticeImagePreview' : type === 'news' ? 'newsImagePreview' : 'editImagePreview';
    const inputId = type === 'notice' ? 'noticeImage' : type === 'news' ? 'newsImage' : 'editImage';
    
    document.getElementById(previewDivId).style.display = 'none';
    document.getElementById(inputId).value = '';
}

// Edit Post
function editPost(postId, postType) {
    const { notices, news } = getPosts();
    const posts = postType === 'notice' ? notices : news;
    const post = posts.find(p => p.id === postId);
    
    if (!post) return;
    
    document.getElementById('editPostId').value = postId;
    document.getElementById('editPostType').value = postType;
    document.getElementById('editHeading').value = post.heading;
    document.getElementById('editDate').value = post.date;
    document.getElementById('editContent').value = post.content;
    
    // Show current image if exists
    const currentImageDisplay = document.getElementById('currentImageDisplay');
    if (post.image) {
        currentImageDisplay.innerHTML = `
            <p>Current Image:</p>
            <img src="${post.image}" alt="Current image" style="max-width: 200px; margin-top: 10px;">
        `;
    } else {
        currentImageDisplay.innerHTML = '';
    }
    
    document.getElementById('editImagePreview').style.display = 'none';
    document.getElementById('editModal').style.display = 'flex';
    
    // Setup image preview for edit
    const editImageInput = document.getElementById('editImage');
    editImageInput.onchange = function(e) {
        handleImagePreview(e, 'edit');
    };
}

function closeEditModal() {
    document.getElementById('editModal').style.display = 'none';
    document.getElementById('editPostForm').reset();
}

function setupEditPost() {
    const form = document.getElementById('editPostForm');
    if (!form) return;
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const postId = document.getElementById('editPostId').value;
        const postType = document.getElementById('editPostType').value;
        const heading = document.getElementById('editHeading').value;
        const date = document.getElementById('editDate').value;
        const content = document.getElementById('editContent').value;
        const imageFile = document.getElementById('editImage').files[0];
        
        const { notices, news } = getPosts();
        const posts = postType === 'notice' ? notices : news;
        const postIndex = posts.findIndex(p => p.id === postId);
        
        if (postIndex === -1) return;
        
        let imageData = posts[postIndex].image; // Keep existing image by default
        
        if (imageFile) {
            const reader = new FileReader();
            reader.onload = function(e) {
                imageData = e.target.result;
                updatePost(postId, postType, heading, date, content, imageData);
            };
            reader.readAsDataURL(imageFile);
        } else {
            updatePost(postId, postType, heading, date, content, imageData);
        }
    });
}

function updatePost(postId, postType, heading, date, content, image) {
    const { notices, news } = getPosts();
    
    if (postType === 'notice') {
        const index = notices.findIndex(p => p.id === postId);
        if (index !== -1) {
            notices[index] = { ...notices[index], heading, date, content, image };
            localStorage.setItem('notices', JSON.stringify(notices));
        }
    } else {
        const index = news.findIndex(p => p.id === postId);
        if (index !== -1) {
            news[index] = { ...news[index], heading, date, content, image };
            localStorage.setItem('news', JSON.stringify(news));
        }
    }
    
    showNotification('Post updated successfully!', 'success');
    closeEditModal();
    loadPostsList();
}

// Delete Post
function deletePost(postId, postType) {
    if (!confirm('Are you sure you want to delete this post?')) return;
    
    const { notices, news } = getPosts();
    
    if (postType === 'notice') {
        const filtered = notices.filter(p => p.id !== postId);
        localStorage.setItem('notices', JSON.stringify(filtered));
    } else {
        const filtered = news.filter(p => p.id !== postId);
        localStorage.setItem('news', JSON.stringify(filtered));
    }
    
    showNotification('Post deleted successfully!', 'success');
    loadPostsList();
}

// Change Password
function setupChangePassword() {
    const form = document.getElementById('changePasswordForm');
    if (!form) return;
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const currentPassword = document.getElementById('currentPassword').value;
        const newPassword = document.getElementById('newPassword').value;
        const confirmPassword = document.getElementById('confirmPassword').value;
        const errorDiv = document.getElementById('passwordError');
        
        const storedCredentials = JSON.parse(localStorage.getItem('adminCredentials'));
        
        if (currentPassword !== storedCredentials.password) {
            errorDiv.textContent = 'Current password is incorrect!';
            errorDiv.style.display = 'block';
            return;
        }
        
        if (newPassword !== confirmPassword) {
            errorDiv.textContent = 'New passwords do not match!';
            errorDiv.style.display = 'block';
            return;
        }
        
        if (newPassword.length < 6) {
            errorDiv.textContent = 'Password must be at least 6 characters!';
            errorDiv.style.display = 'block';
            return;
        }
        
        storedCredentials.password = newPassword;
        localStorage.setItem('adminCredentials', JSON.stringify(storedCredentials));
        
        showNotification('Password changed successfully!', 'success');
        form.reset();
        errorDiv.style.display = 'none';
    });
}

// Show notification toast
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existing = document.querySelector('.admin-notification');
    if (existing) existing.remove();
    
    const notification = document.createElement('div');
    notification.className = `admin-notification admin-notification-${type}`;
    notification.innerHTML = `
        <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
        <span>${message}</span>
    `;
    
    document.body.appendChild(notification);
    
    // Trigger animation
    setTimeout(() => notification.classList.add('show'), 10);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    initializeAdminCredentials();
    
    if (checkAuth()) {
        // Login page
        if (document.getElementById('adminLoginForm')) {
            handleLogin();
            setupPasswordToggle();
        }
        
        // Dashboard page
        if (document.getElementById('postsList')) {
            const username = sessionStorage.getItem('adminUsername') || 'Admin';
            document.getElementById('adminUsername').textContent = username;
            
            handleLogout();
            setupNavigation();
            setupFilterTabs();
            setupCreateNotice();
            setupCreateNews();
            setupEditPost();
            setupChangePassword();
            setupMobileMenu();
            loadPostsList();
            
            // Set today's date as default for date inputs
            const today = new Date().toISOString().split('T')[0];
            document.getElementById('noticeDate').value = today;
            document.getElementById('newsDate').value = today;
        }
    }
});

// Mobile Menu Toggle
function setupMobileMenu() {
    const mobileMenuToggle = document.getElementById('mobileMenuToggle');
    const sidebar = document.querySelector('.admin-sidebar');
    
    if (mobileMenuToggle && sidebar) {
        mobileMenuToggle.addEventListener('click', function() {
            sidebar.classList.toggle('active');
        });
        
        // Close sidebar when clicking outside on mobile
        document.addEventListener('click', function(event) {
            if (window.innerWidth <= 768) {
                if (!sidebar.contains(event.target) && !mobileMenuToggle.contains(event.target)) {
                    sidebar.classList.remove('active');
                }
            }
        });
    }
}

// Close modal when clicking outside
window.onclick = function(event) {
    const modal = document.getElementById('editModal');
    if (event.target === modal) {
        closeEditModal();
    }
}