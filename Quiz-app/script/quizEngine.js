export function renderQuizList(categories, container) {
  const categoryCards = categories.map(cat => `
    <div class="quiz-card cursor-pointer bg-gray-800 hover:bg-teal-700 transition-all p-4 rounded-xl shadow-lg" data-category="${cat}">
      <img src="https://source.unsplash.com/300x200/?${cat},code" class="rounded-md w-full h-40 object-cover mb-2" alt="${cat}">
      <h2 class="text-center capitalize text-lg font-semibold">${cat} Quiz</h2>
    </div>
  `).join('');
  container.innerHTML = categoryCards;
}

export function renderQuiz(quiz, container, onComplete) {
  let current = 0;
  let score = 0;

  const renderQuestion = () => {
    if (current >= quiz.length) {
      showScore(score, quiz.length, container, onComplete);
      return;
    }

    const q = quiz[current];
    container.innerHTML = `
      <div class="bg-gray-800 p-6 rounded-lg shadow-md animate-fade-in">
        <h2 class="text-xl font-semibold mb-4">Q${current + 1}: ${q.question}</h2>
        <div class="space-y-3">
          ${q.options.map((opt, i) => `
            <button class="block w-full bg-gray-700 hover:bg-teal-600 p-3 rounded text-left" data-index="${i}">${opt}</button>
          `).join('')}
        </div>
      </div>
    `;

    container.querySelectorAll('button').forEach(btn => {
      btn.addEventListener('click', () => {
        const index = parseInt(btn.dataset.index);
        if (index === q.answer) score++;
        current++;
        renderQuestion();
      });
    });
  };

  renderQuestion();
}

export function showScore(score, total, container, onComplete) {
  container.innerHTML = `
    <div class="bg-gray-800 p-6 rounded-lg shadow-md text-center animate-fade-in">
      <h2 class="text-2xl font-bold text-green-400">🎉 Quiz Completed!</h2>
      <p class="mt-4 text-xl">You scored ${score} out of ${total}</p>
      <button class="mt-6 bg-teal-500 hover:bg-teal-600 text-white px-4 py-2 rounded" id="backBtn">Back to Quizzes</button>
    </div>
  `;

  container.querySelector('#backBtn').addEventListener('click', onComplete);
}
