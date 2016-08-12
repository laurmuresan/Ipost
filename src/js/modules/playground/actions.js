import { createAction } from '../../create-action';

export const sliderChange = (values) => {
  createAction({
    type: 'SLIDER_CHANGE',
    payload: values
  });
};
