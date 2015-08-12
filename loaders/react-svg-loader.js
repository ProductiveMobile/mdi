var svgToReact = require('svg-to-react');

function hasNoXMLorDoctypeTag(line) {
  return line.indexOf('<?xml') === -1 && line.indexOf('DOCTYPE') === -1;
}

module.exports = function(content) {
  this.cacheable();
  var SVGContent = content.toString().split('\n');
  var sanitizedSVG = SVGContent.filter(hasNoXMLorDoctypeTag).join('\n');
  var reactifiedSVG = svgToReact.convert(sanitizedSVG);
  var reactComponent = 'var React = require(\'react\');' + '\n' +
    'var renderSVG = ' + reactifiedSVG.toString() + '\n' +
    'var Icon = React.createClass({' + '\n' +
    '  render: function() {' + '\n' +
    '    return renderSVG(this.props);' + '\n' +
    '  }' + '\n' +
    '});' + '\n' +
    'module.exports = Icon;\n';
  return reactComponent;
};
