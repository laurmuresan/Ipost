import React from 'react';
import ReactDOM from 'react-dom';
import ModalComponent from './components/modal-component';
import context from './application-context';

const getMountNode = (id) => document.getElementById(id);
const MODAL_LAYERS = {
  OVERLAY_1: 'overlay-1',
  OVERLAY_2: 'overlay-2',
};

const ApplicationModal = {
  createModal: function ({ title = 'Modal Content', content = 'Modal Content',
    actions, buttons, withCallback = false, modalSize}) {

    let mountNode = getMountNode(MODAL_LAYERS.OVERLAY_1);
    // If we create a modal above an existing modal.
    if (mountNode.childNodes.length) {
      mountNode = getMountNode(MODAL_LAYERS.OVERLAY_2);
    }
    const modalOptions = {
      title,
      content,
      buttons,
      withCallback,
      actions: {
        ...actions,
        unmountModal: this.unmountModal
      },
      modalSize,
      mountNode,
      reactor: context
    };
    // handleModalHide, handleModalCancel, handleModalConfirm are the callbacks
    // to be sent to the modal, and the unmount function.
    ReactDOM.render(<ModalComponent {...modalOptions} />, mountNode);
  },

  unmountModal(mountNode) {
    ReactDOM.unmountComponentAtNode(mountNode);
  }
};

export default ApplicationModal;
