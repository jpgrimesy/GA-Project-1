class Spaceship {
    constructor() {
        this.hull = 20;
        this.firepower = 5;
        this.accuracy = .7;
    }
    attack() {
        if(Math.random() <= this.accuracy) {
            return true;
        } else {
            return false;
        }
    }
}
class Megaship extends Spaceship {
    constructor() {
        super();
        this.weaponPods = randomRange(2, 4)
    }
}
class Shwarz extends Spaceship {
    constructor() {
        super();
        this.missiles = 2;
    }
}
class Weaponpod {
    constructor() {
        this.hull = 5;
    }
}

const yourShip = new Shwarz();
let enemies = []
let megaArr = []
let podsArr = []
let score = 0;
let hMedals = 0;
let fMedals = 0;
let aMedals = 0;
let wave = 0;

function randomRange(min, max) {
    if (max < 1) {
        let num = Math.random() * (max - min) + min;
        return parseFloat(num.toFixed(1))
    } else {
        let num = Math.floor(Math.random() * ((max + 1) - min) + min);
        return num
    }
}

function enemyGen() {
    let enemyCount = 6;
    while (enemyCount > 0) {
        const alienShip = new Spaceship();
        generateAlienStats(alienShip)
        alienShip.id = enemyCount;
        enemies.push(alienShip)
        enemyCount--;
    }
}
function enemyGenPlus() {
    let enemyCount = randomRange(6, 10);
    while (enemyCount > 0) {
        const alienShip = new Spaceship();
        generateAlienStats(alienShip)
        alienShip.id = enemyCount;
        enemies.push(alienShip)
        beefUp('alienPlus', alienShip)
        enemyCount--;
    }
    const megaShip = new Megaship()
    generateAlienStats(megaShip)
    megaArr.push(megaShip)
    podGen()
    if (wave > 1) {
        beefUp('megaPlus',megaShip)
    }
}
function podGen() {
    let totPods = megaArr[0].weaponPods;
    while (totPods > 0) {
        const pod = new Weaponpod();
        podsArr.push(pod);
        totPods--;
    }
}

function resetStats() {
    yourShip.hull = 20 + wave;
    yourShip.firepower = 5 + wave;
    yourShip.accuracy = .7;
    yourShip.missiles = 2;
    medalCheck()
}
function generateAlienStats(alien) {
    alien.hull = randomRange(3, 6);
    alien.firepower = randomRange(2, 4);
    alien.accuracy = randomRange(.6, .8); 
}

function beefUp(stat, ship) {
    if (stat === 'alienPlus') {
        ship.hull = ship.hull + randomRange(2, 4) + (wave - 1)
        ship.firepower = ship.firepower + randomRange(1, 2) + (wave - 1)
    } else if (stat === 'megaPlus') {
        ship.weaponPods + (wave - 1);
        beefUp('alienPlus', ship);
    } else if (stat === 'yourStats') {
        yourShip.hull = yourShip.hull + randomRange(8, 13) + (wave - 1);
        yourShip.firepower = yourShip.firepower + randomRange(1, 3) + (wave - 1);
        yourShip.missiles = yourShip.missiles + randomRange(1, 2) + (wave - 1);
        console.log(`Professor Frink's team has re-equiped you with ${yourShip.missiles} missiles and have upgraded your ship! Your lasers now do ${yourShip.firepower} damage!\nThey also managed to run the ship under the Shield-O-Matic(patent pending) and increased your shields to ${yourShip.hull} durability`)
    } else if (stat === 'hull') {
        yourShip.hull = yourShip.hull + (6 * hMedals);
        console.log(`You now have ${yourShip.hull} durability!`)
    } else if (stat === 'fire') {
        yourShip.firepower = yourShip.firepower + (3 * fMedals)
        console.log(`You now give out ${yourShip.firepower} damage!`)
    } else if (stat === 'acc') {
        yourShip.accuracy = ((yourShip.accuracy * 10) + 1) / 10
        console.log(`You now have ${yourShip.accuracy * 100}% accuracy!`)
    }
}

