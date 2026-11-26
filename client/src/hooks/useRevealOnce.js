import { useEffect } from "react";

export default function useRevealOnce(ref) {
  useEffect(() => {
    const root = ref.current;
    if (!root || !window.IntersectionObserver || !Element.prototype.animate) return;
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (motion.matches) return;
    const animations = new Set();
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(({ target, isIntersecting }) => {
        if (!isIntersecting) return;
        observer.unobserve(target);
        // Content is visible by default; only an initialized animation changes it.
        const animation = target.animate(
          [{ opacity: 0, transform: "translateY(28px)" }, { opacity: 1, transform: "translateY(0)" }],
          {
            duration: 760,
            delay: Number(target.dataset.revealDelay || 0),
            easing: "cubic-bezier(0.22, 1, 0.36, 1)",
            fill: "backwards",
          },
        );
        animations.add(animation);
        animation.onfinish = () => animations.delete(animation);
      });
    }, { threshold: 0, rootMargin: "0px 0px -24px 0px" });

    root.querySelectorAll("[data-home-reveal]").forEach((element) => observer.observe(element));
    const stop = () => {
      observer.disconnect();
      animations.forEach((animation) => animation.cancel());
      animations.clear();
    };
    const onMotionChange = () => { if (motion.matches) stop(); };
    motion.addEventListener("change", onMotionChange);
    return () => {
      stop();
      motion.removeEventListener("change", onMotionChange);
    };
  }, [ref]);
}
