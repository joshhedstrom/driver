$(document).ready(function() {

    let userID = sessionStorage.getItem('userID');
    let username = sessionStorage.getItem('username')

    // Container holding all trips
    let container = $("#recent-trip-data");

    let trips;

    let startingOdo;
    let endingOdo;
    let tripId;
    let tripTips;
    let tripMiles;
    let tripHours;
    let tripHourlyWage;
    let tripDescription;

    $('.shiftStart').attr('style', 'display: block;');
    $('.shiftEnd').attr('style', 'display: none;');

    $("#shiftstart").on("click", e => {
        e.preventDefault();
        console.log('Shift started')
        $('.shiftStart').attr('style', 'display: none;');
        $('.shiftEnd').attr('style', 'display: block;');

        startingOdo = $("#starting").val().trim();

        if (startingOdo.length < 1) {
            alert("Please enter Starting Mileage.");
        }

        console.log("Starting Odometer Miles: " + startingOdo);
        $("#starting").val("");
    })

    $("#shiftend").on("click", e => {
        e.preventDefault();
        console.log('Shift ended')
        $('.shiftStart').attr('style', 'display: block;');
        $('.shiftEnd').attr('style', 'display: none;');

        endingOdo = $("#ending").val().trim();
        tripTips = $("#tips").val().trim();
        tripHours = $("#hours").val().trim();
        tripDescription = $("#description").val().trim();

        console.log("Ending Odometer Miles: " + endingOdo);


        $("#ending").val("");
        $("#tips").val("");
        $("#hours").val("");
        $("#description").val("");


        tripMiles = Math.abs(startingOdo - endingOdo);
        tripHourlyWage = Math.abs(tripTips / tripHours);

        let newTrip = {
            user: username,
            userid: userID,
            startingOdometer: startingOdo,
            endingOdometer: endingOdo,
            miles: tripMiles,
            tips: tripTips,
            hours: tripHours,
            wage: tripHourlyWage,
            description: tripDescription
        }
        submitTrip(newTrip);
    })

    function submitTrip(newTrip) {
        $.post("/api/trips", newTrip, ()=> {
            location.reload();
        })
    }

    // Get trips from database and updates view
    function getTrips() {
        $.get(`/api/${userID}/trips`, data => {
            trips = data;

            if (!trips || !trips.length) {
                emptyTable();
            } else {
                mostRecent();
            }
            fillTable();
        });
    }

    getTrips();

    // Most recent trip table
    function mostRecent() {
        let tripsToAdd = Array.from(trips)

        for (let j = 0; j < tripsToAdd.length; j++) {

            let tripStartingOdo = tripsToAdd[j].startingOdometer
            let tripEndingOdo = tripsToAdd[j].endingOdometer
            let tripMiles = tripsToAdd[j].miles;
            let tripTips = tripsToAdd[j].tips;
            let tripHours = tripsToAdd[j].hours;
            let tripHourlyWage = tripsToAdd[j].wage;
            let tripDescription = tripsToAdd[j].description;


            $("#new-trip-table > tbody").html("<tr><td>" + tripStartingOdo +
                "</td><td>" + tripEndingOdo + "</td><td>" + tripMiles + "</td><td>" + tripTips +
                "</td><td>" + tripHours + "</td><td>" + tripHourlyWage + "</td></tr>");
        };
    };

    // Fill all trips from database into trips Table
    function fillTable(tripId) {
        let tripsToAdd = Array.from(trips)

        for (let j = 0; j < tripsToAdd.length; j++) {

            let tripStartingOdo = tripsToAdd[j].startingOdometer
            let tripEndingOdo = tripsToAdd[j].endingOdometer
            let tripMiles = tripsToAdd[j].miles;
            let tripTips = tripsToAdd[j].tips;
            let tripHours = tripsToAdd[j].hours;
            let tripHourlyWage = tripsToAdd[j].wage;
            let tripDescription = tripsToAdd[j].description;
            tripId = tripsToAdd[j].id;

            let editBtn = $("<button>")
                .addClass('btn modal-trigger edit waves-effect waves-light deep-orange darken-4')
                .text('EDIT').attr("data-target", "modal1").attr("data-id", tripId);

            let btnDelete = $('<button>')
                .addClass('btn btn-danger delete waves-effect waves-light red darken-4')
                .text('X').attr('data-id', tripId);

            let newRow = $('<tr>');

            newRow.append(
                $('<td>').text(tripStartingOdo),
                $('<td>').text(tripEndingOdo),
                $('<td>').text(tripMiles),
                $('<td>').text(tripTips),
                $('<td>').text(tripHours),
                $('<td>').text(tripHourlyWage),
                $('<td>').html(btnDelete),
                $('<td>').html(editBtn)

            );
            $("#all-trips-table > tbody").append(newRow)

        };
    };

    let allTripsHidden = true;

    $("#btnAllTrips").click(()=> {
        if (allTripsHidden === true) {
            $('#all-trips-data').attr('style', 'display: table');
            $('#btnAllTrips').html('Hide All Trips <i class="material-icons left">directions_car</i>');
            allTripsHidden = false;
        } else if (allTripsHidden === false) {
            $('#all-trips-data').attr('style', 'display: none');
            $('#btnAllTrips').html('Show All Trips <i class="material-icons left">directions_car</i>');
            allTripsHidden = true;
        }
    });

    // Display message when no trips have been entered into the database
    function emptyTable() {
        container.empty();
        let messageH2 = $("<h2>")
            .addClass("message")
            .css({
                "text-align": "center",
                "margin-top": "50px",
                "color": "white"
            })
            .html("No recent trip has been entered");
        container.append(messageH2);
    };

    // Delete a trip
    $('body').on("click", ".delete", e => {
        e.preventDefault();
        let id = $(this.activeElement).attr('data-id');
        let tr = $(this.activeElement).closest('tr');
        $.ajax({
            method: "DELETE",
            url: "/api/" + userID + "/trips/" + id
        }).then(()=> {
            tr.remove();
        })
    });

    // Edit a trip
    function tripEdit() {
        tripId = $(this).attr('data-id');

        $.get(`/api/${userID}/trips/` + tripId, data => {
            if (data) {
                let editStarting = $("#editStarting").val(data.startingOdometer);
                let editEnding = $("#editEnding").val(data.endingOdometer);
                let editHours = $("#editHours").val(data.hours);
                let editTips = $("#editTips").val(data.tips);
                let editMiles = $("#editMiles").val(data.miles);
                let editDescription = $("#editDescription").val(data.description);
            }
        })
    };

    M.AutoInit();

    // Click Event edit button
    $(document).on("click", ".edit", tripEdit);

    $("#editSubmit").on("click", e => {
        e.preventDefault();

        let editStarting = $("#editStarting").val();
        let editEnding = $("#editEnding").val();
        let editHours = $("#editHours").val();
        let editTips = $("#editTips").val();
        let editDescription = $("#editDescription").val();

        newTripMiles = Math.abs(editStarting - editEnding);
        newTripHourlyWage = Math.abs(editTips / editHours);

        let newTrip = {
            user: username,
            userid: userID,
            startingOdometer: editStarting,
            endingOdometer: editEnding,
            miles: newTripMiles,
            tips: editTips,
            hours: editHours,
            wage: newTripHourlyWage,
            description: editDescription
        }

        updateTrip(newTrip);
    });

    function updateTrip(trip) {
        $.ajax({
                method: "PUT",
                url: `/api/${userID}/trips/${tripId}`,
                data: trip
            })
            .then(()=> {
                location.reload();
            });
    };

});