function attackEnemy() {
    if (yourShip.attack() === true) {
        enemies[currentIdx].hull -= yourShip.firepower;
        if(enemies[currentIdx].hull > 0) {
            laserHit()
            setTimeout(()=> popText('HIT!'), 700)
            setTimeout(attackYou, 1200)
        } else {
            defeatEnemy()
            score++
            setTimeout(()=> popText('Obliterated!'), 700)
            setTimeout(()=>{
                updateScore()
                checkEnemyCount()
                hero.setAttribute('id', 'hero-idle')
                currEnmyContainer.innerHTML = ''

            }, 1000)
        }
    } else {
        laserMiss()
        setTimeout(()=> popText('missed!', 'red'), 500)
        setTimeout(attackYou, 1200)
    }
}

function attackMegaShip (enemy, pod) {
    if(yourShip.attack() === true) {
        if(podsArr.length > 0) {
            pod.hull -= yourShip.firepower
            console.log('You damaged a weapon pod!')
        } else {
            enemy.hull -= yourShip.firepower
            console.log('You hit the MEGA SHIP!')
        }
    } else {
        console.log('The MEGA SHIP wasn\'t affected by your guns!')
    }
    checkMegaStatus(enemy, pod)
}
function missileAttack(enemy) {
    if(yourShip.attack() === true) {
        enemy.hull -= 20;
        console.log('***BOOM-SHAKALAKA***')
    } else {
        console.log('OH SNAP! The alien applied counter measures!')
    }
    yourShip.missiles --;
    if (yourShip.missiles > 0) {
        console.log(`You have ${yourShip.missiles} missile(s) left`)
    } else {
        console.log('You\'re out of missiles!')
    }
    checkEnemyStatus(enemy)
}
function megaMissleAtt(enemy, pod) {
    console.clear()
    if (yourShip.attack() === true) {
        if(podsArr.length > 0) {
            pod.hull -= 20
            console.log('You hit its weapon pod!')
        } else {
            enemy.hull -= 20
        }
    } else {
        console.log('The MEGA SHIP took your missile and spit it out! Waahhh??!!')
    }
    yourShip.missiles--;
    if (yourShip.missiles > 0) {
        console.log(`You have ${yourShip.missiles} missile(s) left`)
    } else {
        console.log("You're out of missiles!")
    }
    checkMegaStatus(enemy, pod)
}
function megaAttack(enemy, pod) { 
    if (enemy.attack() === true) {
        yourShip.hull -= enemy.firepower + enemy.weaponPods
        console.log(`Something bit you! You got hit for ${enemy.firepower + enemy.weaponPods} damage! Sheeeeesh! You've got ${yourShip.hull} hits left on your shields!`)
    } else {
        console.log('You managed to avoid its mega-lasers!')
    }
    statusAgainstMega(enemy, pod)
}
function attackYou() {
   if(enemies[currentIdx].attack() === true) {
        yourShip.hull -= enemies[currentIdx].firepower;
        if(yourShip.hull > 0) {
            enemyHit()
            critRoll()
            setTimeout(()=>{
                updateHealth()
                popText(`HIT!
                        -${enemies[currentIdx].firepower}
                            `, 'red')
            }, 700)
        } else {
            defeated()
        }
    } else {
        enemyMiss()
        checkYourStatus()
        setTimeout(()=> popText('missed!'), 800)
    }
}
function critRoll() {
    if (Math.random() <= 0.2) {
        setTimeout(()=> popText('ALIEN REGULATION!', 'red'), 200)
        setTimeout(attackYou, 1200)
    } else {
        checkYourStatus()
    }
}

function checkYourStatus() {
    if(yourShip.hull > 0) {
        setTimeout(attackEnemy, 1200)
    } else {
        gameOver()
    }
}
function checkMegaStatus(enemy, pod) {
    if (enemy.hull > 0 && pod.hull > 0) {
        megaAttack(enemy, pod)
    } else if (enemy.hull > 0 && pod.hull <= 0) {
        if (enemy.weaponPods > 1) {
        console.log(`You destroyed a weapon pod! There are ${enemy.weaponPods} left!`)
        enemy.weaponPods--;
        podsArr.shift()
        megaAttack(enemy, pod)
        } else {
            console.log('You destroyed all weapon pods!')
            enemy.weaponPods--;
            podsArr.shift()
            megaAttack(enemy, pod)
        }
    } else if (enemy.hull > 0 && podsArr.length === 0) {
        megaAttack(enemy, pod)
    } else {
        console.log('YOU DID IT! YOU DESTROYED THE MEGA SHIP AND THE REST OF THE WAVE!')
        score += 3
        megaArr.pop()
        anotherWave()
    }
}
function statusAgainstMega(enemy, pod) {
    if (yourShip.hull > 0) {
        if (yourShip.missiles > 0) {
            askMegaMissile(enemy, pod)
        } else {
            attackMegaShip(enemy, pod)
        }
    } else {
        gameOver()
    }
}

