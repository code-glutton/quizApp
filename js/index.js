let questionAnswerArr;
const button = document.getElementById("change");
const submit = document.getElementById("submit");
submit.disabled = true;
let h3TagFetch = document.getElementById("header");
let formTagFetch = document.getElementById("quizReg");
console.log(formTagFetch);
let no = 1;
let disableWatch = no;
const renderFunct = (jsonData,indexArrNo,formTagFetch) => {
    let i = indexArrNo;
    h3TagFetch.innerHTML = "";
    formTagFetch.innerHTML = "";

    // create questions
    let questionTextNode = document.createTextNode(jsonData[i].question);
    h3TagFetch.appendChild(questionTextNode);

    // create Answers
    
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
    renderFunct(json.results,0,formTagFetch);

 
        button.addEventListener("click",function(){
            if(no <= 9){
                renderFunct(json.results,no,formTagFetch);
                no = no + 1;
                console.log(no);

                if(no === 10){
                console.log("osas")
                button.disabled = true;
                var x = button.disabled
                console.log(x);
                submit.disabled = false;
            }
            }
            
            
           
        });
    }
   




request();

