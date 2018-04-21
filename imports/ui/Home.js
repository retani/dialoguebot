import React from 'react';
import { Link } from 'react-router';

export default () => {
  return (
    <div>
      <nav className="page-content">
        <ul>
          <li>
            <Link to="/bot">Bot</Link>
          </li>
          <li>
            <Link to="/admin">Admin</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};
