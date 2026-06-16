# GitHub Pages Deployment Guide

Your Rubber Succubus website is ready to deploy to GitHub Pages. Follow these steps:

## Quick Start

1. **Clone to your computer:**
   ```bash
   git clone https://github.com/Puplogan2346/rubber-succubus.git
   cd rubber-succubus
   ```

2. **Install dependencies:**
   ```bash
   npm install
   # or
   pnpm install
   ```

3. **Update social links** (IMPORTANT):
   Edit `client/src/config/socialLinks.ts` and replace:
   - `https://x.com/rubber_succubus` → Your X/Twitter URL
   - `rubbersuccubusbiz@gmail.com` → Your email

4. **Build the site:**
   ```bash
   npm run build
   ```

5. **Deploy to GitHub Pages:**
   ```bash
   git add dist -f
   git commit -m "Deploy site"
   git push origin main
   ```

6. **Enable GitHub Pages:**
   - Go to your repo settings
   - Scroll to "Pages"
   - Set source to `main` branch, `/dist` folder
   - Your site will be live at: `https://Puplogan2346.github.io/rubber-succubus/`

## File Structure

```
client/
  src/
    pages/          ← Edit page content here
    components/     ← Reusable UI components
    config/         ← Social links configuration
    index.css       ← Global styles
  public/
    bg.webp         ← Your background image
    favicon.ico
```

## Customization

### Change Social Links
Edit `client/src/config/socialLinks.ts`:
```typescript
export const socialLinks: SocialLink[] = [
  {
    name: "Twitter",
    url: "https://x.com/YOUR_HANDLE",  // ← Update this
    icon: Heart,
    label: "X / Twitter",
  },
  {
    name: "Email",
    url: "mailto:your-email@example.com",  // ← Update this
    icon: Mail,
    label: "Email",
  },
];
```

### Update Content
- **Home page**: `client/src/pages/Home.tsx`
- **Services**: `client/src/pages/Services.tsx`
- **Gallery**: `client/src/pages/Gallery.tsx`
- **FAQ**: `client/src/pages/FAQ.tsx`
- **Events**: `client/src/pages/Events.tsx`
- **Connect**: `client/src/pages/Connect.tsx`

### Change Colors
Edit `client/src/index.css` to modify the color scheme. Current palette:
- Primary: Red (`#dc2626`)
- Background: Black (`#000000`)
- Accent: Cream (`#f5f5dc`)

## Development

Run locally before deploying:
```bash
npm run dev
```

Then visit `http://localhost:5173`

## Troubleshooting

**Images not loading?**
- Make sure `client/public/bg.webp` exists
- Check that image paths in components use `/bg.webp` (with leading slash)

**Styles not applying?**
- Run `npm run build` again
- Clear browser cache (Ctrl+Shift+Delete)

**Deploy not working?**
- Make sure `dist` folder is committed: `git add dist -f`
- Check GitHub Pages settings point to `/dist` folder

## Support

This is a static React site with no backend. All data is hardcoded in the components. To add dynamic features (forms, databases), you'll need additional services like:
- Formspree (contact forms)
- Firebase (real-time data)
- Netlify Functions (serverless backend)

Good luck! 🚀
