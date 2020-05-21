console.log("working");
const parentDiv = document.getElementById("quizReg");
const button = document.getElementById("change");
const createAnswerDiv = (parentDiv,arrayAns) => {
    // clear the contents of the parent div so that it renders a whole new set of answers
    parentDiv.innerHTML = "";

    // a for loop that populates the parent div with the answers
    for(let i = 0; i <= 3; i++){
        let divTag = document.createElement("div");
        parentDiv.appendChild(divTag);

        // this is where a the answers are randomized. randomNo generates 
        // a random number based on the array length and then it is passed as an index to the answer array
        const randomNo =Math.floor(Math.random() * arrayAns.length); 
        const randomAns = arrayAns[randomNo];
        
         //to make sure there is no repetiition
        arrayAns.splice(randomNo,1);
        
        let ansNode = document.createTextNode(randomAns);
        divTag.appendChild(ansNode);

    }
}

function ayy(data){
    console.log("clicked");
    question.innerHTML = "";
    const randomNo = Math.floor(Math.random() * data.length);
    const randomAns = data[randomNo];
    let questionSource = randomAns.question ;
        let questionNode = document.createTextNode(questionSource);
        question.appendChild(questionNode);

        let answerSource = randomAns.correct_answer;
        let answerArr = [answerSource]
        let incorrectSource = randomAns.incorrect_answers;
        incorrectSource.map(x => {
            answerArr.push(x);
        });

        data.splice(randomNo,1);

        createAnswerDiv(parentDiv,answerArr);
}

const question = document.getElementById("header");
fetch('https://opentdb.com/api.php?amount=10&category=31&type=multiple').then(response => response.json())
.then(
    data => {
        console.log(data.results);
        const arrayNeeded = data.results;
        arrayUsed = arrayNeeded.map(x => {return x});
        let questionSource = data.results[0].question ;
        let questionNode = document.createTextNode(questionSource);
        console.log(questionNode)
        console.log(question)
        question.appendChild(questionNode);

        let answerSource = data.results[0].correct_answer;
        let answerArr = [answerSource]
        let incorrectSource = data.results[0].incorrect_answers;
        incorrectSource.map(x => {
            answerArr.push(x);
        })

        createAnswerDiv(parentDiv,answerArr);

        arrayUsed.splice(0,1);

       
            button.addEventListener("click",function(){
                if(arrayUsed.length > 0){
                ayy(arrayUsed)
                console.log(arrayUsed.length);
                }
                else{
                    console.log(`done`);
                }
            });
        

        
    }

);