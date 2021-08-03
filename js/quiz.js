let questionAnswerArr;
var elementIsClicked = false; // declare the variable that tracks the state
function clickHandler(){ // declare a function that updates the state
  elementIsClicked = true;
}


const button = document.getElementById("change");
const submit = document.getElementById("submit");
submit.disabled = true;

let h3TagFetch = document.getElementById("header");
let formTagFetch = document.getElementById("quizReg");
console.log(formTagFetch);

let no = 1;

const submitedAns = [];
const scoreAns = [];

// this function is what picks the selected answer
const getAnswer = (id,id2,id3,id4) => {
    if (document.getElementById(id).checked) {
        rate_value = document.getElementById(id).innerHTML;
        console.log(rate_value);
        submitedAns.push(rate_value);
      }
      else if(document.getElementById(id2).checked){
       rate_value = document.getElementById(id2).innerHTML;
        console.log(rate_value);
        submitedAns.push(rate_value);
      }
      else if(document.getElementById(id3).checked){
        rate_value = document.getElementById(id3).innerHTML;
        console.log(rate_value);
        submitedAns.push(rate_value);
      }
      else if(document.getElementById(id4).checked){
        rate_value = document.getElementById(id4).innerHTML;
        console.log(rate_value);
        submitedAns.push(rate_value);
      }
      else{
          submitedAns.push(undefined);
      }

}

// This function renders html to the page
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
        
       
        let p = document.createElement("p");
        p.classList.add("small-12-quiz","mainContainerAnswers");
        p.setAttribute('id', j);
        p.appendChild(document.createTextNode(answerArr[randomNo]));
        formTagFetch.appendChild(p);

        // this makes sure that options are not repeated by removing any redered option from the array
        answerArr.splice(randomNo,1);
    }
}

// this function makes the fetch api synchronous
const request = async () => {
    const response = await fetch('https://opentdb.com/api.php?amount=10&category=31&type=multiple');
    const json = await response.json();
    console.log("res", json.results);

    renderFunct(json.results,0,formTagFetch);

    
    console.log(document.getElementsByClassName("mainContainerAnswers"));
    var gridItems = document.getElementsByClassName("mainContainerAnswers");

    for (var i = 0; i < gridItems[0].length; i ++) {
      gridItems.addEventListener('click', clickHandler);
    }

    button.addEventListener("click",function(){
            if(no <= 9){
                getAnswer(0,1,2,3);
                renderFunct(json.results,no,formTagFetch);
                no = no + 1;
                if(no === 10){
                    button.disabled = true;
                    var x = button.disabled
                    submit.disabled = false;
                
                }
            }   
        });

    submit.addEventListener("click",function(){
        getAnswer(0,1,2,3);
        json.results.map(x => {
           return submitedAns.map(y => {
                if((x.correct_answer === y)  && (submitedAns.length <= 10)){
                   scoreAns.push(y);
                }
                
            });
            
        });
        swal({
            icon: "success",
            title: "Your Score is",
            text: scoreAns.length*10 + "%"
          });
        console.log(submitedAns);
    })

}
   




request();