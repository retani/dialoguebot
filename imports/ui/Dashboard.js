import React from 'react';
import {Link} from 'react-router'

import PrivateHeader from './PrivateHeader';
import AdminPlayers from './AdminPlayers'

export default () => {
  return (
    <div>
      <PrivateHeader title="Dashboard"/>
      <div className="page-content">
        <Link to="/admin/entries">Edit Entries</Link>
      </div>
      <AdminPlayers />
    </div>
  );
};
