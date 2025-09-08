const message = document.getElementById("message");
const logoutBtn = document.getElementById("logoutBtn");

const currentUser = JSON.parse(localStorage.getItem("currentUser"));
const users = JSON.parse(localStorage.getItem("users")) || [];

if(!currentUser){
  alert("Please login first!");
  window.location.href = "../Login/index.html";
}

// Fill form
document.getElementById("name").value = currentUser.username;
document.getElementById("email").value = currentUser.email;

// Update profile
document.getElementById("profileForm").addEventListener("submit",(e)=>{
  e.preventDefault();
  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();

  currentUser.username = name;
  currentUser.email = email;

  let updatedUsers = users.map(u=> u.email===currentUser.email? currentUser : u);
  localStorage.setItem("users", JSON.stringify(updatedUsers));
  localStorage.setItem("currentUser", JSON.stringify(currentUser));

  message.textContent = "Profile updated successfully!";
  message.style.color="green";
});

// Change password
document.getElementById("passwordForm").addEventListener("submit",(e)=>{
  e.preventDefault();
  const oldPass = document.getElementById("oldPassword").value;
  const newPass = document.getElementById("newPassword").value;
  const confirmPass = document.getElementById("confirmPassword").value;

  if(oldPass !== currentUser.password){ message.textContent="Old password incorrect!"; message.style.color="red"; return;}
  if(newPass !== confirmPass){ message.textContent="New passwords do not match!"; message.style.color="red"; return;}

  currentUser.password = newPass;
  let updatedUsers = users.map(u=> u.email===currentUser.email? currentUser:u);
  localStorage.setItem("users", JSON.stringify(updatedUsers));
  localStorage.setItem("currentUser", JSON.stringify(currentUser));

  message.textContent = "Password updated successfully!";
  message.style.color="green";
  document.getElementById("passwordForm").reset();
});

// Logout
logoutBtn.addEventListener("click", ()=>{
  localStorage.removeItem("currentUser");
  localStorage.setItem("isLoggedIn","false");
  window.location.href = "../Login/index.html";
});
