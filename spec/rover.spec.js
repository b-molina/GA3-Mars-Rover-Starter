const Rover = require('../rover.js');
const Message = require('../message.js');
const Command = require('../command.js');

// NOTE: If at any time, you want to focus on the output from a single test, feel free to comment out all the others.
//       However, do NOT edit the grading tests for any reason and make sure to un-comment out your code to get the autograder to pass.


describe("Rover class", function() {
//test 7 setting default vakues
it("constructor sets position and default values for mode and generatorWatts", function() {
    let rover = new Rover(87382098);
    expect(rover.position).toEqual(87382098);
    expect(rover.mode).toEqual('NORMAL');
    expect(rover.generatorWatts).toEqual(110);
  });

//test 8 setting rover to have the necersarry commands
  it("response returned by receiveMessage contains name of message", function() {
    let commands = [new Command('MODE_CHANGE', 'LOW_POWER'), new Command('STATUS_CHECK')];
    let theMessage = new Message("New message!", commands);
    let theRover = new Rover(100);
    let response = theRover.receiveMessage(theMessage);
    expect(response.message).toEqual("New message!");
  });

  //test 9 if you receive 2 commands you get 2 results
  it("response returned by receiveMessage includes two results if two commands are sent in the message", function() {
    let commands = [new Command('MODE_CHANGE', 'LOW_POWER'), new Command('STATUS_CHECK')];
    let message = new Message('Test message with two commands', commands);
    let rover = new Rover(98382);
    let response = rover.receiveMessage(message);
    expect(response.results.length).toEqual(commands.length);
  });

  //test 10 makes sure rover responds to this
  it("responds correctly to status check command", function() {
    let commands = [new Command('STATUS_CHECK')];
    let message = new Message('Rover check status', commands);
    let rover = new Rover(98382);
    let response = rover.receiveMessage(message);
    let roverInfo = {mode: (rover.mode), generatorWatts: (rover.generatorWatts), position: (rover.position)};
    expect(response.results[0].roverStatus).toEqual(roverInfo);
  });
//test 11 responds to mode change 
  it("responds correctly to mode change command", function() {
    let commands = [new Command('MODE_CHANGE', 'LOW_POWER')];
    let message = new Message('Changing mode to LOW_POWER', commands);
    let rover = new Rover(98382);
    let response = rover.receiveMessage(message);
    expect(rover.mode).toEqual('LOW_POWER');
  });
//test 12 check the move command; low power mode cant be moved in this state (book) 
  it("responds with false completed value when attempting to move in LOW_POWER mode", function() {
    let commands = [new Command('MODE_CHANGE', 'LOW_POWER'), new Command('MOVE', 2000)];
    let message = new Message('Can not move in LOW_POWER mode', commands);
    let rover = new Rover(98382);
    let response = rover.receiveMessage(message);
    expect(response.results[1]).toEqual({completed: false});
  });
//test 13 
  it("responds with position for move command", function() {
    let commands = [new Command('MOVE', 2000)];
    let message = new Message('Moving to position 2000', commands);
    let rover = new Rover(98382);
    let response = rover.receiveMessage(message);
    expect(rover.position).toEqual(2000);
  });

});