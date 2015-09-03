This is a simple JavaScript based game, in which the object is to collect three gems and then proceed to the water.

Use the arrow keys to move the player. The player must avoid the bugs, lava, and vines, otherwise the player loses a life.

There is a three minute time limit. The timer begins its countdown when the start button is clicked.

The game can be accessed and played directly by going to: http://marc1981.github.io/javascript-game

Alternatively, the files can be obtained from this Github site (https://github.com/marc1981/javascript-game), either by downloading the entire zipped file-package to your computer's desktop or by forking this git.

If you choose to utilize the files, the game can be accessed by opening the file called "index.html" in your internet browser (preferably Chrome or Fire Fox).

If you can't figure out how to get started based on these instructions, just give up. It's hopeless.

Now I have no idea what else is supposed to be in this file, so I will just explain everything. How's that? Okay this game is made using HTML, CSS, and JavaScript. It also makes use of image files. As I have stated there is one HTML file called 'index.html', and the two CSS files are called 'pop-styles.css' and 'style.css'. The HTML file sets up the canvas area and also contains the 'div' elements necessary to render the pop-up like windows seen at the start of the game and during other points in game play. The 'pop-styles.css' file contains the style elements for these pop-up windows. The 'style.css' file contains the rest of the style elements for the background and positioning of the canvas. The CSS files are located in a folder called 'css.'

There are five separate JavaScript files located in a folder called 'js', and they are as follows:

'm-app.js' - this contains the JavaScript code that governs the player's and the enemies' movements

'm-engine.js' - this contains the JS code that sets up the canvas with its background and also sets up the top display for showing the time, number of lives left, and number of gems collected

'm-resources.js' - the controls the most basic elements of the game loading

'm-game-controls.js' - this code is for the countdown timer, and it also sets up the start screen for each new game

'css-pop.js' -  this governs the action of the pop-ups

The images used in this game are in PNG format. Many of the character and tile images were provided by Udacity, however the Gatekeeper, the lava, the vines, the altered bugs and altered player-character were created by me using Photoshop.

This README file is ridiculously long, and it shouldn't be necessary to read it to either run or play the game. Never the less, I have been informed multiple times that this README file contains insufficient documentation, so I will continue and try to explain things as clearly as possible.

Click on the start button using your mouse. Again, the timer begins its countdown when the start button is clicked, and it resets when the player either wins the game, quits the game, or loses all of their lives. Use the up arrow to move the player (the elf-like character) towards the water (up the screen). Use the left arrow button on the keyboard to move the player left. Use the right arrow button on the keyboard to move the player to the right. Use the down arrow button on the keyboard to move down. The player is confined to the playing field, which is the canvas area.

For a description of where to locate the arrow buttons on your keyboard, refer to the following page: https://en.wikipedia.org/wiki/Arrow_keys

For help with understanding basic instructions, refer to the following: http://courses.umass.edu/phil110-gmh/text/c01_3-99.pdf

Gems are collected by running the player into them. If a gem is collected the number in the upper right hand corner of the canvas (it is called "Gems Collected") increases by one. It is necessary to collect at least 3 gems in order to win the game, but more than 3 can be obtained. The gems that the player must collect move at random, so you must be quick in order to catch them.

The timer is located in the upper center of the page. It starts at 3:00 indicating three minutes. It decreases one second each second, as most countdown timers do.

For help in understanding the basic units of time, refer to the following: https://en.wikipedia.org/wiki/Unit_of_time

The player begins with 3 lives. A life is lost if a player collides with any of the bug enemies, walks into the lava tiles, crosses into the vine field, or answers the Gate-keeper's question incorrectly. If all 3 lives are lost, the game is over, and it resets.

For assistance on counting refer to the following: http://goo.gl/m5VQnY

If you are still confused on how to play this game, please seek professional help.
