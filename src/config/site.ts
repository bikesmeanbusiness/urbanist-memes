export const siteConfig = {
    name: process.env.NEXT_PUBLIC_SITE_NAME || 'Urbanist Memes',
    description: process.env.NEXT_PUBLIC_SITE_DESCRIPTION || 'A curated collection of pro-city, pro-transit, and pro-people content.',
    url: process.env.NEXT_PUBLIC_SITE_URL || 'https://urbanist-memes.vercel.app',
    ogImage: 'https://urbanist-memes.vercel.app/og.jpg',
    links: {
        github: 'https://github.com/urbanist-memes',
    },
    // Text for the homepage hero section
    hero: {
        title: process.env.NEXT_PUBLIC_HERO_TITLE || 'Urbanist Memes',
        subtitle: process.env.NEXT_PUBLIC_HERO_SUBTITLE || 'A curated collection of pro-city, pro-transit, and pro-people content.',
    },
};
