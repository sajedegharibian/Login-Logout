// 
"use strict";


const titleEl=document.querySelector("#title")
const formEl=document.querySelector(".form")
const firstNameEl=document.querySelector("#nameGroup")
const errorEls=document.querySelectorAll(".error")
const showPasswordEl=document.querySelector("#show-password")
const logInBtnEl=document.querySelector(".login-btn")
const successMsgEl=document.querySelector("#successMsg")
const toggleTextEl=document.querySelector("#toggle-text")
const signUpEl=document.querySelector("#signup-page")
const passwordEl=document.querySelector("#password")

let isSignUp=false
firstNameEl.style.display="none";

signUpEl.addEventListener("click",toggleForm);

function toggleForm(){
    isSignUp=!isSignUp;
    if(isSignUp){
        titleEl.innerHTML="Sign Up";
        firstNameEl.style.display="block";
        logInBtnEl.innerHTML="Sign Up";
        toggleTextEl.innerHTML="Already have an account?";
        signUpEl.innerHTML="Login"
    }
    else{
        titleEl.innerHTML="Login";
        firstNameEl.style.display="none";
        logInBtnEl.innerHTML="Login";
        toggleTextEl.innerHTML="Don't have an account?";
        signUpEl.innerHTML="Sign Up"
    }

    clearError()
    successMsgEl.style.display="none";
    formEl.reset()
}

showPasswordEl.addEventListener("click",()=>{
    passwordEl.type=passwordEl.type==="password"?"text":"password"
})

function clearError(){
    errorEls.forEach((err)=>{
        err.style.display="none"
    })
}

formEl.addEventListener("submit",(e)=>{
    e.preventDefault()
    successMsgEl.style.display="none";

    const name=document.querySelector("#name").value.trim()
    const email=document.querySelector("#email").value.trim()
    const password=document.querySelector("#password").value.trim()

    let isValid=true

    if(isSignUp && name===""){
        document.querySelector("#nameError").style.display="block";
        isValid=false
    }

    if(!email.includes("@") || email===""){
        document.querySelector("#emailError").style.display="block";
        isValid=false
    }
    if(password.length<6){
        document.querySelector("#passwordError").style.display="block";
        isValid=false
    }
    if(!isValid) return;

    if(isSignUp){
        const user={name,email,password}

        localStorage.setItem("user",JSON.stringify(user))
        successMsgEl.style.display="block";
        successMsgEl.innerHTML="Sign Up successful! please login";
        toggleForm();
        return
    }

    const userSaved=JSON.parse(localStorage.getItem("user"))

    if(!userSaved){
        alert("No account found please sign up first")
        return;
    }

    if(email===userSaved.email && password===userSaved.password){
        successMsgEl.style.display="block";
        successMsgEl.innerHTML=`Welcome back ${userSaved.name}`;
        formEl.reset()
    }else{
        alert("Invalid email or password")
    }
})