
import React from 'react';
import { Row } from 'reactstrap';

import { PAGE_NOT_FOUND } from '../../helpers/translations';

const NotFoundPage = (props) => {
  return (
    <Row>
      <div className="not-found">
        <p>{PAGE_NOT_FOUND}</p>
      </div>
    </Row>
  )
}

export default NotFoundPage;

