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
import {entryStyle} from '../engine/helper'

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
    const fr = new FileReader();
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
      const className = (key == "text_display" ? (entryStyle(entry, this.props.language) ? "audience" : "normal") : null )
      //console.log(field)
      if (typeof(field[this.props.language])=="string") {
          text = field[this.props.language]
        }
      else if (key == "choices") {
          const subkeys = choiceSchema._firstLevelSchemaKeys.filter(k => k != "_id");
          text = this.renderTable(field, choiceSchema, subkeys, entry._id)
        }
      else {
        text = field
      }
      out.push(
        <td className={className} key={entry._id+index}>
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
      <table key={"table"+prefix} className="AdminEntries">
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
        <a href={"data:application/json;;base64,"+btoaUTF8(JSON.stringify(this.props.entries))} download={`entries-${moment().format('YYYYMMDD-HHmm')}.json`} >Export Entries (to json file)</a>
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




// https://github.com/anonyco/BestBase64EncoderDecoder

var btoaUTF8 = (function(btoa, replacer){"use strict";
	return function(inputString, BOMit){
		return btoa((BOMit ? "\xEF\xBB\xBF" : "") + inputString.replace(
			/[\x80-\uD7ff\uDC00-\uFFFF]|[\uD800-\uDBFF][\uDC00-\uDFFF]?/g, replacer
		));
	}
})(btoa, function(fromCharCode){
	return function(nonAsciiChars){"use strict";
		// make the UTF string into a binary UTF-8 encoded string
		var point = nonAsciiChars.charCodeAt(0);
		if (point >= 0xD800 && point <= 0xDBFF) {
			var nextcode = nonAsciiChars.charCodeAt(1);
			if (nextcode !== nextcode) // NaN because string is 1 code point long
				return fromCharCode(0xef/*11101111*/, 0xbf/*10111111*/, 0xbd/*10111101*/);
			// https://mathiasbynens.be/notes/javascript-encoding#surrogate-formulae
			if (nextcode >= 0xDC00 && nextcode <= 0xDFFF) {
				point = (point - 0xD800) * 0x400 + nextcode - 0xDC00 + 0x10000;
				if (point > 0xffff)
					return fromCharCode(
						(0x1e/*0b11110*/<<3) | (point>>>18),
						(0x2/*0b10*/<<6) | ((point>>>12)&0x3f/*0b00111111*/),
						(0x2/*0b10*/<<6) | ((point>>>6)&0x3f/*0b00111111*/),
						(0x2/*0b10*/<<6) | (point&0x3f/*0b00111111*/)
					);
			} else return fromCharCode(0xef, 0xbf, 0xbd);
		}
		if (point <= 0x007f) return inputString;
		else if (point <= 0x07ff) {
			return fromCharCode((0x6<<5)|(point>>>6), (0x2<<6)|(point&0x3f));
		} else return fromCharCode(
			(0xe/*0b1110*/<<4) | (point>>>12),
			(0x2/*0b10*/<<6) | ((point>>>6)&0x3f/*0b00111111*/),
			(0x2/*0b10*/<<6) | (point&0x3f/*0b00111111*/)
		);
	}
}(String.fromCharCode));