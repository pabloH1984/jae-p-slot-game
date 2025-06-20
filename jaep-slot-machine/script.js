let images = [
    'assets/img/reel-symbol1.png',
    'assets/img/reel-symbol2.jpg',
    'assets/img/reel-symbol3.jpg',
    'assets/img/reel-symbol4.jpg',
    'assets/img/reel-symbol5.jpg'
];

let betAmount = 1;
let winnings = 0;

function getRandomSymbol() {
    return images[Math.floor(Math.random() * images.length)];
}

function spin() {
    const reels = document.querySelector('.reels');
    const reel1 = document.getElementById('reel1');
    const reel2 = document.getElementById('reel2');
    const reel3 = document.getElementById('reel3');

    reels.classList.add('spinning');

    let spinSound = new Audio('assets/sfx/spin.mp3');
    spinSound.play();

    const spinTime = 3500; // spin time in ms
    const interval = 90;
    let spinCount = 0;

    const spinInterval = setInterval(() => {
        reel1.style.backgroundImage = `url(${getRandomSymbol()})`;
        reel2.style.backgroundImage = `url(${getRandomSymbol()})`;
        reel3.style.backgroundImage = `url(${getRandomSymbol()})`;
        spinCount += interval;
        if (spinCount >= spinTime) {
            clearInterval(spinInterval);

            // Final result
            let final1 = getRandomSymbol();
            let final2 = getRandomSymbol();
            let final3 = getRandomSymbol();

            reel1.style.backgroundImage = `url(${final1})`;
            reel2.style.backgroundImage = `url(${final2})`;
            reel3.style.backgroundImage = `url(${final3})`;

            reels.classList.remove('spinning');

            if (final1 === final2 && final2 === final3) {
                winnings += betAmount * 10;
                triggerWinEffect(); // coin/confetti
                new Audio('assets/sfx/win.mp3').play();
            } else {
                winnings = 0;
            }

            document.getElementById('winnings').innerText = 'Winnings: $' + winnings;
        }
    }, interval);
}



function increaseBet() {
    betAmount++;
    document.getElementById('bet').innerText = 'Bet: $' + betAmount;
}

function decreaseBet() {
    if (betAmount > 1) {
        betAmount--;
        document.getElementById('bet').innerText = 'Bet: $' + betAmount;
    }
}
function triggerWinEffect() {
    const container = document.getElementById('win-effect-container');
    container.innerHTML = '';

    const coinFrames = ['coin_frame_1.png', 'coin_frame_2.png', 'coin_frame_3.png', 'coin_frame_4.png', 'coin_frame_5.png'];
    const confettiColors = ['red', 'white', 'green', 'blue'];

    // 🎇 Confetti burst in random directions
    for (let i = 0; i < 60; i++) {
        const confetti = document.createElement('div');
        const color = confettiColors[Math.floor(Math.random() * confettiColors.length)];
        const frame = Math.floor(Math.random() * 3) + 1;

        confetti.className = 'confetti';
        confetti.style.backgroundImage = `url(assets/coin_confetti_frames/confetti_${color}_${frame}.png)`;
        confetti.style.left = '50%';
        confetti.style.top = '50%';

        // Calculate random burst direction
        const angle = Math.random() * 2 * Math.PI;
        const distance = 200 + Math.random() * 200;
        const x = Math.cos(angle) * distance;
        const y = Math.sin(angle) * distance;

        confetti.style.setProperty('--x', `${x}px`);
        confetti.style.setProperty('--y', `${y}px`);

        container.appendChild(confetti);
    }

    // 💰 Coins pouring like a waterfall
    for (let i = 0; i < 60; i++) {
        setTimeout(() => {
            const coin = document.createElement('div');
            const frame = coinFrames[Math.floor(Math.random() * coinFrames.length)];
            coin.className = 'coin';
            coin.style.backgroundImage = `url(assets/coin_confetti_frames/${frame})`;
            coin.style.left = Math.random() * 95 + '%';
            coin.style.top = '-60px';

            container.appendChild(coin);
        }, i * 100); // staggered drop
    }

    // Sound effects
    new Audio('assets/sfx/coin-drop.mp3').play();
    setTimeout(() => {
        new Audio('assets/sfx/ya-se-hizo.mp3').play();
    }, 700);
}




