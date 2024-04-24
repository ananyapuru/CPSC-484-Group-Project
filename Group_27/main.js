document.addEventListener("DOMContentLoaded", function() {
    var host = "cpsc484-03.stdusr.yale.internal:8888";
    var errorDisplay = document.getElementById('errorDisplay');
    var errorDisplay1 = document.getElementById('errorDisplay1');

    var timerAmount = 3000;
    var maxSumOfSquares = 30000;

    var frames = {
        socket: null,
        lastFrame: null,
        leftHandRaiseTimer: null,
        rightHandRaiseTimer: null,
        posturePages: [
            '/project/Group_27/forward_head_posture.html',
            '/project/Group_27/anterior-pelvic-tilt.html',
            '/project/Group_27/uneven_shoulders.html',
            '/project/Group_27/sloped_shoulders.html',
            '/project/Group_27/posterior_pelvic_tilt.html',
            '/project/Group_27/lateral_pelvic_tilt.html'
        ],
        // currentIndex: 0,
        currentIndex: Math.floor(Math.random() * 6),

        start: function () {
            var url = "ws://" + host + "/frames";
            frames.socket = new WebSocket(url);
            frames.socket.onmessage = function (event) {
                frames.lastFrame = JSON.parse(event.data);
                frames.show(frames.lastFrame);
                
                var people = frames.get_num_people(frames.lastFrame);
                document.getElementById('peopleCount').innerText = "Number of people detected: " + people;
                
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

                    

                    if (window.location.pathname === '/project/Group_27/standing.html') {
                        var postureScoreEl = document.getElementById('postureScore');
                        var neckScoreEl = document.getElementById('neckScore');
                        var backScoreEl = document.getElementById('backScore');
                        // during step 2: get the z positions of the user's spine (naval) and pelvis
                        var pelvisZ = closestPerson.joints[0].position.x;
                        var naval_spineZ = closestPerson.joints[1].position.x;

                        // the user's back score is 100 - (difference in z position)
                        var score_B = Math.abs(100 - ((pelvisZ - naval_spineZ) * 4));

                        // also get the z positions of the user's neck and chest
                        var neckZ = closestPerson.joints[3].position.x;
                        var chestZ = closestPerson.joints[2].position.x;

                        // the user's neck score is 100 - (difference in z position)
                        var score_N = Math.abs(100 - ((neckZ - chestZ) * 2));


                        neckScoreEl.innerText = "Neck Alignment Score: " + Math.round(Math.min(score_N, 100)) + "%";
                        if (score_N < 80) {
                            neckScoreEl.classList.remove('green-text');
                            neckScoreEl.classList.add('red-text');
                        } else {
                            neckScoreEl.classList.remove('red-text');
                            neckScoreEl.classList.add('green-text');
                        }
                        backScoreEl.innerText = "Back Alignment Score: " + Math.round(Math.min(score_B, 100)) + "%";
                        if (score_B < 80) {
                            backScoreEl.classList.remove('green-text');
                            backScoreEl.classList.add('red-text');
                        } else {
                            backScoreEl.classList.remove('red-text');
                            backScoreEl.classList.add('green-text');
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

                        // Calculate posture score percentage
                        var postureScore;
                        if (sumOfSquares > maxSumOfSquares) {
                            postureScore = 0; // Extremely bad posture
                        }
                        else if (sumOfSquares > maxSumOfSquares / 2) {
                            postureScore = 70 - (Math.min(sumOfSquares, maxSumOfSquares) / maxSumOfSquares * 70);
                            postureScore = ((postureScore * 3) + score_B + score_N) / 5;
                        }
                        else {
                            postureScore = 100 - (Math.min(sumOfSquares, maxSumOfSquares) / maxSumOfSquares * 100);
                            postureScore = ((postureScore * 3) + score_B + score_N) / 5;
                        }

                        postureScore = Math.max(0, Math.min(100, postureScore)); // Clamp the score between 0 and 100

                        // Display the posture score percentage on the screen
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
                                        window.location.href = '/project/Group_27/resources.html';
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
                                        window.location.href = '/project/Group_27/index.html';
                                    }
                                    frames.rightHandRaiseTimer = null;
                                }, timerAmount); // 5 second delay
                            }
                        } else {
                            clearTimeout(frames.rightHandRaiseTimer);
                            frames.rightHandRaiseTimer = null;
                        }
                    }
                    else if (window.location.pathname === '/project/Group_27/' || window.location.pathname === '/project/Group_27/index.html') {
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
                            window.location.href = '/project/Group_27/standing.html';
                        } else {
                            // Clear the error message if no hands are raised
                            errorDisplay.innerText = "";
                        }
                    }
                    else if(window.location.pathname === '/project/Group_27/resources.html' || window.location.pathname === '/project/Group_27/forward_head_posture.html' ||   window.location.pathname === '/project/Group_27/anterior-pelvic-tilt.html'
                    || window.location.pathname === '/project/Group_27/uneven_shoulders.html' || window.location.pathname === '/project/Group_27/sloped_shoulders.html' || window.location.pathname === '/project/Group_27/posterior_pelvic_tilt.html' 
                    || window.location.pathname === '/project/Group_27/lateral_pelvic_tilt.html'){
                        if (rightHandRaised) {
                            if (!frames.rightHandRaiseTimer) {
                                frames.rightHandRaiseTimer = setTimeout(function() {
                                    if (frames.is_right_hand_raised(frames.get_closest_person(frames.lastFrame))) {
                                        window.location.href = '/project/Group_27/index.html';
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
            if (window.location.pathname === '/project/Group_27/resources.html' || window.location.pathname === '/project/Group_27/forward_head_posture.html' ||   window.location.pathname === '/project/Group_27/anterior-pelvic-tilt.html'
            || window.location.pathname === '/project/Group_27uneven_shoulders.html' || window.location.pathname === '/project/Group_27/sloped_shoulders.html' || window.location.pathname === '/project/Group_27/posterior_pelvic_tilt.html' 
            || window.location.pathname === '/project/Group_27/lateral_pelvic_tilt.html') {
                setTimeout(function() {
                    frames.currentIndex = (frames.currentIndex + 1) % frames.posturePages.length;
                    var nextPosturePage = frames.posturePages[frames.currentIndex];
                    window.location.href = nextPosturePage;
                }, 7000); // Change page every 7 seconds
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