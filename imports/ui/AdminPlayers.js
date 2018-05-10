import React from 'react';
import {Link} from 'react-router'
import Players from '../collections/players'
import { withTracker } from 'meteor/react-meteor-data';

class AdminPlayers extends React.Component {
  constructor() {
    super()
    this.renderPlayers = this.renderPlayers.bind(this)
  }

  handlePlayButton(p) {
    const newStatus =  (p.status == "play" ? "stop" : "play")
      Meteor.call("setPlayer", p.key, {status: newStatus} )
    }

  handleResetButton(p) {
      Meteor.call("getInitialEntry", null, (result,entry)=>{
        console.log(result, entry)
        Meteor.call("setPlayer", p.key, {status: "stop", "pointer":entry.key} )
      })
    }    

  renderPlayers() {
    const players = this.props.players.map((p)=>{

      const resetbutton = (<button
        onClick = {()=>this.handleResetButton(p)}
      >Reset
      </button>)

      const button = (<button
          onClick = {()=>this.handlePlayButton(p)}
        >{(p.status == "play" ? "stop" : "play")}
        </button>)
      
      return (
        <li>
          {p.key}: {p.pointer}
          {button}
          {resetbutton}
        </li>
      )
    })

    return (
      <div className="players-list">
        <h2>Control Players</h2>
        <ul>
          {players}
        </ul>
      </div>
    )
  }

  render() {
    if (!this.props.ready) {
      return <p>Loading...</p>
    } else return (
      this.renderPlayers()
  )};  

};


export default withTracker(props => {
  const sub = Meteor.subscribe('players');
  const ready = sub.ready()
  const players = Players.find().fetch()
  return {
    ready,
    players
  };
})(AdminPlayers);
