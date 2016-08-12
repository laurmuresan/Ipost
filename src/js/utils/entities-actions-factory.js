import context, { actions, getters } from '../application-context';
import isArray from 'lodash/isArray';


const TYPES = {
  folder: 'folder',
  contentTemplate: 'content_template',
  emailSection: 'email_section',
  email: 'email',
  emailAsset: 'email_asset',
  automation: 'automation',
  automationSendTemplates: 'automationsendtemplates',
  emailList: 'email_list',
  customDataTables: 'customdatatables',
  aqlFilters: 'aqlfilter',
  topic: 'topic',
  defaultHeaderFooter: 'defaultHeaderFooter',
  importTemplates: 'importtemplates',
  exportTemplates: 'exporttemplates',
  snippets: 'snippets',
  campaignReports: 'campaign_tag',
  ticketReports: 'ticket_report'
};

const SUBTYPES = {
  processAutomation: 'process',
  journeyAutomation: 'journey',
  sendtemplate: 'send-template',
  staticList: 'static',
  testList: 'test',
  dynamicList: 'dynamic',
  suppressionList: 'suppression',
};

const getCurrentEntityGroup = () => {
  return context.evaluate(
    getters.entityCache.getOperationsByEntityName('currentEntityGroup')
  );
};

// TODO: all those functions should be moved into actions when we know exactly that all cases are handled

const isRenamingEntity = (entity) => {
  const entityId = entity.get('id');
  actions.genericManager.setIsRenamingEntity({ entityId });
};

const runOnceEntity = (entity) => {
  const id = entity.get('id');
  actions.automation.automationRunOnce(id);
};

const moveEntity = (entity) => {
  const id = entity.get('id');
  const type = entity.get('entityType');
  actions.genericManager.selectFolderFromModal();
  actions.genericManager.invokeMoveModal();
  actions.genericManager.setEntityForActions(id, type, 'move');
};

const deleteEntity = (entity) => {
  const id = entity.get('id');
  const type = entity.get('entityType');

  actions.genericManager.invokeDeleteModal();
  actions.genericManager.setEntityForActions(id, type, 'delete');
  actions.genericManager.setDeleteContent(entity);
};

const duplicateEntity = (entity) => {
  actions.genericManager.duplicateEntity(entity.get('id'));
};

const emailsSpamCheck = (entity) => {
  const payload = {
    emailId: entity.get('id'),
    format: entity.getIn(['attributes', 'contentType'])
  };
  actions.testMailing.spamCheckMail(payload);
  actions.layout.showSpamCheckModal(true);
};

const sendTest = (entity) => {
  actions.genericManager.editEntity(entity);
  actions.layout.changeCreateEmailNavigationLocation('test-mailing');
};

const createEmailFromTemplate = (entity) => {
  actions.layout.transitionToRoute('/email/template');
  actions.templatesLayout.setSelectedTemplate(entity.get('id'));
};

const focusCreationWidget = (entity) => {
  const folderId = entity.get('id');
  const folderLabel = entity.get('name');
  actions.genericManager.focusOnCreationWidget();
  actions.genericManager.selectFolderFromModal(folderId, folderLabel);
  actions.properties.changeProperties({folderId, folderLabel});
};
const sendEmail = (entity) => {
  const id = entity.get('id');
  actions.navigation.transitionTo({ nextRoute: `/automation/create/process-from-email/${id}` });
};

