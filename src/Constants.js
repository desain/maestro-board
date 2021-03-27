export const BUILTIN_THEMES = Object.freeze({
  default: {
    name: 'Default Theme',
    title: 'MAeSTRo',
    css: '',
  },
  tuff: {
    name: 'Tuffstro Theme',
    title: 'Tuffstro!!!',
    css: `
      .game-board {
        background-image: url('/canadian-five-dollar-bill.jpg'), url('/fire_bg.jpg');
        color: #bd5734;
      }
      .maestro-title {
        font-family: "Lacquer", sans-serif;
      }
    `,
  },
  nice: {
    name: 'Nicestro theme',
    title: 'Nicestro :)',
    css: `
      .game-board {
        background-color: skyblue;
        --maestro-primary-color: #bbf0ff;
        --maestro-minor-color: white;
      }
      .maestro-title {
          text-shadow: white -4px 4px;
      }
    `,
  },
});
export const CUSTOM_THEME_NAME = 'custom';
