export const contentCreation = [
  {
    id: 'left-nav-mailing-tickets',
    label: 'Dashboard',
    mainMenu: true,
    icon: 'icon-dashboard',
    route: '/dashboard/'
  },

  {
    id: 'left-nav-email',
    label: 'Email',
    route: '/email/manager/',
    mainMenu: true,
    icon: 'icon-email',
    children: [
      {
        id: 'left-nav-email-mailing-tickets',
        label: 'Emails',
        route: '/email/manager/'
      },

      {
        id: 'left-nav-email-templates',
        label: 'Templates',
        route: '/email/templates/manager'
      },

      {
        id: 'left-nav-email-content',
        label: 'Content',
        route: '/email/content/headers-and-footers/manager',
        children: [
          {
            id: 'left-nav-email-headers-footers',
            label: 'Headers & Footers',
            route: '/email/content/headers-and-footers/manager'
          },
          // {
          //   id: 'left-nav-email-snippets',
          //   label: 'Snippets',
          //   route: '/email/content/snippets/manager'
          // }
        ]
      }
    ]
  },

  {
    id: 'left-nav-assets-library',
    label: 'Assets Library',
    mainMenu: true,
    icon: 'icon-assets',
    route: '/assets-library/manager',
    children: [
      {
        id: 'left-nav-assets',
        label: 'Assets',
        route: '/assets-library/manager'
      }
    ]
  }
];

export const contentManagement = [
  {
    id: 'left-nav-contacts',
    label: 'Contacts',
    mainMenu: true,
    icon: 'icon-contacts',
    route: '/contacts/lists/',
    children: [
      {
        id: 'left-nav-all-contacts',
        label: 'All Contacts',
        route: '/contacts/all/'
      },

      {
        id: 'left-nav-lists',
        label: 'Lists',
        route: '/contacts/lists/'
      },

      {
        id: 'left-nav-filters',
        label: 'Filters',
        route: '/contacts/filters/manager'
      },

      {
        id: 'left-nav-data-tables',
        label: 'Data Tables',
        route: '/contacts/data-tables'
      },

      {
        id: 'left-nav-topics',
        label: 'Topics',
        route: '/contacts/topics/manager'
      },

      {
        id: 'left-nav-categories',
        label: 'Categories',
        route: '/contacts/categories'
      }
    ]
  },

  {
    id: 'left-nav-automation-sending',
    label: 'Automation',
    mainMenu: true,
    icon: 'icon-automation',
    route: '/automation/automation-sending/',
    children: [
      {
        id: 'left-nav-automations',
        label: 'Automations',
        route: '/automation/automation-sending/'
      },

      {
        id: 'left-nav-automation-send-templates',
        label: 'Send Templates',
        route: '/automation/send-templates/'
      },

      // {
      //   id: 'left-nav-automation-export-templates',
      //   label: 'Export Templates',
      //   route: '/automation/export-templates/'
      // },

      // {
      //   id: 'left-nav-automation-import-templates',
      //   label: 'Import Templates',
      //   route: '/automation/import-templates/'
      // },
    ]
  },

  {
    id: 'left-nav-analytics',
    label: 'Reports',
    mainMenu: true,
    icon: 'icon-reports',
    route: '/reports/email-tickets/',
    children: [
      {
        id: 'left-nav-email-tickets',
        label: 'Email Tickets',
        route: '/reports/email-tickets/'
      },
      {
        id: 'left-nav-campaigns',
        label: 'Campaigns',
        route: '/reports/campaigns'
      },
      {
        id: 'left-nav-journey-send',
        label: 'Journey Sends',
        route: '/reports/journey-send'
      },
      {
        id: 'left-nav-subscriber-overview',
        label: 'Subscriber Overview',
        route: '/reports/subscriber-overview'
      }
    ]
  }
];
