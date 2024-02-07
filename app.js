document.addEventListener('DOMContentLoaded', () => {
    
    const bird = document.querySelector('.bird');
    const gameDisplay = document.querySelector('.game-display');
    const ground = document.querySelector('.ground-moving');

    let birdLeft = 220;
    let birdBottom = 450;
    let gravity = 3;
    let isGameOver = false;
    let gap = 500;
    let score = 0;

  
    function saveScore(score) {
        localStorage.setItem('flappy_bird_highscore', score);
    }

    
    function loadScore() {
        return localStorage.getItem('flappy_bird_highscore') || 0;
    }
    function startGame() {

        if (isGameOver) return;

        birdBottom -= gravity;
        bird.style.bottom = birdBottom + 'px';
        bird.style.left = birdLeft + 'px';

        
        if (birdBottom < 0) {
            birdBottom = 0;
        }
    }

    let gameTimerId = setInterval(startGame, 20);

    function control(e) {
       
        if (e.keyCode === 13) { 
            jump();
        }
    }

    function jump() {
        
        if (birdBottom < 500) {
            birdBottom += 50;
            bird.style.bottom = birdBottom + 'px';
        }
    }

    document.addEventListener('keydown', control);

    function generateObstacle() {
        if (isGameOver) return;

        let obstacleLeft = 500;
        let randomHeight = Math.random() * 150; // mettre une hauteur random
        let obstacleBottom = randomHeight;

       
        const obstacle = document.createElement('div');
        const topObstacle = document.createElement('div');

        obstacle.classList.add('obstacle');
        topObstacle.classList.add('topObstacle');

        gameDisplay.appendChild(obstacle);
        gameDisplay.appendChild(topObstacle);

        obstacle.style.left = obstacleLeft + 'px';
        topObstacle.style.left = obstacleLeft + 'px';
        obstacle.style.bottom = obstacleBottom + 'px';

       
        topObstacle.style.bottom = obstacleBottom + gap + 'px';

        obstacle.style.backgroundImage = "url('assets/flappybird-pipe.png')";

        function moveObstacle() {
            obstacleLeft -= 5; // ajuster la vitesse
            obstacle.style.left = obstacleLeft + 'px';
            topObstacle.style.left = obstacleLeft + 'px';

            
            if (obstacleLeft < -60) {
                gameDisplay.removeChild(obstacle);
                gameDisplay.removeChild(topObstacle);
                score++; 
                generateObstacle();
            }


            if (
                (birdBottom < obstacleBottom + 300 && birdBottom > obstacleBottom) &&
                (obstacleLeft > 200 && obstacleLeft < 280)
            ) {
                gameOver();
            }
        }

        setInterval(moveObstacle, 20);
    }

    function gameOver() {
        clearInterval(gameTimerId);
        isGameOver = true;
        const currentScore = score;
        const highScore = loadScore();
        if (currentScore > highScore) {
            saveScore(currentScore);
            alert('New High Score! Your score: ' + currentScore);
        } else {
            alert('Game Over! Your score: ' + currentScore + ', High Score: ' + highScore);
        }
    }

    generateObstacle(); 
});
