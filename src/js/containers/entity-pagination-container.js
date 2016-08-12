import delay from 'lodash/delay';
import { emptyMap } from '../resources/empty-structures';
import React, { Component } from 'react';
import { Pagination } from 'react-bootstrap';

class PaginationContainer extends Component {
  static displayName = 'PaginationContainer';

  static defaultProps = {
    pagination: emptyMap,
    currentPage: 1,
    totalPages: 1,
    handleChange: () => {},
    reset: () => {}
  };

  handleSelect(...args) {
    const [ , eventObj ] = args;
    const { handleChange, currentPage } = this.props;
    const page = eventObj.eventKey;

    if (currentPage === page) {
      return;
    }

    handleChange({ page });
  }

  componentWillUnmount() {
    delay(() => this.props.reset(), 0);
  }

  render() {
    const { totalPages, currentPage } = this.props;
    const first = <div className='tooltip-hover'>&laquo;<span className='tooltiptext'>First</span></div>;
    const prev = <div className='tooltip-hover'>&lsaquo;<span className='tooltiptext'>Previous</span></div>;
    const next = <div className='tooltip-hover'>&rsaquo;<span className='tooltiptext'>Next</span></div>;
    const last = <div className='tooltip-hover'>&raquo;<span className='tooltiptext'>Last</span></div>;
    if (totalPages <= 1) {
      return null;
    }

    return (
      <Pagination
        bsSize='small'
        prev={prev}
        next={next}
        first={first}
        last={last}
        items={totalPages}
        maxButtons={5}
        activePage={currentPage}
        onSelect={this.handleSelect.bind(this)}
      />
    );
  }
}

export default PaginationContainer;
