# Dakota STEM Trails

The website for **Dakota STEM Trails**, a student-led organization in Brookings, South Dakota that inspires children in rural communities to explore STEM through accessible, creative, hands-on learning.

It's a plain static site (HTML, CSS and a little JavaScript). There's no build step and nothing to install, so it works on GitHub Pages, Vercel or Netlify as-is.

## Pages

| File           | Page                                         |
| -------------- | -------------------------------------------- |
| `index.html`   | Home: hero, mission, core principles         |
| `about.html`   | About Us: story, what we do, mission         |
| `team.html`    | Our Team                                     |
| `contact.html` | Contact info and contact form                |
| `404.html`     | "Page not found" page                        |

## Files

Everything is in one folder, with no subfolders:

```
index.html, about.html, team.html, contact.html, 404.html   The pages
styles.css    All colors, fonts, layout and responsive rules
main.js       Mobile menu, scroll animations, contact form
logo.svg      Logo (also used as the browser tab icon)
*.jpg         Photos
```

## Preview it on your computer

Double-click `index.html` to open it in your browser. Everything works this way except the contact form, which needs the site to be online.

## Publish with GitHub Pages

1. Sign in at [github.com](https://github.com) and create a new **public** repository (for example `dakota-stem-trails`).
2. On the new repo's page, click **uploading an existing file**. Select **every file in this folder** and drag them all in at once, then click **Commit changes**.
3. Go to **Settings → Pages**. Under **Build and deployment**, set **Source** to *Deploy from a branch*, choose the `main` branch and the `/ (root)` folder, then click **Save**.
4. After a minute or two the site will be live at `https://<your-username>.github.io/dakota-stem-trails/`.

If you'd prefer Vercel instead: on [vercel.com](https://vercel.com), click **Add New → Project**, pick the repo, leave the Framework Preset set to **Other**, and click **Deploy**.

## Contact form (one-time setup)

The form sends messages to **dakotastemtrails@gmail.com** through [FormSubmit](https://formsubmit.co), a free service that doesn't need an account.
The **first** time someone submits the form on the live site, FormSubmit emails that inbox an activation link. Click it once, and every message after that gets delivered.

## Editing the site

- **Text:** open any `.html` file in a text editor and change the words between the tags. Each section is labelled with a comment such as `<!-- ===== Mission ===== -->`.
- **Colors and fonts:** change the variables at the top of `styles.css` (`--clay`, `--mustard`, `--sky`, `--sage`, `--ink`, and so on). Every page uses them.
- **Photos:** replace one of the `.jpg` files with your own photo and keep the same file name. Update the `alt="…"` description in the HTML to match.
- **Team members:** in `team.html`, copy one `<article class="card member">…</article>` block and change the initials, name and role. The color classes `tint-clay`, `tint-sky`, `tint-mustard` and `tint-sage` set the avatar color.
- **Header and footer:** these are repeated on every page, so if you change a menu link, change it in all five `.html` files.
- **Instagram:** the handle is set to `@dakotastemtrails`. If the real handle is different, search all files for `dakotastemtrails/` and update it.
