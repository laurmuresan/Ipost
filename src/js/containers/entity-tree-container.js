import React, { Component } from 'react';
import context from '../application-context';
import EntityTreeWrapper from './entity-tree-wrapper';
import { NodeWrapper } from '../components/tree';
import { toImmutable } from 'nuclear-js';
import { Tooltip, OverlayTrigger } from 'react-bootstrap';

const ZWNJ = '\u200C';

class EntityTreeContainer extends Component {
  static displayName = 'EntityTreeContainer';

  static getDataBindings(getters, props) {
    const { entityGroup } = props;

    return {
      tree: getters.entityCache.getEntity(entityGroup, 'tree'),
      operations: getters.entityCache.getOperationsByEntityName(entityGroup),
      isRenamingEntity: getters.entityCache.getOperationsByEntityName('isRenamingEntity')
    };
  }

  constructor(props) {
    super(props);

    this.state = {
      dropDownId: ''
    };
  }

  static defaultProps = {
    tree: toImmutable([]),
    operations: toImmutable({}),
    expandedIcon: ZWNJ,
    collapsedIcon: ZWNJ,
    onTreeItemClick: () => {},
    onExpanderClick: () => {},
    onExpandAllTreeItems: () => {}
  };

  setDropDownId(id) {
    this.setState({
      dropDownId: id
    });
  }

  render() {
    const {
      entityGroup,
      tree,
      actions,
      isRenamingEntity,
      onTreeItemClick,
      onExpanderClick,
      onExpandAllTreeItems,
      expandedIcon,
      collapsedIcon,
      operations
    } = this.props;

    let renamingEntity;

    if (isRenamingEntity && isRenamingEntity.get) {
      renamingEntity = isRenamingEntity.get('entityId');
    }

    const expandedList = operations.get('expandedList');
    const selectedFolder = operations.get('selectedFolder');
    const isExpanded = operations.get('allTreeItemsExpanded');
    const tooltip = isExpanded ? <Tooltip><strong>Collapse All</strong></Tooltip> : <Tooltip><strong>Expand All</strong></Tooltip>;

    return (
      <EntityTreeWrapper setDropDownId={this.setDropDownId.bind(this)}>
        <div className='imm-split-layout-west-wrapper'>
          <div className='content-options content-options-icons'>
            <h3>
              <OverlayTrigger
                placement='top'
                delayShow={300}
                delayHide={150}
                overlay={tooltip}
              >
                <button
                  type='button'
                  onClick={onExpandAllTreeItems}
                  className='btn-opt-circular icon-imm-20'
                />
              </OverlayTrigger>
              Folders
            </h3>
          </div>
          <div className='body'>
            <div className='imm-tree-view-wrapper'>
              <NodeWrapper
                entityGroup={entityGroup}
                droppable
                items={tree}
                onDrop={actions.moveEntities}
                dropDownId={this.state.dropDownId}
                setDropDownId={this.setDropDownId.bind(this)}
                expandedIcon={expandedIcon}
                collapsedIcon={collapsedIcon}
                expandedList={expandedList}
                selectedFolder={selectedFolder}
                expanderClickHandler={onExpanderClick}
                itemClickHandler={onTreeItemClick}
                isRenamingEntity={renamingEntity}
              />
            </div>
          </div>
        </div>
      </EntityTreeWrapper>
    );
  }
}

const ConnectedEntityTreeContainer = context.connect(EntityTreeContainer);
export default ConnectedEntityTreeContainer;
