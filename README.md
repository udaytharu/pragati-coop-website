# Pragati SACCOS Website

A modern, responsive website for Pragati Saving And Credit Cooperative Ltd., built with HTML, CSS, and JavaScript.

## Project Structure

```
pragati-saccos/
├── assets/
│   ├── css/
│   │   └── styles.css
│   ├── js/
│   │   ├── script.js
│   │   └── components.js      # Component loader and initialization
│   └── images/
│       └── ...
├── components/                # Reusable components
│   ├── header.html           # Header component
│   └── footer.html           # Footer component
├── pages/
│   ├── about/
│   │   └── members.html
│   ├── services/
│   │   └── services.html
│   ├── notices/
│   │   └── notice.html
│   ├── downloads/
│   │   └── downloads.html
│   ├── bank-details/
│   │   └── bank_details.html
│   ├── privacy-policy/
│   │   └── privacy-policy.html
│   └── faq/
│       └── faq.html
├── index.html
└── README.md
```

## Features

- Responsive design for all devices
- Component-based architecture for better maintainability
- Modern UI with smooth animations
- Accessible navigation
- Contact form with EmailJS integration
- Dynamic content loading
- SEO optimized
- Combined Privacy Policy & Terms of Service page
- Welcome alert message for first-time visitors
- Service cards with full image display
- Bank details with QR codes
- Notice board with image support

## Component Structure

The website uses a component-based architecture for better maintainability and reusability:

### Header Component (`components/header.html`)
- Logo
- Navigation menu
- Mobile-responsive hamburger menu
- Dropdown menus for About Us section

### Footer Component (`components/footer.html`)
- Quick links to all pages (including Privacy Policy)
- Important external links
- Office hours
- Contact information
- Social media links
- Copyright information

### Component Loader (`assets/js/components.js`)
- Asynchronous component loading
- Event listener initialization
- Mobile menu handling
- Dropdown menu functionality
- Scroll-to-top button

## Pages

### Privacy Policy & Terms of Service (`pages/privacy-policy/privacy-policy.html`)
- Comprehensive privacy information
- Terms of Service with user responsibilities
- Intellectual property rights
- Limitation of liability
- Information collection and usage details
- Security measures
- User rights
- Contact information
- Last updated date

### Services (`pages/services/services.html`)
- Detailed service cards with images
- Savings accounts information
- Loan services details
- Responsive grid layout
- Full image display with aspect ratio preservation

### Bank Details (`pages/bank-details/bank_details.html`)
- Bank account information
- QR codes for easy payments
- Multiple payment options
- Responsive layout

### Notices (`pages/notices/notice.html`)
- Notice board with image support
- Horizontal scrolling for notices
- Responsive design
- Image preview functionality

## Recent Updates

- Combined Privacy Policy and Terms of Service into a single page
- Updated service images to display full images while maintaining aspect ratio
- Added welcome alert message for first-time visitors
- Improved responsive design for all pages
- Updated footer with privacy policy link
- Enhanced service cards with better image display
- Added bank details page with QR codes
- Implemented notice board with image support

## Setup and Usage

1. Clone the repository:
```bash
git clone [repository-url]
```

2. Set up EmailJS:
   - Sign up at [EmailJS](https://www.emailjs.com/)
   - Create an email service
   - Create an email template
   - Replace `YOUR_PUBLIC_KEY`, `YOUR_SERVICE_ID`, and `YOUR_TEMPLATE_ID` in the code

3. To use components in a new page:
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <!-- Required meta tags and stylesheets -->
    <link rel="stylesheet" href="/assets/css/styles.css">
</head>
<body>
    <!-- Header Component -->
    <div id="header-container"></div>

    <!-- Your page content here -->

    <!-- Footer Component -->
    <div id="footer-container"></div>

    <!-- Required scripts -->
    <script src="/assets/js/components.js"></script>
    <script src="/assets/js/script.js"></script>
</body>
</html>
```

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Opera (latest)

## Dependencies

- Font Awesome 6.5.1
- EmailJS SDK

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Contact

Pragati SACCOS - [saccospragati@gmail.com](mailto:saccospragati@gmail.com)

Website Link: [https://www.pragati.com.np](https://www.pragati.com.np)

## Acknowledgments

- Created by [uday-studio](https://www.udayrajchaudhary.com.np/)
- Font Awesome for icons
- EmailJS for contact form functionality secreat keys are not used yet.