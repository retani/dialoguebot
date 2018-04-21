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

        {/*
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossOrigin="anonymous"/>
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap-theme.min.css" integrity="sha384-rHyoN1iRsVXV4nD0JutlnGaslCJuC7uwjduW9SVrLvRYooPp2bWYgmgJQIXwl/Sp" crossOrigin="anonymous"/>
        <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js" integrity="sha384-Tc5IQib027qvyjSMfHjOMaLkfuWVxZxUPnCJA7l2mCWNIpG9mGCD8wGNIcPD7Txa" crossOrigin="anonymous"></script>        
        */}
        
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