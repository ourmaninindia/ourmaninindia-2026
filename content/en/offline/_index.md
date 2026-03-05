<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>You're offline — Our Man in India</title>
    <style>
        :root {
            --color-bg: #F6F9FC;
            --color-text: #0A2540;
            --color-text-light: #6b7280;
            --color-primary: #2563eb;
            --color-brand-purple: #20123a;
        }

        * { box-sizing: border-box; margin: 0; padding: 0; }

        body {
            font-family: arapey, georgia, serif;
            background: var(--color-bg);
            color: var(--color-text);
            min-height: 100vh;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            padding: 2rem;
            text-align: center;
        }

        .offline__icon {
            font-size: 4rem;
            margin-bottom: 1.5rem;
        }

        .offline__title {
            font-size: clamp(1.5rem, 4vw, 2.5rem);
            margin-bottom: 1rem;
            color: var(--color-brand-purple);
        }

        .offline__description {
            font-size: clamp(1rem, 2vw, 1.125rem);
            color: var(--color-text-light);
            max-width: 480px;
            line-height: 1.6;
            margin-bottom: 2rem;
        }

        .offline__button {
            display: inline-block;
            padding: 0.75rem 2rem;
            background: var(--color-primary);
            color: #ffffff;
            text-decoration: none;
            border-radius: 6px;
            font-weight: 600;
            font-size: 1rem;
            cursor: pointer;
            border: none;
            transition: background 0.2s ease;
        }

        .offline__button:hover {
            background: #1d4ed8;
        }
    </style>
</head>
<body>
    <div class="offline__icon">✈️</div>
    <h1 class="offline__title">You're offline</h1>
    <p class="offline__description">
        It looks like you've lost your connection. 
        Pages you've visited recently are still available — 
        try going back or reconnect and try again.
    </p>
    <button class="offline__button" onclick="location.reload()">Try again</button>
</body>
</html>
