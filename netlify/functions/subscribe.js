// ==========================================
// Newsletter Subscription Function
// Handles ConvertKit API calls securely
// ==========================================

const fetch = require('node-fetch');

exports.handler = async function(event, context) {
    // Only allow POST requests
    if (event.httpMethod !== 'POST') {
        return {
            statusCode: 405,
            body: JSON.stringify({ error: 'Method not allowed' })
        };
    }
    
    try {
        // Parse request body
        const { email, first_name } = JSON.parse(event.body);
        
        // Validate email
        if (!email || !email.includes('@')) {
            return {
                statusCode: 400,
                body: JSON.stringify({ error: 'Valid email is required' })
            };
        }
        
        // Call ConvertKit API
        const response = await fetch(
            `https://api.convertkit.com/v3/forms/${process.env.CONVERTKIT_FORM_ID}/subscribe`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    api_key: process.env.CONVERTKIT_API_KEY,
                    email: email,
                    first_name: first_name || ''
                })
            }
        );
        
        const data = await response.json();
        
        if (!response.ok) {
            throw new Error(data.message || 'Subscription failed');
        }
        
        // Success!
        return {
            statusCode: 200,
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                success: true,
                message: 'Successfully subscribed!'
            })
        };
        
    } catch (error) {
        console.error('Subscription error:', error);
        
        return {
            statusCode: 500,
            body: JSON.stringify({
                error: 'Subscription failed. Please try again.'
            })
        };
    }
};