//status checks
function checkEnemyCount() {
    fleetArr = document.querySelectorAll('.alien-fleet img')
    let enemyCount = fleetArr.length
    if(enemyCount > 0) {
        setTimeout(pickAlien, 400)
    } else if(enemies.length === 0 && megaArr.length > 0) {
        logMShip()
        console.log(`DUN! DUN! DUN!\nTHE MEGA SHIP HAS ARRIVED!\nAre you ready for this? (Y)es (N)o\n[shields: ${yourShip.hull}]`)
        while(true) {
            let userInput = prompt('')
            if (userInput.toLowerCase() === 'y') {
                if(yourShip.missiles > 0) {
                    askMegaMissile(megaArr[0], podsArr[0])
                } else {
                    console.clear()
                    attackMegaShip(megaArr[0], podsArr[0])
                }
            } else if (userInput.toLowerCase() === 'n') {
                console.log('The MEGA SHIP blew up the White House ID4 style and Earth has been taken over! But there still might be a chance!')
                continueScreen();
                resetGame();
            }
        }
    } else {
        setTimeout(()=>{
            clearScreen()
            continueScreen()
        }, 400)
    }
}
//score awards system
function checkScore() {
    let totalMedals = aMedals + hMedals + fMedals
    if (score >= 10 && totalMedals === 0) {
        console.log(`You have received a Medal for Marksmanship!\nYou have a choice of what it will improve: `)
        askUpgrade()
    } else if (score >= 20 && totalMedals === 1) {
        console.log(`You have received another medal! The Medal for Sandracing!\nWhat will it improve?`)
        askUpgrade()
    } else if (score >= 30 && totalMedals === 2) {
        console.log(`You did it! You have received the ultimate honor! A statue of Keanua Reeves!\nHow will it improve your ship?`)
        askUpgrade()
    }
}
function medalCheck() {
    if (hMedals > 0) {
        yourShip.hull = yourShip.hull + (6 * hMedals);
    } else if (fMedals > 0) {
        yourShip.firepower = yourShip.firepower + (3 * fMedals)
    } else if (aMedals > 0) {
        yourShip.accuracy = ((yourShip.accuracy * 10) + aMedals) / 10
    }
}
function askUpgrade() {
    while(true) {
        console.log('Improve (H)ealth, (F)irepower, or (A)accuracy?')
        let userInput = prompt('')
        if(userInput.toLowerCase() === 'h') {
            hMedals++;
            beefUp('hull')
            break
        } else if (userInput.toLowerCase() === 'f') {
            fMedals++;
            beefUp('fire')
            break
        } else if (userInput.toLowerCase() === 'a') {
            aMedals++;
            beefUp('acc')
            break
        }
    }
}
//missile prompt
function askMissile(enemy) {
    while(true) {
        console.log(`Would you like to use your missile? (Y)es or (N)o [missiles: ${yourShip.missiles}]`)
        let userInput = prompt('')
        if (userInput.toLowerCase() === 'y') {
            console.clear()
            missileAttack(enemy)
        } else if (userInput.toLowerCase() === 'n') {
            console.clear()
            attackEnemy(enemy)
        }
    }
}
function askMegaMissile(enemy, pod) {
    while(true) {
        console.log(`Would you like to you use a missile? (y)es or (n)o [missiles: ${yourShip.missiles}] `)
        let userInput = prompt('')
        if (userInput === 'y') {
            megaMissleAtt(enemy, pod)
        } else if (userInput === 'n') {
            attackMegaShip(enemy, pod)
        }
    }
}
function anotherWave() {
    console.log('However, another wave is incoming!\nAre you thirsty for more?');
    while(true) {
        let userInput = prompt('')
        if (userInput.toLowerCase() === 'y') {
            console.clear();
            console.log(`Current Score: ${score}\nYou head back to your base to reload, recharge and get ready`);
            wave++;
            resetStats();
            beefUp('yourStats');
            enemyGenPlus();
            checkScore();
            pressEnter();
            chooseEnemy();
        }
    }
}
function resetGame() {
    score = 0;
    hMedals = 0;
    aMedals = 0;
    fMedals = 0;
    wave = 0;
    enemies = [];
    megaArr = [];
    podsArr = [];
    resetStats();
    startGame()
}
function gameOver() {
    console.log(`GAME OVER\nYour score: ${score}\nTake the Deloreon to 88 and try again? (Y)es or (N)o`)
        while(true) {
        let userInput = prompt('')
        if(userInput === 'y') {
            resetGame();
        } else if(userInput ==='n') {
            console.log('WE ARE DOOMED! THANKS FOR NOTHING!')
            continueScreen()
        }
    }
}
function clearScreen() {
    document.querySelector('.score').innerHTML = '';
    document.querySelector('.hero-ship').innerHTML = '';
    document.querySelector('.hero-stats').innerHTML = '';
    document.querySelector('.stat-img-container').innerHTML = '';
    document.querySelector('.row-1-hlth').innerHTML = '';
    document.querySelector('.row-2-hlth').innerHTML = '';
    rowOneHealth.classList.remove('appear');
    rowTwoHealth.classList.remove('appear');
}
const prompt = document.querySelector('.text-container')
const shootStart = document.querySelector('.shoot-start')
const alienFleet = document.querySelector('.alien-fleet')
const rowOne = document.querySelector('.row-1')
const rowTwo = document.querySelector('.row-2')
const rowOneHealth = document.querySelector('.row-1-hlth')
const rowTwoHealth = document.querySelector('.row-2-hlth')
const laserOne = document.querySelector('.laser-one')
const laserTwo = document.querySelector('.laser-two')
const enemyLaser = document.querySelector('.enemy-laser')
const currEnmyContainer = document.querySelector('.main-alien')
let newPrompt = document.createElement('div')
let rowOneArr = []
let rowTwoArr = []
let fleetArr = []
let spans = []
let currentHealth = yourShip.hull
let currentAlien;
let currentIdx;
let hero;
function makeAlien() {
    enemies.forEach(ship => {
        let alienShip = document.createElement('img')
        let alienHull = document.createElement('span')
        alienShip.setAttribute('src', 'images/alien-ship.png')
        alienShip.setAttribute('class', 'fleet-ship')
        alienShip.setAttribute('id', `${enemies.indexOf(ship)}`)
        alienHull.innerText = `hull: ${ship.hull} `
        if(enemies.indexOf(ship) <= 4) {
            rowOne.append(alienShip)
            rowOneHealth.append(alienHull)
            rowOneArr = document.querySelectorAll('.row-1 img')
            setTimeout(hullAppear, 2000)
        } else {
            rowTwo.append(alienShip)
            rowTwoHealth.append(alienHull)
            rowTwoArr = document.querySelectorAll('.row-2 img')
            setTimeout(hullAppear, 2000)
        }
    })
    fleetArr = document.querySelectorAll('.alien-fleet img')
    spans = document.querySelectorAll('span')
    setTimeout(pickAlien, 2200)
}

