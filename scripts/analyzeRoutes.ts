type PageMetrics = {
  route: string;
  loadTime: number;
  networkType: string;
  contentSeen: number;
  totalContent: number;
  score: number;
};

export default async function analyzeRoutes(routes: string[], baseUrl: string = "http://localhost:3000") {
  const results: PageMetrics[] = [];

  for (const route of routes) {
    const fullUrl = `${baseUrl}${route}`;

    const iframe = document.createElement("iframe");
    iframe.src = fullUrl;
    iframe.style.width = "100%";
    iframe.style.height = "1000px";
    iframe.style.visibility = "hidden";
    document.body.appendChild(iframe);

    const metrics = await new Promise<PageMetrics>((resolve) => {
      const startTime = performance.now();

      iframe.onload = () => {
        const endTime = performance.now();
        const loadTime = endTime - startTime;

        // Simulate scrolling
        const iframeDoc = iframe.contentDocument || iframe.contentWindow?.document;
        if (!iframeDoc) return resolve({
          route,
          loadTime: -1,
          networkType: "unknown",
          contentSeen: 0,
          totalContent: 0,
          score: 0,
        });

        const observedElements = Array.from(
          iframeDoc.querySelectorAll("img, div, section, article")
        );

        let visibleCount = 0;

        const observer = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting) {
                visibleCount++;
              }
            });
          },
          { root: iframe, threshold: 0.1 }
        );

        observedElements.forEach((el) => observer.observe(el));

        let scrollY = 0;
        const scrollStep = 300;
        const scrollInterval = setInterval(() => {
          if (scrollY < iframe.contentWindow!.document.body.scrollHeight) {
            scrollY += scrollStep;
            iframe.contentWindow!.scrollTo({ top: scrollY, behavior: "smooth" });
          } else {
            clearInterval(scrollInterval);
            observer.disconnect();

            const total = observedElements.length;
            const score = computeScore(loadTime, visibleCount, total);
            const networkType = (navigator as any).connection?.effectiveType || "unknown";

            resolve({
              route,
              loadTime: Math.round(loadTime),
              networkType,
              contentSeen: visibleCount,
              totalContent: total,
              score,
            });

            setTimeout(() => document.body.removeChild(iframe), 1000); // cleanup
          }
        }, 500);
      };
    });

    results.push(metrics);
  }

  console.table(results);
  return results;
}

function computeScore(loadTime: number, visible: number, total: number): number {
  const speedScore = loadTime < 2000 ? 50 : loadTime < 4000 ? 30 : 10;
  const visibilityScore = total > 0 ? (visible / total) * 50 : 0;
  return Math.round(speedScore + visibilityScore);
}
