document.getElementById("signupForm").addEventListener("submit", function(e) {
  e.preventDefault();

  const username = document.getElementById("username").value.trim();
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();
  const confirmPassword = document.getElementById("confirmPassword").value.trim();

  document.querySelectorAll(".error").forEach(el => el.textContent = "");
  let isValid = true;

  if (username === "") { document.getElementById("usernameError").textContent = "Username required"; isValid=false; }
  if (email === "") { document.getElementById("emailError").textContent = "Email required"; isValid=false; }
  else if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)){ document.getElementById("emailError").textContent="Invalid email"; isValid=false; }
  if(password===""){ document.getElementById("passwordError").textContent="Password required"; isValid=false;}
  else if(password.length<6){ document.getElementById("passwordError").textContent="Password min 6 chars"; isValid=false;}
  if(confirmPassword !== password){ document.getElementById("confirmPasswordError").textContent="Passwords do not match"; isValid=false; }

  if(isValid){
    let users = JSON.parse(localStorage.getItem("users")) || [];
    // check if email exists
    if(users.some(u => u.email === email)){
      alert("Email already registered");
      return;
    }

    const newUser = {username,email,password};
    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));
    alert("Signup successful! Login now.");
    window.location.href = "../Login/index.html";
  }
});
