# The Posture Doctor
## Group 27
## CPSC 484/584

## Introduction and Brief Description

This repository is for Group 27's final project for CPSC 484/584 (Introduction to Human-Computer Interaction). This project is titled "The Posture Doctor", and addresses the following problem space:

* "Bad posture must be corrected"

A widespread issue, not only at Yale but in numerous college campuses, is bad posture. Whether it be to past injuries or working in front of a laptop from sunrise to sunset, many people suffer bad posture in one way or another. And the worst part about it - many people don't even realize it. 

The goal of this project is to help Yalies identify any posture issues they may have, and get them on the right track to fixing them. The specific tasks this project is designed for are as follows:

* Learning what constitutes/indicates poor posture
* Learning about posture-correcting exercises to strengthen and correct posture-related muscles


## Task 1: Learning what constitutes/indicates poor posture

- We addressed this task as described in our Assignment 4 breakdown of responsibilities.
- Daniel did a lot of research on what indicated poor posture, and Nick tried to use all the Kinect sensor joint information to codify indicators of poor posture. 
- There were certain indicators and joints whose positioning we believed would be good indicators of good/poor posture, but had too much variability and gave us false positive results when we tried to use them in our score computation. 
- Therefore, we excluded some of these joints from our calculations. 
- Joint information we did use include the shoulder joints, the neck joints, the spine and hip joints. We had data that we normalized to evaluate the straightness of a user's spine, and other data that was more relatively defined, such as the parallel nature and degree of a user's shoulders.
- Specifically, we identified 6 very common indicators of poor posture:
    1. *Anterior pelvic tilt*: 
    - Characterized by the front of the pelvis dropping and the back of the pelvis rising, often resulting from prolonged sitting and weakened abdominal muscles. 
    - This position leads to an exaggerated curve in the lower back, causing discomfort and potential lower back pain.
    2. *Forward tilted head*:
    - Occurs when the head juts forward, misaligning with the spine, commonly due to excessive use of devices like smartphones and computers.
    - This misalignment can strain the neck muscles and lead to chronic pain and headaches.
    3. *Lateral pelvic tilt*:
    - A condition where one side of the pelvis is higher than the other, which may develop from habits like consistently bearing weight on one leg or muscle imbalances.
    - This can lead to asymmetrical walking patterns and increased stress on one side of the body.
    4. *Sloped shoulders*:
    - Involves shoulders that round forward, usually as a result of poor sitting habits and a lack of upper back strength.
    - This posture can restrict breathing and cause tension and pain in the neck, shoulders, and upper back.
    5. *Uneven shoulders*:
    - Refers to one shoulder being higher than the other, often due to muscle imbalances, carrying loads on one side of the body, or scoliosis.
    - It can lead to an imbalance in the spine and musculoskeletal strain, affecting overall mobility and comfort.
    6. *Posterior pelvic tilt*:
    - The opposite of anterior pelvic tilt, where the front of the pelvis rises and the back lowers, often related to tight hamstring and gluteus muscles.
    - This tilt flattens the lower back curve, potentially leading to lower back discomfort and reduced flexibility.

- It was informative and enjoyable to learn theoretically and test practically what constituted poor posture.


## Task 2: Learning about posture-correcting exercises to strengthen and correct posture-related muscles

- For our second task, we conducted more research to tie together common indicators of poor posture from Task 1 and exercises that could help alleviate the symptoms from such indicators and behaviors in users.
- We used the 6 indicators/symptoms/side-effects/causes (since everything is cyclic and connected after all!) to inform the posture-correcting exercieses we suggest to users. 
- Without going into all the detail that is available on each of the 6 resource pages for each of the causes of poor posture, we highlight here a few exercises we recommend to users based on research, namely: chin tucks, deltoid-targeting weightlifting, hip flexor stretches, foam rolling etc.


## Running the System Prototype (How to run project)
To run our project, you need:
1. Terminal with Python3 installed.
2. Web Browser (Google Chrome, Safari, Firefox, Vivaldi)
3. Source Code (either GitHub or downloaded .zip)

