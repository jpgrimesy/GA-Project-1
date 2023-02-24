//WORD BANK
const movies = ['THE MATRIX', 'THE GODFATHER', 'BACK TO THE FUTURE', 'A GOOFY MOVIE', 'EVERYTHING EVERYWHERE ALL AT ONCE', 'RAIDERS OF THE LOST ARK', 'PULP FICTION', 'VANILLA SKY', 'SUPERBAD', 'DUMB AND DUMBER']
const dogs = ['YORKSHIRE TERRIER', 'LABRADOR RETRIEVER', 'SIBERIAN HUSKY', 'POMERANIAN', 'CHIHUAHUA', 'FRENCH BULLDOG', 'GOLDENDOODLE', 'DALMATIAN', 'GERMAN SHEPHERD', 'DACHSHUND']
const fastFood = ['IN N OUT', 'MCDONALDS', 'TACO BELL', 'POPEYES', 'ARBYS', 'JACK IN THE BOX', 'EL POLLO LOCO', 'WENDYS','WHATABURGER', 'THE HABIT']
const monuments = ['COLLOSEUM', 'STATUE OF LIBERTY', 'PYRAMIDS OF GIZA', 'TAJ MAHAL', 'EIFFEL TOWER', 'GREAT WALL', 'SYDNEY OPERA HOUSE', 'BIG BEN', 'PARTHENON', 'MOUNT FUJI']
const famousPeople = ['KEANU REEVES', 'JOE ROGAN', 'NIELS DEGRASSE TYSON', 'ELON MUSK', 'STEVE JOBS', 'AUDREY HEPBURN', 'TOM BRADY', 'KOBE BRYANT', 'HARRY STYLES', 'RIHANNA']
const allWords =  [movies, dogs, fastFood, monuments, famousPeople]



function randomNum(arr) {
 return Math.floor(Math.random() * arr.length)
}
//element grabs
const currentTopic = document.querySelector('.topic-bank');
const topicBtns = document.querySelectorAll('#modal-textbox button')
const moviesBtn = document.getElementById('movies')
const modal = document.getElementById('modal')
const winLose = document.getElementById('win-lose-modal')
const winLoseText = document.getElementById('win-lose-modal-textbox')
const lose = document.getElementById('lose-modal')
const word = document.querySelector('.word')
const buttons = document.querySelectorAll('.letters-container button')
const usedLetters = document.querySelector('.ul-bank')
const hangmanImgs = document.querySelectorAll('.hangman-img img')
const playAgainBtn = document.getElementById('play-again-btn')
//global elements
let currentWord='';
let missed = 0;
let correct = 0;
let winTotal = 0;

const openModal = () => {
    modal.style.display = 'block'
}
const winLoseModal = () => {
    winLose.style.display = 'block'
}
//button functions

//picks random work based on choice
topicBtns.forEach (button => {
    button.addEventListener('click', (e) => {
        let topic = e.target.getAttribute('id')
        if (topic.length > 4) {
            let randFirstIdx = randomNum(allWords)
            currentWord = allWords[randFirstIdx][randomNum(allWords[randFirstIdx])]
            isTopicEmpty(randFirstIdx)
            if (topic === 'random') {
                currentTopic.innerText = topicBtns[randFirstIdx].innerText
            } else {
                currentTopic.innerText = e.target.innerText
            }
        } else {
            currentWord = allWords[topic.length][randomNum(allWords[topic.length])]
            isTopicEmpty(topic.length)
            currentTopic.innerText = e.target.innerText
        }
        modal.style.display = 'none';
        dashCreate()
    })
})
playAgainBtn.addEventListener('click', () => {
    buttons.forEach(button => {
        button.style.display = 'inline'
    })
    hangmanImgs.forEach(img => {
        img.style.display = 'none'
    })
    word.innerText = '';
    usedLetters.innerText = '';
    currentTopic.innerText = '';
    currentWord = ''
    missed = 0;
    correct = 0;
    winTotal = 0;
    winLose.style.display = 'none'
    openModal()
})
//sorts through allSpan array by id and replace underscore with matche letter id
buttons.forEach(button => {
    button.addEventListener('click', function(event) {
        let id = event.target.getAttribute('id')
        let allSpan = document.querySelectorAll('span')
        let isRight = false
        allSpan.forEach(letter => {
            if (letter.id === id) {
              letter.innerText = id
              correct++
              isRight = true 
            } 
        })
        checkRight(isRight)
        addToUsed(id)
        event.target.style.display = 'none'
    }) 
})
//creates array of single word
function dashCreate() {
    let word = document.querySelector('.word')
    let wordSplit = currentWord.split('')
    wordSplit.forEach((letter) => {
        let dashed = document.createElement('span')
        if (letter !== ' ') {
            dashed.setAttribute('id', letter)
        dashed.innerText = '_'
        word.append(dashed)
        winTotal++
        } else {
            dashed.innerText = ' ';
            word.append(dashed)
        }
    })
}
function addToUsed(letter) {
    if (usedLetters.innerText !== '') {
        usedLetters.innerText += ', ' + letter
    } else {
        usedLetters.innerText  += letter
    }
}
//checks win/lose condition
function checkRight(bool) {
    let previous = hangmanImgs[missed - 1]
    if(!bool) {
        if(missed === 0) {
            hangmanImgs[missed].style.display = 'block'
            missed++
        } else if(missed === 9) {
            previous.style.display = 'none'
            hangmanImgs[missed].style.display = 'block'
            winLoseText.innerText = 'YOU LOSE!'
            setTimeout(winLoseModal, 1000)
        } else {
        previous.style.display = 'none'
        hangmanImgs[missed].style.display = 'block'
        missed++
        }
    } else {
        if(correct === winTotal) {
            winLoseText.innerText = 'YOU WIN!'
            setTimeout(winLoseModal, 500)
        }
    }
}
function isTopicEmpty(idx) {
    let currentIdx = allWords[idx].indexOf(currentWord)
    if(currentIdx !== -1) {
        allWords[idx].splice(currentIdx, 1)
    } else {
        window.location.reload()
    }
}
setTimeout(openModal, 1000)