function enableSelect() {
    fleetArr.forEach(ship => {
        ship.style.pointerEvents = 'auto'
        ship.addEventListener('click', () => {
            let shipIdx = ship.id
            currentIdx = shipIdx
            spans[shipIdx].style.display = 'none'
            ship.classList.add('move-down')
            prompt.innerHTML = ''
            console.log('enableselect')
            if(shipIdx <= 4) {
                rowOneHealth.style.display = 'none'
                moveAngle(rowOneArr, ship)
                setTimeout(()=> {
                    changeMain(ship)
                    rowOneArr = document.querySelectorAll('.row-1 img')
                    rowOneHealth.style.display = 'inline'
                }, 600)
            } else {
                rowTwoHealth.style.display = 'none'
                moveAngle(rowTwoArr, ship)
                setTimeout(()=> {
                    changeMain(ship)
                    rowTwoArr = document.querySelectorAll('.row-2 img')
                    rowTwoHealth.style.display = 'inline'
                }, 500)
            }
            disableSelect()
            setTimeout(firePrompt, 1500)
        })
    })
}
function disableSelect() {
    fleetArr.forEach(ship => ship.style.pointerEvents = 'none')
}
function hullAppear() { 
    rowOneHealth.classList.add('appear')
    rowTwoHealth.classList.add('appear')
}
function moveAngle(arr, ship) {
    let shipId = parseInt(ship.id)
    let rowArr = [...arr]
    let length = rowArr.length
    let rowIdx = rowArr.indexOf(ship)
    let moveDown  = document.querySelector('.move-down')
    if(shipId <= 4){
        if(length === 5 && rowIdx === 2 || length === 3 && rowIdx === 1 || length === 1) {
            moveDown.style.transform = 'translate(0, 200%) scale(1.33)'
        } else if(length === 5 && rowIdx === 1 || length === 3 && rowIdx === 0) {
            moveDown.style.transform = 'translate(85%, 200%) scale(1.33)'
        } else if(length === 5 && rowIdx === 3 || length === 3 && rowIdx === 2) {
            moveDown.style.transform = 'translate(-85%, 200%) scale(1.33)'
        } else if(length === 4 && rowIdx === 1 || length === 2 && rowIdx === 0) {
            moveDown.style.transform = 'translate(45%, 200%) scale(1.33)'
        } else if(length === 4 && rowIdx === 2 || length === 2 && rowIdx === 1) {
            moveDown.style.transform = 'translate(-45%, 200%) scale(1.33)'
        } else if(length === 5 && rowIdx === 0) {
            moveDown.style.transform = 'translate(140%, 200%) scale(1.33)'
        } else if(length === 5 && rowIdx === 4) {
            moveDown.style.transform = 'translate(-140%, 200%) scale(1.33)'
        } else if(length === 4 && rowIdx === 0) {
            moveDown.style.transform = 'translate(120%, 200%) scale(1.33)'
        } else if(length === 4 && rowIdx === 3) {
            moveDown.style.transform = 'translate(-120%, 200%) scale(1.33)'
        }
    } else {
        if(length === 5 && rowIdx === 2 || length === 3 && rowIdx === 1 || length === 1) {
            moveDown.style.transform = 'translate(0, 130%) scale(1.33)'
        } else if(length === 5 && rowIdx === 1 || length === 3 && rowIdx === 0) {
            moveDown.style.transform = 'translate(85%, 130%) scale(1.33)'
        } else if(length === 5 && rowIdx === 3 || length === 3 && rowIdx === 2) {
            moveDown.style.transform = 'translate(-85%, 130%) scale(1.33)'
        } else if(length === 4 && rowIdx === 1 || length === 2 && rowIdx === 0) {
            moveDown.style.transform = 'translate(45%, 130%) scale(1.33)'
        } else if(length === 4 && rowIdx === 2 || length === 2 && rowIdx === 1) {
            moveDown.style.transform = 'translate(-45%, 130%) scale(1.33)'
        } else if(length === 5 && rowIdx === 0) {
            moveDown.style.transform = 'translate(140%, 130%) scale(1.33)'
        } else if(length === 5 && rowIdx === 4) {
            moveDown.style.transform = 'translate(-140%, 130%) scale(1.33)'
        } else if(length === 4 && rowIdx === 0) {
            moveDown.style.transform = 'translate(120%, 130%) scale(1.33)'
        } else if(length === 4 && rowIdx === 3) {
            moveDown.style.transform = 'translate(-120%, 130%) scale(1.33)'
        }
    }
}
function changeMain(ship) {
    document.querySelector('.main-alien').appendChild(ship);
    ship.style.removeProperty('transform')
    ship.setAttribute('id', 'current-enemy')
}
function laserMiss() {
    laserOne.style.display = 'inline'
    laserTwo.style.display = 'inline'
    laserOne.setAttribute('id', 'laser-one-miss')
    laserTwo.setAttribute('id', 'laser-two-miss')
    setTimeout(() => {
        document.querySelector('.main-alien img').setAttribute('id', 'enemy-dodge')
    }, 400)
    setTimeout(() => {
        laserOne.style.display = 'none'
        laserTwo.style.display = 'none'
        laserOne.removeAttribute('id')
        laserTwo.removeAttribute('id')
        currentAlien.removeAttribute('id')
    }, 1000)
}
function firePrompt() {
    currentAlien = document.querySelector('.main-alien img')
    newPrompt.classList.add('prompt')
    newPrompt.innerHTML = '<p>FIRE!</p><img id="fire-btn" src="images/fire.png">'
    prompt.append(newPrompt)
    document.querySelector('.prompt img').addEventListener('click', () => {
    document.querySelector('.text-container').innerHTML = '';
    console.log('fireprompt')
    document.getElementById('current-enemy').removeAttribute('id')
    document.getElementById('hero-idle').removeAttribute('id')
    attackEnemy()
    })
}
function pickAlien() {
    let ask = document.createElement('div')
    ask.classList.add('choose')
    ask.innerHTML = '<img id="arrow" src="images/up-arrow.png"><br /><br /><span>Please choose enemy</span>'
    prompt.append(ask)
    enableSelect()
}
function startGame() {
    let space = document.createElement('h1')
    let battle = document.createElement('h1')
    let next = document.createElement('p')
    let startBtn = document.createElement('img')
    let heroShip = document.createElement('img')
    let heroContainer = document.querySelector('.hero-ship')
    space.classList.add('title')
    space.innerText = 'SPACE'
    prompt.append(space)
    setTimeout(() => {
        battle.classList.add('title')
        battle.innerText = 'BATTLE'
        prompt.append(battle)
    }, 600)
    setTimeout(() => {
        next.classList.add('blink')
        next.innerText = 'press start to launch'
        startBtn.setAttribute('src', 'images/start-button.png')
        startBtn.setAttribute('id', 'start-btn')
        startBtn.style.width = '100px'
        prompt.append(next)
        prompt.append(startBtn)
    }, 1300)
    startBtn.addEventListener('click', () => {
        prompt.innerHTML = ''
        heroShip.setAttribute('src', 'images/space-ship.png')
        heroShip.setAttribute('id', 'enter-ship')
        heroContainer.append(heroShip)
        hero = document.querySelector('.hero-ship img')
        createStats()
        setTimeout(() => {
            heroShip.removeAttribute('id')
            heroShip.setAttribute('id', 'hero-idle')
            enemyApproach()
        }, 2200)
    })
}