export const entitiesActionsFactory = ({ entityType, contentType, entityStatus, readOnly }) => {
  let result = null;

  const currentEntityGroup = getCurrentEntityGroup();

  const emptyActions = [{
    label: `No actions implemented for ${entityType}/${contentType}`,
    action: () => console.log('No actions implemented')
  }];

  const entityToFolderMap = {
    emails: 'Create New Email',
    contenttemplates: 'Create New Template',
    emailsections: 'Create New Header/Footer',
    automations: 'Create New Automation',
    automationsendtemplates: 'Create New Send Template',
    emaillists: 'Create New List',
    filters: 'Create New Filter',
    customdatatables: 'Create New Data Table',
    aqlfilters: 'Create New Filter',
    importtemplates: 'Create New Import Template',
    exporttemplates: 'Create New Export Template',
    snippets: 'Create New Snippet'
  };

  const actionsList = {
    [TYPES.folder]: [
      { label: 'Rename', action: isRenamingEntity },
      { label: 'Move', action: moveEntity },
      { label: 'Delete', action: deleteEntity }
    ],

    [TYPES.email]: [
      { label: 'Edit', action: actions.genericManager.editEntity },
      { label: 'Download', action: () => console.log('Download not implemented') },
      { label: 'Send Test', action: sendTest },
      { label: 'Send Email', action: sendEmail },
      { label: 'Spam Check', action: emailsSpamCheck },
      { label: 'Duplicate', action: duplicateEntity },
      { label: 'Move', action: moveEntity },
      { label: 'Delete', action: deleteEntity }
    ],

    [TYPES.contentTemplate]: [
      { label: 'Edit', action: actions.genericManager.editEntity },
      { label: 'Download', action: () => console.log('Download not implemented') },
      { label: 'Duplicate', action: duplicateEntity },
      { label: 'Move', action: moveEntity },
      { label: 'Delete', action: deleteEntity }
    ],

    [TYPES.emailSection]: [
      { label: 'Edit', action: actions.genericManager.editEntity },
      { label: 'Download', action: () => console.log('Download not implemented') },
      { label: 'Duplicate', action: duplicateEntity },
      { label: 'Move', action: moveEntity },
      { label: 'Delete', action: deleteEntity }
    ],

    [TYPES.emailAsset]: [
      { label: 'Edit', action: actions.genericManager.editEntity },
      { label: 'Download', action: () => console.log('Download not implemented') },
      { label: 'Duplicate', action: duplicateEntity },
      { label: 'Move', action: moveEntity },
      { label: 'Delete', action: deleteEntity }
    ],

    [TYPES.automation]: {
      [SUBTYPES.processAutomation]: [
        { label: 'Edit Process Automation', action: actions.genericManager.editEntity },
        { label: 'Run Immediately', action: runOnceEntity },
        { label: 'Schedule', action: () => console.log('Schedule not implemented') },
        { label: 'Duplicate', action: duplicateEntity },
        { label: 'Move', action: moveEntity },
        { label: 'Delete', action: deleteEntity }
      ],

      [SUBTYPES.journeyAutomation]: [
        { label: 'Edit Journey Automation', action: actions.genericManager.editEntity },
        { label: 'Duplicate', action: duplicateEntity },
        { label: 'Move', action: moveEntity },
        { label: 'Delete', action: deleteEntity }
      ],

      [SUBTYPES.sendtemplate]: [
        { label: 'Edit Send Template', action: actions.genericManager.editEntity },
        { label: 'Duplicate', action: duplicateEntity },
        { label: 'Move', action: moveEntity },
        { label: 'Delete', action: deleteEntity }
      ]
    },

    [TYPES.aqlFilters]: [
      { label: 'Edit Filter', action: actions.genericManager.editEntity },
      { label: 'Create Dynamic List', action: () => console.log('Create Dynamic List not implemented') },
      { label: 'Create Dynamic Table', action: () => console.log('Create Dynamic Table not implemented') },
      { label: 'Duplicate', action: duplicateEntity },
      { label: 'Move', action: moveEntity },
      { label: 'Delete', action: deleteEntity }
    ],

    [TYPES.customDataTables]: [
      { label: 'Modify Table Structure', action: () => console.log('Modify Table Structure not implemented') },
      { label: 'Upload Data', action: () => console.log('Upload Data not implemented') },
      { label: 'Export', action: () => console.log('Export not implemented') },
      { label: 'Clean Table', action: () => console.log('Clean Table not implemented') },
      { label: 'Duplicate', action: duplicateEntity },
      { label: 'Move', action: moveEntity },
      { label: 'Delete', action: deleteEntity }
    ],

    [TYPES.emailList]: {
      [SUBTYPES.testList]: [
        { label: 'Edit Test List', action: actions.genericManager.editEntity },
        { label: 'Download', action: () => console.log('Download not implemented') },
        { label: 'Preview', action: () => console.log('Preview not implemented') },
        { label: 'Duplicate', action: duplicateEntity },
        { label: 'Move', action: moveEntity },
        { label: 'Delete', action: deleteEntity }
      ],

      [SUBTYPES.staticList]: [
        { label: 'Edit Static List', action: actions.genericManager.editEntity },
        { label: 'Merge new addresses', action: () => console.log('Merge new addresses not implemented') },
        { label: 'Split List', action: () => console.log('Split List not implemented') },
        { label: 'Download', action: () => console.log('Download not implemented') },
        { label: 'Preview', action: () => console.log('Preview not implemented') },
        { label: 'Duplicate', action: duplicateEntity },
        { label: 'Move', action: moveEntity },
        { label: 'Delete', action: deleteEntity }
      ],

      [SUBTYPES.dynamicList]: [
        { label: 'Edit Dynamic List', action: actions.genericManager.editEntity },
        { label: 'Refresh', action: () => console.log('Refresh not implemented') },
        { label: 'Download', action: () => console.log('Download not implemented') },
        { label: 'Preview', action: () => console.log('Preview not implemented') },
        { label: 'Duplicate', action: duplicateEntity },
        { label: 'Move', action: moveEntity },
        { label: 'Delete', action: deleteEntity }
      ],

      [SUBTYPES.suppressionList]: [
        { label: 'Edit Supression List', action: actions.genericManager.editEntity },
        { label: 'Clean', action: () => console.log('Clean not implemented') },
        { label: 'Duplicate', action: duplicateEntity },
        { label: 'Move', action: moveEntity },
        { label: 'Delete', action: deleteEntity }
      ]
    },

    [TYPES.topic]: [
      { label: 'Rename', action: isRenamingEntity },
      { label: 'Delete', action: deleteEntity }
    ],

    [TYPES.defaultHeaderFooter]: [
      { label: 'Duplicate', action: duplicateEntity },
      { label: 'Download', action: () => console.log('Download not implemented')}
    ],

    [TYPES.snippets]: [
      { label: 'Edit Snippet', action: () => console.log('Edit not implemented') },
      { label: 'Download', action: () => console.log('Download not implemented') },
      { label: 'Duplicate', action: duplicateEntity },
      { label: 'Move', action: moveEntity },
      { label: 'Delete', action: deleteEntity }
    ],

    [TYPES.importTemplates]: [
      { label: 'Edit Import', action: () => console.log('Edit not implemented') },
      { label: 'Duplicate', action: duplicateEntity },
      { label: 'Move', action: moveEntity },
      { label: 'Delete', action: deleteEntity }
    ],

    [TYPES.exportTemplates]: [
      { label: 'Edit Export', action: () => console.log('Edit not implemented') },
      { label: 'Duplicate', action: duplicateEntity },
      { label: 'Move', action: moveEntity },
      { label: 'Delete', action: deleteEntity }
    ],

    [TYPES.campaignReports]: [
      { label: 'Open', action: actions.genericManager.editEntity },
      { label: 'Move', action: moveEntity },
      { label: 'Download CSR Report', action: () => console.log('Download not implemented'), href: actions.genericManager.downloadReport }
    ],

    [TYPES.ticketReports]: [
      { label: 'Open', action: actions.genericManager.editEntity },
      { label: 'Move', action: moveEntity },
      { label: 'Download CSR Report', action: () => console.log('Download not implemented'), href: actions.genericManager.downloadReport }
    ]
  };

  // Add specific create action
  if (entityToFolderMap[currentEntityGroup]) {
    actionsList[TYPES.folder] = [
      {
        label: entityToFolderMap[currentEntityGroup],
        action: focusCreationWidget
      },
      ...actionsList[TYPES.folder]
    ];
  }
  // Special case for assets. To be removed when move folders on assets works
  if (currentEntityGroup === 'emailassets') {
    actionsList[TYPES.folder] = [
      { label: 'Rename', action: isRenamingEntity },
      { label: 'Delete', action: deleteEntity }
    ];
  }

  if (entityStatus === 'published' && TYPES.contentTemplate === entityType) {
    actionsList[TYPES.contentTemplate] = [
      { label: 'Create Email', action: createEmailFromTemplate },
      ...actionsList[TYPES.contentTemplate]
    ];
  }

  result = actionsList[entityType];

  if (result && !isArray(result)) {
    result = actionsList[entityType][contentType];
  }

  if (readOnly && currentEntityGroup === 'emailsections') {
    result = actionsList[TYPES.defaultHeaderFooter];
  }

  if (!result) {
    return emptyActions;
  }

  return result;
};
