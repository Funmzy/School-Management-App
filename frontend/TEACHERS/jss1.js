document.addEventListener('DOMContentLoaded', (e) => {
  e.preventDefault()
  main()

  // let button = document.querySelector('.toggle-button')
  // console.log(button)
  // let div = document.getElementsByClassName('toggle-div')
  // console.log(button)
})

// <input type="button" id="edit_button${
//         index + 1
//       }" value="Edit" class="edit" onclick="edit_row(${index + 1})">
// <input type="button" id="save_button${
//         index + 1
//       }" value="Save" class="save" onclick="save_row(${index + 1})">
// </td>
//         </tr>`
//   })
// }

// function edit_row(no) {
//   document.getElementById('edit_button' + no).style.display = 'none'
//   document.getElementById('save_button' + no).style.display = 'block'

//   let address = document.getElementById('address' + no)
//   let phoneno = document.getElementById('phoneno' + no)

//   let address_data = address.innerHTML
//   let phoneno_data = phoneno.innerHTML

//   address.innerHTML = `<input type='text' id='name_text${no}'  value= ' ${address_data} ' >`
//   phoneno.innerHTML = `<input type='text' id='phoneno_text${no}'  value= ' ${phoneno_data} ' >`
// }

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
    let str = ''

    subjectData.forEach((el, i) => {
      str += `<div id="myDiv"><small class="card-text">#${
        i + 1
      } Subject: ${el.subject || 'awaiting registration'} | Score: ${
        el.grade || 0
      }</small><hr></div>`
    })

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
      <input type="text" class="form-control text" id=input1-${
        index + 1
      } placeholder="subject">
      <input type="number" class="form-control number" id=input2-${
        index + 1
      } placeholder="grade: numbers only">
      <button type="submit" id="update" data-num=${index + 1} data-id="${
      element.userId
    }" class="btn btn-secondary update">Update</button>
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
    // let id1 = document.getElementById('update').dataset.id
    // console.log('this is id1', id1)
    let id = e.target.dataset.id
    let num = e.target.dataset.num
    console.log(`i'm about to update!!!`, num)
    let subject = document.getElementById(`input1-${num}`)
    let grade = document.getElementById(`input2-${num}`)
    console.log(subject)
    console.log(grade)

    if (subject.value && grade.value) alert('Successfully Updated')
    alert('please put an input')

    const obj = {
      subject: subject.value,
      grade: grade.value,
    }
    // console.log('i skipped that line')

    // const userData = JSON.parse(localStorage.getItem('userInfo'))
    // const id = userData.user._id
    console.log('this is the id', id)
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

function myFunction() {
  var x = document.getElementById('myDiv')
  if (x.style.display === 'none') {
    x.style.display = 'block'
  } else {
    x.style.display = 'none'
  }
}
