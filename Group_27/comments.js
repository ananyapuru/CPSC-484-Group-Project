
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