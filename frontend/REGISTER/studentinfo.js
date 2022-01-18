const back = document.querySelector('.back-btn input')
const next =  document.querySelector('.next-btn input')
back.addEventListener('click', (e)=>{
    e.preventDefault()
    window.open('register.html', '_self')
})

function getCheckedBoxes(){
    let checkboxes = document.querySelectorAll('input[type="checkbox"]')
    let checkboxesChecked = []
    for(let i = 0; i<checkboxes.length; i++){
        if(checkboxes[i].checked){
            checkboxesChecked.push(checkboxes[i].value)
        }
    }
    return checkboxesChecked
}
next.addEventListener('click', async (e)=>{
    e.preventDefault()
    const userInfo = JSON.parse(localStorage.getItem("regInfo"))
    id = userInfo._id;
   
    let subjects = getCheckedBoxes();
    let c = document.getElementById("studentClass");
    let newClass = c.options[c.selectedIndex].text;
    console.log(newClass)
    const parentEmail = document.getElementById('parent-email').value
    const parentName = document.getElementById('parent-name').value
    const parentBody = {"parentEmail": parentEmail, "parentName":parentName, "class":newClass}
    console.log(parentBody)
    await fetch(`http://localhost:4000/subjectReg/${id}`, {
        method: 'PUT',
        headers: {'Content-type':'application/json'},
        body: JSON.stringify(parentBody)
    })
    const allSubjects =  subjects.map(async (subject) => {
        const body = {subject:subject}

        const data = await fetch(`http://localhost:4000/subjectReg/subject/${id}`,{
            method: 'PUT',
            headers: {'Content-type':'application/json'},
            body: JSON.stringify(body)
        });

        return data;

        // .then(res => res.json())
        // .then(newRes => console.log(newRes))
    })

    const resolvedallSUbjects = await Promise.all(allSubjects);

    const result = resolvedallSUbjects.map(async (data) => {
        return data.json()
    })
    console.log(await Promise.all(result));

    alert( `${subjects.length} subjects added successfully`)
    window.open("oathinfo.html", "_self")
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