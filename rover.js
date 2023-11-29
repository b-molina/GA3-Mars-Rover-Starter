class Rover {
   constructor(position) {
      this.position = position;
      this.mode = 'NORMAL';
      this.generatorWatts = 110;
    }

    receiveMessage(message) {
      let results = [];
      let response = {
        "message" : message.name,
        "results" : results
      }
    
      for (let i=0; i<message.commands.length; i++) {
        if (message.commands[i]["commandType"] == 'MOVE') {
          if (this.mode == 'LOW_POWER') {
            results.push({"completed": false})
            //console.log(results)
          }
          else {
            this.position = message.commands[i].value 
            results.push({"completed": true})
            //console.log(results)
        }
        }
        if (message.commands[i].commandType == 'MODE_CHANGE') {
          this.mode = message.commands[i].value;
          results.push({"completed": true})
          //console.log(results)
        }
        if (message.commands[i].commandType == 'STATUS_CHECK') {
          response.results.push({"completed": true, "roverStatus":{"mode": this.mode, "generatorWatts": this.generatorWatts, "position": this.position}
          })
        }
      }
      return response;
    }
  }
module.exports = Rover;