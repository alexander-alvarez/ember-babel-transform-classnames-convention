'use strict';

const path = require('path');

function isBlacklisted(blacklist, importPath, exportName) {
  if (Array.isArray(blacklist)) {
    return blacklist.indexOf(importPath) > -1;
  } else {
    let blacklistedExports = blacklist[importPath];

    return blacklistedExports && blacklistedExports.indexOf(exportName) > -1;
  }
}

function isEmberComponent(node) {
  return node.object.name === 'Ember.Component';
}

const componentFileRegex = /\/components\/(.*)\.js/;

module.exports = function({ types: t }) {

  return {
    name: 'ember-classname-preprocessor',
    visitor: {
      ExportDefaultDeclaration(path, state) {
        let [_, componentName] = componentFileRegex.exec(state.file.opts.filename) || [];
        if (componentName) {
          let EmberComponent = isEmberComponent(path.node.declaration.callee) ? path.node.declaration : null;
          if (EmberComponent) {
            let classNamesProperty =
              EmberComponent.arguments.reduce((found, obj) => {
                if (found) {
                  return found;
                }
                let prop = obj.properties.filter((property) => property.key.name === 'classNames');
                return prop.length ? prop[0] : null;
              }, null);

            if (classNamesProperty) {
              // evaluate if it contains the file name, if not add it
              let property = classNamesProperty.value.elements.find((node) => node.type === 'StringLiteral' && node.value === componentName);
              if (!property) {
                classNamesProperty.value.elements.push(t.stringLiteral(componentName));
              }
            } else {
              // create the classNames property and add the key to it
              let objectExpression = EmberComponent.arguments.find(o => o.type === 'ObjectExpression');

              let classNamesProperty = t.objectProperty(
                t.stringLiteral('classNames'),
                t.arrayExpression([
                  t.stringLiteral(componentName)
                ])
              );
              objectExpression.properties.push(classNamesProperty);
            }
          }
        }
      }
    },
  };
};

// Provide the path to the package's base directory for caching with broccoli
// Ref: https://github.com/babel/broccoli-babel-transpiler#caching
module.exports.baseDir = () => path.resolve(__dirname, '..');
