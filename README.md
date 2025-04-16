# CGM Lab Website

This is a [Next.js](https://nextjs.org) project bootstrapped with [ `create-next-app` ](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

---

## 🛠️ Technical Stack

* **Framework:** [Next.js 15](https://nextjs.org/)
* **Language:** [TypeScript](https://www.typescriptlang.org/)
* **Styling:** [Tailwind CSS 4](https://tailwindcss.com/)
* **UI Components:** [Headless UI](https://headlessui.com/), [Heroicons](https://heroicons.com/)
* **Theming:** [next-themes](https://github.com/pacocoursey/next-themes)
* **Date Utilities:** [date-fns](https://date-fns.org/)
* **Deployment:** [GitHub Pages](https://pages.github.com/) via [gh-pages](https://github.com/tschaub/gh-pages)
* **Linting:** [ESLint](https://eslint.org/)
* **Bundler:** [Turbopack](https://turbo.build/pack) (Next.js default)
* **Font Optimization:** [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts)

---

## 🚀 Friendly Setup Manual

### 1. Clone the repository

```bash
git clone https://github.com/your-org/cgm-lab-website.git
cd cgm-lab-website
```

### 2. Install dependencies

You can use **npm**, **yarn**, **pnpm**, or **bun**:

```bash
npm install
# or
yarn install
# or
pnpm install
# or
bun install
```

### 3. Start the development server

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the result.

### 4. Edit your first page

Start editing the page by modifying `app/page.tsx` . The page auto-updates as you edit the file.

---

## 🧑‍💻 Useful Scripts

* `npm run dev` – Start local development server
* `npm run build` – Build and export static site
* `npm run start` – Start production server (not needed for static export)
* `npm run lint` – Run ESLint checks
* `npm run deploy` – Deploy to GitHub Pages (outputs to `out/` folder)

---

## 📚 Learn More

* [Next.js Documentation](https://nextjs.org/docs)
* [Learn Next.js](https://nextjs.org/learn)
* [Tailwind CSS Docs](https://tailwindcss.com/docs)
* [TypeScript Docs](https://www.typescriptlang.org/docs/)
* [GitHub Pages Deployment](https://nextjs.org/docs/app/building-your-application/deploying/static-exports#github-pages)

---

## 🀄 Data Management

All website content is stored in JSON files within the `public/data/` directory. This content-as-data approach allows for easy updates without changing any code.

### Available Data Files

```
public/data/
├── awards.json          # Lab awards and achievements
├── cgm-life.json        # Lab life news and updates
├── director.json        # Lab director information
├── news.json            # Lab news and announcements
├── photos.json          # Photo gallery images
├── photosInfo.json      # Photo gallery metadata
├── publications.json    # Research publications
├── research.json        # Research projects
├── students.json        # Current and alumni students
└── schedule/            # Lab seminar schedules by year
    ├── schedule2008.json
    ├── schedule2009.json
    ...
    └── schedule2025.json
```

### Updating Content

To update website content, simply edit the corresponding JSON file:

#### Example: Adding News

Edit `public/data/news.json` :

```json
[
  {
    "id": "news-17",
    "date": "2025-04-16",
    "content": "實驗室網重構上線囉!如有任何問題，請和網站管理員連囉！謝謝 :D"
  },
  // Add new news items here
]
```

#### Example: Managing Students

Edit `public/data/students.json` to add, update, or remove student information.

### Data Schema

Each JSON file follows a specific schema:

* **news.json**: Array of news objects with `id`,              `date`,              `content`, and optional `isPinned` fields
* **students.json**: Student records with personal and academic information
* **publications.json**: Research publications with authors, titles, and publication details
* **schedule/*.json**: Annual seminar schedules with dates, speakers, and topics

### Tips for Content Updates

1. Always maintain the existing JSON structure
2. Use valid JSON format (proper quotes, commas, brackets)
3. Test your changes locally before deploying
4. After deploying, verify that the updates appear correctly on the website

---

## 🌐 Deploy

### Vercel Deployment

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

### GitHub Pages Deployment

To deploy to GitHub Pages:

1. Make sure your repository settings are configured for GitHub Pages:
   - Go to your repository settings
   - Navigate to "Pages"
   - Set the source to the "gh-pages" branch

2. Run the following commands to build and deploy:
   

```bash
   npm run build
   npm run deploy
   ```

3. **Important:** After the first deployment, you need to manually add an empty `.nojekyll` file to the gh-pages branch:
   - Clone the gh-pages branch: `git clone -b gh-pages https://github.com/your-org/cgm-lab-website.git gh-pages`

    - Create an empty .nojekyll file: 
      - On Mac/Linux: `touch .nojekyll`
      - On Windows: create the file manually

```bash
     git add .nojekyll
     git commit -m "Add .nojekyll file"
     git push
```

   This file prevents GitHub Pages from ignoring files that begin with an underscore, which Next.js uses for its assets.

Check out [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
