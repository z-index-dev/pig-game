/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he wishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLOBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/
let scores;
let roundScore;
let activePlayer;
let gamePlaying;
let previousScore;

let	setScore = document.getElementById('set-score').value;

newGame();

function playTo(e) {
	newGame();
	setScore = e.srcElement.value;
}

function btnRoll() {
	if (gamePlaying) {
	//give a random number
		let dice0 = Math.floor(Math.random() * 6) + 1;
		let dice1 = Math.floor(Math.random() * 6) + 1;
		//display result
		let diceDOM0 = document.querySelector('.dice-0');
		let diceDOM1 = document.querySelector('.dice-1')
		diceDOM0.style.display = 'block';
		diceDOM1.style.display = 'block';
		diceDOM0.src = 'dice-' + dice0 + '.png';
		diceDOM1.src = 'dice-' + dice1 + '.png';
		console.log(activePlayer, dice0, dice1);
		//update round score IF rolled number != 1;
		// console.log(activePlayer, dice);
		if ((dice0 + dice1) === 12) {
			scores[activePlayer] = 0;
			document.querySelector('#score-' + activePlayer).textContent = 0;
			nextPlayer();
		} else if (dice0 !== 1 && dice1 !== 1) {
			//add score
			roundScore += dice0;
			roundScore += dice1;

			document.querySelector('#current-' + activePlayer).textContent = roundScore;
			// below resets the score if one dice, two sixes in a row
			//could have just set a variable equal to the value here then used the same sum conditional
			// if (dice === 6) {
			// 	previousScore = 6;
			// } else {
			// 	previousScore = 0;
			// }
		} else {
			//next player
			nextPlayer();
		}
	}
}

function btnHold() {
	if (gamePlaying) {
		//add current score to global score
		scores[activePlayer] += roundScore;
		//update the UI
		document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];
		//check if winner
		if (scores[activePlayer] >= setScore) {
			//the player wins
			// document.classList.add('winner');
			document.querySelector('#name-' + activePlayer).textContent = 'Winner';
			document.querySelector('.dice-0').style.display = 'none';
			document.querySelector('.dice-1').style.display = 'none';
			document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
			document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
			gamePlaying = false;
		} else {
			nextPlayer();
		}
	}
}

function nextPlayer() {
	activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
	roundScore = 0;

	document.getElementById('current-0').textContent = '0';
	document.getElementById('current-1').textContent = '0';

	document.querySelector('.player-0-panel').classList.toggle('active');
	document.querySelector('.player-1-panel').classList.toggle('active');

	document.querySelector('.dice-0').style.display = 'none';
	document.querySelector('.dice-1').style.display = 'none';
}

function newGame() {
	scores = [0, 0];
	roundScore = 0;
	activePlayer = 0;
	gamePlaying = true;

	document.querySelector('.dice-0').style.display = 'none';
	document.querySelector('.dice-1').style.display = 'none';


	document.getElementById('score-0').textContent = '0';
	document.getElementById('score-1').textContent = '0';
	document.getElementById('current-0').textContent = '0';
	document.getElementById('current-1').textContent = '0';
	document.getElementById('name-0').textContent = 'Player 1';
	document.getElementById('name-1').textContent = 'Player 2';
	document.querySelector('.player-0-panel').classList.remove('winner');
	document.querySelector('.player-1-panel').classList.remove('winner');
	document.querySelector('.player-0-panel').classList.remove('active');
	document.querySelector('.player-1-panel').classList.remove('active');
	document.querySelector('.player-0-panel').classList.add('active');
}

document.querySelector('.btn-roll').addEventListener('click', btnRoll);
document.querySelector('.btn-hold').addEventListener('click', btnHold);
document.querySelector('.btn-new').addEventListener('click', newGame);
document.querySelector('input').addEventListener('change', playTo);