class Rover {
   //rover class descrption 
   //1
   //constructor(position)
  // position is a number representing the rover’s position.
  // Sets this.position to position
  // Sets this.mode to 'NORMAL'
  // Sets the default value for generatorWatts to 110

   constructor(position) {
      this.position = position;
      this.mode = 'NORMAL';
      this.generatorWatts = 110;
    }
    //2
    //receiveMessage(message)
    // message is a Message object
    // Returns an object containing at least two properties:
    // message: the name of the original Message object
    // results: an array of results. Each element in the array is an object that corresponds to one Command in message.commands.

    receiveMessage(message) {
      let results = [];
      let response = {
        "message" : message.name,
        "results" : results
      }
    //3
      for (let i = 0; i < message.commands.length; i++) {
        if (message.commands[i].commandType === 'STATUS_CHECK') {
          response.results.push({
            completed: true,
            roverStatus: {
              mode: this.mode,
              generatorWatts: this.generatorWatts,
              position: this.position
            }
          });
        } else if (message.commands[i].commandType === 'MODE_CHANGE') {
          this.mode = message.commands[i].value;
          response.results.push({
            completed: true
          });
        } else if (message.commands[i].commandType === 'MOVE') {
          if (this.mode === 'LOW_POWER') {
            response.results.push({
              completed: false
            });
          } else {
            this.position = message.commands[i].value;
            response.results.push({
              completed: true
            });
          }
        } else {
          response.results.push({
            completed: true
          });
        }
      }
      return response;
    }
  
  }
module.exports = Rover;