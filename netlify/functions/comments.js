const NETLIFY_ACCESS_TOKEN = process.env.NETLIFY_ACCESS_TOKEN;
const NETLIFY_SITE_ID = process.env.NETLIFY_SITE_ID;

export default async function handler(req, context) {
    const url = new URL(req.url);
    const pageId = url.searchParams.get('pageId');

    if (!pageId) {
        return new Response(JSON.stringify({ error: 'pageId is required' }), {
            status: 400,
            headers: { 'Content-Type': 'application/json' }
        });
    }

    try {
        // Fetch all submissions for the comments form
        const response = await fetch(
            `https://api.netlify.com/api/v1/sites/${NETLIFY_SITE_ID}/forms/comments/submissions?per_page=100`,
            {
                headers: {
                    'Authorization': `Bearer ${NETLIFY_ACCESS_TOKEN}`
                }
            }
        );

        if (!response.ok) {
            throw new Error(`Netlify API error: ${response.status}`);
        }

        const submissions = await response.json();

        // Filter by pageId and shape the data
        const comments = submissions
            .filter(s => s.data.page_id === pageId)
            .map(s => ({
                id: s.id,
                name: s.data.name,
                message: s.data.message,
                parent_id: s.data.parent_id || null,
                created_at: s.created_at
            }))
            .sort((a, b) => new Date(a.created_at) - new Date(b.created_at));

        return new Response(JSON.stringify(comments), {
            status: 200,
            headers: { 'Content-Type': 'application/json' }
        });

    } catch (error) {
        return new Response(JSON.stringify({ error: error.message }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        });
    }
};

export const config = {
    path: '/api/comments'
};