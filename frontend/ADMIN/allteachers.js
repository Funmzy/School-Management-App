document.addEventListener('DOMContentLoaded', (e) => {
  e.preventDefault()
  // const token = localStorage.getItem('userInfo')
  // if (!token) {
  //   window.open('../LOGIN/login.html', '_self')
  // }
  main()
})
let url = 'http://localhost:4000/teacherSubject/'

async function main() {
  let result = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
  result = await result.json()
  console.log(result)
  let parentData = result.subject
  let table = document.getElementById('table')
  parentData.map((element, index) => {
    console.log(element.firstname)
    table.innerHTML += `<tr>
          <td scope="row">${index + 1}</td>
          <td id="name${index + 1}">${element.fullname}</td>
          <td id="email${index + 1}">${element.email}</td>
          <td id="phoneno${index + 1}">${element.phoneNo}</td>
          <td id="gender${index + 1}">${element.gender || 'awaiting...'}</td>
          <td id="address${index + 1}">${element.address}</td>
          <td id="subjects${index + 1}">${element.subjects || 'not yet assigned'}</td>
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
}

function edit_row(no) {
  document.getElementById('edit_button' + no).style.display = 'none'
  document.getElementById('save_button' + no).style.display = 'block'

  let address = document.getElementById('address' + no)
  let phoneno = document.getElementById('phoneno' + no)

  let address_data = address.innerHTML
  let phoneno_data = phoneno.innerHTML

  address.innerHTML = `<input type='text' id='name_text${no}'  value= ' ${address_data} ' >`
  phoneno.innerHTML = `<input type='text' id='phoneno_text${no}'  value= ' ${phoneno_data} ' >`
}

function save_row(no) {
  let address_val = document.getElementById('name_text' + no).value
  let phoneno_val = document.getElementById('phoneno_text' + no).value

  document.getElementById('address' + no).innerHTML = address_val
  document.getElementById('phoneno' + no).innerHTML = phoneno_val

  document.getElementById('edit_button' + no).style.display = 'block'
  document.getElementById('save_button' + no).style.display = 'none'
}
