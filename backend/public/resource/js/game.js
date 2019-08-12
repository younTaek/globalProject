const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");
const rect = canvas.getBoundingClientRect();
const FPS = 60;
const BALL_RADIUS = 10;
const PADDLE_WIDTH = 15;
const PADDLE_HEIGHT = 80;
var py = 0, cy = 380, scoreP = 0, scoreC = 0, bx = 400, by = 240, bhd = 3, bvd = 3;
var isRunning = false;
var timer;
canvas.width = 800;
canvas.height = 480;
canvas.addEventListener('mousemove', function (evt) {
    py = evt.clientY - rect.top;
});

function drawBackground(ctx) {
    ctx.fillStyle = 'black';
    ctx.font = "1em Arial";
    ctx.fillText(`Me ${scoreP}`, 10, 30);
    ctx.fillText(`Computer ${scoreC}`, 700, 30);
}

function drawPlayer(ctx, y) {
    ctx.fillStyle = 'pink';
    ctx.fillRect(10, y - PADDLE_HEIGHT / 2, PADDLE_WIDTH, PADDLE_HEIGHT);
}

function drawComputer(ctx) {
    ctx.fillStyle = 'pink';
    ctx.fillRect(780, cy, PADDLE_WIDTH, PADDLE_HEIGHT);
}

function drawBall(ctx) {
    ctx.beginPath();
    ctx.arc(bx, by, BALL_RADIUS, 0, 2 * Math.PI, false);
    ctx.fillStyle = 'green';
    ctx.fill();
}

function gameUpdate() {
    bx += bhd;
    by += bvd;
    // 踰�
    if (by + BALL_RADIUS > 480 || by - BALL_RADIUS < 0)
        bvd *= -1;
    // �� ��
    if (bx > 800 || bx < 0) {
        endRound(bx > 800 ? 'p' : 'c');
        return;
    }
    // �ъ슜��
    if (bx - BALL_RADIUS <= 10 + PADDLE_WIDTH && by > py - PADDLE_HEIGHT && by < py + PADDLE_HEIGHT) {
        bx = 10 + PADDLE_WIDTH + BALL_RADIUS;
        bhd *= -1;
    }
    if (by + BALL_RADIUS >= py && by - BALL_RADIUS <= py + PADDLE_HEIGHT && bx < 10 + PADDLE_WIDTH) {
        bvd *= -1;
    }
    // 而댄벂��
    if (bx + BALL_RADIUS >= 780 && by > cy && by < cy + PADDLE_HEIGHT) {
        bx = 780 - BALL_RADIUS;
        bhd *= -1;
    }
    if (by + BALL_RADIUS >= cy && by - BALL_RADIUS <= cy + PADDLE_HEIGHT && bx > 780)
        bvd *= -1;

    // AI
    if (by < cy + PADDLE_HEIGHT / 2)
        cy -= 3 * .8;
    else if (by > cy + PADDLE_HEIGHT / 2)
        cy += 3 * .8;
    render();
}

function render() {
    ctx.clearRect(0, 0, 800, 480);
    drawPlayer(ctx, py);
    drawComputer(ctx);
    drawBackground(ctx);
    drawBall(ctx);
    timer = setTimeout(function () { gameUpdate() }, 1000 / FPS);
}

function endRound(won) {
    if (won)
        bhd *= -1;
    if (won === 'p')
        scoreP++;
    else if (won === 'c')
        scoreC++;
    $('#btnStart').text('Start');
    isRunning = false;
    clearTimeout(timer);
    bx = 400;
    by = 240;
    ctx.clearRect(0, 0, 800, 480);
    drawBackground(ctx);
}

$(document).ready(function () {
    // $('body').bootstrapMaterialDesign();
    $('#btnStart').click(function () {
        if (!isRunning) {
            $(this).text('Stop');
            isRunning = true;
            gameUpdate();
        } else {
            endRound();
        }
    })
});