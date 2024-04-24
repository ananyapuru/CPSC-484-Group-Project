document.addEventListener("DOMContentLoaded", function() {
    var host = "cpsc484-03.stdusr.yale.internal:8888";
    var errorDisplay = document.getElementById('errorDisplay');
    var errorDisplay1 = document.getElementById('errorDisplay1');
    var postureScoreEl = document.getElementById('postureScore');
    var timerAmount = 3000;
    var maxSumOfSquares = 30000;

    var frames = {
        socket: null,
        lastFrame: null,
        leftHandRaiseTimer: null,
        rightHandRaiseTimer: null,
        posturePages: [
            'forward_head_posture.html',
            // 'anterior-pelvic-tilt.html',
            // 'uneven-shoulders.html',
            // 'sloped-shoulders.html',
            // 'posterior-pelvic-tilt.html',
            // 'lateral-pelvic-tilt.html'
        ],
        currentIndex: 0,

        start: function () {
            var url = "ws://" + host + "/frames";
            frames.socket = new WebSocket(url);
            frames.socket.onmessage = function (event) {
                frames.lastFrame = JSON.parse(event.data);
                frames.show(frames.lastFrame);
                
                var people = frames.get_num_people(frames.lastFrame);
                document.getElementById('peopleCount').innerText = "Number of people detected: " + people;

                console.log(window.location.pathname);
                
                var closestPerson = frames.get_closest_person(frames.lastFrame);
                if (closestPerson) {
                    var spineNavalZ = closestPerson.joints[1].position.z;
                    if (spineNavalZ > 2400) {
                        errorDisplay1.innerText = "Move closer!";
                        console.log("Move closer!");
                    } else if (spineNavalZ < 1500) {
                        errorDisplay1.innerText = "Back up!";
                        console.log("Back up!");
                    } else {
                        errorDisplay1.innerText = ""; // Clear the error message
                    }

                    var rightHandRaised = frames.is_right_hand_raised(closestPerson);
                    var leftHandRaised = frames.is_left_hand_raised(closestPerson);
                    var bothHandsRaised = leftHandRaised && rightHandRaised;

                    // if (window.location.pathname === '/' || window.location.pathname === 'index.html') {
                    //     document.getElementById('rightHandRaised').innerText = "Right hand raised: " + (rightHandRaised ? "Yes" : "No");
                    //     document.getElementById('leftHandRaised').innerText = "Left hand raised: " + (leftHandRaised ? "Yes" : "No");
                    //     document.getElementById('bothHandsRaised').innerText = "Both hands raised: " + (bothHandsRaised? "Yes" : "No");
                    // }

                    if (window.location.pathname === '/standing.html') {
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

                        // Calculate posture score percentage
                        var postureScore;
                        if (sumOfSquares > maxSumOfSquares) {
                            postureScore = 0; // Extremely bad posture
                        }
                        else if (sumOfSquares > maxSumOfSquares / 2) {
                            postureScore = 70 - (Math.min(sumOfSquares, maxSumOfSquares) / maxSumOfSquares * 70);
                        }
                        else {
                            postureScore = 100 - (Math.min(sumOfSquares, maxSumOfSquares) / maxSumOfSquares * 100);
                        }

                        // postureScore = Math.max(0, Math.min(100, postureScore)); // Clamp the score between 0 and 100

                        // Display the posture score percentage on the screen
                        console.log("hi");
                        // var postureScoreElement = document.getElementById('postureScore');
                        // if (!postureScoreElement) {
                        //     postureScoreElement = document.createElement('div');
                        //     postureScoreElement.id = 'postureScore';
                        //     document.body.appendChild(postureScoreElement);
                        //     console.log("Posture Score:", postureScore);
                        // }
                        console.log("Posture Score1:", postureScore);
                        postureScoreEl.innerText = "Posture Score: " + Math.round(postureScore) + "%";

                        if (postureScore < 50) {
                            postureScoreEl.classList.remove('green-text');
                            postureScoreEl.classList.add('red-text');
                        } else {
                            postureScoreEl.classList.remove('red-text');
                            postureScoreEl.classList.add('green-text');
                        }

                        // Log the result to console
                        if (sumOfSquares > 2000) {
                            console.log("Bad Posture Detected!: ", sumOfSquares);
                        }
                        else {
                            console.log("Good Posture!: ", sumOfSquares);
                        }

                        // Handle left hand raise
                        if (leftHandRaised) {
                            if (!frames.leftHandRaiseTimer) {
                                frames.leftHandRaiseTimer = setTimeout(function() {
                                    if (frames.is_left_hand_raised(frames.get_closest_person(frames.lastFrame))) {
                                        window.location.href = 'resources.html';
                                    }
                                    frames.leftHandRaiseTimer = null;
                                }, timerAmount); // 5 second delay
                            }
                        } else {
                            clearTimeout(frames.leftHandRaiseTimer);
                            frames.leftHandRaiseTimer = null;
                        }

                        // Handle right hand raise
                        if (rightHandRaised) {
                            if (!frames.rightHandRaiseTimer) {
                                frames.rightHandRaiseTimer = setTimeout(function() {
                                    if (frames.is_right_hand_raised(frames.get_closest_person(frames.lastFrame))) {
                                        window.location.href = '/';
                                    }
                                    frames.rightHandRaiseTimer = null;
                                }, timerAmount); // 5 second delay
                            }
                        } else {
                            clearTimeout(frames.rightHandRaiseTimer);
                            frames.rightHandRaiseTimer = null;
                        }
                    }
                    else if (window.location.pathname === '/' || window.location.pathname === 'index.html') {
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

                        if (rightHandRaised && leftHandRaised) {
                            errorDisplay.innerText = "Both hands are raised!";
                        } else if (leftHandRaised) {
                            window.location.href = 'standing.html';
                        } else {
                            // Clear the error message if no hands are raised
                            errorDisplay.innerText = "";
                        }
                    }

                    else if(window.location.pathname === '/resources.html' || window.location.pathname === 'forward_head_posture.html'){
                        if (rightHandRaised) {
                            if (!frames.rightHandRaiseTimer) {
                                frames.rightHandRaiseTimer = setTimeout(function() {
                                    if (frames.is_right_hand_raised(frames.get_closest_person(frames.lastFrame))) {
                                        window.location.href = '/';
                                    }
                                    frames.rightHandRaiseTimer = null;
                                }, timerAmount); // 5 second delay
                            }
                        } else {
                            clearTimeout(frames.rightHandRaiseTimer);
                            frames.rightHandRaiseTimer = null;
                        }
                        setTimeout(function() {}, 5000);
                        frames.handlePosturePageSlideshow();
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
        },

        handlePosturePageSlideshow: function () {
            if (window.location.pathname === '/resources.html') {
                setTimeout(function() {
                    frames.currentIndex = (frames.currentIndex + 1) % frames.posturePages.length;
                    var nextPosturePage = frames.posturePages[frames.currentIndex];
                    window.location.href = nextPosturePage;
                }, 5000); // Change page every 10 seconds
            }
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



// Broken

                    // if (window.location.pathname === '/standing.html' || window.location.pathname === '/' || window.location.pathname === 'index.html') {
                    //     // Handle left hand raise
                    //     if (leftHandRaised) {
                    //         if (!frames.leftHandRaiseTimer) {
                    //             frames.leftHandRaiseTimer = setTimeout(function() {
                    //                 if (frames.is_left_hand_raised(frames.get_closest_person(frames.lastFrame))) {
                    //                     if (window.location.pathname === '/standing.html') {
                    //                         window.location.href = 'resources.html';
                    //                     }
                    //                     else if (window.location.pathname === '/' || window.location.pathname === 'index.html') {
                    //                         window.location.href = 'standing.html';
                    //                     }
                    //                 }
                    //                 frames.leftHandRaiseTimer = null;
                    //             }, 5000); // 5 second delay
                    //         }
                    //     } else {
                    //         clearTimeout(frames.leftHandRaiseTimer);
                    //         frames.leftHandRaiseTimer = null;
                    //     }

                    //     // Handle right hand raise
                    //     if (rightHandRaised) {
                    //         if (!frames.rightHandRaiseTimer) {
                    //             frames.rightHandRaiseTimer = setTimeout(function() {
                    //                 if (frames.is_right_hand_raised(frames.get_closest_person(frames.lastFrame))) {
                    //                     if (window.location.pathname === '/standing.html') {
                    //                         window.location.href = '/';
                    //                     }
                    //                     else if (window.location.pathname === '/' || window.location.pathname === 'index.html') {
                    //                         window.location.href = 'sitting.html';
                    //                     }
                    //                 }
                    //                 frames.rightHandRaiseTimer = null;
                    //             }, 5000); // 5 second delay
                    //         }
                    //     } else {
                    //         clearTimeout(frames.rightHandRaiseTimer);
                    //         frames.rightHandRaiseTimer = null;
                    //     }
                    // }


// Daniel
                        // step 1 of analysis: tell the user to face the TV directly

                        // during step 1: get the y positions of the user's shoulders
                        // var left_shoulderY = closestPerson.joints[5].position.y;
                        // var right_shoulderY = closestPerson.joints[12].position.y;

                        // the user's shoulder score is 100 - (difference in y position)
                        // var score_S = Math.abs(100 - (left_shoulderY - right_shoulderY));

                        // also get the y positions of the user's hips
                        // var left_hipY = closestPerson.joints[18].position.y;
                        // var right_hipY = closestPerson.joints[22].position.y;

                        // the user's hip score is 100 - (difference in y position)
                        // var score_H = Math.abs(100 - (left_shoulderY - right_shoulderY));

                        // step 2 of analysis: tell the user to turn 90 degress left/right

                        // during step 2: get the z positions of the user's spine (naval) and pelvis
                        // var pelvisZ = closestPerson.joints[0].position.z;
                        // var naval_spineZ = closestPerson.joints[1].position.z;

                        // the user's back score is 100 - (difference in z position)
                        // var score_B = Math.abs(100 - (pelvisZ - naval_spineZ));

                        // also get the z positions of the user's neck and chest
                        // var neckZ = closestPerson.joints[3].position.z;
                        // var chestZ = closestPerson.joints[2].position.z;

                        // the user's neck score is 100 - (difference in z position)
                        // var score_N = Math.abs(100 - (neckZ - chestZ));

                        // after analysis

                        // the user's total score is the average of the component scores
                        // on the "Results/Resources page, list resources for components if the score < 80"