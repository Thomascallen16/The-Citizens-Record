# Edit This Site First

## Live website
https://YOUR-SITE-URL.example

## How to make a normal update
1. Open the page folder you want to change.
2. Open that page's `index.html`.
3. Click the pencil icon.
4. Edit the words, links, or clearly marked page content.
5. Click “Commit changes.”
6. Wait for deployment, then refresh the live site.

## Common edits

| I want to change | Open this |
|---|---|
| Home page text | `index/index.html` |
| About page text | `about/index.html` |
| Contact details | `contact/index.html` |
| Resource links | `resources/index.html` |
| Website colors/fonts | `assets/css/site.css` |
| Header/menu on all pages | `components/header.html` |
| Footer on all pages | `components/footer.html` |
| Photos | `assets/images/` |
| Documents | `assets/documents/` |

## Page structure

Use one folder per page:

- `index/index.html` — Home
- `about/index.html` — About
- `contact/index.html` — Contact
- `resources/index.html` — Resources

Keep shared styling in one place:

- `assets/css/site.css`

Keep media in one place:

- `assets/images/`
- `assets/documents/`

Every page should contain clear comments showing the safe area to edit. For example:

```html
<!-- START: ABOUT PAGE MAIN CONTENT -->
<!-- Edit the text below. Do not change the navigation above. -->

<h1>About</h1>
<p>Replace this paragraph with your updated text.</p>

<!-- END: ABOUT PAGE MAIN CONTENT -->
```

## Do not edit without a backup

- `.github/workflows/`
- Deployment settings
- `package.json`
- Configuration or secrets files

If you are unsure whether a file controls deployment, configuration, or application behavior, do not change it until it has been reviewed.
