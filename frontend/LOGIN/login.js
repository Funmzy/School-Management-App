const Login = document.querySelector('#log-button')
document.addEventListener('DOMContentLoaded', ()=>{
    localStorage.clear()
} )
Login.addEventListener('click', (e) => {
    const password = document.getElementById('log-password').value
    const email = document.getElementById('log-email').value
    const showerr = document.getElementById('show-err')
    const details = {"email":email, "password":password}
    console.log(details)
    logUser("http://localhost:4000/users/login", details )
    .then(parseData => {
        if(parseData.status){
            localStorage.setItem('userInfo', JSON.stringify(parseData.data))
            alert(parseData.status)
            if(parseData.data.user.user === "parent"){
                window.open("../PARENTS/parent.html","_self")
            }else if(parseData.data.user.user == "student"){
                window.open("../STUDENTS/student.html", "_self")
            }else if(parseData.data.user.user == "teacher"){
                if(parseData.data.user.admin){
                    window.open("../ADMIN/admin.html", "_self")
                }else{
                    window.open("../TEACHERS/teachers.html", "_self")
                }
            }
        }else{
            showerr.innerHTML = `<p style='color:red'>${parseData.message}</p>`

        }
    })
})

async function logUser(url, data) {
    const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify(data)
    })

    const endData = await res.json()
    return endData
}