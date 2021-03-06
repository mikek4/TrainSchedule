
// 1. Initialize Firebase
var config = {
    apiKey: "AIzaSyBrFNXb0ndsqM1-R5eu9J1dME39hlCLdZs",
    authDomain: "traintimers-cdfbc.firebaseapp.com",
    databaseURL: "https://traintimers-cdfbc.firebaseio.com",
    projectId: "traintimers-cdfbc",
    storageBucket: "traintimers-cdfbc.appspot.com",
    messagingSenderId: "838052695872"
  };

  
firebase.initializeApp(config);

var database = firebase.database();

// 2. Button for adding Trains
$("#add-train-btn").on("click", function(event) {
  event.preventDefault();

  // Grabs user input

  var tName = $("#train-name-input").val().trim();
  var tDestination = $("#destination-input").val().trim();
  var tTime = $("#first-time-input").val().trim();
  var tFrequency = $("#frequency-input").val().trim();

  var newTrain = {
      name: tName,
      destination: tDestination,
      start: tTime,
      frequency: tFrequency
  };
 

  // Uploads employee data to the database
  database.ref().push(newTrain);


  alert("Train successfully added");

  // Clears all of the text-boxes
  $("#train-name-input").val("");
  $("#destination-input").val("");
  $("#first-time-input").val("");
  $("#frequency-input").val("");
});

// 3. Create Firebase event for adding employee to the database and a row in the html when a user adds an entry
database.ref().on("child_added", function(childSnapshot) {
  console.log(childSnapshot.val());

  // Store everything into a variable.
  var tName = childSnapshot.val().name;
  var tDestination = childSnapshot.val().destination;
  var tTime = childSnapshot.val().start;
  var tFrequency = childSnapshot.val().frequency;

  var firstTimeConverted = moment(tTime, "HH:mm").subtract(1, "years");
  var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
  var tRemainder = diffTime % tFrequency;
  var tMinutesTillTrain = tFrequency - tRemainder;
  var nextTrain = moment().add(tMinutesTillTrain, "minutes");
  var formatNextTrain = nextTrain.format("HH:mm");

  // Create the new row
  var newRow = $("<tr>").append(
    $("<td>").text(tName),
    $("<td>").text(tDestination),
    $("<td>").text(tFrequency),
    $("<td>").text(formatNextTrain),
    $("<td>").text(tMinutesTillTrain)
  );

//   // Append the new row to the table
  $("#train-table > tbody").append(newRow);
});

