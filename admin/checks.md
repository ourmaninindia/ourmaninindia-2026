Here's a structured approach to post-website design:

**Immediate checks**

- Run your site through [PageSpeed Insights](https://pagespeed.web.dev) — checks performance, accessibility and SEO on both mobile and desktop
- Run through [Wave](https://wave.webaim.org) — accessibility checker, catches missing alt text, contrast issues, heading structure
- Check all forms end to end on production — subscribe, contact, unsubscribe
- Test on mobile — real device if possible, not just DevTools
- Check dark mode works correctly throughout

**SEO basics**
- Verify Google Search Console is set up and your sitemap submitted (`/sitemap.xml`)
- Check every page has a unique `<title>` and meta description
- Check images have meaningful `alt` attributes
- Run [Screaming Frog](https://www.screamingfrog.co.uk) free tier to crawl for broken links and missing meta

**Content**
- Make sure each section (Blog, Cycling, Tech) has enough content to be useful
- Add an About page if you don't have one — important for a personal blog
- Check all author data is correct in your data files

**Newsletter**
- Send yourself a test campaign in Brevo to verify the header, footer and unsubscribe link all work
- Confirm the unsubscribe page pre-fills correctly from the email link

**Longer term**
- Set up Brevo automation for a welcome email when someone subscribes
- Add Open Graph meta tags for better social sharing previews
- Consider adding a search feature — Hugo has good options for this
- Add reading time to articles if not already there

