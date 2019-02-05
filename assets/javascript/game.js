
var hangMan = {
    randomWord : ["Montgomery","Juneau","Phoenix","LittleRock","Sacramento","Denver","Hartford","Dover","Tallahassee","Atlanta","Honolulu","Boise","Springfield","Indianapolis","DesMoines","Topeka","Frankfort","BatonRouge","Augusta","Annapolis","Boston","Lansing","SaintPaul","Jackson","JeffersonCity","Helena","Lincoln","CarsonCity","Concord","Trenton","SantaFe","Albany","Raleigh","Bismarck","Columbus","OklahomaCity","Salem","Harrisburg","Providence","Columbia","Pierre","Nashville","Austin","SaltLakeCity","Montpelier","Richmond","Olympia","Charleston","Madison","Cheyenne"],
    lettersGuessed : "",
    wins : 0, 
    losses : 0,
    guessesRemaining : 8,
    isLetter: function (inputtxt) {
        var letters = /[A-Za-z]/;   //  /^[A-Za-z]+$/; 
        if(inputtxt.match(letters) && inputtxt.length==1){
            return true;
        }
        else {
            return false;
        }
    }, // End isLetter

    replaceAt: function(string, index, replace) {
        return string.substring(0, index) + replace + string.substring(index + 1);}, //Replace at
    
    resetGame: function() {
        hangMan.guessesRemaining = 8;
        txtGuessesRemaining.textContent = hangMan.guessesRemaining;
        
        wordToGuess = hangMan.randomWord[Math.floor(Math.random() * hangMan.randomWord.length)];
        wordToGuess = wordToGuess.toLowerCase();
        txtWordToGuess.textContent=wordToGuess; 
        
        txtWins.textContent=hangMan.wins;
        
        txtLosses.textContent=hangMan.losses;
        txtWordUncovered.textContent="";
        
        for (var i=0; i < wordToGuess.length; i++) { 
            txtWordUncovered.textContent=txtWordUncovered.textContent+"_";  } 
        tempWord = txtWordUncovered.textContent;
        
        hangMan.lettersGuessed="";
        txtLettersGuessed.textContent=hangMan.lettersGuessed;
        
        console.log(tempWord);
    }


} // hangMan





// Chose word from possible words and convert to lower case
var wordToGuess = hangMan.randomWord[Math.floor(Math.random() * hangMan.randomWord.length)];
var txtWordToGuess =document.getElementById("_wordToGuess");
var txtLettersGuessed = document.getElementById("_lettersGuessed");
var txtGuessesRemaining = document.getElementById("_guessesRemaining");
var txtWordUncovered = document.getElementById("_wordUncovered");
var txtWins = document.getElementById("_wins");
var txtLosses = document.getElementById("_losses");
var tempWord 


// reset the game / load initial values on 
document.addEventListener("DOMContentLoaded", function() {
    hangMan.resetGame();
    });

document.onkeyup = function(event) {
    var UserGuess = event.key;
    if (hangMan.isLetter(UserGuess)){
        UserGuess = UserGuess.toLowerCase();
        
        if ( hangMan.lettersGuessed.search(UserGuess) == -1) {
          
            hangMan.lettersGuessed = hangMan.lettersGuessed + UserGuess;
            txtLettersGuessed.textContent = hangMan.lettersGuessed;  
          
            txtGuessesRemaining.textContent = hangMan.guessesRemaining;

           //determine if guess is in target
            if(wordToGuess.search(UserGuess) !== -1 ) {             
                               
                // loop through and check each character, relace "_" if needed
                for(var i=0; i<wordToGuess.length; i++) {            
                    if(wordToGuess.charAt(i)==UserGuess) {
                        tempWord = hangMan.replaceAt(tempWord,i,UserGuess);   
                    }
                }
                txtWordUncovered.textContent=tempWord;
                
                if(tempWord==wordToGuess){
                    hangMan.wins=hangMan.wins+1;
                    txtWins.textContent=hangMan.wins;
          //          hangMan.guessesRemaining=0;
                    alert("YOU WIN")
                    setTimeout(() => {
                        hangMan.resetGame();    
                    }, 1000);
           
                 }
            }
            
        else if (hangMan.guessesRemaining !== 0) {
            hangMan.guessesRemaining = hangMan.guessesRemaining-1;
            txtGuessesRemaining.textContent = hangMan.guessesRemaining;
            if (hangMan.guessesRemaining == 0) {
                hangMan.losses=hangMan.losses+1;
                txtLosses.textContent=hangMan.losses;                
                alert("GAME OVER");
                hangMan.resetGame();
            }
        }
     
        } // end 
    }  //end check for is letter
  //  else {
  //      console.log("Not a letter");
  //  }
} // End document.onkeyup...

