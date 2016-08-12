import context, { getters, actions } from '../application-context';

const TYPES = {
  button: 'button',
  dropdown: 'dropdown',
  separator: 'separator'
};

export const separator = {
  type: TYPES.separator
};

export const deleteActionDefinition = {
  type: TYPES.button,
  buttonType: 'delete',
  rounded: true,
  label: 'Delete',
  icon: 'icon-trash',
  disabled: true,
  handler: (...args) => {
    actions.genericManager.invokeDeleteModal();
    actions.genericManager.setEntityForActions('', '', 'delete');
    actions.genericManager.setDeleteContent();
  }
};

export const moveActionDefinition = {
  type: TYPES.button,
  buttonType: 'move',
  rounded: true,
  label: 'Move',
  icon: 'icon-imm-35',
  disabled: true,
  handler: (...args) => actions.genericManager.invokeMoveModal()
};

export const createNewFolderActionDefinition = {
  type: TYPES.button,
  buttonType: 'create',
  rounded: true,
  label: 'New Folder',
  icon: 'icon-imm-36',
  handler: (...args) => {
    return actions.genericManager.toggleCreateFolder();
  }
};

export const sortActionDefinition = {
  type: TYPES.dropdown,
  label: 'Sort',
  icon: '',
  selectedIndex: 2,
  children: [{
    label: 'Name A-Z',
    sortBy: 'name',
    sortOrder: 'asc'
  }, {
    label: 'Name Z-A',
    sortBy: 'name',
    sortOrder: 'desc'
  }, {
    label: 'Created date - Newest',
    sortBy: 'created_date',
    sortOrder: 'desc'
  }, {
    label: 'Created date - Oldest',
    sortBy: 'created_date',
    sortOrder: 'asc'
  }],
  handler: (...args) => actions.genericManager.sortEntities(...args)
};

export const sortAutomationsActionDefinition = {
  type: TYPES.dropdown,
  label: 'Sort',
  icon: '',
  selectedIndex: 2,
  children: [{
    label: 'Name A-Z',
    sortBy: 'name',
    sortOrder: 'asc'
  }, {
    label: 'Name Z-A',
    sortBy: 'name',
    sortOrder: 'desc'
  }, {
    label: 'Created date - Newest',
    sortBy: 'created_date',
    sortOrder: 'desc'
  }, {
    label: 'Created date - Oldest',
    sortBy: 'created_date',
    sortOrder: 'asc'
  }, {
    label: 'Scheduled Time - Ascending',
    sortBy: 'next_run',
    sortOrder: 'asc'
  }, {
    label: 'Scheduled Time - Descending',
    sortBy: 'next_run',
    sortOrder: 'desc'
  }],
  handler: (...args) => actions.genericManager.sortEntities(...args)
};

export const filterActionDefinition = {
  type: TYPES.button,
  buttonType: 'filter',
  label: 'Filter',
  icon: 'icon-filter',
  handler: (...args) => {
    actions.genericManager.toggleFilters();
  }
};

export const searchActionDefinition = {
  type: TYPES.button,
  buttonType: 'search',
  label: 'Search',
  icon: 'icon-search',
  handler: (...args) => {
    return actions.genericManager.toggleSearch();
  }
};

export const filterByIMMDefinition = {
  type: 'button',
  rounded: true,
  value: 'imm',
  label: 'Switch to Lists Filter',
  icon: 'icon-list-filter',
  handler: (...args) => {
    actions.genericManager.setupEntityType('imm');
actions.genericManager.fetchFoldersTree();
}
};

export const filterByCDTDefinition = {
  type: 'button',
  rounded: true,
  value: 'cdt',
  label: 'Switch to Data Tables Filter',
  icon: 'icon-custom-data-table-filter',
  handler: (...args) => {
    actions.genericManager.setupEntityType('cdt');
    actions.genericManager.fetchFoldersTree();
  }
};

export const automationFilterAllActionDefinition = {
  type: 'button',
  buttonType: 'all',
  rounded: true,
  label: 'Display All Automations',
  icon: 'icon-all',
  isLabelVisible: true,
  handler: (...args) => {
    actions.filters.clearFilters({});

    const getOperations = getters.entityCache.getOperationsByEntityName;
    const folderId = context.evaluate(getOperations('automations', 'selectedFolder'));

    actions.filters.selectFilters({
      'folderId': {
        value: folderId
      },
      'type': {
        value: 'all'
      },
    });

    actions.genericManager.filterEntities({});
  }
};

export const automationFilterByProcessActionDefinition = {
  type: 'button',
  buttonType: 'process',
  rounded: true,
  label: 'Display Process Automations',
  icon: 'icon-process',
  handler: (...args) => {
    const getOperations = getters.entityCache.getOperationsByEntityName;
    const folderId = context.evaluate(getOperations('automations', 'selectedFolder'));

    actions.filters.selectFilters({
      'type': {
        value: 'process',
        subtype: 'persistent'
      },
      'folderId': {
        value: folderId
      }
    });

    actions.genericManager.filterEntities();
  }
};

export const automationFilterByJourneyActionDefinition = {
  type: 'button',
  buttonType: 'journey',
  rounded: true,
  label: 'Display Journey Automations',
  icon: 'icon-journey',
  handler: (...args) => {
    const getOperations = getters.entityCache.getOperationsByEntityName;
    const folderId = context.evaluate(getOperations('automations', 'selectedFolder'));

    actions.filters.selectFilters({
      'type': {
        value: 'journey',
        subtype: 'persistent'
      },
      'folderId': {
        value: folderId
      }
    });
    actions.genericManager.filterEntities();
  }
};

export const defaultActions = [
  deleteActionDefinition,
  moveActionDefinition,
  createNewFolderActionDefinition,
  separator,
  sortActionDefinition,
  filterActionDefinition,
  searchActionDefinition
];

export const emailassets = [
  deleteActionDefinition,
  createNewFolderActionDefinition,
  separator,
  sortActionDefinition,
  filterActionDefinition,
  searchActionDefinition
];

export const automations = [
  deleteActionDefinition,
  moveActionDefinition,
  createNewFolderActionDefinition,
  separator,
  automationFilterAllActionDefinition,
  automationFilterByProcessActionDefinition,
  automationFilterByJourneyActionDefinition,
  separator,
  sortAutomationsActionDefinition,
  filterActionDefinition,
  searchActionDefinition
];

export const aqlfilters = [
  deleteActionDefinition,
  moveActionDefinition,
  createNewFolderActionDefinition,
  separator,
  filterByIMMDefinition,
  filterByCDTDefinition,
  sortActionDefinition,
  separator,
  filterActionDefinition,
  searchActionDefinition
];

export const automationsendtemplates = [
  deleteActionDefinition,
  moveActionDefinition,
  createNewFolderActionDefinition,
  separator,
  sortActionDefinition,
  searchActionDefinition
];

export const topics = [
  deleteActionDefinition,
  separator,
  sortActionDefinition,
  searchActionDefinition
];

export const ticketreports = [
  deleteActionDefinition,
  moveActionDefinition,
  createNewFolderActionDefinition,
  separator,
  filterActionDefinition,
  searchActionDefinition
];

export const campaigntags = [
  deleteActionDefinition,
  moveActionDefinition,
  createNewFolderActionDefinition,
  separator,
  filterActionDefinition,
  searchActionDefinition
];

