export default (array, key) =>
  array.reduce((o, item) => ({ ...o, [item[key]]: item }), {});
