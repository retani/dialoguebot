import React from 'react';
import { Link, withRouter } from 'react-router';
import { withTracker } from 'meteor/react-meteor-data';
import { Session } from 'meteor/session';
import speak from '../client/speak';
import annyang from 'annyang';
import Beforeunload from 'react-beforeunload';

import Entries from '../collections/entries'
import Players from '../collections/players'
import PlayerController from '../engine/player'
import {entryStyle} from '../engine/helper'
//import ReactDataGrid from 'react-data-grid';

class Player extends React.Component {
  constructor(props) {
    super(props);
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
    if (this.playerController) this.playerController.action("abort")
    annyang.abort()
    this.setState(this.resetState)
  }

  componentDidMount() {
    if (this.props.player && this.props.player.status == "play")
       {
      this.start()
    }
  }

  componentWillUnmount() {
    Meteor.call("setPlayer", this.props.player.key, {status:"stop"})
  }

  componentDidUpdate(prevProps) {
    console.log(this.props, prevProps)
    if (prevProps.entry && this.props.entry
      && prevProps.entry.key != this.props.entry.key
      ) {
        if (this.props.player 
          && this.props.player.status == "play")
           {
          this.start()
        }
      }
    if (this.props.player && prevProps.player
      && this.props.player.status == "play" && prevProps.player.status != "play")
       {
      this.start()
    }
    if (this.props.player && prevProps.player
      && this.props.player.status == "stop" && prevProps.player.status != "stop")
       {
      this.reset()
    }
    return true;
  }

  handleClick() {
    if (this.props.player.status == "play") {
      return;
    } else {
      Meteor.call("setPlayer", this.props.player.key, {status:"play"})
      //this.start()
    }    
  }

  start() {
    this.reset()
    console.log("starting with ", this.props.entry.key)
    if (entryStyle(this.props.entry, this.props.language)) {
      this.setState({style:"audience"})
    }

    const callbacks = {}
    
    callbacks.display = (text)=>{
      this.setState({text_display:text[this.props.language]})
    }
    
    if (this.props.capabilities.speak) {
      callbacks.speak = (text)=>{
        speak(text[this.props.language], () =>
          this.playerController.action("speakEnd")
        )
      }
    }

    if (this.props.capabilities.listen) {
      callbacks.listen = (commands)=>{
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
      }
    }

    callbacks.leave = (next_key) => {
      this.reset();
      if (this.props.player.status != "play") return;
      if (this.props.pointer == next_key) { this.start() }
      Meteor.call("setPlayer", this.props.player.key, {pointer:next_key})
    }

    this.playerController = new PlayerController(this.props.entry, callbacks)
    this.playerController.action()
  }

  render() {
    return (
    <Beforeunload onBeforeunload={e => this.reset} >
      <div className="page-player" onClick={this.handleClick}>
        <div className="controls">
          <span>
            {this.props.player && this.props.player.key}: &nbsp;
            {this.props.pointer}
            &nbsp;
            {this.props.player && this.props.player.status}
            &nbsp;
            {this.props.capabilities.speak && "speak"}
            &nbsp;
            {this.props.capabilities.listen && "listen"}
            &nbsp;
          </span>
          {this.state.listening && <span>&#x25C9;</span>}
        </div>
        {this.props.ready &&
          <div className={"screen style-"+this.state.style}>
            {this.state.text_display}
          </div>
        }
      </div>
    </Beforeunload>
  )};
};

export default withTracker(props => {
  const sub2 = Meteor.subscribe('players', { key: props.params.key });
  const player = Players.findOne();
  const pointer = (player ? player.pointer : null)
  const sub = Meteor.subscribe('entries', { key: pointer });
  const entry = Entries.findOne();
  const capabilities = {
    speak: props.location.query.speak != 0,
    listen: props.location.query.listen != 0,
  }
  return {
    language: Session.get("language"),
    ready: sub.ready() && sub2.ready(),
    entry,
    pointer,
    player,
    capabilities
  };
})(withRouter(Player));
