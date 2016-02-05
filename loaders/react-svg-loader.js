var svgToReact = require('svg-to-react');
var path = require('path');
var getComponentName = require('../lib/component-name');

function hasNoXMLorDoctypeTag(line) {
  return line.indexOf('<?xml') === -1 && line.indexOf('DOCTYPE') === -1;
}

module.exports = function(content) {
  this.cacheable();
  var iconName = path.basename(this.resource, '.svg');
  var iconComponentName = getComponentName(iconName);
  var SVGContent = content.toString().split('\n');
  var sanitizedSVG = SVGContent.filter(hasNoXMLorDoctypeTag).join('\n');
  var reactifiedSVG = svgToReact.convert(sanitizedSVG);

  var reactComponent = 'var React = require(\'react\');' + '\n' +
    'var renderSVG = ' + reactifiedSVG.toString() + '\n' +
    'var ' + iconComponentName + ' = React.createClass({' + '\n' +
    '  displayName: \'' + iconComponentName + '\',\n' +
    '  getDefaultProps: function() {\n' +
    '    return {\'data-test-id\': \'' + iconName + '\'};\n' +
    '  },\n' +
    '  render: function() {' + '\n' +
    '    return renderSVG(this.props);' + '\n' +
    '  }' + '\n' +
    '});' + '\n' +
    'module.exports = ' + iconComponentName + ';\n';
  return reactComponent;
};