Steps:
1. Change directory into the `Group_27` project directory by typing the following in your terminal:
`cd Group_27`
2. Once you're in the directory, you should see several HTML pages, a `main.js` Javascript page, and two CSS stylesheets if you've opened the directory in Visual Studio Code or similar IDEs. You can also inspect all files in the folder by typing `ls` in your terminal.
3. Confirm that the host you wish to run the code on is `cpsc484-03.stdusr.yale.internal:8888";`. For other hosts, change the variable `var host = "cpsc484-03.stdusr.yale.internal:8888";` in `main.js` accordingly. For instance, if you wish to run the code on TV #2, change the variable to `var host = "cpsc484-02.stdusr.yale.internal:8888";`.
4. In your terminal, type the following command: `python3 -m http.server 5027`. 
    - Note: We chose 5027 based on the Ed post, but it is not a fixed number or necessity! Feel free to choose any other server that does not conflict with another group's.
5. The following message should appear on your terminal:
`Serving HTTP on :: port 5027 (http://[::]:5027/) ...`

6. Press `cmd` and click on the http link. This should redirect you to the homepage of our application running on your default browser.
7. Follow the on-screen instructions on TV 3 or your authorized TV and enjoy improving your posture! :D

## TROUBLESHOOTING AND DEPLOYMENT ENVIRONMENT CONSTRAINTS [Important]
- Note that our code ALWAYS works locally on our computer when tested (with users) in front of TV3 outside Davies Auditorium.
However, sometimes due to problems with the TV or upload website, the TV display does not always display or reflect the most recently uploaded version of our project. Therefore, if the TV does not display a greeting message to the user when the user is in the vision of the sensor and/or recognize instruction responses such as the left hand being raised, we request you to look at the output on your browser rather than on the TV. We promise you it works on the TV display, and we've spent DAYS testing it, but sometimes, with 0 changes to our code, the TV display just won't reflect the most up-to-date version of the code we uploaded. We are sorry for any inconvenience this causes and sincerely request that this does not negatively impact our grade as the display not reflecting the most recent code we've uploaded is not in our control :(
- Physical constraints on where the user should stand will be made explicit by our on-screen instructions! The user will be told if they are too close or too far away. If there are multiple users in the screen, our installation automatically recognizes the closest person!

* Kinect Azure's relative position to the display
    - With our system prototype, the sensor camera was mounted directly atop the display, oriented such that there was no significant angle between the camera and display's directions. If the sensor camera is mounted in another location (below the display, to the sides, etc.), it is important that conditions for logic components be updated, as position coordinates will change.
* Distance from Kinect Azure sensor to in-frame objects
    - The system will halt if the user is too close to the sensor or partially out of frame; it is important that the user be provided adequate space for movement, so that the system may proceed.

## How to interact with application

You can find *The Posture Doctor* at TV 3, in front of Davies Auditorium. If another user isn't already interacting with *The Posture Doctor*, you will see a welcome screen that provides a quirky greeting and an option to analyze your posture when the left hand is raised. After raising your left hand, the analysis occurs as follows:

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
* sloped_shoulders.html
    * page providing information for the '*sloped shoulders*' condition.
* standing.html
    * navigated to from the start screen by a user raising hteir left hand; instructs user to stand facing the TV directly
* uneven_shoulders.html
    * page providing information for the '*uneven shoulders*' condition.
* resources.css
    * Styling rules specified for the external resource pages.
* style.css
    * Styling rules for general application pages (homepage i.e. `index.html`, `standing.html`).


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



## Contributors

Ananya Purushottam (ap2626):
I coded all the CSS design changes, including the refreshed design for all the resource HTML pages. I also did several bug fixes, Github handling by reverting bad commits, and a lot of troubleshooting with regards to Javascript variable coordination. I also coded up all the navigation flow between resource and homepages, and implemented a timeout function to only switch screens if the user's hand was raised for 3 seconds to prevent immediate accidental screen switches. This was very challenging to do and debug, but very rewarding. I contributed to this `README.md` as well by explaining how to run our project, as well as troubleshooting tips, i.e. explicitly indiciating if there are any constraints from the deployment environment as mentioned in our rubric!

Nicholas Ribeiro (njr43)


Daniel Strode (das327)
I worked on compiling all the research for our 2 main tasks. I also worked a lot on this `README.md` file.

Kaci Xie (kx36)
