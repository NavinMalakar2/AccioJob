document.getElementById("loginForm").addEventListener("submit", function(e){
  e.preventDefault();
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();

  document.querySelectorAll(".error").forEach(el=>el.textContent="");
  let isValid = true;

  if(email===""){ document.getElementById("emailError").textContent="Email required"; isValid=false; }
  if(password===""){ document.getElementById("passwordError").textContent="Password required"; isValid=false; }

  if(isValid){
    let users = JSON.parse(localStorage.getItem("users")) || [];
    let foundUser = users.find(u=> u.email===email && u.password===password);
    if(foundUser){
      localStorage.setItem("currentUser", JSON.stringify(foundUser));
      localStorage.setItem("isLoggedIn","true");
      alert("Login successful!");
      window.location.href = "../Profile/index.html"; // redirect to profile
    } else {
      document.getElementById("passwordError").textContent="Invalid email or password";
    }
  }
});
