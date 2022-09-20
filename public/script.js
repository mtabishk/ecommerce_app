window.onload = function () {
  const loginText = document.querySelector(".title-text .login");
  const loginForm = document.querySelector("form.login");
  const loginBtn = document.querySelector("label.login");
  const signupBtn = document.querySelector("label.signup");
  const signupLink = document.querySelector("form .signup-link a");

  // Login
  const loginEmail = document.getElementById("lgn-email");
  const loginPassword = document.getElementById("lgn-pass");

  // Signup
  const signupEmail = document.getElementById("sgn-email");
  const signupPassword = document.getElementById("sgn-pass");
  const signupPasswordConfirm = document.getElementById("sgn-pass-conf");

  signupBtn.onclick = function () {
    loginForm.style.marginLeft = "-50%";
    loginText.style.marginLeft = "-50%";
  };

  loginBtn.onclick = function () {
    loginForm.style.marginLeft = "0%";
    loginText.style.marginLeft = "0%";
    console.log(loginEmail.value);
    console.log(loginPassword.value);
  };

  signupLink.onclick = function () {
    signupBtn.click();
    return false;
  };
};
