export default () => {
  return import.meta.env.MODE !== 'production';
};
