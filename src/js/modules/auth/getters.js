const authStore = 'auth';

export const user = [
  [authStore, 'user'],
  (data) => data
];

export const forgot = [
  [authStore, 'forgot'],
  (data) => data
];

export const validToken = [
  [authStore, 'validToken'],
  (data) => data
];

export const updatePassword = [
  [authStore, 'updatePassword'],
  (data) => data
];
