const $armors = document.querySelectorAll('.armor');
const $start = document.getElementById('btn-start');
const $yourArm = document.getElementById('yourArm');
const $botArm = document.getElementById('botArm');
const $pvp = document.getElementById('pvp');
const $getReady = document.getElementById('getReady');
const $btnReset = document.getElementById('btn-reset');
const $cell = document.querySelector('.cell');
const $result = document.getElementById('result');

const resourceLink = {
    rock: 'https://codetheworld.io/wp-content/uploads/2024/09/stone.png',
    paper: 'https://codetheworld.io/wp-content/uploads/2024/09/paper.png',
    scissor: 'https://codetheworld.io/wp-content/uploads/2024/09/scissor.png'
};

let currentArm = '';
let currentBotArm = '';
let state = '';

const selectWin = (me, bot) => {
    if (me === bot) {
        return 'DRAW';
    } else if ((me === 'rock' && bot === 'scissor') || 
               (me === 'scissor' && bot === 'paper') || 
               (me === 'paper' && bot === 'rock')) {
        return 'WIN';
    }
    return 'LOSE';
};

const machineArm = () => {
    const select = ['rock', 'paper', 'scissor'];
    const random = Math.floor(Math.random() * 3);
    return select[random];
};

const removeSelection = () => $armors.forEach((arm) => arm.classList.remove('active'));

$armors.forEach((army) => {
    army.addEventListener('click', (e) => {
        removeSelection();
        currentArm = e.target.id;
        e.target.classList.add('active');
    });
});

$start.addEventListener('click', () => {
    if (!currentArm) {
        alert('Select an army');
        return;
    }
    $getReady.style.opacity = '0';
    $pvp.style.display = 'flex';
    $yourArm.style.backgroundImage = `url(${resourceLink[currentArm]})`;
    currentBotArm = machineArm();
    setTimeout(() => {
        $cell.style.opacity = '0';
        $botArm.style.backgroundImage = `url(${resourceLink[currentBotArm]})`;
    }, 2000);
    setTimeout(() => {
        state = selectWin(currentArm, currentBotArm);
        $result.innerText = state;
        $result.style.display = 'inherit';
        if (state === 'WIN') {
            confetti();
        }
    }, 2500);
});

$btnReset.addEventListener('click', () => {
    confetti.reset();
    state = '';
    currentArm = '';
    currentBotArm = '';
    $getReady.style.opacity = '1';
    $pvp.style.display = 'none';
    removeSelection();
    $cell.style.opacity = '1';
    $botArm.style.backgroundImage = 'none';
    $result.innerText = '';
    $result.style.display = 'none';
});
