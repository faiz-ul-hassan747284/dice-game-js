/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/


var scores, roundScore, activePlayer;
scores = [0,0];
roundScore = 0;
var activePlayer = 0;
var winingScore = 100;
var prevSix = false;

//var dice = Math.floor(Math.random() * 6) +1;
//document.querySelector('#current-0').textContent = dice;
//document.querySelector('#current-' + activePlayer).textcontent = dice;
//document.querySelector('#current-' + activePlayer).innerHTML = '<em>' + dice + '</em>';

//var x = document.querySelector('#score-0').textContent;
//console.log(x);


document.querySelectorAll('.dice').forEach((dice)=>{dice.style.display = 'none'});
document.getElementById('score-0').textContent = '0';
document.getElementById('score-1').textContent = '0';
document.getElementById('current-0').textContent = '0';
document.getElementById('current-1').textContent = '0';

function btn(){

    //do something
}
btn();
//Event listener
document.querySelector('.btn-roll').addEventListener('click', function(){


    //1.random number
    var diceValue = [Math.floor(Math.random() * 6) +1,Math.floor(Math.random() * 6) +1];
    console.log(diceValue);

    //2.display the result
    var diceDOMAll = document.querySelectorAll('.dice');
    diceDOMAll.forEach((diceDOM, index)=>{
        diceDOM.style.display = 'block';
        diceDOM.src = 'dice-' + diceValue[index] + '.png';
        //3. update the round score IF the rolled number is not a 1
        if (diceValue[1]===6 || diceValue[0]===6){
            if (prevSix){
            scores[activePlayer]=0;
            roundScore=0;
            nextPlayer()}
            else{
                prevSix=true
            }
        }
        console.log(diceValue[activePlayer])
        if(diceValue[index] !== 1){
           //add score
           roundScore += diceValue[index];
            
           document.querySelector('#current-' + activePlayer).textContent = roundScore; 
           //document.getElementById('current-'+ activePlayer).textContent = roundScore; 
    
        } else{
          //next player 
           nextPlayer(); 
    
        }

    })
   
    
        

});
// document.querySelector('.btn-hold').addEventListener('click',function(){
//     window.location.reload(true)
// });

document.querySelector('.btn-hold').addEventListener('click',function(){
    //add current score to global score
    scores[activePlayer] += roundScore;

    //update the UI
    document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];
    
    //check if player won the game
    if(scores[activePlayer] >= winingScore){
        document.querySelector('#name-' + activePlayer).textContent = 'Winner!';
        document.querySelector('.dice').style.display = 'none';
        document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
        document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
    }
    else{
        //nextPlayer
        nextPlayer();
    }





});
document.querySelector('.input').addEventListener("keyup", function(event) {
    if (event.keyCode === 13) {
        event.preventDefault();
        winingScore=event.target.value
    }
})

function nextPlayer(){
        prevSix=false
         activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
        roundScore = 0;
        document.getElementById('current-0').textContent = '0';
        document.getElementById('current-1').textContent = '0';

        document.querySelector('.player-0-panel').classList.toggle('active');
        document.querySelector('.player-1-panel').classList.toggle('active');
        document.querySelectorAll('.dice').forEach((dice)=>{dice.style.display = 'none'});

}