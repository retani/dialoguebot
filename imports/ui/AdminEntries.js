import React from 'react';
import { Link, browserHistory } from 'react-router';
import { withTracker } from 'meteor/react-meteor-data';
import { Session } from 'meteor/session';
import moment from 'moment';

import AdminContainer from './AdminContainer'
import Entries from '../collections/entries'
import {entrySchema} from '../schemas/entry'
import choiceSchema from '../schemas/choice'
import {regexpHelp} from '../config/help'
//import ReactDataGrid from 'react-data-grid';

class AdminEntries extends React.Component {
  constructor(props) {
    super(props);
    this.renderTable = this.renderTable.bind(this)
    this.renderCells = this.renderCells.bind(this)
    this.renderHeaderCells = this.renderHeaderCells.bind(this)
    this.handleRowClick = this.handleRowClick.bind(this)
  }

  handleImport(event) {
    const target = event.target
    if (!confirm("overwrite current entries?")) {
      target.value = null;
      return;
    }
    console.log(target)
    fr = new FileReader();
    fr.onload = (progress)=>{
      //target.value = null;
      const data = progress.currentTarget.result
      let json = null
      try {
        json = JSON.parse(data)
      } catch(err) {
        alert("error")
        return;
      }
      console.log("received", json)
      Meteor.call('importEntries', json)
    };
    fr.readAsText(target.files[0]);
  }

  handleRowClick(entry_id) {
    return;
    console.log("edit entry "+entry_id)
    browserHistory.push('/admin/entries/'+entry_id);
  }

  renderHeaderCells(keys, schema, prefix) {
    let cells = []
    let index = 0
    for (let key of keys) {
      index++
      let text = schema._schema[key]['label'] || key
      let className = schema._schema[key]['columnclass'] || ""
      cells.push(<th field={key} className={className} key={"tablehead"+index+prefix}>{text}</th>)
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
      //console.log(field)
      if (typeof(field[this.props.language])=="string") {
          text = field[this.props.language]
        }
      else if (key == "choices") {
          subkeys = choiceSchema._firstLevelSchemaKeys.filter(k => k != "_id");
          text = this.renderTable(field, choiceSchema, subkeys, entry._id)
        }
      else {
        text = field
      }
      out.push(
        <td key={entry._id+index}>
        {key=="key" ?
          <Link to={"/admin/entries/"+entry._id}>
            {text}
          </Link>
        : text }
        </td>
      )
    }
    return out
  }

  renderTable(items, schema, keys, prefix=0) {
    console.log(items)

    const rows = items.map(entry => {
      return (
        <tr key={entry._id} onClick={()=>this.handleRowClick(entry._id)}>
          {this.renderCells(entry, keys)}
        </tr>
      );
    })

    return (
      <table key={"table"+prefix} className={this.constructor.name}>
        <thead>
          <tr key={"tablehead"+prefix}>
            {this.renderHeaderCells(keys, schema, prefix)}
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
      <Link style={{marginBottom:"1ex"}} className="buttonlink" to="/admin/entries/new">New</Link>
      {this.renderTable(this.props.entries, entrySchema, entrySchema._firstLevelSchemaKeys.filter(k => ["_id","style_key"].indexOf(k)===-1))}
      <code className="help-container">
        {regexpHelp}
      </code>
      <div className="import_export">
        <br />
        <a href={"data:application/json;;base64,"+btoa(JSON.stringify(this.props.entries))} download={`entries-${moment().format('YYYYMMDD-HHmm')}.json`} >Export Entries (to json file)</a>
        <br />
        <span className="link">Import Entries (from json file): <input type="file" onChange={this.handleImport}/></span>
      </div>
    </AdminContainer>
  )};
};

export default withTracker(props => {
  const sub = Meteor.subscribe('entries');
  const entries = Entries.find({},{sort: {key: 1}}).fetch()
  if (entries) console.log(entries.map((p)=>p.key))
  return {
    language: Session.get("language"),
    ready: sub.ready(),
    entries
  };
})(AdminEntries);
