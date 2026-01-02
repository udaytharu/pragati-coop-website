# प्रगति बचत तथा ऋण सहकारी संस्था लि. (Pragati SACCOS)

A comprehensive website for Pragati Savings and Credit Cooperative Society Limited, featuring a complete Content Management System (CMS) for managing notices and news without requiring a server backend.

## 🌟 Features

### Public Website Features

- **Homepage**: Modern, responsive landing page with hero section and key information
- **Notices**: Dynamic notice display with date, images, and content
- **News & Activities**: Grid-based news display with rich content support
- **About Section**: 
  - Board of Directors
  - Management Team
  - Committees (Advisory, Account Supervision, Sub-committees)
  - Employee Information
  - Manager's Message
- **Services**: 
  - Savings Products
  - Loan Services
  - Remittance Services
  - Service Centers
- **Resources**:
  - Rules & Regulations (PDF downloads)
  - Bank Details with QR codes
  - Annual Reports
  - FAQ Section
- **Tools**:
  - EMI Calculator
- **Contact**: Contact form with EmailJS integration
- **Privacy Policy**: Comprehensive privacy policy page

### Admin Panel Features

- **Secure Login**: Session-based authentication
- **Posts Management**: 
  - Create, edit, and delete notices
  - Create, edit, and delete news/activities
  - Filter posts by type
  - Image upload with preview
- **Data Management**:
  - Export posts to JSON file
  - Import posts from JSON file
  - Sync data from online JSON file
  - Automatic localStorage backup
- **Settings**:
  - Change password functionality
  - Secure password management
- **Responsive Design**: Fully responsive admin interface
- **Real-time Updates**: Instant updates without page refresh

### CMS Features

- **Serverless CMS**: No backend server required
- **Online Storage**: Posts stored in JSON files accessible online
- **Local Backup**: Automatic localStorage fallback
- **Export/Import**: Easy data migration and backup
- **Caching**: 5-minute cache for better performance
- **Image Support**: Base64 image encoding for offline storage

## 🛠️ Technologies Used

### Frontend

- **HTML5**: Semantic markup, modern HTML features
- **CSS3**: 
  - Flexbox and Grid layouts
  - CSS Variables for theming
  - Media queries for responsiveness
  - Animations and transitions
  - Focus-visible states for accessibility
- **JavaScript (ES6+)**:
  - Async/await for asynchronous operations
  - Fetch API for data retrieval
  - LocalStorage/SessionStorage for data persistence
  - DOM manipulation
  - Event handling
  - Dynamic content loading

### Libraries & APIs

- **Font Awesome 6.5.1**: Icon library for UI elements
- **EmailJS**: Contact form email service integration

### Storage Solutions

- **localStorage**: Browser-based data storage for admin panel
- **sessionStorage**: Session management for authentication
- **JSON Files**: Online data storage in `/data/posts.json`

### Architecture

- **Component-Based**: Reusable header and footer components
- **Modular JavaScript**: Separated concerns (admin, display, data service)
- **Responsive Design**: Mobile-first approach
- **Progressive Enhancement**: Works without JavaScript (with limitations)

## 📁 Project Structure

```
coop2/
├── admin/              # Admin panel (login, dashboard)
├── assets/             # Static assets (CSS, JS, images)
├── components/         # Reusable HTML components
├── data/               # CMS data storage (JSON)
├── notice/             # Notice display pages
├── NewsandActivities/  # News display pages
├── pages/              # Content pages (about, services, etc.)
└── index.html          # Homepage
```

For detailed structure, see [PROJECT_STRUCTURE.md](PROJECT_STRUCTURE.md)

## 🚀 Getting Started

### Prerequisites

- A web server (for local development) or static hosting (GitHub Pages, Netlify, etc.)
- Modern web browser (Chrome, Firefox, Safari, Edge)

### Installation

1. Clone or download the repository
2. Place files on a web server or static hosting
3. Access the website through your server URL

### Admin Access

1. Navigate to `/admin/login.html`
2. Default credentials:
   - Username: `admin`
   - Password: `admin123`
3. **Important**: Change the default password immediately!

For detailed admin guide, see [ADMIN_GUIDE.md](ADMIN_GUIDE.md)

## 📝 Making Posts Available Online

1. Create posts in the admin panel
2. Go to Settings → Data Management
3. Click "Export Posts"
4. Replace `/data/posts.json` with the exported file
5. Commit and push to your repository
6. Posts will be available online automatically

## 🎨 Design Features

- **Responsive Layout**: Works on all devices (mobile, tablet, desktop)
- **Modern UI**: Clean, professional design
- **Smooth Animations**: Fade-in effects, hover transitions
- **Accessibility**: ARIA labels, keyboard navigation support
- **SEO Optimized**: Meta tags, semantic HTML
- **Loading States**: Visual feedback for user actions
- **Toast Notifications**: User-friendly notification system

## 🔒 Security Features

- **Session Management**: Secure session-based authentication
- **Password Protection**: Encrypted password storage
- **Input Validation**: Form validation on client-side
- **XSS Protection**: HTML escaping for user content
- **Secure Storage**: Credentials stored securely in localStorage

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## 🌐 Deployment

### GitHub Pages

1. Push repository to GitHub
2. Enable GitHub Pages in repository settings
3. Select main branch
4. Site will be available at `https://username.github.io/repo-name`

### Other Static Hosting

- Netlify: Drag and drop or connect repository
- Vercel: Connect repository for automatic deployment
- Any static file hosting service

## 📚 Documentation

- **[PROJECT_STRUCTURE.md](PROJECT_STRUCTURE.md)**: Detailed project structure
- **[ADMIN_GUIDE.md](ADMIN_GUIDE.md)**: Complete admin panel guide

## 🔧 Customization

### Changing Colors

Edit CSS variables in `assets/css/styles.css`:
```css
:root {
    --primary-color: #1e3a8a;
    --secondary-color: #3b82f6;
    /* Add more variables */
}
```

### Adding Pages

1. Create HTML file in appropriate directory
2. Include header and footer components
3. Add navigation links if needed
4. Style with CSS in `assets/css/`

### Modifying CMS

Edit `assets/js/data-service.js` for data handling logic
Edit `assets/js/admin.js` for admin panel functionality

## 🐛 Troubleshooting

### Posts Not Showing
- Check if `/data/posts.json` exists and is valid
- Use "Sync Data" in admin panel
- Verify JSON structure

### Admin Login Issues
- Clear browser cache
- Check localStorage is enabled
- Verify credentials

### Images Not Loading
- Check image size (max 5MB)
- Verify image format (JPG, PNG, GIF)
- Check Base64 encoding

## 📄 License

This project is proprietary software for Pragati SACCOS.

## 👥 Support

For issues or questions:
1. Check documentation files
2. Review browser console for errors
3. Verify file paths and structure

## 🎯 Future Enhancements

- [ ] Rich text editor for content
- [ ] Image upload to external storage
- [ ] Post categories and tags
- [ ] Search functionality
- [ ] Scheduled posts
- [ ] Version history
- [ ] Multi-language support
- [ ] Analytics integration

---

**Developed for**: प्रगति बचत तथा ऋण सहकारी संस्था लि. (Pragati SACCOS)  
**Location**: बर्दिया, नेपाल (Bardiya, Nepal)

