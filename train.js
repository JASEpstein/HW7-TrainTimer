// Initialize Firebase
var config = {
    apiKey: "AIzaSyD_hde01IAnEkq6iwU2gAsaXZUAYRV5lTg",
    authDomain: "hw7-train-times.firebaseapp.com",
    databaseURL: "https://hw7-train-times.firebaseio.com",
    projectId: "hw7-train-times",
    storageBucket: "",
    messagingSenderId: "651532028895"
};
firebase.initializeApp(config);


var database = firebase.database();

var trainTime = '';
var destination = '';
var firstTrain = '';
var freq = '';
var nextArrival = '';
var minutesAway = '';

function calculateArrivalData() {
    // First Time (pushed back 1 year to make sure it comes before current time)
    var firstTimeConverted = moment(firstTrain, "HH:mm").subtract(1, "years");
    console.log(firstTimeConverted);

    // Difference between the times
    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
    console.log("DIFFERENCE IN TIME: " + diffTime);

    // Time apart (remainder)
    var remainder = diffTime % freq;
    // console.log(tRemainder);

    // Minute Until Train
    minutesAway = freq - remainder;
    // console.log("MINUTES TILL TRAIN: " + MinutesTillTrain);

    // Next Train
    nextArrival = moment().add(minutesAway, "minutes");
    // console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));
}

$('button').on('click', function (event) {
    event.preventDefault();

    trainTime = $('#train-name').val().trim();
    destination = $('#destination').val().trim();
    firstTrain = $('#first-train-time').val().trim();
    freq = $('#frequency').val().trim();

    calculateArrivalData();

    database.ref().push({
        trainTime: trainTime,
        destination: destination,
        firstTrain: firstTrain,
        freq: freq,
        nextArrival: nextArrival,
        minutesAway: minutesAway
    });
});

database.ref().on("child_added", function (childSnapshot) {

        $("#table-content").append("<td>" +
            childSnapshot.val().trainTime +
            "<td>" + childSnapshot.val().destination +
            "<td>" + childSnapshot.val().freq + "<td>" + childSnapshot.val().nextArrival + "<td>" + childSnapshot.val().minutesAway);
    },
    //Error Handler
    function (errorObject) {
        console.log("Errors handled: " + errorObject.code);
    });