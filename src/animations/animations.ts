export const fadeUp = {
  initial: {
    opacity: 0,
    y: 10,
  },
  enter: {
    opacity: 1,
    y: 0,
    transition: { duration: 1.3, ease: [0.25, 1, 0.5, 1] },
  },

  exit: {
    opacity: 0,
    y: 10,
    transition: { duration: 0.7, ease: [0.25, 1, 0.5, 1] },
  },
};

export const fade = {
  initial: {
    opacity: 0,

  },
  enter: {
    opacity: 1,
    transition: { duration: 1.3, ease: [0.25, 1, 0.5, 1] },
  },

  exit: {
    opacity: 0,
    transition: { duration: 0.7, ease: [0.25, 1, 0.5, 1] },
  },
};

export const fadeSlide = {
  initial: {
    opacity: 0,
    x: 20,
  },
  enter: {
    opacity: 1,
    x: 0,
    transition: { duration: 1.3, ease: [0.25, 1, 0.5, 1] },
  },

  exit: {
    opacity: 0,
    x: 20,
    transition: { duration: 0.7, ease: [0.25, 1, 0.5, 1] },
  },
};

export const OrderSlice = {
  initial: {
    opacity: 0,
    y: -20,
  },
  enter: {
    opacity: 1,
    y: 0,
    transition: { duration: 1.3, ease: [0.25, 1, 0.5, 1] },
  },

  exit: {
    opacity: 0,
    y: -20,
    transition: { duration: 0.7, ease: [0.25, 1, 0.5, 1] },
  },
};
