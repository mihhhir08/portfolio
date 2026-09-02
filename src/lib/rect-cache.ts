// Caches an element's viewport rect so pointermove handlers don't force a
// layout on every event. Invalidated on scroll/resize rather than re-read,
// since pointermove fires far more often than the rect actually changes.

export type RectCache = {
  readonly current: DOMRect;
  destroy: () => void;
};

export function createRectCache(el: Element): RectCache {
  let rect = el.getBoundingClientRect();
  let dirty = false;
  const invalidate = () => {
    dirty = true;
  };

  // capture:true so scrolling any ancestor invalidates, not just the window
  window.addEventListener("scroll", invalidate, {
    passive: true,
    capture: true,
  });
  window.addEventListener("resize", invalidate, { passive: true });
  const observer = new ResizeObserver(invalidate);
  observer.observe(el);

  return {
    get current() {
      if (dirty) {
        rect = el.getBoundingClientRect();
        dirty = false;
      }
      return rect;
    },
    destroy() {
      window.removeEventListener("scroll", invalidate, { capture: true });
      window.removeEventListener("resize", invalidate);
      observer.disconnect();
    },
  };
}
