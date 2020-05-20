console.log("working");
const question = document.getElementById("header");
const options = document.getElementsByClassName("answer");
const optionsArr = Array.from(options);
console.log(optionsArr);
fetch('https://opentdb.com/api.php?amount=10&category=31&type=multiple').then(response => response.json())
.then(
    data => {
        console.log(data);
        let questionSource = data.results[0].question ;
        let questionNode = document.createTextNode(questionSource);
        question.appendChild(questionNode);

        let answerSource = data.results[0].correct_answer;

        let incorrectSource = data.results[0].incorrect_answers;
        console.log(answerSource);
        let AnswerNode = document.createTextNode(answerSource);
        let incorrectNode = document.createTextNode(incorrectSource);
    }

);