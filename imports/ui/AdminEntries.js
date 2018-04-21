import React from 'react';
import { Link } from 'react-router';
import { withTracker } from 'meteor/react-meteor-data';
import { Session } from 'meteor/session';
import AdminContainer from './AdminContainer'
import Entries from '../collections/entries'
import {entrySchema} from '../schemas/entry'
//import ReactDataGrid from 'react-data-grid';

class AdminEntries extends React.Component {
  constructor(props) {
    super(props);
    this.renderTable = this.renderTable.bind(this)
    this.renderCells = this.renderCells.bind(this)
    this.renderHeaderCells = this.renderHeaderCells.bind(this)
    this.handleRowClick = this.handleRowClick.bind(this)
    this.keys = entrySchema._firstLevelSchemaKeys
  }

  handleRowClick(entry_id) {
    console.log("edit entry "+entry_id)
  }

  renderHeaderCells(keys) {
    let cells = []
    let index = 0
    for (let key of this.keys) {
      index++
      cells.push(<th key={"tablehead"+index}>{key}</th>)
    }
    return cells
  }

  renderCells(entry, keys) {
    let out = []
    let index = 0
    for (let key of this.keys) {
      index++
      const field = entry[key]
      let text = "-"
      if (field[this.props.language])
        text = field[this.props.language]
      else
        text = field
      out.push(<td key={entry._id+index}>{text}</td>)
    }
    return out
  }

  renderTable() {
    const rows = this.props.entries.map(entry => {
      return (
        <tr key={entry._id} onClick={()=>this.handleRowClick(entry._id)}>
          {this.renderCells(entry, this.keys)}
        </tr>
      );
    })

    return (
      <table>
        <thead>
          <tr key="tablehead">
            {this.renderHeaderCells(this.keys)}
          </tr>
        </thead>
        <tbody>
          {rows}
        </tbody>
      </table>
    )
  }

  render() {
    console.log(this.props.entries)
    return (
    <AdminContainer title="Entries">
      {this.renderTable()}
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
