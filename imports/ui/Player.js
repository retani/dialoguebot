import React from 'react';
import { Link } from 'react-router';
import { withTracker } from 'meteor/react-meteor-data';
import { Session } from 'meteor/session';
import Entries from '../collections/entries'
//import ReactDataGrid from 'react-data-grid';

class Player extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
    <div className="page-player">
      player
    </div>
  )};
};

export default withTracker(props => {
  const sub = Meteor.subscribe('entries');
  return {
    language: Session.get("language"),
    ready: sub.ready(),
    entries: Entries.find().fetch()
  };
})(Player);
