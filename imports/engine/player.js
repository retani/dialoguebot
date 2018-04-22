class PlayerController {
    // input:
    //   entry
    // 
    // events: speakEnd
    //
    // callbacks:
    //   callbacks.display(text)  
    //   callbacks.speak(text)
    //   callbacks.listen({_id: keywords, ...})
    //   callbacks.leave(next_key)

  constructor(entry, callbacks) {
    this.entry = entry
    this.callbacks = callbacks

    this.entry.props = {}

    if (entry.choices && entry.choices[0] && entry.choices[0]['keywords']) {
      this.entry.props.willListen = true
    }    
  }

  action(event, data) {

    switch(event) {

      case "listenResult":

        console.log("playerController: listenResult", data)

        if (data.type == "success" && data._id) {
          let choice
          for (choice of this.entry.choices) {
            console.log(choice._id, data._id)
            if (choice._id == data._id) { break; }
          }          
          console.log("playerController: response to keywords: ", choice.keywords)
          this.callbacks.leave(choice.next_key)
        }

        break;

      case "speakEnd":

        if (this.entry.props.willListen) {
          console.log("playerController: start listen")
          commands = {}
          for (let c of this.entry.choices) {
            commands[c._id] = c.keywords
          }
          this.commands = commands
          this.callbacks.listen(this.commands)
        } else {
          setTimeout(()=>{
            console.log("playerController: leave")
            this.callbacks.leave(this.entry.choices[0]['next_key'])
          }, this.entry.choices[0]['post_delay']*1000)
        }

      break;

      default:

        if (this.entry.text_display) {
          setTimeout(()=>{
            console.log("playerController: start display")
            this.callbacks.display(this.entry.text_display)
          }, this.entry.text_display_delay*1000)
        }
      
        if (this.entry.text_speak) {
          setTimeout(()=>{
            console.log("playerController: start speak")
            this.callbacks.speak(this.entry.text_speak)
          }, this.entry.text_speak_delay*1000)
        }
        
        break;
      }
  }
}

export default PlayerController
