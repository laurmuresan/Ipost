import React from 'react';
import MoveModal from '../components/move-modal';
import DeleteModal from '../components/delete-modal';

const ModalContainer = ({ entityGroup, activeModals, actions }) => {
  const modals = (key) => ({
    move: (
      <MoveModal
        key={`modal-move-${key}`}
        entityGroup={entityGroup}
        handleSave={actions.moveEntities}
        handleCancel={actions.invokeMoveModal}
        fetchData={false}
      />
    ),

    delete: (
      <DeleteModal
        key={`modal-delete-${key}`}
        handleSave={actions.deleteEntities}
        handleCancel={actions.invokeDeleteModal}
      />
    )
  });

  if (!activeModals) {
    return <noscript/>;
  }

  return (
    <span>
      {activeModals.map((modal, index) => modals(index)[modal])}
    </span>
  );
};

ModalContainer.displayName = 'modal-container';
ModalContainer.defaultProps = {
  activeModals: null,
  entityGroup: ''
};

ModalContainer.getDataBindings = (getters, props) => {
  const { entityGroup } = props;
  return {
    tree: getters.entityCache.getEntity(entityGroup, 'tree'),
    operations: getters.entityCache.getOperationsByEntityName('modals')
  };
};

export default ModalContainer;
