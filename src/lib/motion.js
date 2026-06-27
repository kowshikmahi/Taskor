export const fadeUp = {
  hidden: {
    opacity: 0,
    y: 30,
  },

  visible: {
    opacity: 1,
    y: 0,

    transition: {
      duration: 0.5,
    },
  },
};

export const fade = {
  hidden: {
    opacity: 0,
  },

  visible: {
    opacity: 1,

    transition: {
      duration: 0.4,
    },
  },
};

export const scale = {
  hidden: {
    opacity: 0,
    scale: .95,
  },

  visible: {
    opacity: 1,
    scale: 1,

    transition: {
      duration: .4,
    },
  },
};

export const stagger = {
  hidden: {},

  visible: {
    transition: {
      staggerChildren: .12,
    },
  },
};

export const hoverLift = {
  whileHover: {
    y: -6,
  },

  whileTap: {
    scale: .98,
  },
};