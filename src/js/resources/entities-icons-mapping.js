/**
 * Items icon mappings
 *   `entityType` (ex: email, automations, etc)
*     `contentType` or `type` (headr, footer, etc)
 */
export default {
  'folder': {
    'undefined': 'icon-folder',
    'null': 'icon-folder',
    '': 'icon-folder'
  },

  // TODO: add the corect mapping for custom data tables
  'customdatatables': {
    'custom': 'icon-custom-data-tables',
    'customdatatables': 'icon-custom-data-tables',
    'dynamic' : 'icon-custom-data-tables'
  },

  'automation': {
    'process': 'icon-process',
    'journey': 'icon-journey',
    'send-template': 'icon-send-templates',
    'sendtemplates': 'icon-send-templates'
  },

  'email': {
    'text': 'icon-email',
    'dragdrop': 'icon-email',
    'pastehtml': 'icon-email',
    'template': 'icon-email'
  },

  'aqlfilter': {
    'cdt': 'icon-custom-data-table-filter',
    'imm': 'icon-list-filter'
  },

  'email_section': {
    'header': 'icon-footers',
    'footer': 'icon-footers'
  },

  'email_list': {
    'test': 'icon-lists',
    'live': 'icon-lists',
    'static': 'icon-lists',
    'dynamic': 'icon-lists',
    'suppression': 'icon-lists'
  },

  'content_template': {
    'prebuilt': 'icon-template',
    'pastehtml': 'icon-template',
    'sample': 'icon-template'
  },

  'topic': {
    'undefined': 'icon-topic',
    'null': 'icon-topic',
    '': 'icon-topic'
  },

  'email_asset': {
    'undefined': 'icon-asset',
    'null': 'icon-asset',
    '': 'icon-asset',
    'application/pdf': 'icon-pdf'
  },

  'ticket_report': {
    'undefined': 'icon-tag',
    'null': 'icon-tag',
    '': 'icon-tag'
  },

  'campaign_tag': {
    'undefined': 'icon-pie-chart',
    'null': 'icon-pie-chart',
    '': 'icon-pie-chart'
  }
};
