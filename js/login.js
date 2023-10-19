import { userData } from "./data.js";

console.log(userData);

// Function Login
const btnLoginElm = document.querySelector("#btn_login");

function onLogin() {
  const usernameElm = document.querySelector("#username").value;
  const passwordElm = document.querySelector("#password").value;

  const users = userData.find(
    (user) => user.username == usernameElm && user.password == passwordElm
  );

  if (users) {
    localStorage.setItem("user", JSON.stringify(users));
    window.location.href = "home.html";
  } else {
    alert("username dan password tidak sesuai");
  }
  console.log(users);
}
btnLoginElm.addEventListener("click", () => {
  onLogin();
});
