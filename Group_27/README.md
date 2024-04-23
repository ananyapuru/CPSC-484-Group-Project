# CPSC-484-Posture-Checker
CPSC 484 S'24: Group Project

## Introduction

This repository contains code for Group 27's final project for CPSC 484/584 (Introduction to Human-Computer Interaction). This project is titled "The Posture Doctor", and addresses the following problem space:

* "Bad posture must be corrected"

A widespread issue, not only at Yale but in numerous college campuses, is bad posture. Whether it be to past injuries or working in front of a laptop from sunrise to sunset, many people suffer bad posture in one way or another. And the worst part about it - many people don't even realize it. 

The goal of this project is to help Yalies identify any posture issues they may have, and get them on the right track to fixing them.

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

* index.html
* jquery-3.7.1.min.js
* main.js
* second screen.html
* style.css
