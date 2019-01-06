import React from 'react';
import { Link } from 'react-router';

export default () => {
  return (
    <div className="page-content page-home">
      <nav>
        <ul>
          <li>
            <Link to="/p/1">Bot-speak-listen</Link>
            <br />
            <Link to="/p/1?speak=0&listen=0">Bot-screen</Link>
          </li>
          <li>
            <Link to="/admin">Admin</Link>
          </li>
        </ul>
      </nav>
      {/* <figure className="qr-code">
        <img src="/qr-hugbie.herokuapp.com.png" />
        <figcaption>
        <small>^ URL of this page</small>
        </figcaption>
      </figure> */}
    </div>
  );
};
