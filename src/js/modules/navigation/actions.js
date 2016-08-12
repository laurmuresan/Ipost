import context from '../../application-context';
import { TRANSITION_TO } from './action-types';


export function transitionTo(data) {
  context.dispatch(TRANSITION_TO, data);
}
