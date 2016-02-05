/**
 * @param {String} iconName
 * @returns {String}
 */
module.exports = function getComponentName(iconName) {
  return iconName.split('-').map(function(iconNamePart) {
    return iconNamePart.charAt(0).toUpperCase() + iconNamePart.slice(1);
  }).join('');
};
