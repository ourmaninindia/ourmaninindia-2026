# Forms Quick Reference

## Need to Show Modal After Submit?

**YES** → Use AJAX + Netlify Function  
**NO** → Use Traditional Submission  

## Quick Setup

### Traditional (Simple)
```html
<form action="https://service.com/subscribe" method="post">
```

### AJAX (Better UX)
```javascript
fetch('/.netlify/functions/subscribe', {
    method: 'POST',
    body: JSON.stringify({ email: email.value })
})
.then(() => openModal('successModal'));
```

## Decision Tree
```
Need modal? → YES → Use AJAX
            ↓ NO
Simple setup? → YES → Traditional
              ↓ NO
Better UX? → YES → AJAX
           ↓ NO
           → Traditional
```

For full guide, see [Forms & Submissions](12-forms-and-submissions.md)