document.addEventListener('DOMContentLoaded', (e) => {
  e.preventDefault()
  main()
})

let url = 'http://localhost:4000/subjectReg'
const showModal = document.getElementById('show')

async function main() {
  let result = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
  result = await result.json()
  let studentData = result.subject
  let ss2Students = studentData.filter((students) => {
    return students.class === 'SSS2'
  })
  console.log(ss2Students)
  const name = document.getElementById('show')
  ss2Students.map((element, index) => {
    let subjectData = element.subjects
    console.log(element.fullname)

    let str = ''

    subjectData.forEach((el, i) => {
      console.log(el.subject)
      str += `<small class="card-text">#${i + 1} Subject: ${
        el.subject || 'awaiting registration'
      } | Score: ${el.grade || 0}</small><hr>`
    })

    console.log(str)

    name.innerHTML += `<div class="card" style="width: 18rem;">
    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS61Yc_gkstWIohq87UCRg29WrB5Ik6NfTs0w&usqp=CAU" class="card-img-top" alt="..." width="300px" height="250px">
    <div class="card-body">
      <h5 class="card-title primary">Name:</h5>
      <p class="card-title primary">${element.fullname}</p>
      <h5 class="card-title primary">Class:</h5>
      <p class="card-text">${element.class}</p>
      <h5 class="card-text">Registered Subjects:</h5>
      ${str}
      <button type="button" class="btn btn-danger" data-bs-toggle="modal" data-bs-target="#exampleModal">
    Edit and update grades>>
    </button>
    </div>
  </div>
  <!-- Button trigger modal -->

<!-- Modal -->
<div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
    <form id="form${index}">
      <input type="text" class="form-control text" placeholder="subject">
      <input type="number" class="form-control number" placeholder="grade: numbers only">
      <button type="submit" id="update"  class="btn btn-secondary update">Update</button>
      <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
</form>
    </div>
  </div>
</div>`
  })
}

showModal.addEventListener('click', (e) => {
  if (e.target.id === 'update') {
    console.log(`i'm about to update!!!`)
    let subject = document.querySelector('.text')
    let grade = document.querySelector('.number')
    const obj = {
      subject: subject.value,
      grade: grade.value,
    }

    const userData = JSON.parse(localStorage.getItem('userInfo'))
    const id = userData.user._id
    fetch(`http://localhost:4000/subjectReg/grade/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(obj),
    })
      .then((raw) => raw.json())
      .then((data) => console.log(data))
      .catch((err) => console.log(err))
  }
})

showModal.addEventListener('click', (e) => {
  if (e.target.id === 'update') {
    console.log(`i'm about to update!!!`)
    let subject = document.querySelector('.text')
    let grade = document.querySelector('.number')
    const obj = {
      subject: subject.value,
      grade: grade.value,
    }

    const userData = JSON.parse(localStorage.getItem('userInfo'))
    const id = userData.user._id
    fetch(`http://localhost:4000/subjectReg/grade/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(obj),
    })
      .then((raw) => raw.json())
      .then((data) => console.log(data))
      .catch((err) => console.log(err))
  }
})
