$(document).ready(function(){


 var config = {
    apiKey: "AIzaSyCdK-OLz9wOTArozs_yLaYB4YpMg8oqPqI",
    authDomain: "first-project-5c44f.firebaseapp.com",
    databaseURL: "https://first-project-5c44f.firebaseio.com",
    projectId: "first-project-5c44f",
    storageBucket: "first-project-5c44f.appspot.com",
    messagingSenderId: "531205961253"
  };

  firebase.initializeApp(config);

 var trainData = firebase.database();

// Botton to add trains 
  $("#addTrain").on("click", function(){
  	var trainName = $("#trainNameInput").val().trim();
  	var destination = $("#destinationInput").val().trim();
  	var trainTime = $("#trainTimeInput").val().trim();
  	var frequency = $("#frequencyInput").val().trim();

//Test for variables entered
  	console.log(trainName);
  	console.log(destination);
  	console.log(trainTime);
  	console.log(frequency);

// Code for handling the push to Firebase
       trainData.ref().push({
        trainName: trainName,
        destination: destination,
        trainTime: trainTime,
        frequency: frequency,
      
  });

// clear text-boxes 
    $("#trainNameInput").val("");
  	$("#destinationInput").val("");
  	$("#trainTimeInput").val("");
  	$("#frequencyInput").val("");
   
  });

  trainData.ref().on("child_added", function(snapshot){

    var tD = snapshot.val();
    var trainName = tD.trainName;
    var destination = tD.destination;
    var frequency = tD.frequency;
    var newtrainTime = tD.trainTime;
    console.log(newtrainTime);
    var minutesAway = moment(nextTrainArrival).format("LT");

// assing firebase variables to snapshots 
       var firebaseTrainTime = moment(newtrainTime, "HH:mm").subtract(1, "years");
    var currentTime = moment();
    var diffTime = moment().diff(moment(firebaseTrainTime), "minutes");
    var timeRemainder = diffTime % frequency;
    var minutes = frequency - timeRemainder;
    var nextTrainArrival = moment().add(minutes, "minutes");

   

//append train info to table on page
$(".table").append(`
 <tr>
       <td class="trainName">${[trainName]}</td>
       <td class="destination">${[destination]}</td>
       <td class="frequency">${[frequency]}</td>
       <td class="nextTrainArrival">${[moment(nextTrainArrival).format("LT")]}</td>
       <td class="minutes">${[minutes]}</td>
  </tr>
 
  `)

    });
  
});
 
