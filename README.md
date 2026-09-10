# Anita & Xavier Baby Shower Site

This is the **actual front-end site** rebuilt the proper way for AWS Amplify:
real HTML/CSS/JavaScript plus separate image assets, instead of one giant site image.

## Structure

```text
anita-xavier-baby-shower-real-site/
├── amplify.yml
├── README.md
└── public/
    ├── index.html
    ├── styles.css
    ├── app.js
    ├── config.js
    └── assets/
        ├── butterfly.png
        ├── floral-top-left.png
        ├── floral-top-right.png
        ├── floral-bottom-left.png
        ├── floral-bottom-right.png
        ├── registry-carrier.png
        ├── registry-lounger.png
        └── registry-playgym.png
```

## What changed

- The site is now a **real webpage**
- The decorative images are now **separate PNG assets**
- The 3 registry products are separate images
- The address opens directions
- The registry button opens the Amazon baby registry
- The RSVP form works in **preview mode** using localStorage until you connect an AWS API

Registry URL:
https://www.amazon.com/baby-reg/anita-marie-cruz-december-2026-jemison/36SC1Z4IT9OZ6

## AWS Amplify

Amplify will publish the contents of the `public` folder using `amplify.yml`.

## Later AWS backend

When you create your AWS API, paste the base URL into:

`public/config.js`

Example:

```js
window.BABY_SHOWER_API = "https://YOUR-API-ID.execute-api.us-east-1.amazonaws.com";
```

Then `app.js` will send the RSVP form to:

`POST /rsvp`

## Preview

Open `public/index.html` locally to inspect the site first.
