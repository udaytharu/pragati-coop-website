// Data Service - CMS for posts without server
// Fetches from JSON files first, falls back to localStorage

const DATA_FILE = '/data/posts.json';
const STORAGE_KEYS = {
    notices: 'notices',
    news: 'news'
};

class DataService {
    constructor() {
        this.cache = {
            notices: null,
            news: null,
            lastFetched: null
        };
        this.cacheTimeout = 5 * 60 * 1000; // 5 minutes cache
    }

    // Fetch posts from JSON file
    async fetchFromFile() {
        try {
            const response = await fetch(`${DATA_FILE}?t=${Date.now()}`);
            if (!response.ok) {
                throw new Error('Failed to fetch data file');
            }
            const data = await response.json();
            return {
                notices: data.notices || [],
                news: data.news || []
            };
        } catch (error) {
            // Silently fallback to localStorage in production
            return null;
        }
    }

    // Get posts from localStorage
    getFromStorage() {
        return {
            notices: JSON.parse(localStorage.getItem(STORAGE_KEYS.notices) || '[]'),
            news: JSON.parse(localStorage.getItem(STORAGE_KEYS.news) || '[]')
        };
    }

    // Save posts to localStorage
    saveToStorage(notices, news) {
        localStorage.setItem(STORAGE_KEYS.notices, JSON.stringify(notices));
        localStorage.setItem(STORAGE_KEYS.news, JSON.stringify(news));
    }

    // Get all posts (tries file first, then localStorage)
    async getPosts() {
        // Check cache first
        if (this.cache.notices !== null && 
            this.cache.news !== null && 
            this.cache.lastFetched && 
            (Date.now() - this.cache.lastFetched) < this.cacheTimeout) {
            return {
                notices: this.cache.notices,
                news: this.cache.news
            };
        }

        // Try to fetch from file
        const fileData = await this.fetchFromFile();
        if (fileData) {
            // Update cache
            this.cache.notices = fileData.notices;
            this.cache.news = fileData.news;
            this.cache.lastFetched = Date.now();
            
            // Sync to localStorage as backup
            this.saveToStorage(fileData.notices, fileData.news);
            
            return fileData;
        }

        // Fallback to localStorage
        const storageData = this.getFromStorage();
        this.cache.notices = storageData.notices;
        this.cache.news = storageData.news;
        this.cache.lastFetched = Date.now();
        
        return storageData;
    }

    // Get notices only
    async getNotices() {
        const { notices } = await this.getPosts();
        return notices;
    }

    // Get news only
    async getNews() {
        const { news } = await this.getPosts();
        return news;
    }

    // Save posts (saves to localStorage and provides export)
    savePosts(notices, news) {
        // Save to localStorage
        this.saveToStorage(notices, news);
        
        // Update cache
        this.cache.notices = notices;
        this.cache.news = news;
        this.cache.lastFetched = Date.now();
        
        // Return JSON string for export
        return JSON.stringify({
            notices: notices,
            news: news,
            lastUpdated: new Date().toISOString()
        }, null, 2);
    }

    // Export posts as JSON file
    exportPosts() {
        const { notices, news } = this.getFromStorage();
        const jsonData = {
            notices: notices,
            news: news,
            lastUpdated: new Date().toISOString()
        };
        
        const blob = new Blob([JSON.stringify(jsonData, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'posts.json';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        
        return jsonData;
    }

    // Import posts from JSON file
    async importPosts(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = (e) => {
                try {
                    const data = JSON.parse(e.target.result);
                    const notices = data.notices || [];
                    const news = data.news || [];
                    
                    // Save to localStorage
                    this.saveToStorage(notices, news);
                    
                    // Update cache
                    this.cache.notices = notices;
                    this.cache.news = news;
                    this.cache.lastFetched = Date.now();
                    
                    resolve({ notices, news });
                } catch (error) {
                    reject(new Error('Invalid JSON file'));
                }
            };
            reader.onerror = () => reject(new Error('Failed to read file'));
            reader.readAsText(file);
        });
    }

    // Get latest 3 posts from each category for index page
    async getLatestPosts() {
        const { notices, news } = await this.getPosts();
        
        // Sort by date (newest first) and take only 3
        const latestNotices = notices
            .sort((a, b) => new Date(b.date) - new Date(a.date))
            .slice(0, 3);
            
        const latestNews = news
            .sort((a, b) => new Date(b.date) - new Date(a.date))
            .slice(0, 3);
            
        return {
            notices: latestNotices,
            news: latestNews
        };
    }

    // Clear cache
    clearCache() {
        this.cache = {
            notices: null,
            news: null,
            lastFetched: null
        };
    }
}

// Create global instance
const dataService = new DataService();

