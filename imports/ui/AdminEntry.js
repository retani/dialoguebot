import React from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import { withRouter } from 'react-router';
import { Session } from 'meteor/session';
import AdminContainer from './AdminContainer'
import Entries from '../collections/entries'
import {entrySchema} from '../schemas/entry'
import AutoForm from 'uniforms-unstyled/AutoForm';

class AdminEntry extends React.Component {
  constructor() {
    super()
    this.save = this.save.bind(this)
    this.renderForm = this.renderForm.bind(this)
  }

  save(doc) {
    if (!doc._id) {
      doc = entrySchema.clean(doc)
      Entries.insert(doc, this.saveCallback);
    } else
    Entries.update(
        doc._id,
        {
          $set: doc
        },
        this.saveCallback
      );
  }

  saveCallback(error, data, doc) {
    if (error) {
      console.log('Error - not saved');
      console.log(error)
    } else {
      console.log("Saved")
    }
  }

  renderForm() {
    return (
      <AutoForm
        schema={entrySchema}
        onSubmit={doc => this.save(doc)}
        model={this.props.entry}
      />
    );
  }

  render() {
    if (!this.props.ready) {
      return <p>Loading...</p>
    } else return (
    <AdminContainer title={"Entry " + (this.props.entry ? this.props.entry.key : "new") }>
      {this.renderForm()}
    </AdminContainer>
  )};  

};

export default withTracker(props => {
  const entry_id = props.params.id;
  const sub = Meteor.subscribe('entries', {_id: entry_id});
  const ready = sub.ready()
  const entry = Entries.findOne({_id: entry_id})
  return {
    language: Session.get("language"),
    ready,
    entry
  };
})(withRouter(AdminEntry));
