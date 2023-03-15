const defaultTheme = require('tailwindcss/defaultTheme');
const postcss = require('postcss');

const withOpacityValue = (variable) => {
  return ({ opacityValue }) => {
    if (opacityValue === undefined) {
      return `rgb(var(${variable}))`;
    }
    return `rgb(var(${variable}) / ${opacityValue})`;
  };
};
const withVar = (variable) => {
  return () => {
    return `var(${variable})`;
  };
};

module.exports = {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  safelist: [
    'items-start',
    'items-end',
    'items-stretch',
    'items-center',
    'justify-items-start',
    'justify-items-end',
    'justify-items-center',
    'justify-items-stretch',
    'object-right',
    'object-left',
    'object-center',
  ],
  theme: {
    fontSize: {
      size140: ['140px', '140px'],
      size120: ['120px', '120px'],
      size80: ['80px', '80px'],
      size64: ['64px', '72px'],
      size48: ['48px', '56px'],
      size40: ['40px', '48px'],
      size36: ['36px', '44px'],
      size32: ['32px', '40px'],
      size24: ['24px', '32px'],
      size21: ['21px', '29px'],
      size18: ['18px', '30px'],
      size16: ['16px', '28px'],
      size14: ['14px', '26px'],
    },
    extend: {
      keyframes: {
        grow: {
          '0%': { height: '0px' },
          '100%': { height: '354px' },
        },
        shrink: {
          '0%': { height: '354px' },
          '100%': { height: '0px' },
        },
        growMobile: {
          '0%': { height: '0px' },
          '100%': { height: '93px' },
        },
        shrinkMobile: {
          '0%': { height: '93px' },
          '100%': { height: '0px' },
        },
        fadeInLeft: {
          '0%': { opacity: 0, transform: 'translateX(-32px)' },
          '100%': { opacity: 1, transform: 'translateX(0px)' },
        },
        fadeOutLeft: {
          '0%': { opacity: 1, transform: 'translateX(0px)' },
          '100%': { opacity: 0, transform: 'translateX(-32px)' },
        },
      },
      animation: {
        grow: 'grow 1s ease-in-out forwards',
        growMobile: 'growMobile 1s ease-in-out forwards',
        shrink: 'shrink 1s ease-in-out forwards',
        shrinkMobile: 'shrinkMobile 1s ease-in-out forwards',
        fadeInLeft: 'fadeInLeft 1s ease-in-out forwards',
        fadeOutLeft: 'fadeOutLeft 1s ease-in-out forwards',
      },
      borderRadius: {
        DEFAULT: '10px',
      },
      fontFamily: {
        sans: ['Noto Sans', ...defaultTheme.fontFamily.sans],
      },
      margin: {
        'gutter-desktop': '70px',
        'gutter-mobile': '35px',
      },
      padding: {
        'gutter-desktop': '70px',
        'gutter-mobile': '35px',
      },
      screens: {
        sm: '640px',
        md: '768px',
        lg: '991px',
        narrow: '1024px',
        xl: '1440px',
        max: '1580px',
        maxPadded: '1720px',
        '2xl': '1920px',
      },
      letterSpacing: {
        tightest: '-.05em',
        tighter: '-.04em',
        tight: '-.03em',
      },
      gridColumn: {
        'span-13': 'span 13 / span 13',
        'span-14': 'span 14 / span 14',
        'span-15': 'span 15 / span 15',
        'span-16': 'span 16 / span 16',
        'span-17': 'span 17 / span 17',
        'span-18': 'span 18 / span 18',
        'span-19': 'span 19 / span 19',
        'span-23': 'span 23 / span 23',
      },
      gridColumnStart: {
        14: '14',
        15: '15',
        16: '16',
        17: '17',
        18: '18',
        19: '19',
        20: '20',
        21: '21',
        22: '22',
        23: '23',
        24: '24',
      },
      spacing: {
        1: '4px',
        2: '8px',
        3: '12px',
        4: '16px',
        5: '24px',
        6: '32px',
        7: '40px',
        8: '48px',
        9: '56px',
        10: '64px',
        11: '80px',
        12: '120px',
        13: '160px',
      },
      blur: {
        xss: '2px',
        xs: '3px',
      },
      boxShadow: {
        modal: '0 0 10px rgba(0, 0, 0, 0.25)',
      },
      visibility: ['group-hover'],
      transitionProperty: {
        height: 'height',
        'max-height': 'max-height',
      },
    },
  },
  plugins: [
    function ({ addVariant, e }) {
      addVariant('first-child', ({ modifySelectors, separator }) => {
        modifySelectors(({ className }) => {
          return `.${e(`first-child${separator}${className}`)} >*:first-child`;
        });
      });
      addVariant('supports-blur', ({ container, separator }) => {
        const supportsRule = postcss.atRule({
          name: 'supports',
          params: '(backdrop-filter: blur(1px))',
        });
        supportsRule.append(container.nodes);
        container.append(supportsRule);
        supportsRule.walkRules((rule) => {
          rule.selector = `.${e(
            `supports-blur${separator}`,
          )}${rule.selector.slice(1)}`;
        });
      });
    },
    require('@tailwindcss/line-clamp'),
    require('@tailwindcss/typography')({
      target: 'legacy',
    }),
    require('@tailwindcss/aspect-ratio'),
  ],
  // darkMode: ['class', '[data-mode="dark"]'],
};
