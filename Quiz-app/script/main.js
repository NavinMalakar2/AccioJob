import { quizData } from './data/htmlquiz.js'; // default quiz to show first
import { renderQuizList, renderQuiz, showScore } from './quizEngine.js';
import {}

const quizGrid = document.getElementById('quiz-grid');
const quizSection = document.getElementById('quiz-section');

const allQuizzes = {
  html: './script/data/htmlquiz.js',
  css: './script/data/cssquiz.js',
  js: './script/data/jsquiz.js',
  react: './script/data/reactQuiz.js',
  node: './script/data/nodeQuiz.js',
  mongo: './script/data/mongoQuiz.js',
  cpp: './script/data/cppQuiz.js',
  python: './script/data/pythonQuiz.js',
  dbms: './script/data/dbmsQuiz.js',
  aptitude: './script/data/aptitudeQuiz.js'
};

renderQuizList(Object.keys(allQuizzes), quizGrid);

quizGrid.addEventListener('click', async (e) => {
  const category = e.target.closest('.quiz-card')?.dataset.category;
  if (!category) return;

  const module = await import(allQuizzes[category]);
  const quiz = module.quizData;

  quizGrid.classList.add('hidden');
  quizSection.classList.remove('hidden');
  renderQuiz(quiz, quizSection, () => {
    quizSection.innerHTML = '';
    quizGrid.classList.remove('hidden');
  });
});
