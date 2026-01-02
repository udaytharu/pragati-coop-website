# Project Structure

## Directory Overview

```
coop2/
├── admin/                          # Admin Panel
│   ├── dashboard.html              # Admin dashboard
│   ├── login.html                  # Admin login page
│   ├── admin.css                   # Admin styles (legacy)
│   └── admin.js                    # Admin scripts (legacy)
│
├── assets/                         # Static Assets
│   ├── css/                        # Stylesheets
│   │   ├── admin.css               # Admin panel styles
│   │   ├── bank-details.css        # Bank details page styles
│   │   ├── downloads.css           # Downloads page styles
│   │   ├── news.css                # News page styles
│   │   ├── notice.css              # Notice page styles
│   │   └── styles.css              # Main website styles
│   │
│   ├── images/                     # Image Assets
│   │   ├── favicon.png             # Site favicon
│   │   ├── hero.jpg                # Hero section image
│   │   ├── main.png                # Main logo/image
│   │   ├── gmail.png               # Gmail icon
│   │   ├── whatapp.png             # WhatsApp icon
│   │   ├── outreach_image/         # Outreach program images
│   │   └── services/               # Service-related images
│   │
│   └── js/                         # JavaScript Files
│       ├── admin.js                # Admin panel functionality
│       ├── components.js           # Reusable components (header/footer)
│       ├── data-service.js         # CMS data service
│       ├── downloads.js            # Downloads page functionality
│       ├── news-display.js         # News display logic
│       ├── notice-display.js       # Notice display logic
│       └── script.js               # Main website scripts
│
├── components/                     # Reusable HTML Components
│   ├── footer.html                 # Site footer
│   └── header.html                 # Site header/navigation
│
├── data/                           # CMS Data Storage
│   └── posts.json                  # Posts database (notices & news)
│
├── notice/                         # Notice Section
│   ├── notice.html                 # Notice display page
│   ├── notice img/                 # Notice images
│   └── alert notice img/           # Alert notice images
│
├── NewsandActivities/              # News & Activities Section
│   └── news.html                   # News display page
│
├── pages/                          # Website Pages
│   ├── about/                      # About Section
│   │   ├── AccSupCommittee.html    # Account Supervision Committee
│   │   ├── AdvisoryCommittee.html  # Advisory Committee
│   │   ├── BOD.html                # Board of Directors
│   │   ├── employee.html           # Employee information
│   │   ├── managermessage.html     # Manager's message
│   │   └── subCommitte.html        # Sub-committee
│   │
│   ├── bank-details/               # Bank Details
│   │   ├── bank_details.html       # Bank details page
│   │   ├── bank_details.css        # Bank details styles
│   │   └── qr_img/                 # QR code images
│   │
│   ├── employee-gallery/            # Employee Gallery
│   │   └── employee_gallery.html    # Gallery page
│   │
│   ├── faq/                        # FAQ Section
│   │   └── faq.html                # Frequently asked questions
│   │
│   ├── privacy-policy/             # Privacy Policy
│   │   └── privacy-policy.html     # Privacy policy page
│   │
│   ├── rulesRegudownload/          # Rules & Downloads
│   │   ├── downloads.html          # Downloads page
│   │   ├── downloads.css           # Downloads styles
│   │   ├── downloads.js            # Downloads functionality
│   │   └── pdfs/                   # PDF Documents
│   │       ├── external/           # External PDFs
│   │       ├── internal/           # Internal PDFs
│   │       └── Pragati.pdf         # Main document
│   │
│   ├── service_center/              # Service Centers
│   │   └── service-centers.html     # Service centers page
│   │
│   ├── services/                   # Services Section
│   │   ├── services.html           # Services overview
│   │   ├── loan.html               # Loan services
│   │   ├── remittance.html         # Remittance services
│   │   └── saving.html              # Saving services
│   │
│   └── tools/                      # Tools & Calculators
│       └── emi_calc.html           # EMI Calculator
│
├── annualrepo/                     # Annual Reports
│   ├── repo.html                   # Reports page
│   └── pdf/                        # Report PDFs
│
├── member_img/                     # Member Images
│   └── member.png                  # Member photo
│
├── index.html                      # Homepage
├── CNAME                           # Custom domain configuration
└── README.md                       # Project documentation
```

## File Types

### HTML Files
- **Main Pages**: `index.html`, `notice/notice.html`, `NewsandActivities/news.html`
- **Admin Pages**: `admin/login.html`, `admin/dashboard.html`
- **Content Pages**: Various pages in `pages/` directory

### CSS Files
- **Main Styles**: `assets/css/styles.css`
- **Page-Specific**: Individual CSS files for each section
- **Admin Styles**: `assets/css/admin.css`

### JavaScript Files
- **Core**: `assets/js/script.js`, `assets/js/components.js`
- **CMS**: `assets/js/data-service.js`
- **Display**: `assets/js/notice-display.js`, `assets/js/news-display.js`
- **Admin**: `assets/js/admin.js`
- **Features**: `assets/js/downloads.js`

### Data Files
- **Posts Database**: `data/posts.json` (JSON format)
- **Configuration**: `CNAME` for custom domain

## Key Directories

### `/admin`
Contains all admin panel files for content management.

### `/assets`
Centralized location for all static assets (CSS, JS, images).

### `/components`
Reusable HTML components loaded dynamically.

### `/data`
CMS data storage for posts (notices and news).

### `/pages`
All content pages organized by category.

### `/notice` & `/NewsandActivities`
Main content display pages for notices and news.

## Asset Organization

- **CSS**: All stylesheets in `assets/css/`
- **JavaScript**: All scripts in `assets/js/`
- **Images**: All images in `assets/images/` with subdirectories
- **PDFs**: Documents in `pages/rulesRegudownload/pdfs/`

## CMS Structure

- **Data Service**: `assets/js/data-service.js`
- **Data Storage**: `data/posts.json`
- **Admin Interface**: `admin/dashboard.html`
- **Display Pages**: `notice/notice.html`, `NewsandActivities/news.html`

