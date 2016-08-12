export const emailNotifications = {
  plainTextContentSaveSuccess: {
    id: 1,
    type: 'success',
    title: 'Save text email',
    message: 'Your text email has been successfully saved.',
    timeOut: 3000
  },
  plainTextNoContent: {
    id: 1,
    type: 'error',
    title: 'Error',
    message: 'Please fill in the \'Plain text\' section with your email content!',
    timeOut: 3000
  },
  pasteHtmlNoContent: {
    id: 1,
    type: 'error',
    title: 'Error',
    message: 'Please fill in the \'HTML\' section with your email content!',
    timeOut: 3000
  },
  pasteHtmlContentSaveSuccess: {
    id: 1,
    type: 'success',
    title: 'Save HTML type email',
    message: 'Your HTML email has been successfully saved.',
    timeOut: 3000
  },
  templateContentSaveSuccess: {
    id: 1,
    type: 'success',
    title: 'Save Template type email',
    message: 'Your Template type email has been successfully saved.',
    timeOut: 3000
  },
  dragdropContentSaveSuccess: {
    id: 1,
    type: 'success',
    title: 'Save Drag and Drop type email',
    message: 'Your Drag and Drop type email has been successfully saved.',
    timeOut: 3000
  },
  dragdropContentFail: {
    id: 1,
    type: 'error',
    title: 'Error',
    message: 'Could not save Drag and Drop type email. Please go to content step.',
    timeOut: 3000
  },
  previewFetchSuccess: {
    id: 1,
    type: 'success',
    title: 'Save Preview-As email',
    message: 'Preview retrieved successfully',
    timeOut: 3000
  },
  noSampleSelected: {
    id: 1,
    type: 'error',
    title: 'No Sample Selected',
    message: 'You must select a template before proceeding to the properties step',
    timeOut: 3000
  }
};

export const templateNotifications = {
  noContent: {
    id: 1,
    type: 'error',
    title: 'Error',
    message: 'Please fill in the Content section with your template',
    timeOut: 3000
  },
  pasteHtmlContentSaveSuccess: {
    id: 1,
    type: 'success',
    title: 'Save Paste HTML Template',
    message: 'Your Paste HTML Template has been successfully saved.',
    timeOut: 3000
  },
  sampleContentSaveSuccess: {
    id: 1,
    type: 'success',
    title: 'Save Sample Layout Template',
    message: 'Your Sample Layout Template has been successfully saved.',
    timeOut: 3000
  },
  prebuiltContentSaveSuccess: {
    id: 1,
    type: 'success',
    title: 'Save Prebuilt Template',
    message: 'Your Prebuilt Template has been successfully saved.',
    timeOut: 3000
  },
  publishTemplate: {
    id: 1,
    type: 'success',
    title: 'Published Successfully',
    message: 'The template has been published.',
    timeOut: 3000
  },
  unpublishTemplate: {
    id: 1,
    type: 'success',
    title: 'Unpublished Successfully',
    message: 'The template has been unpublished.',
    timeOut: 3000
  }
};
export const uploadNotifications = {
  fileTypeError: {
    id: 1,
    type: 'error',
    title: 'File Type Error',
    message: 'The uploaded file type is not supported. Please try again using a .txt or .html file type',
    timeOut: 3000
  },
  textFileTypeError: {
    id: 1,
    type: 'error',
    title: 'File Type Error',
    message: 'The uploaded file type is not supported. Please try again using a .txt or .html file type',
    timeOut: 3000
  },
  fileSizeError: {
    id: 1,
    type: 'error',
    title: 'File Size Error',
    message: 'Maximum upload size exceeded!',
    timeOut: 3000
  }
};

export const sectionsNotifications = {
  saveHeaderSuccess: {
    id: 1,
    type: 'success',
    title: 'Save Header',
    message: 'The header content has been saved.',
    timeOut: 6000
  },
  saveFooterSuccess: {
    id: 1,
    type: 'success',
    title: 'Save Footer',
    message: 'The footer content has been saved.',
    timeOut: 6000
  }
};

export const filterNotificatons = {
  savaFilterSuccess: {
    id: 1,
    type: 'success',
    title: 'Save Filter',
    message: 'The filter has been saved.',
    timeOut: 6000
  },
};
