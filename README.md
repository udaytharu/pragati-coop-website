# Cooperative Website Documentation

## Project Structure
```
coop/
├── assets/
│   ├── css/
│   │   └── styles.css      # Main stylesheet
│   ├── js/
│   │   └── script.js       # Main JavaScript file
│   └── images/
│       ├── members/        # Member profile images
│       └── hero.jpg        # Banner image
├── pages/
│   ├── about/             # About us pages
│   ├── services/          # Service center pages
│   ├── notices/           # Notice board pages
│   ├── downloads/         # Downloadable documents
│   ├── bank-details/      # Bank information pages
│   └── faq.html           # FAQ page
└── index.html             # Main homepage
```

## Style Guidelines

### Color Scheme
- Primary Blue: #1976D2
- Secondary Blue: #1565C0
- Background Gradient: rgba(227, 242, 253, 0.3) to rgba(227, 242, 253, 0.5)
- Text Colors: 
  - Main: #000000
  - Secondary: #424242
  - Light: #757575

### Typography
- Font Family: Arial, sans-serif
- Headings:
  - H1: 2rem (32px)
  - H2: 1.8rem (28.8px)
  - H3: 1.2rem (19.2px)
- Body Text: 1rem (16px)
- Small Text: 0.9rem (14.4px)

### Components

#### Navigation Menu
- Fixed position at top
- Responsive dropdown for "About Us"
- Mobile hamburger menu below 768px
- Gradient background with shadow

#### News Slider
- Container height: 60px
- Horizontal scrolling
- Continuous animation
- Hidden scrollbars
- Max-width: 1200px

#### Service Cards
- Grid layout
- Hover effects with elevation
- Gradient background
- Border radius: 8px
- Shadow on hover

#### Notice Items
- Grid layout
- Fixed height containers
- Image thumbnails
- Hover effects
- Responsive design

### Responsive Breakpoints
- Mobile: < 768px
- Tablet: 768px - 1024px
- Desktop: > 1024px

## Editing Guidelines

### Adding New Pages
1. Create HTML file in appropriate directory under `pages/`
2. Include necessary CSS and JS files
3. Follow existing page structure
4. Use consistent class names

### Modifying Styles
1. Use existing color variables
2. Follow component patterns
3. Test responsiveness
4. Maintain consistent spacing

### Adding Content
1. Images:
   - Place in appropriate directory under `assets/images/`
   - Optimize for web
   - Use descriptive filenames
2. Documents:
   - Place in `pages/downloads/`
   - Use PDF format
   - Include clear naming convention

### Best Practices
1. Keep HTML semantic
2. Use appropriate heading hierarchy
3. Maintain consistent spacing
4. Test across different devices
5. Optimize images before adding
6. Keep file names lowercase with hyphens

## Common Components

### Navigation Structure
```html
<nav class="nav-menu">
    <ul>
        <li><a href="/">Home</a></li>
        <li class="dropdown">
            <a href="#" class="dropdown-toggle">About Us</a>
            <ul class="dropdown-menu">
                <li><a href="/pages/about/profile.html">Cooperative Profile</a></li>
                <li><a href="/pages/about/members.html">Committee Members</a></li>
            </ul>
        </li>
        <!-- Other menu items -->
    </ul>
</nav>
```

### News Slider Structure
```html
<div class="news-slider-container">
    <div class="news-slider">
        <div class="news-item">News content here</div>
        <!-- More news items -->
    </div>
</div>
```

### Service Card Structure
```html
<div class="service-item">
    <h3>Service Title</h3>
    <p>Service description</p>
</div>
```

## Contact
For any questions or assistance, please contact the website administrator.

## Version History
- v1.0.0: Initial release
- v1.1.0: Added responsive navigation
- v1.2.0: Implemented news slider
- v1.3.0: Added service centers page 