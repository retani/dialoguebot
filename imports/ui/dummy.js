import React from 'react';
import { Link } from 'react-router';
import { withTracker } from 'meteor/react-meteor-data';
import { Session } from 'meteor/session';
import AdminContainer from './AdminContainer'
import Entries from '../collections/entries'
//import ReactDataGrid from 'react-data-grid';

class Dummy extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
    <AdminContainer title="Entries">
      Entries....
    </AdminContainer>
  )};
};

export default withTracker(props => {
  const sub = Meteor.subscribe('entries');
  return {
    language: Session.get("language"),
    ready: sub.ready(),
    entries: Entries.find().fetch()
  };
})(Dummy);
