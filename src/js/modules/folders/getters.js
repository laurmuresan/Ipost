const folderStore = 'folders';
const foldersBreadcrumbsStore = 'foldersBreadcrumbs';
const createNewFolderStore = 'createNewFolder';
const deleteFolderStore = 'deleteFolder';
const searchFoldersAndEmailsStore = 'searchFoldersAndEmails';

export const folders = [
  [folderStore, 'folders'],
  (data) => data
];

export const folder = [
  [folderStore, 'folder'],
  (data) => data
];

export const moveTo = [
  [folderStore, 'moveTo'],
  (data) => data
];

export const newFolder = [
  [folderStore, 'newFolder'],
  (data) => data
];

export const showMoveModal = [
  [folderStore, 'showMoveModal'],
  (data) => data
];

export const showGridFoldersLeft = [
  [folderStore, 'showGridFoldersLeft'],
  (data) => data
];

export const checkAll = [
  [folderStore, 'checkAll'],
  (data) => data
];

export const selectedFolders = [
  [folderStore, 'moveItems', 'selectedFolders'],
  (data) => data
];

export const selectedTickets = [
  [folderStore, 'moveItems', 'selectedTickets'],
  (data) => data
];

export const moveItems = [
  [folderStore, 'moveItems'],
  (data) => data
];

export const breadcrumbs = [
  [foldersBreadcrumbsStore, 'breadcrumbs'],
  (data) => data
];

export const currentSortMethod = [
  [foldersBreadcrumbsStore, 'currentSortMethod'],
  (data) => data
];

export const showBreadcrumbs = [
  [foldersBreadcrumbsStore, 'showBreadcrumbs'],
  (data) => data
];

export const bottomGridBreadCrumbsTarget = [
  [foldersBreadcrumbsStore, 'bottomGridBreadCrumbsTarget'],
  (data) => data
];

export const showAdditionalButtons = [
  [folderStore, 'showAdditionalButtons'],
  (data) => data
];

export const showBottomBreadcrumbs = [
  [folderStore, 'showBottomBreadcrumbs'],
  (data) => data
];

export const selectedFolderIdFromList = [
  [folderStore, 'selectedFolderIdFromList'],
  (data) => data
];

export const selectedFolderIdFromTree = [
  [folderStore, 'selectedFolderIdFromTree'],
  (data) => data
];

export const newFolderName = [
  [createNewFolderStore, 'newFolderName'],
  (data) => data
];

export const newFolderValidation = [
  [createNewFolderStore, 'newFolderValidation'],
  (data) => data
];

export const showLoader = [
  [folderStore, 'showLoader'],
  (data) => data
];

export const gridViewType = [
  [folderStore, 'gridViewType'],
  (data) => data
];

export const selectedFoldersForDeletion = [
  [deleteFolderStore, 'selectedFoldersForDeletion'],
  (data) => data
];

export const singleDeletionSelection = [
  [deleteFolderStore, 'singleDeletionSelection'],
  (data) => data
];

export const singleEmailSelection = [
  [deleteFolderStore, 'singleEmailSelection'],
  (data) => data
];

export const selectedEmailsForDeletion = [
  [deleteFolderStore, 'selectedEmailsForDeletion'],
  (data) => data
];

export const searchQuery = [
  [searchFoldersAndEmailsStore, 'searchQuery'],
  (data) => data
];

export const moveFolderModalSearchQuery = [
  [searchFoldersAndEmailsStore, 'moveFolderModalSearchQuery'],
  (data) => data
];

export const isFolderInRenameState = [
  [folderStore, 'isFolderInRenameState'],
  (data) => data
];

export const hasValidSearchInput = [
  [searchFoldersAndEmailsStore, 'hasValidSearchInput'],
  (data) => data
];

export const foundFoldersForMoveModal = [
  [searchFoldersAndEmailsStore, 'foundFoldersForMoveModal'],
  (data) => data
];
export const listOfOpenFolders = [
  [folderStore, 'openFolderTreeList'],
  (data) => data
];
