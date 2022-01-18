
document.addEventListener('DOMContentLoaded', async (e)=>{
    const displayPart = document.querySelector('#populate-wards #pop-wards')
    const get = JSON.parse(localStorage.getItem('userInfo'))
    console.log(get)
    const parEmail = get.user.email
    console.log(parEmail)
    fetch(`http://localhost:4000/subjectReg`)
    .then(res => res.json())
    .then(data => data.subject)
    .then(allData => {
        const newData = allData.filter(elem => elem.parentEmail == parEmail )
        let subjects = ""
        
        newData.map(elem=>{
             elem.subjects.map(subject => {
                 subjects += `<p >${subject.subject}</p><p style="color:red">${subject.grade||0}</p>`
                 console.log(subject)
            })
            console.log(subjects)
            displayPart.innerHTML+=`<div class="card">
                <h3>${elem.fullname}</h3>
                <h4>${elem.class}</h4>
                <div class="subjects">${subjects}</div>
                
            </div>`
        })
        
    } )
})