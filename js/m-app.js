// Draw the enemy and player objects on the screen
Object.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

//Reset player to beginning position
Object.prototype.reset = function() {
  player.x = 450;
  player.y = 450;
  ctx.clearRect(0, 0, 500, 500);
  player.sprite = 'images/elfin.png';
}

//If player reaches water, image changes, announces winning.
Object.prototype.win = function(){
    player.sprite = "images/winner.png";
    player.x = 600;
    player.y = -50;
    moveRight = false;
    moveLeft = false;
    lives = 3;
    announceWinner();
}

//Show winner screen.
function announceWinner(){
    popup('winner');
    ctx.clearRect(600, -50, 110, 110);
    ctx.clearRect(200, 0, 300, 200);
    player.reset();
}

//If time runs out, announce and end game.
Object.prototype.timesUp = function(){
    player.sprite = "images/grave.png";
    player.x = 405;
    player.y = 325;
    setTimeout(function(){ popup('timeUp') }, 500);
    setTimeout(function(){popup('timeUp'); player.sprite = 'images/elfin.png'; player.reset(); beginNewGame();}, 3000);
}
//If player is killed the number of lives decrements, and if no more lives, game is over. Otherwise ask player to try again.
Object.prototype.dead = function(){
    lives = lives - 1;
    gemsObtained = 0;
    if(lives <= 0){
        player.sprite = "images/grave.png";
        player.x = 405;
        player.y = 325;
        setTimeout(function(){ popup('noLivesLeft') }, 900);
        setTimeout(function(){ popup('noLivesLeft'); player.sprite = 'images/elfin.png'; player.reset(); beginNewGame();}, 7000);
    } else {
        player.sprite = "images/dead.png";
        player.x = 405;
        player.y = 425;
        setTimeout(function(){
            popup('tryAgain');
        }, 500);
    }
}

//clear contents where dead character was and reset player.
function playerNewImageClear(){
    ctx.clearRect(450, 500, 100, 100);
    player.sprite = 'images/elfin.png';
    player.reset();
}

//show if player chooses to quit game.
function quitGame(){
    popup('quitPopUp');
    player.x = 405;
    player.y = 325;
    player.sprite = 'images/grave.png';
    setTimeout(function(){player.sprite = 'images/elfin.png'; popup('quitPopUp'); player.reset(); beginNewGame();}, 5000);
}

var begin = false;
var lives = 3;
var livesRemaining = document.getElementById('lives');
var gemsObtained = 0;
var scoreDisplay = document.getElementById('score');

// Enemies the player must avoid
var Enemy = function(x,y) {

    // The image/sprite for enemies
    this.sprite = 'images/enemy-bug.png';

    //x and y coordinates and movement speed
    this.x = x;
    this.y = y;
    this.speed = Math.floor((Math.random() * 100) + 100);
}

var FlyingEnemy = function(x,y){
    this.sprite = 'images/flying-bug.png';
    this.x = x;
    this.y = y;
    this.speed = Math.floor((Math.random() * 100) + 100);
}

var Gatekeeper = function(x,y) {
    this.sprite = 'images/bee.png';
    //x and y coordinates and movement speed
    this.x = x;
    this.y = y - 10;
    this.speed = Math.floor((Math.random() * 100) + 100);
}

Enemy.prototype.update = function(dt) {
    //if the enemy crosses off screen, reset its position. Otherwise, it keeps running.
    if(this.x <= 850){
        this.x += this.speed * dt;
    }else{
        this.x = -2;
    }

    //If the player comes within 30px of an enemy's x and y coordinates, reset the game
    if(player.x >= this.x - 30 && player.x <= this.x + 30){
        if(player.y >= this.y - 30 && player.y <= this.y + 30){
            popup('bugPopUp');
            player.reset();
        }
    }
}

FlyingEnemy.prototype.update = function(dt) {
    //if the enemy crosses off screen, reset its position. Otherwise, it keeps running.
    if(this.x >= -50){
        this.x -= this.speed * dt;
    }else{
        this.x = 910;
    }

    //If the player comes within 30px of an enemy's x and y coordinates, reset the game
    if(player.x >= this.x - 30 && player.x <= this.x + 30){
        if(player.y >= this.y - 30 && player.y <= this.y + 30){
            popup('flyingBugPopUp');
            player.reset();
        }
    }
}

var Weeds = function(x,y) {
    this.sprite = 'images/weeds.png';
    //x and y coordinates and movement speed
    this.x = x;
    this.y = y;
    this.speed = 100;
}


//Controls up and down movement of weeds
var moveUp = true;
var moveDown = false;
Weeds.prototype.update = function(dt){
    if(moveUp && this.y >= 550){
        this.y -= this.speed * dt;
    } else {
        moveUp = false;
        moveDown = true;
    }
    if(moveDown && this.y <= 650){
        this.y += this.speed * dt;
    } else {
        moveDown = false;
        moveUp = true;
    }
    ctx.clearRect(50, 600, 220, 220);
//If player is caught in weeds, player dies.
    if(player.x >= this.x - 30 && player.x <= this.x + 30){
        if(player.y >= this.y - 50 && player.y <= this.y + 40){
            popup('vinePopUp');
            player.reset();
        }
    }
}

