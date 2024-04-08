document.addEventListener("DOMContentLoaded", function() {
    var host = "cpsc484-03.stdusr.yale.internal:8888";
    var errorDisplay = document.getElementById('errorDisplay');
    var errorDisplay1 = document.getElementById('errorDisplay1');

    var frames = {
        socket: null,
        lastFrame: null,

        start: function () {
            var url = "ws://" + host + "/frames";
            frames.socket = new WebSocket(url);
            frames.socket.onmessage = function (event) {
                frames.lastFrame = JSON.parse(event.data);
                frames.show(frames.lastFrame);
                var people = frames.get_num_people(frames.lastFrame);
                document.getElementById('peopleCount').innerText = "Number of people detected: " + people;
                if(people > 0){
                    if(people > 1){
                        document.getElementById('greeting').innerText = "What a sexy group of " + people + " people"; 
                    }
                    else {
                        document.getElementById('greeting').innerText = "What a sexy person we have over here!"; 
                    }
                }
                else {
                    document.getElementById('greeting').innerText = "Anyone there?"; 
                }

                var closestPerson = frames.get_closest_person(frames.lastFrame);
                if (closestPerson) {
                    var spineNavalZ = closestPerson.joints[1].position.z;
                    if (spineNavalZ > 2400) {
                        errorDisplay1.innerText = "Move closer!";
                    } else if (spineNavalZ < 1500) {
                        errorDisplay1.innerText = "Back up!";
                    } else {
                        errorDisplay1.innerText = ""; // Clear the error message
                    }

                    var rightHandRaised = frames.is_right_hand_raised(closestPerson);
                    var leftHandRaised = frames.is_left_hand_raised(closestPerson);

                    document.getElementById('rightHandRaised').innerText = "Right hand raised: " + (rightHandRaised ? "Yes" : "No");
                    document.getElementById('leftHandRaised').innerText = "Left hand raised: " + (leftHandRaised ? "Yes" : "No");

                    if (window.location.pathname === '/Group_27/') {
                        if (rightHandRaised && leftHandRaised) {
                            errorDisplay.innerText = "Both hands are raised!";
                        } else if (rightHandRaised) {
                            window.location.href = '/Group_27/sitting.html';
                        } else if (leftHandRaised) {
                            window.location.href = '/Group_27/standing.html';
                        } else {
                            // Clear the error message if no hands are raised
                            errorDisplay.innerText = "";
                        }
                        // Collect x positions for specific joints and normalize relative to spine_naval
                        var jointIndices = [3, 4, 11, 2, 0, 26]; // Indices for ear_right, neck, clavicle_left, clavicle_right, spine_chest, spine_naval, pelvis
                        var xPositions = jointIndices.map(function(index) {
                            return closestPerson.joints[index].position.x;
                        });

                        // Get x position of spine_naval and ear_right
                        var spineNavalX = closestPerson.joints[1].position.x;

                        // Normalize x positions relative to spine_naval
                        var normalizedXPositions = xPositions.map(function(x) {
                            return x - spineNavalX;
                        });

                        // Calculate sum of squares of differences from a vertical line (spine_naval)
                        var sumOfSquares = 0;
                        for (var i = 0; i < normalizedXPositions.length; i++) {
                            sumOfSquares += Math.pow(normalizedXPositions[i], 2);
                        }

                        // Log the result to console
                        if (sumOfSquares > 1200) {
                            console.log("Bad Posture Detected!: ", sumOfSquares);
                        }
                        else {
                            console.log("Good Posture!: ", sumOfSquares);
                        }
                        // console.log("Sum of squares:", sumOfSquares);
                    }
                }
            }
        },

        show: function (frame) {
            $('img.frame').attr("src", 'data:image/png;base64,' + frame.src);
        },

        get_num_people: function (frame) {
            return frame.people.length;
        },

        get_closest_person: function (frame) {
            if (frame.people.length === 0) {
                return null;
            }
            // Find the person with the lowest z position (closest to the camera)
            var closestPerson = frame.people[0];
            for (var i = 1; i < frame.people.length; i++) {
                if (frame.people[i].joints[2].position.z < closestPerson.joints[2].position.z) {
                    closestPerson = frame.people[i];
                }
            }
            return closestPerson;
        },

        is_right_hand_raised: function (person) {
            var chest_y = person.joints[2].position.y;
            return person.joints[15].position.y < chest_y;
        },

        is_left_hand_raised: function (person) {
            var chest_y = person.joints[2].position.y;
            return person.joints[8].position.y < chest_y;
        }
    };

    frames.start();

    var twod = {
        socket: null,

        start: function () {
            var url = "ws://" + host + "/twod";
            twod.socket = new WebSocket(url);
            twod.socket.onmessage = function (event) {
                twod.show(JSON.parse(event.data));
            }
        },

        show: function (twod) {
            $('img.twod').attr("src", 'data:image/png;base64,' + twod.src);
        }
    };

    twod.start();
});


