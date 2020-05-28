let questionAnswerArr;
const button = document.getElementById("change");
let h3TagFetch = document.getElementById("header");

const renderFunct = (jsonData,indexArrNo) => {
    let i = indexArrNo;
    // create questions
    h3TagFetch.innerHTML = "";
    
    let questionTextNode = document.createTextNode(jsonData[i].question);
    h3TagFetch.appendChild(questionTextNode);

    // create Answers
    let formTagFetch = document.getElementById("quizReg");
    let answerArr = [jsonData[i].correct_answer]
    jsonData[i].incorrect_answers.map(x => {
        return answerArr.push(x);
    });

    for(let j = 0; j <= 3; j++){
        // So that the options are properly randomized here is a simple way to randomize the index selected in the
        // array
        const randomNo =Math.floor(Math.random() * answerArr.length); 
        
        let divTag = document.createElement("input");
        let label = document.createElement("label");
        divTag.setAttribute('type', 'radio');
        divTag.setAttribute('name', "answer");
        divTag.setAttribute('value', answerArr[randomNo] );
        divTag.setAttribute('id', j);
        label.appendChild(document.createTextNode(answerArr[randomNo]));
        formTagFetch.appendChild(divTag);
        formTagFetch.appendChild(label);

        // this makes sure that options are not repeated by removing any redered option from the array
        answerArr.splice(randomNo,1);
    }
}

const request = async () => {
    const response = await fetch('https://opentdb.com/api.php?amount=10&category=31&type=multiple');
    const json = await response.json();
    console.log("res", json.results);
    questionArr = json.results.map(x => {
                  return [x.question,[x.correct_answer,x.incorrect_answers]];
             });
    console.log(questionArr);
    renderFunct(json.results,0);

    button.addEventListener("click",function(){

        let no = 1;
        renderFunct(json.results,no);
        no++;
    })
}

request();

