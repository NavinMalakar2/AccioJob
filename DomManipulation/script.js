let count = 0;

const countEl = document.getElementById("count");
const errorEl = document.getElementById("error");
const decrementBtn = document.getElementById("decrement");
const incrementBtn = document.getElementById("increment");
const clearBtn = document.getElementById("clear");

function updateDisplay() {
  countEl.textContent = count;
  errorEl.classList.add("hidden");
}

incrementBtn.addEventListener("click", () => {
  count++;
  updateDisplay();
});

decrementBtn.addEventListener("click", () => {
  if (count === 0) {
    errorEl.classList.remove("hidden");
  } else {
    count--;
    updateDisplay();
  }
});

clearBtn.addEventListener("click", () => {
  count = 0;
  updateDisplay();
});
