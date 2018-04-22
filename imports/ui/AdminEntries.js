import React from 'react';
import { Link, browserHistory } from 'react-router';
import { withTracker } from 'meteor/react-meteor-data';
import { Session } from 'meteor/session';
import AdminContainer from './AdminContainer'
import Entries from '../collections/entries'
import {entrySchema} from '../schemas/entry'
import choiceSchema from '../schemas/choice'
//import ReactDataGrid from 'react-data-grid';

class AdminEntries extends React.Component {
  constructor(props) {
    super(props);
    this.renderTable = this.renderTable.bind(this)
    this.renderCells = this.renderCells.bind(this)
    this.renderHeaderCells = this.renderHeaderCells.bind(this)
    this.handleRowClick = this.handleRowClick.bind(this)
  }

  handleRowClick(entry_id) {
    console.log("edit entry "+entry_id)
    browserHistory.push('/admin/entries/'+entry_id);
  }

  renderHeaderCells(keys, prefix) {
    let cells = []
    let index = 0
    for (let key of keys) {
      index++
      cells.push(<th key={"tablehead"+index+prefix}>{key}</th>)
    }
    return cells
  }

  renderCells(entry, keys) {
    let out = []
    let index = 0
    for (let key of keys) {
      index++
      const field = entry[key]
      let text = "-"
      console.log(field)
      if (typeof(field[this.props.language])=="string") {
          text = field[this.props.language]
        }
      else if (key == "choices") {
          subkeys = choiceSchema._firstLevelSchemaKeys.filter(k => k != "_id");
          text = this.renderTable(field, subkeys,entry._id)
        }
      else {
        text = field
      }
      console.log("*"+text+"*")
      out.push(<td key={entry._id+index}>{text}</td>)
    }
    return out
  }

  renderTable(items, keys, prefix=0) {
    const rows = items.map(entry => {
      return (
        <tr key={entry._id} onClick={()=>this.handleRowClick(entry._id)}>
          {this.renderCells(entry, keys)}
        </tr>
      );
    })

    return (
      <table key={"table"+prefix}>
        <thead>
          <tr key={"tablehead"+prefix}>
            {this.renderHeaderCells(keys, prefix)}
          </tr>
        </thead>
        <tbody>
          {rows}
        </tbody>
      </table>
    )
  }

  render() {
    if (!this.props.ready) {
      return <p>Loading...</p>
    } else return (
    <AdminContainer title="Entries">
      <Link to="/admin/entries/new">New</Link>
      {this.renderTable(this.props.entries, entrySchema._firstLevelSchemaKeys)}
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
})(AdminEntries);
