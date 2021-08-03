let questionAnswerArr;
let clickedElement1;
let clickedElement2;
let clickedElement3;
let clickedElement4;
let pageNo = 1;
var element1IsClicked = false;
var element2IsClicked = false;
var element3IsClicked = false;
var element4IsClicked = false; // declare the variable that tracks the state
function clickHandler(i){ // declare a function that updates the state
  console.log(i);
  if(i===0){
    element1IsClicked = true;
    clickedElement1 = document.getElementById(i);
    element2IsClicked = false;
    element3IsClicked = false;
    element4IsClicked = false;
    console.log(clickedElement1)
  }else if(i===1){
    element2IsClicked = true;
    clickedElement2 = document.getElementById(i);
    element1IsClicked = false;
    element3IsClicked = false;
    element4IsClicked = false;
    console.log(clickedElement2)
  }else if(i === 2){
    element3IsClicked = true;
    clickedElement3 = document.getElementById(i);
    element1IsClicked = false;
    element2IsClicked = false;
    element4IsClicked = false;
    console.log(clickedElement3)
  }else if(i === 3){
    element4IsClicked = true;
    clickedElement4 = document.getElementById(i);
    element1IsClicked = false;
    element3IsClicked = false;
    element2IsClicked = false;
    console.log(clickedElement4)
  }
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
    if (element1IsClicked) {
        rate_value = clickedElement1.innerHTML;
        console.log(rate_value);
        submitedAns.push(rate_value);
      }
      else if(element2IsClicked){
       rate_value = clickedElement2.innerHTML;
        console.log(rate_value);
        submitedAns.push(rate_value);
      }
      else if(element3IsClicked){
        rate_value = clickedElement3.innerHTML;
        console.log(rate_value);
        submitedAns.push(rate_value);
      }
      else if(element4IsClicked){
        rate_value = clickedElement4.innerHTML;
        console.log(rate_value);
        submitedAns.push(rate_value);
      }
      else{
          submitedAns.push(undefined);
      }

}

// This function renders html to the page
const renderFunct = (jsonData,indexArrNo,formTagFetch) => {
  document.getElementById("mainContainerNavQ").innerHTML = pageNo+"/10";
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
        p.classList.add("small-12-quiz","mainContainerAnswers","medium-6-quiz");
        p.setAttribute('id', j);
        p.setAttribute('onclick',`clickHandler(${j});`);
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
      gridItems[i].addEventListener('click', clickHandler());
      console.log(gridItems[i]);
    }

    button.addEventListener("click",function(){
          pageNo = pageNo + 1;
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