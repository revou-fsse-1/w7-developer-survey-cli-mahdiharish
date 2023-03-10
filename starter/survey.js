import inquirer from "inquirer";

const questions = [
  {
    name: "firstName",
    type: "input",
    message: "What's your name?",
    validate(value) {
      if (!value) {
        return "Please fill your name.";
      }
      return true;
    },
  },
  {
    name: "email",
    type: "input",
    message: function (answers) {
      return `Hello, ${answers.firstName}, what's your email address?`;
    },
    validate: function (value) {
      if (!value) {
        return "Please enter your email address.";
      }
      const validEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!validEmail.test(value)) {
        return "Please enter a valid email address.";
      }
      return true;
    },
  },
  {
    name: "devExp",
    type: "list",
    message: "Are you truly an experienced software developer?",
    choices: ["Yes", "No"],
    validate: function (value) {
      if (!value) {
        return "Please select your experience level.";
      }
      return true;
    },
  },
  {
    name: "yearsOfExp",
    type: "list",
    message: "How many years of experience do you have?",
    choices: ["0-1", "1-3", "3-5", "5-10", "10+"],
    when: function (answers) {
      return answers.devExp === "Yes";
    },
    validate: function (value) {
      if (!value) {
        return "Please select your years of experience";
      }
      return true;
    },
  },
  {
    name: "jsLibrary",
    type: "checkbox",
    message: "What type of JavaScript library you have learned?",
    choices: ["React.js", "Vue", "Angular", "Node.js", "jQuery", "D3.js"],
    when: function (answers) {
      return answers.devExp === "Yes" || "No";
    },
    validate: function (value) {
      if (!value || value.length === 0) {
        return "Please select at least one type of library.";
      }
      return true;
    },
  },
  {
    name: "desiredSalary",
    type: "input",
    message: "What is your desired salary?",
    validate: function (value) {
      if (value < 0) {
        return "Please enter valid number.";
      } else if (value > 1000000) {
        return "Sorry, that's out of our budget!";
      } else if (0 <= value <= 10000000) {
        return true;
      }
    },
  },
];

// run your command
inquirer
  .prompt(questions)
  .then((answers) => {
    console.log(JSON.stringify(answers, null, 2));
  })
  .catch((error) => {
    if (error.isTtyError) {
      console.log("Your console environment is not supported!");
    } else {
      console.log(error);
    }
  });
