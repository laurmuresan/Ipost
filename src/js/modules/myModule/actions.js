import context from '../../application-context';
import {FILTER} from './action-types';
export function filter(value) {
  context.dispatch('FILTER', value);
}