// // Ensure DOM content is fully loaded before executing the script
// document.addEventListener("DOMContentLoaded", function() {
//     var host = "cpsc484-03.stdusr.yale.internal:8888";
    
//     // WebSocket connections for frame and 2D data
//     var frames = {
//         socket: null,
//         lastFrame: null, // Store the last received frame data

//         start: function () {
//             var url = "ws://" + host + "/frames";
//             frames.socket = new WebSocket(url);
//             frames.socket.onmessage = function (event) {
//                 frames.lastFrame = JSON.parse(event.data); // Update lastFrame data
//                 frames.show(frames.lastFrame);

//                 // Update web page with people count and hand raise status
//                 var people = frames.get_num_people(frames.lastFrame);
//                 var rightHandRaised = frames.is_right_hand_raised(frames.lastFrame);
//                 var leftHandRaised = frames.is_left_hand_raised(frames.lastFrame);

//                 document.getElementById('peopleCount').innerText = "Number of people detected: " + people;
//                 document.getElementById('rightHandRaised').innerText = "Right hand raised: " + (rightHandRaised ? "Yes" : "No");
//                 document.getElementById('leftHandRaised').innerText = "Left hand raised: " + (leftHandRaised ? "Yes" : "No");

//                 // Check for hand gestures and navigate based on the current page
//                 console.log(window.location.pathname);
//                 if (window.location.pathname === '/Group_27/') { // Check if on home page
//                     if (rightHandRaised && leftHandRaised) {
//                         alert("Both hands are raised!");
//                     } else if (rightHandRaised) {
//                         window.location.href = '/Group_27/sitting.html'; // Navigate to /sitting if right hand raised
//                     } else if (leftHandRaised) {
//                         window.location.href = '/Group_27/standing.html'; // Navigate to /standing if left hand raised
//                     }
//                 }
//             }
//         },

//         show: function (frame) {
//             $('img.frame').attr("src", 'data:image/png;base64,' + frame.src);
//         },

//         get_num_people: function (frame) {
//             return frame.people.length;
//         },

//         is_right_hand_raised: function (frame) {
//             var chest_y = frame.people[0].joints[2].position.y;
//             return frame.people[0].joints[15].position.y < chest_y;
//         },

//         is_left_hand_raised: function (frame) {
//             var chest_y = frame.people[0].joints[2].position.y;
//             return frame.people[0].joints[8].position.y < chest_y;
//         }
//     };

//     // Start WebSocket connections for frames and 2D data
//     frames.start();

//     var twod = {
//         socket: null,

//         start: function () {
//             var url = "ws://" + host + "/twod";
//             twod.socket = new WebSocket(url);
//             twod.socket.onmessage = function (event) {
//                 twod.show(JSON.parse(event.data));
//             }
//         },

//         show: function (twod) {
//             $('img.twod').attr("src", 'data:image/png;base64,' + twod.src);
//         }
//     };

//     // Start WebSocket connection for 2D data
//     twod.start();
// });