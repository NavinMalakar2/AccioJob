// react.js
export const reactQuestions = [
  {
    question: "What is the command to create a new React app?",
    options: [
      "npm install react-app",
      "npx create-react-app myApp",
      "npm create-react myApp",
      "react-create-app myApp"
    ],
    answer: "npx create-react-app myApp"
  },
  {
    question: "What is JSX?",
    options: [
      "A JavaScript syntax extension",
      "A JSON parser",
      "A CSS preprocessor",
      "A React plugin"
    ],
    answer: "A JavaScript syntax extension"
  },
  {
    question: "Which hook is used to manage state in a functional component?",
    options: ["useFetch()", "useEffect()", "useState()", "useReducer()"],
    answer: "useState()"
  },
  {
    question: "Which hook runs code after the component mounts?",
    options: ["useLayoutEffect()", "useState()", "useRef()", "useEffect()"],
    answer: "useEffect()"
  },
  {
    question: "What is the virtual DOM?",
    options: [
      "A duplicate of the actual DOM",
      "A UI framework",
      "A memory representation of the real DOM",
      "An API for routing"
    ],
    answer: "A memory representation of the real DOM"
  },
  {
    question: "Which keyword is used to pass data to components?",
    options: ["state", "props", "data", "params"],
    answer: "props"
  },
  {
    question: "What is the correct syntax for a functional component?",
    options: [
      "function MyComponent[] {}",
      "const MyComponent = () => {}",
      "let MyComponent: {}",
      "function = MyComponent() {}"
    ],
    answer: "const MyComponent = () => {}"
  },
  {
    question: "How many root elements can a React component return?",
    options: ["Only one", "As many as needed", "Two", "Unlimited"],
    answer: "Only one"
  },
  {
    question: "What is the purpose of `key` in React lists?",
    options: [
      "To style list items",
      "To uniquely identify elements",
      "To sort the list",
      "To hide elements"
    ],
    answer: "To uniquely identify elements"
  },
  {
    question: "Which method is used to render a React component into the DOM?",
    options: [
      "React.mount()",
      "React.renderComponent()",
      "ReactDOM.render()",
      "React.attach()"
    ],
    answer: "ReactDOM.render()"
  }
];
