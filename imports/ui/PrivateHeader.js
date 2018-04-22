import React from 'react';
import { Accounts } from 'meteor/accounts-base';
import { Link } from 'react-router';

const PrivateHeader = (props) => {
  return (
    <div className="header">
      <div className="header__content">
        <h1 className="header__title">{props.title}</h1>
        <nav>
          <ul>
          <li>
              <Link to="/">
                Home
              </Link>
            </li>            
            <li>
              <Link to="/admin/entries">
                Entries
              </Link>
            </li>
          </ul>
        </nav>
        <button className="button button--link-text" onClick={() => Accounts.logout()}>Logout</button>
      </div>
    </div>
  );
};

export default PrivateHeader;

