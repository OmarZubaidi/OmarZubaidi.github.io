import { create } from 'storybook/theming';

export default create({
  // having a light/dark toggle in storybook is too much work
  // also, i use dark reader to force dark mode in my browser at night
  base: 'light',
  colorPrimary: '#ff0091',
  colorSecondary: '#99005c',
});
