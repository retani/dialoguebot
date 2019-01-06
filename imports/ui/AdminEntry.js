import React from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import { withRouter } from 'react-router';
import { Session } from 'meteor/session';
import AdminContainer from './AdminContainer'
import Entries from '../collections/entries'
import {entrySchema} from '../schemas/entry'
import AutoForm from 'uniforms-unstyled/AutoForm';
import SubmitField from 'uniforms-unstyled/SubmitField';
import {Link, browserHistory} from 'react-router'
import {regexpHelp} from '../config/help'

class AdminEntry extends React.Component {
  constructor() {
    super()
    this.state = {
      buttonState: "neutral"
    }
    this.save = this.save.bind(this)
    this.saveCallback = this.saveCallback.bind(this)
    this.renderForm = this.renderForm.bind(this)
  }

  save(doc) {
    console.log(doc._id)
    if (!doc._id) {
      doc = this.sanitize(doc)
      console.log("inserting new entry")
      Entries.insert(doc, this.saveCallback);
    } else{
      doc = this.sanitize(doc)
      console.log("saving",doc)
      Entries.update(
        doc._id,
        {
          $set: doc
        },
        this.saveCallback
      )};
  }

  delete(doc) {
    if (confirm(`delete ${doc.key} ?`)) {
      browserHistory.go(-1)
      Entries.remove(doc._id)
    } 
  }

  sanitize(doc) {
    const id = doc._id
    doc = entrySchema.clean(doc)
    if (id) doc._id = id
    return doc
  }

  saveCallback(error, data, doc) {
    if (error) {
      console.log('Error - not saved');
      console.log(error)
      this.setState({buttonState: "error"})
    } else {
      console.log("Saved")
      this.setState({buttonState: "success"})
      setTimeout(()=>{
        this.setState({buttonState: "neutral"})
      },1000)
    }
  }

  renderForm() {
    const MySubmitField = props => <SubmitField value="Save" className={"submit-button-" + this.state.buttonState} />
    return (
      <div style={{float:"left"}} className="AdminEntry">
        <AutoForm
          schema={entrySchema}
          onSubmit={doc => this.save(doc)}
          model={this.props.entry}
          submitField={MySubmitField}
        />
        {this.props.entry && <a className="delete-button link" onClick={()=>this.delete(this.props.entry)}>delete</a>}
        <br /><br />
        <Link className="back-button" to="/admin/entries">back</Link>
      </div>
    );
  }

  render() {
    if (!this.props.ready) {
      return <p>Loading...</p>
    } else return (
    <AdminContainer title={"Entry " + (this.props.entry ? this.props.entry.key : "new") }>
      {this.renderForm()}
      <code className="help-container" style={{float:"left"}}>
        {regexpHelp}
      </code>
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