function createStats() {
    let healthImg = document.createElement('img')
    let firepowerImg = document.createElement('img')
    let missileImg = document.createElement('img')
    let healthTxt = document.createElement('p')
    let firepowerTxt = document.createElement('p')
    let missileTxt = document.createElement('p')
    let yourScore = document.createElement('p')

    healthImg.setAttribute('src', 'images/health.png')
    healthImg.setAttribute('id', 'health-img')
    firepowerImg.setAttribute('src', 'images/firepower.png')
    firepowerImg.setAttribute('id', 'firepower-img')
    missileImg.setAttribute('src', 'images/missile.png')
    missileImg.setAttribute('id', 'missile-img')
    document.querySelector('.stat-img-container').append(healthImg, firepowerImg, missileImg)
    healthTxt.innerText = `= ${yourShip.hull}`
    healthTxt.setAttribute('id', 'health-txt')
    firepowerTxt.innerText = `= ${yourShip.firepower}`
    firepowerTxt.setAttribute('id', 'firepower-txt')
    missileTxt.innerText = `= ${yourShip.missiles}`
    missileTxt.setAttribute('id', 'missile-txt')
    document.querySelector('.hero-stats').append(healthTxt, firepowerTxt, missileTxt)
    yourScore.innerText = `score: ${score}`
    yourScore.setAttribute('id', 'current-score')
    document.querySelector('.score').append(yourScore)
}
function enemyApproach() {
    let enemyPrompt = document.createElement('div')
    enemyGen()
    enemyPrompt.classList.add('prompt')
    enemyPrompt.innerHTML = `<h1 class="blink">WARNING!!!</h1><p>${enemies.length} ships are approaching!<p>click continue to welcome aliens to Earth</p><img src='images/next.png'>`
    prompt.append(enemyPrompt)
    document.querySelector('.prompt img').addEventListener('click', () => {
        prompt.innerHTML = ''
        makeAlien()
    })
}
function laserHit() {
    laserOne.style.display = 'inline'
    laserTwo.style.display = 'inline'
    laserOne.setAttribute('id', 'laser-one-hit')
    laserTwo.setAttribute('id', 'laser-two-hit')
    setTimeout(() => {
        laserOne.setAttribute('src', 'images/explosion.png')
        laserTwo.setAttribute('src', 'images/explosion.png')
        laserOne.setAttribute('id', 'hit-explode-one')
        laserTwo.setAttribute('id', 'hit-explode-two')
        document.querySelector('.main-alien img').setAttribute('id', 'enemy-hit')
    }, 700)
    setTimeout(() => {
        document.querySelector('.main-alien img').removeAttribute('id')
        laserOne.removeAttribute('id')
        laserTwo.removeAttribute('id')
        laserOne.style.display = 'none'
        laserTwo.style.display = 'none'
        laserOne.setAttribute('src', 'images/laser.png')
        laserTwo.setAttribute('src', 'images/laser.png')
    }, 1300)
}   
function enemyMiss() {
    enemyLaser.setAttribute('id', 'enemy-miss')
    setTimeout(() => {
        hero.setAttribute('id', 'ship-dodge')
    }, 300)
    setTimeout(() => {
        enemyLaser.removeAttribute('id')
        hero.removeAttribute('id')
    }, 1000)
}

