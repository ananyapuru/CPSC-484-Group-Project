var host = "http://cpsc484-03.stdusr.yale.internal:8888/";
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
            var people = frames.get_num_people(JSON.parse(event.data));
            console.log(people);
        }
    },

    show: function (frame) {
        console.log(frame);
    },

    get_num_people: function (frame) {
        return frame.people.length 
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