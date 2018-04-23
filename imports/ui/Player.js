import React from 'react';
import { Link, withRouter } from 'react-router';
import { withTracker } from 'meteor/react-meteor-data';
import { Session } from 'meteor/session';
import speak from '../client/speak';
import annyang from 'annyang';
import Beforeunload from 'react-beforeunload';

import Entries from '../collections/entries'
import PlayerController from '../engine/player'
//import ReactDataGrid from 'react-data-grid';

class Player extends React.Component {
  constructor(props) {
    super(props);
    Session.set("pointer", "A100")
    this.resetState = {
      text_display: "",
      listening: false,
      style: "normal",
    }    
    this.state = this.resetState
    this.reset = this.reset.bind(this)
    this.start = this.start.bind(this)
    this.handleClick = this.handleClick.bind(this)
  }

  reset() {
    annyang.abort()
    this.setState(this.resetState)
  }

  componentDidUpdate(prevProps) {
    if (prevProps.entry && this.props.entry && prevProps.entry._id != this.props.entry._id) {
      this.start()
    }
    return true;
  }

  handleClick() {
    if (this.started) {
      return;
    } else {
      this.started = true
      this.start()
    }    
  }

  start() {
    console.log("starting with ", this.props.entry.key)
    if (this.props.entry.text_speak[this.props.language] == "") {
      this.setState({style:"audience"})
    }
    this.playerController = new PlayerController(this.props.entry, {
      display: (text)=>{
        this.setState({text_display:text[this.props.language]})
      },
      speak: (text)=>{
        speak(text[this.props.language], () =>
          this.playerController.action("speakEnd")
        )
      },
      listen: (commands)=>{
        let annyangCommands = {}
        Object.entries(commands).forEach((c)=>{
          annyangCommands[c[1]] = {
            callback: (args)=>{
              annyang.abort()
              this.setState({"listening": false})
              this.playerController.action("listenResult",{type:"success", _id:c[0], args})
            },
            regexp: new RegExp(c[1])
          }
        })
        console.log("starting annyang with:", annyangCommands)
        annyang.debug(true)
        annyang.removeCommands()
        annyang.addCommands(annyangCommands);
        annyang.start();
        this.setState({"listening": true})
      },
      leave: (next_key) => {
        this.reset();
        if (this.props.pointer == next_key) { this.start() }
        else Session.set({pointer:next_key})
      }
    })
    this.playerController.action()
  }

  render() {
    return (
    <Beforeunload onBeforeunload={e => this.reset} >
      <div className="page-player" onClick={this.handleClick}>
        <div className="controls">
          {this.props.pointer}
          &nbsp;
          {this.state.listening && <span>&#x25C9;</span>}
        </div>
        <div className={"screen style-"+this.state.style}>
          {this.state.text_display}
        </div>
      </div>
    </Beforeunload>
  )};
};

export default withTracker(props => {
  const pointer = Session.get("pointer")
  const query = { key: pointer }
  const sub = Meteor.subscribe('entries', query);
  const entry = Entries.findOne();
  return {
    language: Session.get("language"),
    ready: sub.ready(),
    entry,
    pointer
  };
})(withRouter(Player));
