var requireIcons = require.context('./svg', false, /^\.\/.*\.svg$/);

var reFileName = /^\.\/(.*)\.svg/;

/**
 * @param {String} iconName
 * @returns {String}
 */
function getComponentName(iconName) {
  return iconName.split('-').map(function(iconNamePart) {
    return iconNamePart.charAt(0).toUpperCase() + iconNamePart.slice(1);
  }).join('');
}

var exports = {
  icons: {}
};

requireIcons.keys().forEach(function(iconFilename) {
  var iconName = reFileName.exec(iconFilename)[1];
  var iconComponent = requireIcons(iconFilename);
  var iconComponentName = getComponentName(iconName);
  exports.icons[iconName] = iconComponent;
  exports[iconComponentName] = iconComponent;
});

module.exports = exports;
