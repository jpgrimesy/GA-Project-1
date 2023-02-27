const hamburgerBtn = document.querySelector('.chevron')
const navContainer = document.querySelector('.nav')
const navLinks = document.querySelectorAll('li')
const chevron = document.getElementById('chevron')
const closeBtn = document.getElementById('close-btn')
const resumeLink = document.querySelector('.resume-link')
const leftBtn = document.getElementById('left-btn')
const rightBtn = document.getElementById('right-btn')
const projectBg = document.querySelector('.projects-bg')
const demoBtn = document.getElementById('demo')
const codeBtn = document.getElementById('code')

hamburgerBtn.addEventListener('click', () => {
    let display = navContainer.style.display
    let rotation = chevron.style.transform
    hamburgerBtn.style.backgroundColor = '#766293'
    hamburgerBtn.style.border = '2px solid #766293'
    setTimeout(()=> hamburgerBtn.style.backgroundColor = '#9881b1', 100)
    setTimeout(()=> hamburgerBtn.style.border = '2px solid #9881b1', 100)
    navContainer.style.display = !display || display === 'none' ? 'flex' : 'none'  
    chevron.style.transform = !rotation || rotation === 'rotate(270deg)' ? 'rotate(90deg)' : 'rotate(270deg)'
})

closeBtn.addEventListener('click', () => {
    document.getElementById('resume-modal').style.display = 'none';
})
resumeLink.addEventListener('click', () => {
    document.getElementById('resume-modal').style.display = 'block';
})

rightBtn.addEventListener('click', () => {
    disableRightBtn()
    activeLeftBtn()
    document.getElementById('one').setAttribute('id', 'one-anim-right-out')
    setTimeout(() => {
        document.getElementById('one-anim-right-out').setAttribute('id', 'one');
        document.getElementById('one').style.display = 'none'
    }, 500)
    setTimeout(() => {
        document.getElementById('two').style.display = 'block';
        document.getElementById('two').setAttribute('id', 'two-anim-right-in');
        projectBg.style.background = 'url(images/space-bat-img.png)';
        setTimeout(() => {
            document.getElementById('two-anim-right-in').setAttribute('id', 'two')
            document.getElementById('two').style.display = 'block'
        }, 400)
    }, 500)
    demoBtn.setAttribute('href', 'space-battle/index.html')
    codeBtn.setAttribute('href', 'https://github.com/jpgrimesy/My-Portfolio/tree/main/space-battle')
})
leftBtn.addEventListener('click', () => {
    activeRightBtn()
    disableLeftBtn()
    document.getElementById('two').setAttribute('id', 'two-anim-left-out');
    setTimeout(() => {
        document.getElementById('two-anim-left-out').setAttribute('id', 'two');
        document.getElementById('two').style.display = 'none'
    }, 500)
    setTimeout(() => {
        document.getElementById('one').style.display = 'block';
        document.getElementById('one').setAttribute('id', 'one-anim-left-in');
        projectBg.style.background = 'url(images/hangman-img.jpg)';
        setTimeout(() => {
            document.getElementById('one-anim-left-in').setAttribute('id', 'one')
            document.getElementById('one').style.display = 'block'
        }, 400)
    }, 500)
    demoBtn.setAttribute('href', 'hangman1/index.html')
    codeBtn.setAttribute('href', 'https://github.com/jpgrimesy/My-Portfolio/tree/main/hangman1')
})
function activeLeftBtn() {
    leftBtn.style.backgroundColor = '#9881b1';
    leftBtn.style.border = '2px solid #9881b1';
    leftBtn.style.cursor = 'pointer';
    leftBtn.disabled = false;
}
function disableLeftBtn() {
    leftBtn.style.backgroundColor = 'darkgray';
    leftBtn.style.border = '2px solid darkgray';
    leftBtn.style.cursor = 'not-allowed';
    leftBtn.disabled = true;
}
function activeRightBtn() {
    rightBtn.style.backgroundColor = '#9881b1'
    rightBtn.style.border = '2px solid #9881b1'
    rightBtn.style.cursor = 'pointer'
    rightBtn.disabled = false
}
function disableRightBtn() {
    rightBtn.style.backgroundColor = 'darkgray'
    rightBtn.style.border = '2px solid darkgray'
    rightBtn.style.cursor = 'not-allowed'
    rightBtn.disabled = true
}

