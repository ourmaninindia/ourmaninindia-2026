// ==========================================
// Contact Form Function
// Sends email via SendGrid or similar
// ==========================================

const fetch = require('node-fetch');

exports.handler = async function(event, context) {
    if (event.httpMethod !== 'POST') {
        return {
            statusCode: 405,
            body: JSON.stringify({ error: 'Method not allowed' })
        };
    }
    
    try {
        const { name, email, message } = JSON.parse(event.body);
        
        // Validate inputs
        if (!name || !email || !message) {
            return {
                statusCode: 400,
                body: JSON.stringify({ error: 'All fields are required' })
            };
        }
        
        // Send via SendGrid (example)
        const response = await fetch('https://api.sendgrid.com/v3/mail/send', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${process.env.SENDGRID_API_KEY}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                personalizations: [{
                    to: [{ email: process.env.CONTACT_EMAIL }],
                    subject: 'New Contact Form Submission'
                }],
                from: { email: 'noreply@yourdomain.com' },
                content: [{
                    type: 'text/plain',
                    value: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`
                }]
            })
        });
        
        if (!response.ok) {
            throw new Error('Email send failed');
        }
        
        return {
            statusCode: 200,
            body: JSON.stringify({
                success: true,
                message: 'Message sent successfully!'
            })
        };
        
    } catch (error) {
        console.error('Contact form error:', error);
        
        return {
            statusCode: 500,
            body: JSON.stringify({
                error: 'Failed to send message. Please try again.'
            })
        };
    }
};