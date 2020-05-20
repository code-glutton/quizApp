console.log("working");
const parentDiv = document.getElementById("quizReg");
createAnswerDiv = (parentDiv,arrayAns) => {
    for(let i = 0; i <= 3; i++){
        let divTag = document.createElement("div");
        parentDiv.appendChild(divTag);
        const randomAns = arrayAns[Math.floor(Math.random() * arrayAns.length)];
        console.log(arrayAns);
        arrayAns.splice(randomAns,1);
        console.log(arrayAns);
        let ansNode = document.createTextNode(randomAns);
        divTag.appendChild(ansNode);

    }
}

const question = document.getElementById("header");
fetch('https://opentdb.com/api.php?amount=10&category=31&type=multiple').then(response => response.json())
.then(
    data => {
        console.log(data);
        let questionSource = data.results[0].question ;
        let questionNode = document.createTextNode(questionSource);
        question.appendChild(questionNode);

        let answerSource = data.results[0].correct_answer;
        let answerArr = [answerSource]
        let incorrectSource = data.results[0].incorrect_answers;
        incorrectSource.map(x => {
            answerArr.push(x);
        })

        createAnswerDiv(parentDiv,answerArr);

    }

);