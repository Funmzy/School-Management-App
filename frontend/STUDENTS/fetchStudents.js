document.addEventListener('DOMContentLoaded', (e) => {
  e.preventDefault()
  const token = localStorage.getItem('userInfo')
  if (!token) {
    window.open('../LOGIN/login.html', '_self')
  }
  main()
})
let url = 'http://localhost:4000/subjectReg'
const userData = JSON.parse(localStorage.getItem('userInfo'))
const id = userData.user._id

async function main() {
  let result = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
  result = await result.json()
  let studentData = result.subject
  let loggedStudent = studentData.filter((students) => {
    return students.userId === id
  })
  let studentName = ''
  let data = document.getElementById('content')
  let table = document.getElementById('table')
  // let newEle = ""
  const studentScores = loggedStudent.map((element, index) => {
    studentName = element.fullname
    return element.subjects
  })

  data.innerHTML = `<strong>Welcome</strong> ${studentName}`
  studentScores.forEach((item) => {
    item.map((data, index) => {
      console.log(data)
      table.innerHTML += `<tr>
          <td scope="row">${index + 1}</td>
          <td>${data.subject || 'not yet registered any subjects'}</td>
          <td>${data.grade || 0}</td>
        </tr>`
    })
  })
}

document.querySelector('.nav-item #chart').addEventListener('click', (e) => {
  e.preventDefault()
  console.log('here')
  const data = JSON.parse(localStorage.getItem('userInfo'))
  const id = data.user._id
  console.log(id)
  window.open(`http://localhost:9000/?id=${id}`, '_self')
})
