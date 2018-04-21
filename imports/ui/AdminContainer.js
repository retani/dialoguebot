import React from 'react';

import PrivateHeader from './PrivateHeader';

class AdminContainer extends React.Component {
  componentDidMount() {
    this.check = setInterval(function() {
      //autosize(document.querySelectorAll('textarea'));
    }, 1000);
  }

  componentWillUnmount() {
    //clearInterval(this.check);
  }

  render() {
    return (
      <div>
        {/*<link href="/vendor/antd/antd.css" type="text/css" rel="stylesheet" />*/}
        <PrivateHeader title={this.props.title}/>
        <div className="page-content">
          {this.props.children}
        </div>
    </div>
    );
  }
}

export default AdminContainer