const hamburgerBtn = document.querySelector('.chevron')
const navContainer = document.querySelector('.nav')
const navLinks = document.querySelectorAll('li')
const chevron = document.getElementById('chevron')
const closeBtn = document.getElementById('close-btn')
const resumeLink = document.querySelector('.resume-link')

hamburgerBtn.addEventListener('click', (e) => {
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
console.log(resumeLink)
//     link.addEventListener('click', ()=> {

//     })
// }) 