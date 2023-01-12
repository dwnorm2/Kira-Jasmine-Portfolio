// //credits to https://codepen.io/annalarson/pen/AegVzq
// // alert("hi");
// $(function () {
//   // $(document).ready shorthand
//   $(".monster").fadeIn("slow");
// });

// $(document).ready(function () {
//   /* Every time the window is scrolled ... */
//   $(window).scroll(function () {
//     /* Check the location of each desired element */
//     $(".hideme").each(function (i) {
//       var bottom_of_object = $(this).position().top + $(this).outerHeight();
//       var bottom_of_window = $(window).scrollTop() + $(window).height();

//       /* If the object is completely visible in the window, fade it it */
//       if (bottom_of_window > bottom_of_object) {
//         $(this).animate({ opacity: "1" }, 1500);
//       }
//     });
//   });
// });

const form = document.getElementById("form");
const result = document.getElementById("result");

form.addEventListener("submit", function (e) {
  const formData = new FormData(form);
  e.preventDefault();
  var object = {};
  formData.forEach((value, key) => {
    object[key] = value;
  });
  var json = JSON.stringify(object);
  result.innerHTML = "Please wait...";

  fetch("https://api.web3forms.com/submit", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: json,
  })
    .then(async (response) => {
      let json = await response.json();
      if (response.status == 200) {
        result.innerHTML = json.message;
        result.classList.remove("text-gray-500");
        result.classList.add("text-green-500");
      } else {
        console.log(response);
        result.innerHTML = json.message;
        result.classList.remove("text-gray-500");
        result.classList.add("text-red-500");
      }
    })
    .catch((error) => {
      console.log(error);
      result.innerHTML = "Something went wrong!";
    })
    .then(function () {
      form.reset();
      setTimeout(() => {
        result.style.display = "none";
      }, 5000);
    });
});
