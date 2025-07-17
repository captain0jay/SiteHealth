# 🌐 SiteHealth

[Live Site 🌍](https://site-health-tsnb.vercel.app/)

**SiteHealth** helps you monitor and analyze your website’s page load performance and other key metrics — all in one place. It ensures you can **detect**, **diagnose**, and **optimize** issues *before* they impact user experience.

---

## ✨ Features

- Add any route from your website to analyze
- Track core web vitals like FCP, LCP, CLS
- Visual and content stats including headings, links, images, and more
- Quick performance scoring for each route

---

## 🚀 Getting Started

### ✅ Online Demo

Go to: [SiteHealth Online](https://site-health-tsnb.vercel.app/)

1. Click **“Add Route”**
2. Enter the route you want to check (e.g., `/about` or `/careers`)
3. Ensure the route is **hosted under the same domain**
4. Example test routes you can try:
   - `/about`
   - `/careers`

### 🎥 Video Guide

[Watch Instructional Loom Video](#) *(Insert actual Loom link here)*

---

## 🧪 Run Locally

1. Clone the repo  
   ```bash
   git clone <your-repo-url>
   cd sitehealth
````

2. Install dependencies

   ```bash
   npm install
   ```

3. Start the development server

   ```bash
   npm run dev
   ```

---

## 📊 Route Report Structure

Here’s what each metric in the report represents:

| Field             | Description                                                      |
| ----------------- | ---------------------------------------------------------------- |
| `route`           | The path of the page being analyzed (e.g., `/about`)             |
| `screen`          | Viewport size used during the test                               |
| `title`           | `<title>` of the page                                            |
| `description`     | Meta description from `<meta name="description">`                |
| `loadTime`        | Total time (ms) it takes to load the page                        |
| `fcp`             | First Contentful Paint (ms) — when the first text/image appears  |
| `lcp`             | Largest Contentful Paint (ms) — when the largest content appears |
| `cls`             | Cumulative Layout Shift — layout stability metric                |
| `networkType`     | Type of network connection used (e.g., `4g`, `3g`)               |
| `images`          | List of images with their `src`, dimensions, and alt text        |
| `totalImages`     | Number of images on the page                                     |
| `visibleElements` | Number of elements visible in the viewport                       |
| `totalElements`   | Total number of elements in the DOM                              |
| `wordCount`       | Total word count on the page                                     |
| `headings`        | Breakdown of headings (`h1`, `h2`, etc.)                         |
| `externalLinks`   | Number of external `<a>` links                                   |
| `internalLinks`   | Number of internal `<a>` links                                   |
| `fontCount`       | Number of font files used                                        |
| `scriptCount`     | Number of script files on the page                               |
| `score`           | Overall performance score (0–100)                                |

---

## 🖼️ Sample Screenshots

> Example test reports from `/about` and `/careers` routes:

![Report Screenshot 1](./screenshots/about-report.png)
![Report Screenshot 2](./screenshots/careers-report.png)

---

## 🛠️ Tech Stack

* React
* Next.js
* Lighthouse Metrics
* Puppeteer

---

## 📬 Feedback / Contribute

Feel free to open issues or contribute by submitting a pull request!
