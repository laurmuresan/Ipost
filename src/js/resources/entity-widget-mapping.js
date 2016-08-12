export const entityTypeMapping = {
  'email': 'Emails',
  'content_template': 'Templates',
  'email_section': 'Sections',
  'email_asset': 'Assets',
  'automation': {
    'journey': 'Automations',
    'process': 'Automations',
    'send-template': 'Send Templates',
  },
  'email_ticket':'Email Tickets',
  'ticket_report': 'Reports',
  'email_list': 'Lists',
  'aqlfilter': 'Filters',
  'customdatatables': 'Data Tables',
  'campaign_tag': 'Campaigns'
};

export const contentTypeLabelMapping = {
  'text': 'Text',
  'dragdrop': 'Drag & Drop',
  'pastehtml': 'Paste HTML',
  'template': 'Templates',
  'prebuilt': 'Prebuilt',
  'sample': 'Sample Layout',
  'header': 'Header',
  'footer': 'Footer',
  'application/pdf': 'PDF',
  'image/gif': 'Image',
  'image/jpeg': 'Image',
  'image/jpg': 'Image',
  'image/png': 'Image',
  'image/tiff': 'Image',
  'journey': 'Journey',
  'process': 'Process',
  'test': 'Test',
  'static': 'Static',
  'dynamic': 'Dynamic Data Table',
  'custom': 'Custom Data Table',
  'Suppression': 'MD5 Suppression',
  'imm': 'Lists Filter',
  'cdt': 'Data Tables Filter'
};

export const statusValuesMapping = {
  'draft': 'Draft',
  'ready': 'Ready',
  'error': 'Error',
  'pending': 'Pending',
  'warning': 'Warning',
  'published': 'Published',
  'unpublished': 'Unpublished'
};

export const statusDropdownValues = {
  'emails': [
    {label: 'Pending', value: 'pending'},
    {label: 'Ready', value: 'ready'},
    {label: 'Warning', value: 'warning'},
    {label: 'Error', value: 'error'}
  ],
  'contenttemplates': [
    {label: 'Draft', value: 'draft'},
    {label: 'Published', value: 'published'}
  ],
  'automations': [
    {label: 'Active', value: 'active'},
    {label: 'Paused', value: 'paused'},
    {label: 'Stopped', value: 'stopped'}
  ],
  'email_tickets': [
    {label: 'In Progress', value: 'in_progress'},
    {label: 'Completed', value: 'completed'}
  ],
  'ticketreports': [
    {label: 'In Progress', value: 'in_progress'},
    {label: 'Completed', value: 'completed'}
  ],
  'campaigntags': [
    {label: 'In Progress', value: 'in_progress'},
    {label: 'Completed', value: 'completed'}
  ]
};

export const countable = [
  {label: 'Equal', value: 'equal'},
  {label: 'Less than', value: 'less_than'},
  {label: 'Greater than', value: 'greater_than'}
];

export const cdtSendable = [
  {label: 'Yes', value: '1'},
  {label: 'No', value: '0'}
];

export const testing = [
  {label: 'Yes', value: '1'},
  {label: 'No', value: '0'}
];

export const typeFieldDropdownValues = {
  'emails': [
    {label: 'Text Email', value: 'text'},
    {label: 'Paste HTML Email', value: 'pastehtml'},
    {label: 'Templates Email', value: 'template'},
    {label: 'Drag & Drop Email', value: 'dragdrop'}
  ],

  'customdatatables': [
    {label: 'Custom Data Table', value: 'custom'},
    {label: 'Dynamic Data Table', value: 'dynamic'}
  ],

  'automations': [
    {label: 'Process Automation', value: 'process'},
    {label: 'Journey Automation', value: 'journey'}
  ],

  'aqlfilters': [
    {label: 'Lists Filter', value: 'imm'},
    {label: 'Data Tables Filter', value: 'cdt'}
  ],

  'emailsections': [
    {label: 'Header', value: 'header'},
    {label: 'Footer', value: 'footer'}
  ],

  'emaillists': [
    {label: 'Test List', value: 'Test'},
    {label: 'Static List', value: 'Static'},
    {label: 'Dynamic List', value: 'Dynamic'},
    {label: 'MD5 Suppression List', value: 'Suppression'}
  ],

  'contenttemplates': [
    {label: 'Prebuilt Template', value: 'prebuilt'},
    {label: 'Paste HTML Template', value: 'pastehtml'},
    {label: 'Sample Layout Template', value: 'sample'}
  ],

  'emailassets': [
    {label: 'Image', value: 'image'},
    {label: 'PDF', value: 'pdf'}
  ]
};

export const searchTitles = {
  'emails': 'Search Emails',
  'customdatatables': 'Search Data Tables',
  'automations': 'Search Automation Sending',
  'aqlfilters': 'Search Filters',
  'emailsections': 'Search Headers & Footers',
  'emaillists': 'Search Lists',
  'contenttemplates': 'Search Templates',
  'topics': 'Search Topics',
  'emailassets': 'Search Assets',
  'automationsendtemplates': 'Search Send Templates',
  'ticketreports': 'Search Email Tickets',
  'campaigntags': 'Search Campaigns'
};

export const filterSearchResultsTitle = {
  'emails': 'Emails',
  'customdatatables': 'Data Tables',
  'automations': 'Automation Sending',
  'aqlfilters': 'Filters',
  'emailsections': 'Headers & Footers',
  'emaillists': 'Lists',
  'contenttemplates': 'Templates',
  'topics': 'Topics',
  'emailassets': 'Assets',
  'automationsendtemplates': 'Send Templates',
  'ticketreports': 'Email Tickets',
  'campaigntags': 'Campaigns'
};

export const validationItemMapping = {
  'emails': 'Email',
  'customdatatables': 'Table',
  'automations': 'Automation',
  'aqlfilters': 'Filter',
  'emailsections': 'Section',
  'emaillists': 'List',
  'contenttemplates': 'Template',
  'topics': 'Topic',
  'emailassets': 'Asset',
  'automationsendtemplates': 'Send Template',
  'ticketreports': 'Email Ticket',
  'campaigntags': 'Campaign',
  'exporttemplates': 'Export Template',
  'importtemplates': 'Import Template',
  'snippets': 'Snippets',
};

export const validationMessagesMap = {
  mandatory: (type, field) => {return `The ${type}\'s ${field} cannot be empty`;},
  maxLength: (type, field) => {return `The ${type}\'s ${field} max length is 128 characters`;},
  startsWithLetter: () => {return `The first character must be a letter`;},
  isAlphaNumericUnderscore: (type) => {return `The ${type}\'s Name can contain only characters, numbers, and underscore.`;},
  isAlphaNumericSpace: () => {return `Invalid characters detected.`;},
};
