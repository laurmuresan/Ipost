window.mockData = {
  'static': {
    IMG_DIR: '/static/img/',

    pageHeader: [{
      section: 'dashboard',
      pageName: 'Mailing Tickets',
      pageDescription: 'Type any part of a ticket, folder name, or list name in the Quick Search box to view the ' +
      'scrolled display of matching names. Select the desired item from the search result.'
    }, {
      section: 'create-email',
      pageName: 'Creating new email',
      pageDescription: 'After making changes to any of the settings on this tab, you must save your email before ' +
      'going to other emails or areas of the application.'
    }, {
      section: 'edit-email',
      pageName: 'Edit email',
      pageDescription: 'After making changes to any of the settings on this tab, you must save your email before ' +
      'going to other emails or areas of the application.'
    }, {
      section: 'create-sql-query',
      pageName: 'Creating new SQL Query',
      pageDescription: 'After making changes to any of the settings on this tab, you must save your filter before going ' +
      'to other queries or areas of the application.'
    }, {
      section: 'edit-sql-query',
      pageName: 'Editing an SQL Query',
      pageDescription: 'After making changes to any of the settings on this tab, you must save your filter before going ' +
      'to other queries or areas of the application.'
    }, {
      section: 'assets-manager',
      pageName: 'Assets',
      pageDescription: 'Upload and manage the assets used in your emails directly from this page.'
    }],
    previewSampleText: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium ' +
    'totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta' +
    'sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia' +
    'consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui' +
    'dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi' +
    'tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam,' +
    'quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi' +
    'consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil' +
    'molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?',
    previewLayoutOptions: [{
      id: 1,
      device: 'desktop',
      width: 'auto'
    }, {
      id: 2,
      device: 'desktop',
      width: '768'
    }, {
      id: 3,
      device: 'desktop',
      width: '480'
    }, {
      id: 4,
      device: 'desktop',
      width: '1024'
    }],

    listActionNames: [
      {
        id: 1,
        name: 'Create List'
      },
      {
        id: 2,
        name: 'Open'
      },
      {
        id: 3,
        name: 'Rename'
      },
      {
        id: 4,
        name: 'Move'
      },
      {
        id: 5,
        name: 'Delete'
      }
    ],
    listTicketActionNames: [
      {
        id: 1,
        name: 'Edit List'
      },
      {
        id: 2,
        name: 'Merge new addresses'
      },
      {
        id: 3,
        name: 'Split List'
      },
      {
        id: 4,
        name: 'Download'
      },
      {
        id: 5,
        name: 'Preview'
      },
      {
        id: 6,
        name: 'Duplicate'
      },
      {
        id: 7,
        name: 'Move'
      },
      {
        id: 8,
        name: 'Delete'
      }
    ],

    folderActionNames: [
      {
        id: 1,
        name: 'Create Email'
      },
      {
        id: 2,
        name: 'Open'
      },
      {
        id: 3,
        name: 'Rename'
      },
      {
        id: 4,
        name: 'Move'
      },
      {
        id: 5,
        name: 'Delete'
      }
    ],
    ticketActionNames: [
      {
        id: 1,
        name: 'Edit'
      },
      {
        id: 2,
        name: 'Download'
      },
      {
        id: 3,
        name: 'Send Test'
      },
      {
        id: 4,
        name: 'Send Email'
      },
      {
        id: 5,
        name: 'Spam Check'
      },
      {
        id: 6,
        name: 'Duplicate'
      },
      {
        id: 7,
        name: 'Move'
      },
      {
        id: 8,
        name: 'Delete'
      }
    ],
    tableFolderActionNames: [
      {
        id: 1,
        name: 'Create Table',
      },
      {
        id: 2,
        name: 'Open'
      },
      {
        id: 3,
        name: 'Rename'
      },
      {
        id: 4,
        name: 'Move'
      },
      {
        id: 5,
        name: 'Delete'
      }
    ],
    tableActionNames: [
      {
        id: 1,
        name: 'Modify Table Structure'
      },
      {
        id: 2,
        name: 'Upload Data'
      },
      {
        id: 3,
        name: 'Export'
      },
      {
        id: 4,
        name: 'Duplicate'
      },
      {
        id: 5,
        name: 'Move'
      },
      {
        id: 6,
        name: 'Clean Table'
      },
      {
        id: 7,
        name: 'Delete'
      }
    ]
  },

  'stores': {
    folders: {
      folder: {
        id: 0,
        name: 'Emails',
        collapsed: false,
        parentIdPath: [],
        selected: false,
        children: [],
        tickets: []
      },
      moveTo: {
        id: -1,
        label: 'Email'
      },
      moveItems: {
        moveSingleFolderId: -1,
        moveSingleTicketId: -1,
        selectedFolders: [],
        selectedTickets: []
      },
      showMoveModal: false,
      showGridFoldersLeft: true,
      checkAll: false,
      showAdditionalButtons: false,
      showLoader: false,
      folders:
        {
          id: 0,
          name: 'Emails',
          collapsed: false,
          parentIdPath: [],
          selected: false,
          children: [],
          tickets: []
        },
      openFolderTreeList: ['0'],
      tickets: [],
      isFolderInRenameState: false,
      selectedFolderIdFromList: -1,
      selectedFolderIdFromTree: -1
    },
    placeholders: ['{\\firstName}', '{\\lastName}', '{\\location}', '{\\age}'],
    campaigns: [
      {value: '1', label: 'Campaign 1'},
      {value: '2', label: 'Campaign 2'},
      {value: '3', label: 'Campaign 3'},
      {value: '4', label: 'Campaign 4'}
    ],
  },
    templates: {
      selectedElementsTemplates: {
        folderTemplatesContent: {
          folders: [
            {
              'name': 'Summer Templates',
              'id': '15',
              'checked': false
            }, {
              'name': 'Autumn Templates',
              'id': '25',
              'checked': false
            }, {
              'name': 'Winter Templates',
              'id': '35',
              'checked': false
            }, {
              'name': 'Spring Templates',
              'id': '45',
              'checked': false
            }
          ], templates: [
            {
              'name': 'Corporate promo emails - New Concert Antigua',
              'createdDate': '2015-11-21 18:06:01',
              'owner': 'test test',
              'id': '1',
              'type': 'Pre-built Template'
            }, {
              'name': 'Corporate promo emails - New Concert Antigua',
              'createdDate': '2015-11-21 18:30:01',
              'owner': 'test test',
              'id': '2',
              'type': 'Pre-built Template'
            }, {
              'name': 'Corporate promo emails - New Concert Antigua',
              'createdDate': '2015-11-21 12:06:01',
              'owner': 'test test',
              'id': '3',
              'type': 'Paste HTML'
            }, {
              'name': 'Corporate promo emails - New Concert Antigua',
              'createdDate': '2015-11-21 19:06:06',
              'owner': 'test test',
              'id': '4',
              'type': 'Paste HTML'
            }]
        }
      }
    },

    menuTabs: [
      {
        name: 'email',
        label: 'Email',
        status: 1
      },
      {
        name: 'assets_library',
        label: 'Assets Library',
        status: 1
      },
      {
        name: 'automation_sending',
        label: 'Automation Sending',
        status: 1
      },
      {
        name: 'subscribers',
        label: 'Subscribers',
        status: 0
      },
      {
        name: 'analytics',
        label: 'Analytics',
        status: 1
      }
    ],

    sortLabels: {
      'created_date': {
        asc: 'Created Date Oldest',
        desc: 'Created Date Newest',
      },
      'name': {
        asc: 'Name A-Z',
        desc: 'Name Z-A',
      }
    }
  };

export default window.mockData;
