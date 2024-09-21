export const fadeUp = {
  initial: {
    opacity: 0,
    y: 20,
  },
  enter: {
    opacity: 1,
    y: 0,
    transition: { duration: 1.3, ease: [0.25, 1, 0.5, 1] },
  },

  exit: {
    opacity: 0,
    y: 20,
    transition: { duration: 1.3, ease: [0.25, 1, 0.5, 1] },
  },
};
