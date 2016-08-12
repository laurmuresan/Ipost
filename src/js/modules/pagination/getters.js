export const currentPage = [
  ['pagination', 'currentPage'],
  (data) => data
];

export const totalPages = [
  ['pagination', 'totalPages'],
(data) => data
];

export const limit = [
  ['pagination', 'limit'],
  (data) => data
];

export const currentPageModal = [
  ['paginationModal', 'modalPaginationInfo', 'currentPage'],
  (data) => data
];

export const totalPagesModal = [
  ['paginationModal', 'modalPaginationInfo', 'totalPages'],
  (data) => data
];

export const limitModal = [
  ['paginationModal', 'modalPaginationInfo', 'limit'],
  (data) => data
];

export const modalBreadcrumbs = [
  ['paginationModal', 'modalPaginationInfo', 'breadcrumb'],
  (data) => data
];
