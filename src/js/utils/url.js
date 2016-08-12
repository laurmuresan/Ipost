import { Immutable, immutableList, toImmutable } from 'imm-flux-utils';

export function buildEntityEditUrl(id, entityType, entityAttributes) {
  const isList = Immutable.List.isList;
  let tempAttributes = null;
  const entityToUrlMap = {
    'email': {
      'text': '/email/text/',
      'pastehtml': '/email/pastehtml/',
      'template': '/email/template/',
      'dragdrop': '/email/dragdrop/'
    },

    'content_template': {
      'pastehtml': '/no-route-defined/',
      'prebuilt': '/no-route-defined/',
      'sample': '/no-route-defined/'
    },

    'email_section': {
      'header': '/no-route-defined/',
      'footer': '/no-route-defined/'
    },

    'email_list': {
      'test': '/no-route-defined/',
      'live': '/no-route-defined/',
      'dynamic': '/no-route-defined/',
      'suppression': '/no-route-defined/'
    },

    'aqlfilter': {
      'cdt': '/contacts/edit-filters/cdt/',
      'imm': '/contacts/edit-filters/imm/'
    }
  };

  let contentType;

  if (!entityAttributes) {
    return '/no-route-defined/';
  }

  tempAttributes = immutableList();

  if (entityAttributes && !isList(entityAttributes)) {
    entityAttributes.map((value, key) => {
      tempAttributes = tempAttributes.push(toImmutable({ [key]: value }));
    });

    entityAttributes = tempAttributes;
  }

  entityAttributes.forEach((attr) => {
    const type = attr.get('contentType');

    if (type) {
      contentType = type;
    }
  });

  if (!contentType) {
    return `${entityToUrlMap[entityType]}${id}`;
  }

  return `${entityToUrlMap[entityType][contentType]}${id}`;
}
