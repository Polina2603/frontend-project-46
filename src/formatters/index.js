import stylish from './stylish.js';

const formatTree = (tree, style) => {
  switch (style) {
    case 'stylish':
      return stylish(tree);
    default:
      throw new Error(`Unknown style: '${style}'!`);
  }
};
export default formatTree;
