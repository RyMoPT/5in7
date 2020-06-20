if ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window) {
    // speech recognition API supported
  } else {
    location.href = "sorry.html";
  }

  let isMobile = window.matchMedia("only screen and (max-width: 760px)").matches;

    if (isMobile) {
        location.href = "sorry.html";
    }
 

var modal = document.getElementById("myModal");

// Get the button that opens the modal
var btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];


// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

var loserAudio = new Audio("loser.mp3")
var winnerAudio = new Audio("winner.mp3")
var beep = new Audio("beepfull6s.mp3")

const container = document.querySelector('.container')

const startBtn = document.querySelector('.startBtn')
        startBtn.addEventListener('click',start)

//timer

var timeBegan = null
    , timeStopped = null
    , stoppedDuration = 0
    , started = null;

function startTimer() {
    if (timeBegan === null) {
        timeBegan = new Date();
    }

    if (timeStopped !== null) {
        stoppedDuration += (new Date() - timeStopped);
    }
    console.log(stoppedDuration);

    started = setInterval(clockRunning, 10);	
}

function stopTimer() {
    timeStopped = new Date();
    clearInterval(started);
}
 
function resetTimer() {
    clearInterval(started);
    stoppedDuration = 0;
    timeBegan = null;
    timeStopped = null;
    document.getElementById("display-area").innerHTML = "00:00:00.000";
}

function clockRunning(){
    var currentTime = new Date()
        , timeElapsed = new Date(currentTime - timeBegan - stoppedDuration)
        , hour = timeElapsed.getUTCHours()
        , min = timeElapsed.getUTCMinutes()
        , sec = timeElapsed.getUTCSeconds()
        , ms = timeElapsed.getUTCMilliseconds();

    document.getElementById("timer").innerHTML = 
        // (hour > 9 ? hour : "0" + hour) + ":" + 
        // (min > 9 ? min : "0" + min) + ":" + 
        (sec > 9 ? sec : "" + sec) + "." + 
        (ms > 99 ? ms : ms > 9 ? "0" + ms : "0" + ms);
};

// var counter = 0;
// var interval = setInterval(function(){
//       counter++;
// },1000)

let interval
let stopInterval = () => {
    clearInterval(interval)
}

let counter = 0

let oldArray = []
let newArray = []

    const questionsArray = [
        {
            question: "Name 5 foods that are yellow",
            answer: ["banana", "lemon", "corn", "squash", "pineapple", "acorn"]
        },
        {
            question: "Name 5 parts of your body that start with the letter A",
            answer: ["arms", "ankles", "abdomen", "adams apple", "armpit", "abs", "anus", "ass"]
        },
        {
            question: "Name 5 foods you crack before eating",
            answer: ["eggs", "peanuts", "crab", "lobster", "coconut", "fortune cookie"]
        },
        {
            question: "Name 5 organs",
            answer: ["brain", "heart", "lungs", "liver", "skin", "intestine", "bladder", "kidney", "stomach"]
        },
        {
            question: "Name 5 things that rhyme with butter",
            answer: ["flutter", "gutter", "mutter", "shutter", "clutter", "stutter", "cutter","nutter","scutter", "sputter", "shudder"]
        },
        {
            question: "Name 5 body parts that start with the letter H",
            answer: ["head", "heel", "hip", "hair", "hands", "hiney", "heal", "hare"]
        }
    ]

const pickRandom = () => {
    let listofQuestions = Object.keys(questionsArray)
    let randomQuestion = Math.floor(Math.random() * (listofQuestions.length))
    let chosenQuestion = questionsArray[randomQuestion].question;
    let chosenAnswer= questionsArray[randomQuestion].answer;
    return {
        chosenQuestion: chosenQuestion,
        chosenAnswer: chosenAnswer
    }
}


// const questiondisplay = document.createElement('div')
//             questiondisplay.classList.add('questiondisplay')
//             container.appendChild(questiondisplay)

    // const answer = ["dog","red","yellow","apple","boxes"];

        var recognition = new webkitSpeechRecognition();
        recognition.maxAlternatives = 10;

      
function start() {

            startBtn.style.display="none"

            if (document.querySelector('.timer')) {
                document.getElementById("timer").innerHTML = '';
            }
            
            let randomlyPicked = pickRandom()
            console.log(randomlyPicked.chosenQuestion)
            console.log(randomlyPicked.chosenAnswer)

            //if question container already exists, get rid of it. Need this to be able to apply
            //transition effect
            if (document.contains(document.querySelector('.questiondisplay'))) {
                container.removeChild(document.querySelector('.questiondisplay'))
            }
            if (document.contains(document.querySelector('.timer'))) {
                container.removeChild(document.querySelector('.timer'))
            }


            //creating question display dynamically so we can use css to add animation
            let questiondisplay = document.createElement('div')
            questiondisplay.classList.add('questiondisplay')
            container.appendChild(questiondisplay)
            questiondisplay.innerText = randomlyPicked.chosenQuestion

            setTimeout(startGame.bind(null, randomlyPicked.chosenAnswer), 3000)

            
        }


const startGame = (answer) => {
    
    const timer = document.createElement('div')
            timer.classList.add('timer')
            timer.setAttribute("id", "timer")
            container.appendChild(timer)
            startTimer();
            beep.play();

            let winner = false
            let counter = 0
            let interval = setInterval(()=>{
            counter++;
            console.log(counter)
            
            // console.log(counter)

            // timer.innerText=`Time passed ${counter}`

            if (counter >= 7) {
                clearInterval(interval)
                recognition.abort()
                stopTimer();
                resetTimer();

            }
                },1000)      

                 
            oldArray=[]

          recognition.start();
      
          recognition.onresult = function(event) {
            console.log(event)
            console.log(event.results[0])
            let words = event.results[0][0].transcript.toLowerCase()
            let wordsArray = words.split(" ")
            console.log(`The words that were heard were: ${wordsArray}`)

            let addingS = [...wordsArray]
            for (i = 0; i < addingS.length; i++) {
                addingS[i] = addingS[i].concat("s")
            }
            let removeS = [...wordsArray]
            for (i = 0; i < removeS.length; i++) {
                removeS[i] = removeS[i].slice(0,-1);
            }

            newArray = wordsArray.concat(addingS).concat(removeS).concat(oldArray)
            console.log(newArray)

            const intersection = answer.filter(element => newArray.includes(element));
            console.log(intersection)
            if (intersection.length === 5) {
                beep.pause();
                beep.currentTime = 0;
                winnerAudio.play()
                winner = true
                startBtn.style.display="initial";
                recognition.abort()
                resetTimer();
                return console.log("Winner winner chicken dinner")
                
                } 
        }

        recognition.onend = () => {
            oldArray = newArray
            // console.log(oldArray)
            // console.log(`counter is at ${counter}`)
            if (counter < 7 && winner === false) {
            recognition.start()
            // console.log('it stopped listening but starting again')
            // console.log(counter)
                    } if (counter === 7 & winner === false) {
                        // console.log('totally stopped listening')
                        recognition.stop()
                        loserAudio.play()
                        startBtn.style.display="initial";
                        }

            }
        
}