//Sets default movement pattern for Gatekeeper
var moveRight = true;
var moveLeft = false;
//controls the movement of Bee Gatekeeper
Gatekeeper.prototype.update = function(dt) {
    //Sets bounds and direction of movement
    if(moveLeft || moveRight){
        this.sprite = "images/bee.png";
    } else {
        this.sprite = "images/goodbye.png";
        this.x = 220;
        this.y = 30;
    }
    if(moveRight && this.x <= 600){
            this.x += this.speed * dt;
    } else {
        moveRight = false;
        moveLeft = true;
    }
    if(moveLeft && this.x >= 200){
        this.x -= this.speed *dt;
    } else {
        moveLeft = false;
        moveRight = true;
    }

    //If the player comes in contact with GateKeeper's x and y coordinates, prompt question
    if(player.x >= this.x - 30 && player.x <= this.x + 30){
        if(player.y >= this.y - 30 && player.y <= this.y + 30){
            popup('riddle');
            this.x = player.x + 50;
            player.y = 60;
            player.x = 650;
        }
    }
}

//Gem
var Gemstone = function(x,y){
    this.sprite = 'images/gem.png';
    this.x = x;
    this.y = y;

}

//If the player comes within 40px of an gems's x and y coordinates, gem dissappears and score increments by one.
Gemstone.prototype.update = function(){
   if(player.x >= this.x - 40 && player.x <= this.x + 40){
        if(player.y >= this.y - 40 && player.y <= this.y + 40){
            this.x = Math.floor((Math.random() * 700));
            this.y = Math.floor((Math.random() * 505));
            ctx.clearRect(32, 0, 520, 220);
            ++gemsObtained;
        }
    }
}

var gemstone = new Gemstone(606, 404);

//Controls random positioning of gemstone that changes after 7 seconds.
var randomX = Math.floor((Math.random() * 700));
var randomY = Math.floor((Math.random() * 505));
var randomMove = function(){
        if(randomY >= 60 && randomX >= (20 + player.x) ){
            gemstone.x = randomX;
            gemstone.y = randomY;
            } else {
                if(gemstone.x <= 600){
                gemstone.x = player.x + 100;
                gemstone.y = 110;
                } else{
                    gemstone.x = player.x - 100;
                    gemstone.y = 110;
                }
            }
        }

setInterval(function(){ randomMove(); }, 7000);


// Player class and initial x and y coordinates
var Player = function(){
    this.sprite = 'images/elfin.png';
    this.x = 450;
    this.y = 500;
}

//Update player position
Player.prototype.update = function(){
    if(begin){//if left key is pressed and player is not on edge of map, pressed decrement x
        if(this.ctlKey === 'left' && this.x > 0){
            this.x = this.x - 50;
        //if right key is pressed and player is not on edge of map increment x
        }else if(this.ctlKey === 'right' && this.x != 800){
            this.x = this.x + 50;
        //if up key is pressed increment y
        }else if(this.ctlKey === 'up'){
            this.y = this.y - 50;
        //if down key is pressed and player is not on edge of map decrement y
        }else if (this.ctlKey === 'down' && this.y != 500){
            this.y = this.y + 50;
        }
        this.ctlKey = null;

        //Player dies if steps in lava
        if(this.x >= 50 && this.x <= 101 && this.y <= 202 && this.y >= 151){
                popup('lavaPopUp');
                this.reset();
        }

        if(this.x >= 252 && this.x <= 303 && this.y <= 202 && this.y >= 151){
                popup('lavaPopUp');
                this.reset();
        }

        if(this.x >= 454 && this.x <= 505 && this.y <= 202 && this.y >= 151){
                popup('lavaPopUp');
                this.reset();
        }

        if(this.x >= 656 && this.x <= 707 && this.y <= 202 && this.y >= 151){
                popup('lavaPopUp');
                this.reset();
        }
        //If three gems collected and on water, player wins.
        if(this.y < 25 && gemsObtained >= 3){
            this.win();
        } else if (this.y < 25 && gemsObtained < 3) {
            popup('need-gems');
            this.x = 650;
            this.y = 60;
            setTimeout(function(){popup('need-gems'); this.reset();}, 6000);

        }
    }
}


//Input handler for player
Player.prototype.handleInput = function(e){
    this.ctlKey = e;
}


// Instantiate enemies objects
var allEnemies = [];
(function setEnemies(){
    allEnemies.push(new Gatekeeper(250, 60));
    allEnemies.push(new Enemy(-2, 100));
    allEnemies.push(new Enemy(-2,150));
    allEnemies.push(new FlyingEnemy(910, 220));
    allEnemies.push(new Weeds(150, 630));
    allEnemies.push(new Weeds(50, 630));
    allEnemies.push(new Weeds(90, 630));
}());

var gatekeeper = new Gatekeeper();
var player = new Player();
// listens for key presses and sends the keys to
// Player.handleInput() method.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
