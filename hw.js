// General Assembly, WDI (Web Development Immersive) Remote, Cohort 02 (R2D2)
// Copyright (C) 2016 Matt Brendzel under the GNU General Public License.
// See LICENSE for details.

/// Data & Core Business Logic ///
const Stopwatch = {
  tickClock: function(){
    if (Stopwatch.isRunning) {
      setTimeout(Stopwatch.tickClock, 10); // trigger next clock tick
      Stopwatch.advanceTenMillisecs();
      AppController.handleClockTick();
    }
  },
  isRunning: false,
  mins: 0,
  secs: 0,
  millisecs: 0,
  laps: [],
  // DO NOT EDIT ABOVE THIS LINE
  advanceTenMillisecs: function(){ 
    // add ten milliseconds
    this.millisecs += 10;
    // if millisecs >= 1000 then subtract 1000 and increment seconds
    if (this.millisecs >= 1000) { 
      this.millisecs -= 1000;
      this.secs++
    }

    // if secs >= 60 then subtract 60 and increment minutes
    if (this.secs >= 60) { 
      this.secs -= 60;
      this.mins++;
    }

    // Your Code Here
  },

  reset: function(){ 
    // reset the clock
    this.millisecs = 0;
    this.secs = 0;
    this.mins = 0;
    this.laps = [];
    
    // Your Code Here
  },

  start: function(){ 
    // start the clock
    if (!this.isRunning) {
      this.isRunning = true;
      this.tickClock(); // calls tickClock function, if stopwatch is running trigger next clock tick
    }

    // Your Code Here
  },

  stop: function(){ 
    // stop the clock
    this.isRunning=false; // stops the start function

    // Your Code Here
  },

  lap: function(){ // records lap mins secs millisecs
    if (this.isRunning) {
      this.laps.push({
        mins: this.mins,
        secs: this.secs,
        millisecs: this.millisecs
      });
    }
    // Your Code Here
  }
};

/// User Interface ///
const ViewEngine = {
  updateTimeDisplay: function(mins, secs, millisecs){ 

    // update minutes
    document.getElementById('mins').innerHTML = ViewHelpers.zeroFill(mins, 2);


    // update seconds
    document.getElementById('secs').innerHTML = ViewHelpers.zeroFill(secs, 2);

    // update milliseconds
    document.getElementById('millisecs').innerHTML = ViewHelpers.zeroFill(millisecs/10, 2);
  },

  updateLapListDisplay: function(laps){
    var laps = Stopwatch.laps;
    var list = document.getElementById('lap-list');

    list.innerHTML = '';

    // call zeroFill function from ViewHelpers to 
    for (var i = 0; i < laps.length; i++) {
      list.innerHTML += "\
      <li>" +
        ViewHelpers.zeroFill(laps[i].mins, 2) + ":" +
        ViewHelpers.zeroFill(laps[i].secs, 2) + ":" +
        ViewHelpers.zeroFill(laps[i].millisecs/10, 2) +
      "</li>";
    }

    // Your Code Here
  },
};
const ViewHelpers = {
  // 
  zeroFill: function(number, length){
    var str = number.toString(); // convert number to string, save as variable
    let numZeroes = Math.max(length - str.length, 0); // if length - length is > 0
    for( var i = 0; i < (length - str.length); i++){ 
      str = '0' + str; // adds 0 to string? confused by this step
    }
    return str;

    // Your Code Here
  },
};

/// Top-Level Application Code ///
const AppController = {
  handleClockTick: function(){
    // updates time display with mins, secs, millisecs
    ViewEngine.updateTimeDisplay(Stopwatch.mins, Stopwatch.secs, Stopwatch.millisecs);

    // Your Code Here
  },

  handleClickStart: function() {
    // 
    if (!Stopwatch.isRunning) { Stopwatch.start(); }

    // Your Code Here
  },

  handleClickStopReset: function(){
    // 
    if (Stopwatch.isRunning) {
      Stopwatch.stop();
    } else {
      Stopwatch.reset();
      ViewEngine.updateTimeDisplay(0, 0, 0);
      ViewEngine.updateLapListDisplay(Stopwatch.laps);
    }

    // Your Code Here
  },

  handleClickLap: function(){
    // 
    
    if (Stopwatch.isRunning) {
      Stopwatch.lap();
      ViewEngine.updateLapListDisplay(Stopwatch.laps);
    }
    // Your Code Here
  }
};

window.onload = function(){
  // Attach AppController methods to the DOM as event handlers here.
  $('#start').on("click", AppController.handleClickStart);
  $('#lap').on("click", AppController.handleClickLap);
  $('#stop').on("click", AppController.handleClickStopReset);
};
