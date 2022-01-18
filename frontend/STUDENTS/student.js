//	window.addEventListener("resize", function() {
//		"use strict"; window.location.reload();
//	});


  document.querySelectorAll('.dropdown-menu').forEach(function (element) {
    element.addEventListener('click', function (e) {
      e.stopPropagation()
    })
  })

  // make it as accordion for smaller screens
  if (window.innerWidth < 992) {
    // close all inner dropdowns when parent is closed
    document
      .querySelectorAll('.navbar .dropdown')
      .forEach(function (everydropdown) {
        everydropdown.addEventListener('hidden.bs.dropdown', function () {
          // after dropdown is hidden, then find all submenus
          this.querySelectorAll('.submenu').forEach(function (everysubmenu) {
            // hide every submenu as well
            everysubmenu.style.display = 'none'
          })
        })
      })

    document.querySelectorAll('.dropdown-menu a').forEach(function (element) {
      element.addEventListener('click', function (e) {
        let nextEl = this.nextElementSibling
        if (nextEl && nextEl.classList.contains('submenu')) {
          // prevent opening link if link needs to open dropdown
          e.preventDefault()
          console.log(nextEl)
          if (nextEl.style.display == 'block') {
            nextEl.style.display = 'none'
          } else {
            nextEl.style.display = 'block'
          }
        }
      })
    })
  }
  // end if innerWidth

// DOMContentLoaded  end
// document.getElementById("main_nav").addEventListener('click', (e)=>{
//   if(e.target.className == "nav-link"){
//     localStorage.clear()
//     window.open("../LOGIN/login.html", "_self")
//   }
// })

document.querySelector('.nav-item #chart').addEventListener('click', (e)=>{
  e.preventDefault()
  console.log('here')
  const data = JSON.parse(localStorage.getItem("userInfo"))
  const id = data.user._id
  console.log(id)
  window.open(`http://localhost:9000/?id=${id}`, "_self")
})


