const { NormalModuleReplacementPlugin } = require('webpack');
const { resolve } = require('path');
const escapeStringRegexp = require('escape-string-regexp');

function createMapKey(name, version, file) {
  return `${name}@${version}:${file}`;
}

function createMapKeyFromResource(resource) {
  const escapedString = escapeStringRegexp(`${resource.resourceResolveData.descriptionFileData.name}/`);

  try {
    const file = new RegExp(`${escapedString}.*`).exec(resource.request)[0];

    return createMapKey(
      resource.resourceResolveData.descriptionFileData.name,
      resource.resourceResolveData.descriptionFileData.version,
      file,
    );
  } catch(err) {
    throw new Error('Unable to create file');
  }
}

function isResourceRegistered(map, resource) {
  const mapKey = createMapKeyFromResource(resource);

  return map[mapKey] != null;
}

function createDedupe() {
  const map = {};
  
  return new NormalModuleReplacementPlugin(/.*/, function(resource) {
    if (resource.resourceResolveData == null) {
      return;
    }

    try {
      if (isResourceRegistered(map, resource)) {
        resource.request = map[createMapKeyFromResource(resource)];
  
        return;
      }

      map[createMapKeyFromResource(resource)] = resource.request;
      
    } catch(err) {
      return;
    }
  });
}

module.exports = createDedupe;
