import React from 'react';
import {Link} from 'react-router'

import PrivateHeader from './PrivateHeader';

export default () => {
  return (
    <div>
      <PrivateHeader title="Dashboard"/>
      <div className="page-content">
        <Link to="/admin/entries">Edit Entries</Link>
      </div>
    </div>
  );
};
