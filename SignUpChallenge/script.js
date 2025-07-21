const emailInput = document.getElementById("email");
  const passInput = document.getElementById("password");
  const emailMsg = document.getElementById("emailMsg");
  const passMsg = document.getElementById("passMsg");
  const statusMsg = document.getElementById("statusMsg");

  let emailValid = false;
  let passValid = false;

  emailInput.addEventListener("input", () => {
    const value = emailInput.value;
    if (value.length > 3 && value.includes("@") && value.includes(".")) {
      emailMsg.textContent = "";
      emailValid = true;
    } else {
      emailMsg.textContent = "Enter a valid email (e.g., abc@xyz.com)";
      emailMsg.className = "message error";
      emailValid = false;
    }
    checkFormStatus();
  });

  passInput.addEventListener("input", () => {
    const value = passInput.value;
    if (value.length > 8) {
      passMsg.textContent = "";
      passValid = true;
    } else {
      passMsg.textContent = "Password must be more than 8 characters";
      passMsg.className = "message error";
      passValid = false;
    }
    checkFormStatus();
  });

  function checkFormStatus() {
    if (emailValid && passValid) {
      statusMsg.textContent = "All good to go!";
      statusMsg.className = "message success";
    } else {
      statusMsg.textContent = "";
    }
  }

  document.getElementById("signupForm").addEventListener("submit", (e) => {
    e.preventDefault();

    if (!emailValid || !passValid) {
      alert("Please fix validation errors before submitting.");
      return;
    }

    const confirmSignup = confirm("Do you want to submit the form?");
    if (confirmSignup) {
      alert("Successful signup!");
    } else {
      emailInput.value = "";
      passInput.value = "";
      emailMsg.textContent = "";
      passMsg.textContent = "";
      statusMsg.textContent = "";
      emailValid = false;
      passValid = false;
    }
  });