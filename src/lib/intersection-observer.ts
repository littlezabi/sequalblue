export const lazyLoad = (image: any, src: any) => {
  const loaded = () => {
    image.style.opacity = "1";
  };
  const observer = new IntersectionObserver(
    (entries) => {
      if (entries[0].isIntersecting) {
        image.src = src;
        if (image.complete) {
          loaded();
        } else {
          image.addEventListener("load", loaded);
        }
      }
    },
    {
      root: null,
      rootMargin: "0px",
      threshold: 0,
    }
  );
  observer.observe(image);

  return {
    destroy() {
      image.removeEventListener("load", loaded);
    },
  };
};

let intersectionObserver: any;
function ensureIntersectionObserver() {
  if (intersectionObserver) return;
  intersectionObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      const eventName:any = entry.isIntersecting ? "enterViewport" : "exitViewport";
      entry.target.dispatchEvent(new CustomEvent(eventName));
    });
  });
}
export function viewport(element: HTMLElement) {
  ensureIntersectionObserver();
  intersectionObserver.observe(element);
  return {
    destroy() {
      intersectionObserver.unobserve(element);
    },
  };
}
