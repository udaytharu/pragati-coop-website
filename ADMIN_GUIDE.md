# Admin Panel Guide

## Overview

The admin panel provides a complete Content Management System (CMS) for managing notices and news posts without requiring a server backend.

## Accessing the Admin Panel

1. Navigate to `/admin/login.html`
2. Default credentials:
   - **Username**: `admin`
   - **Password**: `admin123`
3. ⚠️ **Important**: Change the default password immediately after first login!

## Features

### 1. Posts Management

View, edit, and delete all posts (notices and news) from one place.

**Features:**
- View all posts in a grid layout
- Filter by type (All, Notices, News)
- Edit existing posts
- Delete posts with confirmation
- See post preview with image, heading, date, and content

**How to Use:**
1. Click "Posts Management" in the sidebar
2. Use filter tabs to view specific post types
3. Click "Edit" to modify a post
4. Click "Delete" to remove a post (requires confirmation)

### 2. Create Notice

Create new notice posts for important announcements.

**Steps:**
1. Click "Create Notice" in the sidebar
2. Fill in the form:
   - **Heading** (required): Notice title
   - **Date of Post** (required): Select the post date
   - **Image** (optional): Upload an image (JPG, PNG, GIF, max 5MB)
   - **Content** (required): Notice content/description
3. Click "Publish Notice"
4. Post will be saved and available immediately

**Tips:**
- Use clear, descriptive headings
- Add images to make notices more engaging
- Keep content concise and well-formatted

### 3. Create News & Activity

Create news posts and activity updates.

**Steps:**
1. Click "Create News" in the sidebar
2. Fill in the form (same fields as notices)
3. Click "Publish News"
4. Post will be saved and available immediately

### 4. Data Management

Export, import, and sync your posts data.

#### Export Posts
- Downloads all posts as a JSON file
- Use this to backup your data
- Upload the file to `/data/posts.json` to make posts available online

**Steps:**
1. Go to Settings → Data Management
2. Click "Export Posts"
3. Save the downloaded `posts.json` file
4. Replace `/data/posts.json` in your repository with this file
5. Commit and push to make posts available online

#### Import Posts
- Restore posts from a JSON backup file
- Useful for migrating data or restoring backups

**Steps:**
1. Go to Settings → Data Management
2. Click "Import Posts"
3. Select your `posts.json` file
4. Posts will be imported and saved

#### Sync Data
- Refreshes data from the online JSON file
- Updates localStorage with latest online data
- Clears cache to fetch fresh data

**Steps:**
1. Go to Settings → Data Management
2. Click "Sync Data"
3. Wait for confirmation message

### 5. Change Password

Update your admin password for security.

**Steps:**
1. Go to Settings → Change Password
2. Enter current password
3. Enter new password (minimum 6 characters)
4. Confirm new password
5. Click "Update Password"

**Password Requirements:**
- Minimum 6 characters
- Current password must be correct
- New password and confirmation must match

## Best Practices

### Content Creation
- **Headings**: Use clear, descriptive titles
- **Dates**: Always set the correct post date
- **Images**: Optimize images before uploading (keep under 5MB)
- **Content**: Write clear, well-formatted content
- **Regular Updates**: Keep content fresh and relevant

### Data Management
- **Regular Backups**: Export posts regularly
- **Version Control**: Keep exported JSON files as backups
- **Online Sync**: Upload exported files to make posts available online
- **Test Before Publishing**: Preview content before publishing

### Security
- **Change Default Password**: Update password immediately
- **Use Strong Passwords**: Choose a secure password
- **Logout**: Always logout when done
- **Session Management**: Sessions expire on browser close

## Making Posts Available Online

### Quick Method
1. Create/edit posts in admin panel
2. Go to Settings → Data Management
3. Click "Export Posts"
4. Replace `/data/posts.json` with exported file
5. Commit and push to repository

### For GitHub Pages
1. Export posts from admin panel
2. Upload `posts.json` to `/data/` directory
3. Commit changes
4. Push to repository
5. Posts will be live automatically

## Troubleshooting

### Posts Not Showing
- **Check**: Verify posts are saved (check localStorage)
- **Solution**: Export and upload to `/data/posts.json`
- **Alternative**: Use "Sync Data" to refresh

### Can't Login
- **Check**: Verify credentials are correct
- **Solution**: Clear browser cache and try again
- **Reset**: If needed, clear localStorage and reinitialize

### Import Failed
- **Check**: Ensure JSON file is valid
- **Solution**: Verify file structure matches expected format
- **Format**: Must have `notices` and `news` arrays

### Images Not Loading
- **Check**: Verify image size (max 5MB)
- **Solution**: Optimize images before uploading
- **Format**: Use JPG, PNG, or GIF formats

## Keyboard Shortcuts

- **Escape**: Close modals
- **Enter**: Submit forms (when focused)
- **Tab**: Navigate between fields

## Mobile Access

The admin panel is fully responsive and can be accessed from mobile devices:
- Sidebar collapses to a menu on mobile
- All features work on touch devices
- Forms are optimized for mobile input

## Support

For issues or questions:
1. Check this guide first
2. Verify file paths and structure
3. Check browser console for errors
4. Ensure all scripts are loaded correctly

## Notes

- Posts are saved to localStorage immediately
- Export is required to make posts available online
- Images are stored as Base64 (consider external hosting for large files)
- Sessions expire when browser is closed
- All changes are saved automatically

