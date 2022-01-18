const oathinfo = localStorage.getItem('oathinfo')
if(!oathinfo){
    alert('kindly fill out registeration form')
    window.open('register.html', '_self')
}
const oathArr = oathinfo.split(',')
const first = document.getElementById('first')
const second = document.getElementById('second') 
first.value = oathArr[0]
second.value = oathArr[1]


const back = document.querySelector('.back-btn input')
const next =  document.querySelector('.submit-btn input')
back.addEventListener('click', (e)=>{
    e.preventDefault()
    window.open('register.html', '_self')
})

next.addEventListener('click', (e)=>{
    e.preventDefault()
    localStorage.clear()
    window.open("../LOGIN/login.html", "_self")
})


const personalDetails = document.getElementById('personal-details')
personalDetails.addEventListener('click', (e)=>{
    e.preventDefault()
    window.open("register.html", "_self")
})

const oathDetails = document.getElementById('oath-details')
oathDetails.addEventListener('click', (e)=>{
    e.preventDefault()
    window.open("oathinfo.html", "_self")
})

const subjectDetails = document.getElementById('subject-details')
subjectDetails.addEventListener('click',(e)=>{
    e.preventDefault()
    window.open('subjectinfo.html', "_self")
})

