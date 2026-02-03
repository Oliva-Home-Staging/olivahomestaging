# Instagram Feed Update Instructions

Your website now has an Instagram feed similar to bellacasasf.com with a load more button functionality. Here's how to update it with your real Instagram content:

## Quick Update Method

1. **Open instagram-posts.js** in your text editor
2. **Visit your Instagram**: https://www.instagram.com/olivahomestaging/
3. **For each post you want to display:**
   - Right-click on the image → "Copy image address" (or "Copy image URL")
   - Click on the post to open it → Copy the URL from the browser address bar
   - Copy the caption text
4. **Replace the placeholder data** in instagram-posts.js with your real content

## Detailed Steps

### Step 1: Get Instagram Image URLs
```javascript
// Replace this placeholder URL:
imageUrl: 'https://picsum.photos/400/400?random=1',
// With your real Instagram image URL:
imageUrl: 'https://scontent-lax3-1.cdninstagram.com/v/t51.29350-15/your-image.jpg',
```

### Step 2: Get Instagram Post URLs
```javascript
// Replace this placeholder URL:
permalink: 'https://www.instagram.com/p/example1/',
// With your real Instagram post URL:
permalink: 'https://www.instagram.com/p/ABC123XYZ/',
```

### Step 3: Update Captions
```javascript
// Replace placeholder captions with your real Instagram captions:
caption: 'Your actual Instagram caption text with hashtags #homestaging #losangeles',
```

## Example of Updated Entry
```javascript
{
    id: 1,
    imageUrl: 'https://scontent-lax3-1.cdninstagram.com/v/t51.29350-15/123456789_your_image.jpg',
    permalink: 'https://www.instagram.com/p/CBA123XYZ/',
    caption: 'Beautiful staging project in Pasadena! This home sold in just 5 days above asking price. Our flat-rate pricing made this luxury staging affordable for the sellers. #homestaging #pasadena #realestate #luxury',
    timestamp: '2024-02-01T12:00:00.000Z'
}
```

## Features of Your New Instagram Feed

### ✅ Load More Button
- Shows 9 posts initially
- "Load More" button loads 9 more posts
- Button disappears when all posts are shown

### ✅ Responsive Design
- 3-column grid on desktop
- 3-column grid on mobile (optimized spacing)
- Hover effects show captions
- Direct click-through to Instagram posts

### ✅ Professional Styling
- Minimal gaps between images (like bellacasasf.com)
- Clean, professional appearance
- Smooth hover animations
- Mobile-optimized

## Maintenance Tips

1. **Regular Updates**: Update instagram-posts.js monthly with new content
2. **Image Quality**: Instagram provides high-quality image URLs automatically
3. **Caption Length**: Captions are truncated automatically for display
4. **Loading Order**: Posts are displayed in the order they appear in the array

## Backup Your Changes

After updating with real content, make sure to:
1. Save instagram-posts.js
2. Test the website locally
3. Backup your updated file before making further changes

Your Instagram feed is now ready for real content! The load more functionality works exactly like bellacasasf.com with clean, professional styling.