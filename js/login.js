


const loginTab = document.getElementById("loginTab");
const signupTab = document.getElementById("signupTab");

const formTitle = document.getElementById("formTitle");
const formSubtitle = document.getElementById("formSubtitle");

const fullNameField = document.getElementById("fullNameField");
const confirmPasswordField = document.getElementById("confirmPasswordField");

const loginOptions = document.getElementById("loginOptions");
const submitBtn = document.getElementById("submitBtn");

loginTab.addEventListener("click", () => {

    loginTab.classList.add("active");
    signupTab.classList.remove("active");

    formTitle.innerHTML = "Welcome Back! 👋";
    formSubtitle.innerHTML = "Login to continue your learning journey";

    fullNameField.style.display = "none";
    confirmPasswordField.style.display = "none";

    loginOptions.style.display = "flex";

    submitBtn.innerHTML = `Login <i class="fa-solid fa-arrow-right"></i>`;
});

signupTab.addEventListener("click", () => {

    signupTab.classList.add("active");
    loginTab.classList.remove("active");

    formTitle.innerHTML = "Create Account 🚀";
    formSubtitle.innerHTML = "Create your account to start learning";

    fullNameField.style.display = "block";
    confirmPasswordField.style.display = "block";

    loginOptions.style.display = "none";

    submitBtn.innerHTML = `Create Account <i class="fa-solid fa-user-plus"></i>`;
});