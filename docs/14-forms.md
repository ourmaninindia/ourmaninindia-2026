# Forms & Newsletter System

Documentation for the forms, Netlify functions, and newsletter pipeline used on ourmaninindia.com.

All forms use a shared `forms.js` module for validation and submission. Server-side logic runs as Netlify Functions (v2 syntax). The newsletter is managed via Brevo, and contact form emails are sent via SendGrid.

---

## Architecture

| Form | Netlify Function | Service |
|------|-----------------|---------|
| Newsletter signup | `/.netlify/functions/subscribe` | Brevo — adds contact to list |
| Contact form | `/.netlify/functions/contact` | SendGrid — sends email |
| Unsubscribe | `/.netlify/functions/unsubscribe` | Brevo — removes from list |
| Unsubscribe reason | `/.netlify/functions/unsubscribe-reason` | Netlify logs only |

---

## Newsletter Signup

### Overview
The newsletter form is a sidebar widget included on multiple pages via `layouts/partials/sidebar/newsletter.html`. Subscribers choose which sections they are interested in (Blog, Cycling, Tech), enter their name and email, and are added to the Brevo contact list.

### Form Fields
- **Sections** — checkboxes (Blog, Cycling, Tech) — at least one required
- **First name** — optional
- **Last name** — optional
- **Email** — required, validated

### File Locations
- Template: `layouts/partials/sidebar/newsletter.html`
- Function: `netlify/functions/subscribe.js`
- Endpoint: `POST /.netlify/functions/subscribe`

### Payload
```json
{ "email": "user@example.com", "firstname": "Alfred", "lastname": "Tuinman", "sections": ["cycling", "blog"] }
```

### Brevo Integration
Subscribers are added to list ID 3 with the following contact attributes:

| Attribute | Value |
|-----------|-------|
| `FIRSTNAME` | Subscriber's first name |
| `LASTNAME` | Subscriber's last name |
| `SECTIONS` | Comma-separated selected sections e.g. `cycling, blog` |

The `SECTIONS` attribute enables Brevo segments for targeted campaigns — e.g. send cycling posts only to contacts where SECTIONS contains `cycling`.

### Environment Variables
| Variable | Description |
|----------|-------------|
| `BREVO_API_KEY` | Brevo API key (Settings → SMTP & API → API Keys) |
| `BREVO_LIST_ID` | Numeric list ID — currently `3` |

### Hugo Config
```toml
# config/_default/params.toml
newsletterAction = "/.netlify/functions/subscribe"
```

---

## Contact Form

### Overview
The contact form is on the `/contact` page. Messages are sent to `alfred@ourmaninindia.com` via SendGrid. Floating labels are used — labels act as placeholders and float to the border on focus.

### Form Fields
- **Name** — required
- **Email** — required, validated
- **Subject** — required
- **Message** — required textarea

### File Locations
- Template: `layouts/_default/contact.html`
- Function: `netlify/functions/contact.js`
- Endpoint: `POST /.netlify/functions/contact`

### Payload
```json
{ "name": "Alfred", "email": "user@example.com", "subject": "Hello", "message": "Your message here" }
```

### SendGrid Integration
Emails are sent from `CONTACT_FROM_EMAIL` to `CONTACT_EMAIL`. The `reply_to` is set to the visitor's email so replies go directly back to them.

### Environment Variables
| Variable | Description |
|----------|-------------|
| `SENDGRID_API_KEY` | SendGrid API key — restricted to Mail Send only |
| `CONTACT_EMAIL` | Recipient inbox — `alfred@ourmaninindia.com` |
| `CONTACT_FROM_EMAIL` | Verified sender — `alfred@ourmaninindia.com` |

---

## Unsubscribe

### Overview
The unsubscribe page at `/unsubscribe` allows subscribers to remove themselves from the mailing list. It is a three-step flow: confirm email → success with optional reason survey → thank you. The email field is pre-filled when the URL includes `?email=` parameter.

### Steps
1. Subscriber enters and confirms their email address
2. Success message shown. Optional survey asks why they unsubscribed
3. Error state with retry button if the request fails

### Reason Survey Options
- I no longer want to receive these emails
- The emails are too frequent
- The content is no longer relevant to me
- I have too many emails in general
- Other — reveals a free-text textarea

### File Locations
- Template: `layouts/_default/unsubscribe.html`
- JS module: `assets/js/modules/unsubscribe.js`
- Function: `netlify/functions/unsubscribe.js`
- Reason function: `netlify/functions/unsubscribe-reason.js`
- Endpoint: `POST /.netlify/functions/unsubscribe`
- Reason endpoint: `POST /.netlify/functions/unsubscribe-reason`