function enemyHit() {
    enemyLaser.setAttribute('id', 'ship-hit')
    setTimeout(() => {
        enemyLaser.setAttribute('src', 'images/explosion.png')
        enemyLaser.setAttribute('id', 'hit-explode')
        hero.setAttribute('id', 'enemy-hit')
    }, 700)
    setTimeout(() => {
        hero.removeAttribute('id')
        enemyLaser.setAttribute('src', 'images/alien-laser.png')
    }, 1300)
}
function defeatEnemy() {
    laserOne.style.display = 'inline'
    laserTwo.style.display = 'inline'
    laserOne.setAttribute('id', 'laser-one-hit')
    laserTwo.setAttribute('id', 'laser-two-hit')
    setTimeout(()=>{
        laserOne.style.display = 'none'
        laserTwo.style.display = 'none'
        document.querySelector('.main-alien img').setAttribute('src', 'images/explosion.png')
        document.querySelector('.main-alien img').setAttribute('id', 'explode')
    }, 700)
} 
function defeated() {
    enemyLaser.setAttribute('id', 'ship-hit')
    setTimeout(()=>{
        enemyLaser.style.display = 'none'
        hero.setAttribute('src', 'images/explosion.png')
        hero.setAttribute('id', 'explode')
    }, 700)
} 
function updateScore() {
    document.getElementById('current-score').innerText = `score: ${score}`
}
function updateHealth() {
    if (currentHealth !== yourShip.hull) {
        currentHealth--;
        document.getElementById('health-txt').innerText = `= ${currentHealth}`
        setTimeout(updateHealth, 50)
    }
}
function popText(str, color) {
    let text = document.createElement('span')
    text.setAttribute('id', 'pop-text')
    text.style.color = color
    text.innerText = str
    prompt.append(text)
    setTimeout(()=> prompt.innerHTML = '', 500)
}
function continueScreen() {
    newPrompt.classList.add('prompt')
    newPrompt.innerHTML = `<h1>YOU'VE DEFEATED THE ENEMY WAVE!!</h1><p>However, another wave is incoming!</p><p class="blink">Keep fighting?</p><img id="yes-btn" src="images/yes-btn.png"><img id="no-btn" src="images/no-btn.png">`
    prompt.append(newPrompt)
    document.getElementById('yes-btn').addEventListener('click', ()=> {
        
    })
    document.getElementById('no-btn').addEventListener('click', ()=>{
      
    })
} 

// enemyHit()
// enemyGen()
// defeated()
// currentIdx = 2

// firePrompt()
startGame()
// continueScreen()