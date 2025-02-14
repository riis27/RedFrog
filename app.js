
        const gameContainer = document.getElementById('game-container');
        const frog = document.querySelector('.frog');
        const gameWidth = gameContainer.offsetWidth;
        const gameHeight = gameContainer.offsetHeight;
        let frogX = 190;
        let frogY = 380;

        const start = document.getElementById('start');
        const end = document.getElementById('end');

        // Key press 
        document.addEventListener('keydown', (event) => {
            switch (event.key) {
                case 'ArrowLeft':
                    frogX -= 30;
                    break;
                case 'ArrowRight':
                    frogX += 10;
                    break;
                case 'ArrowUp':
                    frogY -= 40;
                    break;
                case 'ArrowDown':
                    frogY += 60;
                    break;
            }

            // Keep frog within game boundaries
            frogX = Math.max(0, Math.min(frogX, gameWidth - frog.offsetWidth));
            frogY = Math.max(0, Math.min(frogY, gameHeight - frog.offsetHeight));

            // Check for collisions with walls
            if (checkCollisions()) {
                // If collision, reset frog to start position
                frogX = 360;
                frogY = 360; 
            }

            frog.style.left = frogX + 'px';
            frog.style.top = frogY + 'px';

            // Check if the frog has reached the end
            if (
                frogX >= end.offsetLeft &&
                frogX + frog.offsetWidth <= end.offsetLeft + end.offsetWidth &&
                frogY >= end.offsetTop &&
                frogY + frog.offsetHeight <= end.offsetTop + end.offsetHeight
            ) {
                alert('You Win!');
            }
        });

        function checkCollisions() {
            const frogRect = frog.getBoundingClientRect();
            const walls = document.querySelectorAll('.wall');
            for (const wall of walls) {
                const wallRect = wall.getBoundingClientRect();
                if (
                    frogRect.left < wallRect.right &&
                    frogRect.right > wallRect.left &&
                    frogRect.top < wallRect.bottom &&
                    frogRect.bottom > wallRect.top
                ) {
                    return true; // Collision detected
                }
            }
            return false;
        }


        //Reference: https://www.the-art-of-web.com/javascript/maze-game/