let close = document.querySelector(".close");
let more = document.querySelector(".more");
let submitCookies = document.querySelector(".submit-cookies");
let acceptCookies = document.querySelector(".accept");

const cookieNames = [
  "details",
  "card",
  "images",
  "file-submission",
  "encryption",
  "revisit",
];

let cookieConsentSelect = document.querySelector("#cookie-consent-select");
let cookieConsent = document.querySelector("#cookie-consent");

if (getCookie("accept") == "") {
  cookieConsent.classList.remove("hidden");
}

close.addEventListener("click", function (e) {
  cookieConsentSelect.classList.add("hidden");
});

more.addEventListener("click", function (e) {
  cookieConsentSelect.classList.remove("hidden");
});

submitCookies.addEventListener("click", function (e) {
  submitCookies.innerHTML = "Submitted";
  let cookies = document.querySelectorAll('input[name="cookie"]:checked');
  cookies.forEach((cookie) => {
    setCookie(cookie.value, 1, 30);
  });
});

acceptCookies.addEventListener("click", function (e) {
  setCookie("accept", 1, 1);
  cookieNames.forEach((cookie) => {
    setCookie(cookie, 1, 30);
  });
  cookieConsentSelect.classList.add("hidden");
  cookieConsent.classList.add("hidden");
});

cookieNames.forEach((cookie) => {
  console.log(cookie);
  if (getCookie(cookie) == 1) {
    document.querySelector("tr." + cookie + " input").checked = true;
  }
});

function setCookie(cname, cvalue, exdays) {
  const d = new Date();
  d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
  let expires = "expires=" + d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
  let name = cname + "=";
  let decodedCookie = decodeURIComponent(document.cookie);
  let ca = decodedCookie.split(";");
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == " ") {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

function checkCookie() {
  let user = getCookie("username");
  if (user != "") {
    alert("Welcome again " + user);
  } else {
    user = prompt("Please enter your name:", "");
    if (user != "" && user != null) {
      setCookie("username", user, 30);
    }
  }
}
