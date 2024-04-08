// python3 -m http.server 4444
var host = "cpsc484-03.stdusr.yale.internal:8888";
$(document).ready(function() {
  frames.start();
  twod.start();
});

var frames = {
    socket: null,

    start: function () {
        var url = "ws://" + host + "/frames";
        frames.socket = new WebSocket(url);
        frames.socket.onmessage = function (event) {
            frames.show(JSON.parse(event.data));
            var frame = JSON.parse(event.data);
            frames.show(frame);
            var people = frames.get_num_people(frame);
            var rightHandRaised = frames.is_right_hand_raised(frame);
    
            // Update the web page with the number of people detected
            document.getElementById('peopleCount').innerText = "Number of people detected: " + people;
            document.getElementById('rightHandRaised').innerText = "Right hand raised: " + rightHandRaised;
        }
    },
    
    show: function (frame) {
        $('img.frame').attr("src", 'data:image/pnjpegg;base64,' + frame.src);
    },

    get_num_people: function (frame) {
        return frame.people.length 
    },

    is_right_hand_raised: function (frame) {
        console.log("Right hand info = ", frame.people[0].joints[15]);
        // TODO: Nick add logic here!
        var chest_x = frame.people[0].joints[2].position.x;
        var chest_y = frame.people[0].joints[2].position.y;
        var chest_z = frame.people[0].joints[2].position.z;

        if(frame.people[0].joints[15].position.y < chest_y){
            return true;
        }
        return false;
    }
};


var twod = {
    socket: null,
    // create a connection to the camera feed
    start: function () {
        var url = "ws://" + host + "/twod";
        twod.socket = new WebSocket(url);

        // whenever a new frame is received...
        twod.socket.onmessage = function (event) {

            // parse and show the raw data
            twod.show(JSON.parse(event.data));
        }
    },
    // show the image by adjusting the source attribute of the HTML img object previously created
    show: function (twod) {
        $('img.twod').attr("src", 'data:image/pnjpegg;base64,' + twod.src);
    },
};
