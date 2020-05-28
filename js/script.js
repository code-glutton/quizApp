console.log("working");
const parentDiv = document.getElementById("quizReg");
const button = document.getElementById("change");
let answerSource;
let rate_value;
let answerSource1
const getAnswer = (id,id2,id3,id4) => {

    if (document.getElementById(id).checked) {
        rate_value = document.getElementById(id).value;
        console.log(rate_value);
      }
      else if(document.getElementById(id2).checked){
       rate_value = document.getElementById(id2).value;
        console.log(rate_value);
      }
      else if(document.getElementById(id3).checked){
        rate_value = document.getElementById(id3).value;
        console.log(rate_value);
      }
      else{
        rate_value = document.getElementById(id4).value;
        console.log(rate_value);
      }

}

const createAnswerDiv = (parentDiv,arrayAns) => {
    // clear the contents of the parent div so that it renders a whole new set of answers
    parentDiv.innerHTML = "";
    let id 
    // a for loop that populates the parent div with the answers
    for(let i = 0; i <= 3; i++){
        let divTag = document.createElement("input");
        let label = document.createElement("label");
        id = i;
        divTag.setAttribute('type', 'radio');
        divTag.setAttribute('name', "answer");
        divTag.setAttribute('id', i);
       
        parentDiv.appendChild(divTag);
        parentDiv.appendChild(label);

        // this is where a the answers are randomized. randomNo generates 
        // a random number based on the array length and then it is passed as an index to the answer array
        const randomNo =Math.floor(Math.random() * arrayAns.length); 
        const randomAns = arrayAns[randomNo];
        
        divTag.setAttribute('value', randomAns.toString());
         //to make sure there is no repetiition
        arrayAns.splice(randomNo,1);
        
        let ansNode = document.createTextNode(randomAns);
        label.appendChild(ansNode);
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

        answerSource = randomAns.correct_answer;
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

        answerSource1 = data.results[0].correct_answer;
        let answerArr = [answerSource1]
        let incorrectSource = data.results[0].incorrect_answers;
        incorrectSource.map(x => {
            answerArr.push(x); 
        })

        createAnswerDiv(parentDiv,answerArr);

        arrayUsed.splice(0,1);

        let correctAnswerArr = [answerSource1]
        let selectedanswerArr = []
       
            button.addEventListener("click",function(){
                if(arrayUsed.length > 0){
                //     console.log(answerSource);
                
                
                //  console.log(correctAnswerArr);
                ayy(arrayUsed);
                if (document.getElementById("0").checked) {
                    rate_value = document.getElementById(id).value;
                    console.log(rate_value);
                  }
                  else if(document.getElementById("1").checked){
                   rate_value = document.getElementById(id2).value;
                    console.log(rate_value);
                  }
                  else if(document.getElementById("2").checked){
                    rate_value = document.getElementById(id3).value;
                    console.log(rate_value);
                  }
                  else{
                    rate_value = document.getElementById("3").value;
                    console.log(rate_value);
                  }
                correctAnswerArr.push(answerSource);
                selectedanswerArr.push(rate_value);
                console.log(arrayUsed.length);

                }
                else{
                    console.log(`done`);
                    
                    console.log(correctAnswerArr)
                    console.log(selectedanswerArr)
                }
            });
        

        
    }

);