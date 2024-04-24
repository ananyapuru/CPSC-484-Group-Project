# The Posture Doctor
## Group 27
## CPSC 484/584

## Introduction

This repository is for Group 27's final project for CPSC 484/584 (Introduction to Human-Computer Interaction). This project is titled "The Posture Doctor", and addresses the following problem space:

* "Bad posture must be corrected"

A widespread issue, not only at Yale but in numerous college campuses, is bad posture. Whether it be to past injuries or working in front of a laptop from sunrise to sunset, many people suffer bad posture in one way or another. And the worst part about it - many people don't even realize it. 

The goal of this project is to help Yalies identify any posture issues they may have, and get them on the right track to fixing them. The specific tasks this project is designed for are as follows:

* Learning what constitutes/indicates poor posture
* Learning about posture-correcting exercises to strengthen and correct posture-related muscles

## Running the System Prototype

...(WIP)


## How to Use

You can find *The Posture Doctor* at TV 3, in front of Davies Auditorium. If another user isn't already interacting with *The Posture Doctor*, you will see a welcome screen providing two options: Standing (raise left hand) and Sitting (raise right hand). After making a selection, the analysis occurs as follows:

1. The user is instructed to stand/sit facing the TV directly
2. After ~5 seconds, the system takes a "screenshot" of the user's position
    * With this first screenshot, the user's *shoulder* and *hips* posture components are scored
3. The user is instructed to stand/sit facing 90 degrees to the left/right of the TV
4. After ~5 seconds, the system takes another "screenshot" of the user's position
    * With this second screenshot, the user's *back* and *neck* posture components are scored

After this, you will be provided these component scores (as well as an overall score) - if these scores are low enough (**<80%**), a list of conditions will appear to the right of the scores, corresponding to whichever components received low scores.

In this **results** page, there will be a cursor where the your right hand is located - if you raise your left hand while hovering over a condition's "**learn more**" text, you will navigate to a page with the following information:

* What causes the condition
* Symptoms of the condition
* Remedial exercises

You can navigate back to the **results** page with the same method for navigating to **learn more** pages, or can exit using a button at the bottom.


## Modifying Project Files

In this directory are the following files:

### Javascript
* jquery-3.7.1.min.js
    * starter code from the CPSC484 website
* main.js
    * provides logic for navigating the prototype, and scoring a user's posture

### HTML/CSS
* anterior-pelvic-tilt.html
    * page providing information for the '*anterior pelvic tilt*' condition.
* index.html
    * the system's 'start screen'
* forward_head_posture.html
    * page providing information for the '*forward head posture*' condition.
* posterior_pelvic_tilt.html
    * page providing information for the '*posterior pelvic tilt*' condition.
* resources.html
    * page providing overall + component scores, as well as a list of identified conditions
* sitting.html
    * navigated to from the start screen by a user raising their right hand; instructs user to sit facing the TV directly
* sloped_shoulders.html
    * page providing information for the '*sloped shoulders*' condition.
* standing.html
    * navigated to from the start screen by a user raising hteir left hand; instructs user to stand facing the TV directly
* uneven_shoulders.html
    * page providing information for the '*uneven shoulders*' condition.
* resources.css
    * 
* style.css
    * 


## Dependencies

The following software dependencies are required to run this project:

### External Libraries/APIs

- **Websocket**: Protocol for communication channels and data exchange
    - Version: latest stable version
    - Installation: Natively supported by web browsers; no installation required
    - Information: When creating connections for this project, data was accessed using the IP and port address **\[Env_IP\]:8888**. To view live data currently shown on a given display with \[Server_Name\], on your local computer, open your browser to **https://\[Server_Name\]:8888**. For example, this project was tested using **http://cpsc484-03.stdusr.yale.internal:8888/**.

- **Azure Kinect SDK**: Software Development Kit for Azure Kinect sensor camera
    - Version: 1.4.1
    - Installation: Installation instructions can be found [here](https://docs.microsoft.com/en-us/azure/kinect-dk/sensor-sdk-download)

### Network Configuration

- **Cisco AnyConnect**
    - Version: 4.10.07073
    - Usage: For remote access to the Yale network
    - Information: When running the application (called "Cisco AnyConnect Secure Mobility Client"), enter **access.yale.edu** in the space and provide your access credentials (NetID/password)
    - Installation: Download and configure Cisco AnyConnect from the [Yale Software Library](https://yale.onthehub.com/WebStore/Welcome.aspx)

- **Connection to the Yale Virtual Private Network**: Data for HCI displays used in this project are only accessible via the Yale VPN
    - Configuration: If working on campus, connect to the YaleSecure network with NetID/password. If working off-campus, refer to the information under *Cisco AnyConnect*.
    
### Browser Support

- **Google Chrome**: Browser for testing and compatability
    - Version: Latest stable release
    - Installation: Install from the official [Chrome website](https://www.google.com/chrome/)

- **Mozilla Firefox**: Browser for testing and compatability
    - Version: Latest stable release, or [developer edition](https://www.mozilla.org/en-US/firefox/developer/)
    - Installation: Install from the official [Firefox website](https://www.mozilla.org/en-US/firefox/)

### Development Tools

- **Node.js**: Runtime environment for JavaScript
    - Version: 14.17.0 or later
    - Installation: Install from the official [Node.js website](https://nodejs.org)

### Development Environment
* **Visual Studio Code**
    - Version: Latest stable release
    - Installation: Install from the offical [Visual Studio Code website](https://code.visualstudio.com/)

### Hardware components

* **Azure Kinect Sensor Camera**
    - Usage: Collecting body pose data; the system's input is the camera's image
    - Supported operating systems/architectures:
        - Windows 10 April 2018 (Version 1803, OS Build 17134) release (x64) or a later version
        - Linux Ubuntu 18.04 (x64), with a GPU driver that uses OpenGLv4.4, or a later version
    - Information: The sensor's (0,0,0) coordinate is at the center of the central lens. Facing the camera directly, the x axis bisects the lens from left (+x) to right (-x); the y axis bisects the lens from below (+y) to above(-y); and the z axis extends perpendicularly to the lens' center, with the +z direction extending out (away from the display and toward a user). Specific information regarding joint coordinates/data can be found [here](https://learn.microsoft.com/en-us/azure/kinect-dk/body-joints).

* **Display**
    - Usage: visualizing information and acting as an interface for the system's users
    - Operating System: Linux Ubuntu 20.04
    - Information: The display used in this project was a TV, however, other devices (desktop/laptop computers) may suffice. If you choose to use a hardware setup different from that of this project's, note that the location of the display relative to the sensor is important. For this project, the center of the TV is approximately 450 in the positive y direction (down) from the camera. It is also important that the display's physical location is spacious enough in the +z direction; the system doesn't allow for the user to have a small enough z position (relative to the camera).


## Constraints in Deployment Environment

Some physical constraints to consider when implementing the project:

* Kinect Azure's relative position to the display
    - With our system prototype, the sensor camera was mounted directly atop the display, oriented such that there was no significant angle between the camera and display's directions. If the sensor camera is mounted in another location (below the display, to the sides, etc.), it is important that conditions for logic components be updated, as position coordinates will change.
* Distance from Kinect Azure sensor to in-frame objects
    - The system will halt if the user is too close to the sensor or partially out of frame; it is important that the user be provided adequate space for movement, so that the system may proceed.


## Contributors

Ananya Purushottam (ap2626)
Nicholas Ribeiro (njr43)
Daniel Strode (das327)
Kaci Xie (kx36)
