export default function entityUrlBuilder() {
  // TODO: this is here just to make it work but it has nothing to do
  //       with the url builder so it needs to be removed
  const entityTypeMap = {
    'content_template': 'email/templates',
    'email_section': 'email/content/headers-and-footers',
    'email_list': 'lists',
    'email_asset': 'assets',
    'ticket_report': 'reports/email-tickets',
    'campaign_tag': 'reports/campaigns',
  };

  return {
    url: '',

    urlExceptions: {
      'header': (t) => `create-edit-${t}`,
      'footer': (t) => `create-edit-${t}`,
      'image/jpg': () => 'image',
      'image/jpeg': () => 'image',
      'image/png': () => 'image',
      'image/gif': () => 'image',
      'application/pdf': () => 'pdf'
    },

    slash() {
      this.url += '/';
      return this;
    },

    addPart(value) {
      // TODO: this is here just to make it work but it has nothing to do
      //       with the url builder so it needs to be removed
      if (entityTypeMap.hasOwnProperty(value)) {
        value = entityTypeMap[value];
      }

      this.url += String(value);
      return this;
    },

    get() {
      return this.url;
    }
  };
}
