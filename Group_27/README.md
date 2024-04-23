# The Posture Doctor
## Group 27
## CPSC 484/584

## Introduction

This repository contains code for Group 27's final project for CPSC 484/584 (Introduction to Human-Computer Interaction). This project is titled "The Posture Doctor", and addresses the following problem space:

* "Bad posture must be corrected"

A widespread issue, not only at Yale but in numerous college campuses, is bad posture. Whether it be to past injuries or working in front of a laptop from sunrise to sunset, many people suffer bad posture in one way or another. And the worst part about it - many people don't even realize it. 

The goal of this project is to help Yalies identify any posture issues they may have, and get them on the right track to fixing them. The specific tasks this project is designed for are as follows:

* Learning what constitutes/indicates poor posture
* Learning about posture-correcting exercises to strengthen and correct posture-related muscles

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

## Modifying the project

In this directory are the following files:

### Javascript
* jquery-3.7.1.min.js
    * starter code from the CPSC484 website
* main.js
    * provides logic for navigating the prototype, and scoring a user's posture

### HTML/CSS
* index.html
    * the system's 'start screen'
* forward_head_posture.html
    * page providing information for the '*forward head posture*' condition.
* resources.html
    * page providing overall + component scores, as well as a list of identified conditions
* sitting.html
    * navigated to from the start screen by a user raising their right hand; instructs user to sit facing the TV directly
* standing.html
    * navigated to from the start screen by a user raising hteir left hand; instructs user to stand facing the TV directly
* style.css
    * 

## Dependencies

1. **Websocket API**
* Version Information - 
* Usage: Exchanging data between the browser and server
* Information: When creating connections for this project, data was accessed using the IP and port address **\[Env_IP\]:8888**. To view live data currently shown on a given display with \[Server_Name\], on your local computer, open your browser to **https://\[Server_Name\]:8888**. For example, this project was tested using **http://cpsc484-03.stdusr.yale.internal:8888/**.

2. **Cisco AnyConnect**
* Version: 4.10.07073
* Usage: For connecting to the Yale VPN remotely
* Information: When running the application (called "Cisco AnyConnect Secure Mobility Client"), enter **access.yale.edu** in the space and provide your access credentials (NetID/password)

3. **Yale Virtual Private Network**
* Usage: Accessing data from the HCI displays
* Information: Yale's network can be accessed on-campus by connecting to YaleSecure, and providing your NetID and password. If accessing the Yale VPN remotely, refer to *Cisco AnyConnect*

4. **Azure Kinect**
* Version: 
* Supported operating systems/architectures:
    * Windows 10 April 2018 (Version 1803, OS Build 17134) release (x64) or a later version
    * Linux Ubuntu 18.04 (x64), with a GPU driver that uses OpenGLv4.4, or a later version
* Usage: Collecting body pose data. The system's input is the sensor camera's image
* Information: The sensor's (0,0,0) coordinate is at the center of the central lens. Facing the camera directly, the x axis bisects the lens from left (+x) to right (-x); the y axis bisects the lens from below (+y) to above(-y); and the z axis extends perpendicularly to the lens' center, with the +z direction extending out (away from the display and toward a user). Specific information regarding joint coordinates/data can be found [here](https://learn.microsoft.com/en-us/azure/kinect-dk/body-joints).

5. **Display**
* Runs Ubuntu 20.04
* Usage: For visualizing the system's output
* Information: The display used in this project was a TV, however, other devices (desktop/laptop computers) may suffice. If you choose to use a hardware setup different from that of this project's, note that the location of the display relative to the sensor is important. For this project, the center of the TV is approximately 450 in the positive y direction (down) from the camera. 


## Contributors

Ananya Purushottam (ap2626)
Nicholas Ribeiro (njr43)
Daniel Strode (das327)
Kaci Xie (kx36)
