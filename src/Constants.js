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
  rainbow: {
    name: 'Rainbowstro theme',
    title: 'Rainbowstro!',
    css: `
      .game-board {
        --maestro-primary-color: white;
        --maestro-minor-color: skyblue;
        background-color: lightblue;
        background-image: url('https://pixy.org/src/437/4371429.png');
        background-repeat: no-repeat;
        background-size: contain;
        background-position-x: 50vw;
      }
      .maestro-title {
        /* https://welearncode.com/rainbow-text/ */
        text-shadow: -4px 4px #ef3550,
                     -8px 8px #f48fb1,
                     -12px 12px #7e57c2,
                     -16px 16px #2196f3,
                     -20px 20px #26c6da,
                     -24px 24px #43a047,
                     -28px 28px #eeff41,
                     -32px 32px #f9a825,
                     -36px 36px #ff5722;
      }
    `,
  },
});
export const CUSTOM_THEME_NAME = 'custom';
export const SESSION_STORAGE_KEY = 'maestroState';
