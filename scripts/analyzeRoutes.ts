type ScreenSize = { label: string; width: number; height: number };

type RouteReport = {
  route: string;
  screen: string;
  title: string;
  description: string;
  loadTime: number;
  fcp?: number;
  lcp?: number;
  cls?: number;
  networkType: string;
  images: { src: string; width: number; height: number; alt: string }[];
  totalImages: number;
  visibleElements: number;
  totalElements: number;
  wordCount: number;
  headings: Record<string, number>;
  externalLinks: number;
  internalLinks: number;
  fontCount: number;
  scriptCount: number;
  score: number;
};

const screenSizes: ScreenSize[] = [
  { label: "mobile", width: 375, height: 812 },
  { label: "tablet", width: 768, height: 1024 },
  { label: "desktop", width: 1440, height: 900 },
];

export default async function analyzeRoutes(routes: string[], baseUrl = window.location.origin) {
  const allReports: RouteReport[] = [];

  for (const route of routes) {
    for (const screen of screenSizes) {
      const fullUrl = `${baseUrl}${route}`;

      const iframe = document.createElement("iframe");
      iframe.src = fullUrl;
      iframe.style.width = `${screen.width}px`;
      iframe.style.height = `${screen.height}px`;
      iframe.style.visibility = "hidden";
      iframe.style.position = "absolute";
      document.body.appendChild(iframe);

      const report: RouteReport = await new Promise((resolve) => {
        const startTime = performance.now();

        iframe.onload = () => {
          const loadTime = performance.now() - startTime;
          const doc = iframe.contentDocument!;
          const win = iframe.contentWindow!;

          const title = doc.title;
          const description = doc.querySelector('meta[name="description"]')?.getAttribute("content") || "";

          const networkType = (navigator as any).connection?.effectiveType || "unknown";

          const text = doc.body.innerText || "";
          const wordCount = text.trim().split(/\s+/).length;

          const headings: Record<string, number> = {};
          ["h1", "h2", "h3", "h4"].forEach(h => {
            headings[h] = doc.querySelectorAll(h).length;
          });

          const links = Array.from(doc.querySelectorAll("a"));
          const internalLinks = links.filter(a => a.href.startsWith(baseUrl)).length;
          const externalLinks = links.length - internalLinks;

          const scripts = doc.querySelectorAll("script").length;
          const fonts = performance.getEntriesByType("resource").filter((r) =>
            r.name.match(/\.(woff|woff2|ttf|otf)/)
          ).length;

          const images = Array.from(doc.querySelectorAll("img")).map((img) => ({
            src: img.currentSrc || img.src,
            width: img.naturalWidth,
            height: img.naturalHeight,
            alt: img.alt || "",
          }));

          const observedElements = Array.from(doc.querySelectorAll("img, div, section, article"));
          let visibleCount = 0;

          const observer = new IntersectionObserver(
            (entries) => {
              entries.forEach(entry => {
                if (entry.isIntersecting) visibleCount++;
              });
            },
            { root: iframe, threshold: 0.1 }
          );
          observedElements.forEach(el => observer.observe(el));

          // Simulate scroll
          let scrollY = 0;
          const scrollStep = 300;
          const scrollInterval = setInterval(() => {
            if (scrollY < doc.body.scrollHeight) {
              scrollY += scrollStep;
              win.scrollTo({ top: scrollY, behavior: "smooth" });
            } else {
              clearInterval(scrollInterval);
              observer.disconnect();

              // FCP, LCP, CLS (basic version)
              let fcp: number | undefined;
              let lcp: number | undefined;
              let cls: number | undefined;
              const perfObserver = new PerformanceObserver((list) => {
                for (const entry of list.getEntries()) {
                  if (entry.entryType === "paint" && entry.name === "first-contentful-paint") {
                    fcp = entry.startTime;
                  } else if (entry.entryType === "largest-contentful-paint") {
                    lcp = entry.startTime;
                  } else if (entry.entryType === "layout-shift") {
                    const e = entry as PerformanceEntry & { value: number };
                    cls = (cls || 0) + e.value;
                  }
                }
              });
              perfObserver.observe({ type: "paint", buffered: true });
              perfObserver.observe({ type: "largest-contentful-paint", buffered: true });
              perfObserver.observe({ type: "layout-shift", buffered: true });

              const score = computeScore(loadTime, visibleCount, observedElements.length);

              document.body.removeChild(iframe);

              resolve({
                route,
                screen: screen.label,
                title,
                description,
                loadTime: Math.round(loadTime),
                fcp: fcp ? Math.round(fcp) : undefined,
                lcp: lcp ? Math.round(lcp) : undefined,
                cls: cls ? Math.round(cls * 100) / 100 : undefined,
                networkType,
                totalImages: images.length,
                images,
                totalElements: observedElements.length,
                visibleElements: visibleCount,
                wordCount,
                headings,
                internalLinks,
                externalLinks,
                fontCount: fonts,
                scriptCount: scripts,
                score,
              });
            }
          }, 300);
        };
      });

      allReports.push(report);
    }
  }

  console.table(allReports);
  return allReports;
}

function computeScore(loadTime: number, visible: number, total: number): number {
  const speedScore = loadTime < 2000 ? 50 : loadTime < 4000 ? 30 : 10;
  const visibilityScore = total > 0 ? (visible / total) * 50 : 0;
  return Math.round(speedScore + visibilityScore);
}