### Brevo Integration
The unsubscribe function removes the contact from list ID 3. It does not delete the contact entirely — just removes them from the list. A 404 response (contact not found) is treated as success.

The reason submission is best-effort — if it fails, the error is logged silently and not shown to the user since the unsubscribe has already succeeded.

### Environment Variables
| Variable | Description |
|----------|-------------|
| `BREVO_API_KEY` | Brevo API key |
| `BREVO_LIST_ID` | Numeric list ID — currently `3` |

### Unsubscribe Link in Emails
In Brevo email campaigns, add the following to the email footer. Brevo replaces `{{ contact.EMAIL }}` with the subscriber's actual email when sending:

```
https://ourmaninindia.com/unsubscribe?email={{ contact.EMAIL }}
```

### Dev Preview
To preview different steps during development without submitting the form:

```
/unsubscribe/?step=success
/unsubscribe/?step=error
/unsubscribe/?step=success&email=test@example.com
```

---

## forms.js — Shared Form Module

### Overview
All forms use a single shared module at `assets/js/modules/forms.js`. Behaviour is configured entirely via HTML data attributes — no JavaScript changes are needed to add a new form.

### Data Attributes on `<form>`

| Attribute | Purpose |
|-----------|---------|
| `data-endpoint` | **Required.** POST URL for form submission |
| `data-success-message` | Inline success message shown after submission |
| `data-error-message` | Fallback error message on failure |
| `data-checkbox-group` | CSS class of checkbox group — at least one must be checked |
| `data-checkbox-error` | ID of element to show checkbox validation error in |
| `data-msg-checkbox-required` | Override default checkbox error message |
| `data-success-modal` | ID of modal to open on success (instead of inline message) |
| `data-error-modal` | ID of modal to open on error (instead of inline message) |

### Data Attributes on `<input>` / `<textarea>`

| Attribute | Purpose |
|-----------|---------|
| `data-error` | ID of element to show field error in |
| `data-msg-required` | Override required field error message |
| `data-msg-invalid` | Override invalid value error message |
| `data-msg-too-short` | Override too short error message |
| `data-msg-too-long` | Override too long error message |

### Example — Contact Form
```html
<form
    data-endpoint="/.netlify/functions/contact"
    data-success-message="Thank you! I'll get back to you as soon as I can."
    data-error-message="Failed to send message. Please try again."
    novalidate>
    <input type="email" name="email" required
        data-error="email-error"
        data-msg-invalid="Please enter a valid email address">
    <span id="email-error" class="form__error"></span>
</form>
```

---

## Netlify Environment Variables

Set in **Netlify dashboard → Site configuration → Environment variables**. Never put secret keys in `netlify.toml` as it is committed to git.

### Secret variables (Netlify dashboard only)
| Variable | Description |
|----------|-------------|
| `BREVO_API_KEY` | Brevo API key |
| `BREVO_LIST_ID` | Brevo contact list ID — currently `3` |
| `SENDGRID_API_KEY` | SendGrid API key — restricted to Mail Send |
| `CONTACT_EMAIL` | Recipient inbox — `alfred@ourmaninindia.com` |
| `CONTACT_FROM_EMAIL` | Verified SendGrid sender — `alfred@ourmaninindia.com` |

### Non-secret variables (safe for `netlify.toml`)
| Variable | Description |
|----------|-------------|
| `HUGO_VERSION` | Hugo build version — currently `0.154.5` |
| `HUGO_EXTENDED` | Must be `true` for SCSS compilation |
| `HUGO_ENV` | Set to `production` for live builds |
| `DART_SASS_VERSION` | Dart Sass version — currently `1.97.3` |

---

## Brevo Account Notes

- Free plan — 300 emails/day, unlimited contacts
- List ID `3` — Newsletter subscribers
- Custom attribute `SECTIONS` — stores subscriber topic preferences (e.g. `cycling, blog`)
- Custom attributes `FIRSTNAME` and `LASTNAME` — subscriber name
- Segments can be created per section to target cycling, blog or tech subscribers separately
- Unsubscribe link for campaigns: `https://ourmaninindia.com/unsubscribe?email={{ contact.EMAIL }}`
- Google Analytics UTM tracking enabled in campaign settings

---

## SendGrid Account Notes

- Free plan — 100 emails/day
- Verified sender: `alfred@ourmaninindia.com`
- API key restricted to Mail Send permission only
- `reply_to` is set to the visitor's email so replies go directly to them