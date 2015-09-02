var Engine = (function(global) {
    var doc = global.document,
        win = global.window,
        canvas = doc.createElement('canvas'),
        ctx = canvas.getContext('2d'),
        patterns = {},
        lastTime;

    canvas.width = 909;
    canvas.height = 707;
    doc.body.appendChild(canvas);

    function main() {
        var now = Date.now(),
            dt = (now - lastTime) / 1000.0;

        update(dt);
        render();

        lastTime = now;
        win.requestAnimationFrame(main);
    }

    function init() {
        player.reset();
        lastTime = Date.now();
        main();
    }

    function startGame(){
        document.getElementById('start').style.display = 'none';
        document.getElementById('screen-overlay').style.display = 'none';
    }

    function update(dt) {
        updateEntities(dt);
        scoreDisplay.innerHTML = "Gems Collected: " + gemsObtained;
        livesRemaining.innerHTML = "Lives Remaining: " + lives;
    }

    function updateEntities(dt) {
        allEnemies.forEach(function(enemy) {
            enemy.update(dt);
        });
        gemstone.update();
        player.update();

    }

    function render() {
        var rowImages = [
                'images/water-block.png',
                'images/stone-block.png',
                'images/stone-block.png',
                'images/lava-block.png',
                'images/stone-block.png',
                'images/grass-block.png',
                'images/grass-block.png'
            ],
            numRows = 7,
            numCols = 9,
            row, col;

        for (row = 0; row < numRows; row++) {
            for (col = 0; col < numCols; col++) {
                 if(col % 2 == 0 && row == 3 ){
                    ctx.drawImage(Resources.get(rowImages[2]), col * 101, row * 83);
                 } else{
                ctx.drawImage(Resources.get(rowImages[row]), col * 101, row * 83);
                }
            }
        }

        renderEntities();
    }

    function renderEntities() {
        allEnemies.forEach(function(enemy) {
            enemy.render();
        });
        player.render();
        gemstone.render();
    }

    Resources.load([
        'images/stone-block.png',
        'images/water-block.png',
        'images/grass-block.png',
        'images/bee.png',
        'images/lava-block.png',
        'images/enemy-bug.png',
        'images/flying-bug.png',
        'images/gem.png',
        'images/winner.png',
        'images/weeds.png',
        'images/dead.png',
        'images/grave.png',
        'images/elfin.png',
        'images/goodbye.png',
        'images/char-boy.png'
    ]);
    Resources.onReady(init);

    global.ctx = ctx;
})(this);
