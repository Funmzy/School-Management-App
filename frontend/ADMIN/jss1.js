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
  let jss1Students = studentData.filter((students) => {
    return students.class === 'JSS1'
  })

  const name = document.getElementById('show')
  jss1Students.map((element, index) => {
    console.log('jss1students', jss1Students)
    let subjectData = element.subjects
    let str = '';

     subjectData.forEach((el,i) => {
       str += `<small class="card-text">#${i + 1} Subject: ${
         el.subject || 'awaiting registration'
       } | Score: ${el.grade || 0}</small><hr>`
     });

    name.innerHTML += `<div class="card" style="width: 18rem;">
    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS61Yc_gkstWIohq87UCRg29WrB5Ik6NfTs0w&usqp=CAU" class="card-img-top" alt="..." width="300px" height="250px">
    <div class="card-body">
      <h5 class="card-title primary">Name:</h5>
      <p class="card-title primary">${element.fullname}</p>
      <h5 class="card-title primary">Class:</h5>
      <p class="card-text">${element.class}</p>
      <h5 class="card-text">Registered Subjects:</h5>
      ${str}
      <button type="button" class="btn btn-danger" data-bs-toggle="modal" data-bs-target="#exampleModal${index}">
    update grades>>
    </button>
    </div>
  </div>
  <!-- Button trigger modal -->

<!-- Modal -->
<div class="modal fade" id="exampleModal${index}" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
    ${element.userId}
    <form id="form${index}">
      <input type="text" class="form-control text" placeholder="subject">
      <input type="number" class="form-control number" placeholder="grade: numbers only">
      <button type="submit" id="update" data-id="${element.userId}" class="btn btn-secondary update">Update</button>
      <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
</form>
    </div>
  </div>
</div>`
  })
}

//understand datasets

  showModal.addEventListener('click', (e) => {
   // console.log(`Show Modal@@@`)
   e.preventDefault()
    if (e.target.id === `update`) {
      let id1 = document.getElementById('update')
      console.log("this is id1", id1)
     let id = e.target.dataset.id
      console.log(`i'm about to update!!!`, e.target)
      let subject = document.querySelector('.text')
      let grade = document.querySelector('.number')

      if(subject.value&&grade.value) alert('Successfully Updated')
      alert('please put an input')

      const obj = {
        subject: subject.value,
        grade: grade.value,
      }
      // console.log('i skipped that line')

      // const userData = JSON.parse(localStorage.getItem('userInfo'))
      // const id = userData.user._id
      console.log("this is the id", id)
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
