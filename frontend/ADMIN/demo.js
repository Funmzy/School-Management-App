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
          <td id="name${index + 1}">${
        data.subject || 'not yet registered any subjects'
      }</td>
          <td id="gender${index + 1}">${data.grade || 0}</td>
          <td>
<input type="button" id="edit_button${
        index + 1
      }" value="Edit" class="edit" onclick="edit_row(${index + 1})">
<input type="button" id="save_button${
        index + 1
      }" value="Save" class="save" onclick="save_row(${index + 1})">
</td>
        </tr>`
    })
  })
}


//delete button if needed
{/* <input type="button" value="Delete" class="delete" onclick="delete_row()"></input> */}
function edit_row(no) {
  console.log('!!i amhere')
  document.getElementById('edit_button' + no).style.display = 'none'
  document.getElementById('save_button' + no).style.display = 'block'

  let name = document.getElementById('name' + no)
  let gender = document.getElementById('gender' + no)

  let name_data = name.innerHTML
  let gender_data = gender.innerHTML

  name.innerHTML = `<input type='text' id='name_text${no}'  value= ' ${name_data} ' >`
  gender.innerHTML = `<input type='text' id='gender_text${no}'  value= ' ${gender_data} ' >`
}

function save_row(no) {
  let name_val = document.getElementById('name_text' + no).value
  let gender_val = document.getElementById('gender_text' + no).value

  document.getElementById('name' + no).innerHTML = name_val
  document.getElementById('gender' + no).innerHTML = gender_val

  document.getElementById('edit_button' + no).style.display = 'block'
  document.getElementById('save_button' + no).style.display = 'none'
}

// function delete_row(no) {
//   document.getElementById('row' + no + '').outerHTML = ''
// }

// function add_row() {
//   var new_name = document.getElementById('new_name').value
//   var new_country = document.getElementById('new_country').value
//   var new_age = document.getElementById('new_age').value

//   var table = document.getElementById('data_table')
//   var table_len = table.rows.length - 1
//   var row = (table.insertRow(table_len).outerHTML =
//     "<tr id='row" +
//     table_len +
//     "'><td id='name_row" +
//     table_len +
//     "'>" +
//     new_name +
//     "</td><td id='country_row" +
//     table_len +
//     "'>" +
//     new_country +
//     "</td><td id='age_row" +
//     table_len +
//     "'>" +
//     new_age +
//     "</td><td><input type='button' id='edit_button" +
//     table_len +
//     "' value='Edit' class='edit' onclick='edit_row(" +
//     table_len +
//     ")'> <input type='button' id='save_button" +
//     table_len +
//     "' value='Save' class='save' onclick='save_row(" +
//     table_len +
//     ")'> <input type='button' value='Delete' class='delete' onclick='delete_row(" +
//     table_len +
//     ")'></td></tr>")

//   document.getElementById('new_name').value = ''
//   document.getElementById('new_country').value = ''
//   document.getElementById('new_age').value = ''
// }
