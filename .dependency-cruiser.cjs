/** @type {import('dependency-cruiser').IConfiguration} */

const inLayer = (layer) => ({
  path: `^packages/.+/${layer}/`,
});
const inBoundedContext = (boundedContext) => ({
  path: `^packages/${boundedContext}/`,
});
const inAnyBoundedContextExceptShared = () => ({
  path: '^packages/(?!shared)([^/]+)/',
});
const outsideShared = () => ({
  path: `^packages/(?!shared).+/`,
});
const anotherBoundedContext = () => ({
  path: `^packages/(?!shared)([^/]+)/`,
  pathNot: '^packages/$1/',
});

function forbid(from, to) {
  return {
    name: `${from}-cannot-depend-on-${to}`,
    severity: 'error',

    from: inLayer(from),
    to: inLayer(to),
  };
}

const LAYERS = {
  DOMAIN: 'domain',
  APPLICATION: 'application',
  INTERFACE_ADAPTERS: 'interface-adapters',
  INFRASTRUCTURE: 'infrastructure',
};

const ALLOWED_DEPENDENCIES = {
  [LAYERS.DOMAIN]: [],
  [LAYERS.APPLICATION]: [LAYERS.DOMAIN],
  [LAYERS.INTERFACE_ADAPTERS]: [LAYERS.DOMAIN, LAYERS.APPLICATION],
  [LAYERS.INFRASTRUCTURE]: [
    LAYERS.DOMAIN,
    LAYERS.APPLICATION,
    LAYERS.INTERFACE_ADAPTERS,
  ],
  [LAYERS.UI]: [
    LAYERS.DOMAIN,
    LAYERS.APPLICATION,
    LAYERS.INTERFACE_ADAPTERS,
    LAYERS.INFRASTRUCTURE,
  ],
};

function createLayerRules() {
  const rules = [];

  for (const [sourceLayer, allowedLayers] of Object.entries(
    ALLOWED_DEPENDENCIES,
  )) {
    for (const targetLayer of Object.values(LAYERS)) {
      if (targetLayer === sourceLayer) {
        continue;
      }

      if (allowedLayers.includes(targetLayer)) {
        continue;
      }

      rules.push(forbid(sourceLayer, targetLayer));
    }
  }

  return rules;
}

module.exports = {
  forbidden: [
    ...createLayerRules(),
    {
      name: 'shared-cannot-depend-on-other-bounded-contexts',
      severity: 'error',
      from: inBoundedContext('shared'),
      to: outsideShared(),
    },
    {
      name: 'bounded-contexts-can-only-depend-on-themselves-and-shared',
      severity: 'error',
      from: inAnyBoundedContextExceptShared(),
      to: anotherBoundedContext(),
    },
  ],

  options: {
    tsConfig: {
      fileName: 'tsconfig.base.json',
    },

    doNotFollow: {
      path: 'node_modules',
    },

    exclude: {
      path: [
        '(^|/)dist/',
        '(^|/)coverage/',
        '\\.spec\\.ts$',
        '\\.test\\.ts$',
      ].join('|'),
    },
  },
};
