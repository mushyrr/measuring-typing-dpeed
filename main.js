

  // Catch Selectors
  let startButton = document.querySelector(".start");
  let lvlNameSpan = document.querySelector(".message .lvl");
  let secondsSpan = document.querySelector(".message .seconds");
  let theWord = document.querySelector(".the-word");
  let upcomingWords = document.querySelector(".upcoming-words");
  let input = document.querySelector(".input");
  let timeLeftSpan = document.querySelector(".time span");
  let scoreGot = document.querySelector(".score .got");
  let scoreTotal = document.querySelector(".score .total");
  let finishMessage = document.querySelector(".finish");
  
  let speed = document.querySelector('.speed')
  let mywps ;
  

  const keySound = document.getElementById('keySound');

  const keySoundbad = document.getElementById('keySoundbad');





let correctIndex = 0;




input.addEventListener('input', () => {
  const typedValue = input.value;
  const currentWorda = theWord.innerText.trim();

  // Iterate over each character in the typed value
  for (let i = 0; i < typedValue.length; i++) {
    // Check if the character matches the corresponding character in the current word
    if (typedValue && currentWorda && typedValue[i].toLowerCase() === currentWorda[i].toLowerCase()) {
      // Highlight the correct character
      
document.addEventListener('keypress', () => {
  keySound.play();
});
      theWord.innerHTML = `<span class="highlight">${currentWorda.slice(0, i + 1)}</span>${currentWorda.slice(i + 1)}`;
      correctIndex = i;
    } else if(typedValue && currentWorda && typedValue[i].toLowerCase() !== currentWorda[i].toLowerCase()) {
      keySoundbad.play();
      
      theWord.innerHTML = `<span class="reed">${currentWorda.slice(0, i + 1)}</span>${currentWorda.slice(i + 1)}`;
      correctIndex = i;
      // If the character doesn't match, break the loop
      break;
    }
  }

});







let myspeed = 10;





// Array Of Words
let myword = [];



let savedwods = localStorage.getItem('myword')
if (savedwods){
  myword = JSON.parse(savedwods)
}



let sentence = ["The quick brown fox jumps over the lazy dog" ,
"Sphinx of black quartz, judge my vow" ,
 "Pack my box with five dozen liquor jugs" ,
 "How quickly daft jumping zebras vex" ,
 "Crazy Fredrick bought many very exquisite opal jewels" ,
 "We promptly judged antique ivory buckles for the next prize" ];

 let words ;
 let savedtyping = localStorage.getItem('typing');
 if(savedtyping){
  words = savedtyping.split(',');
 }else{
    words = document.querySelector('input[name="typingtype"]:checked').value === 'sentence' ? sentence : myword;
    localStorage.setItem('typing', words);

 }

 
 var totalWords = words.reduce((count, s) => count + s.split(' ').filter(word => word !== '').length, 0);


 function handleOKClick2() {
   const selectedOption = document.querySelector('input[name="typingtype"]:checked');
   if (selectedOption) {
     words = selectedOption.value === 'sentence' ? sentence : myword;
     localStorage.setItem('typing', words);
     
   }
 
    totalWords = words.reduce((count, s) => count + s.split(' ').filter(word => word !== '').length, 0);
 
   scoreTotal.innerHTML = totalWords;
 
 }
 


  // Setting Levels
const lvls = {
    "easy": 8,
    "normal": 10,
    "hard": 16
};

//###############################################



let defaultLevelName =  document.querySelector('input[name="difficulty"]:checked').value;
let defaultLevelSeconds = lvls[defaultLevelName];


function inputval(){
var  selectedDifficulty =  document.querySelector('input[name="difficulty"]:checked').value;

  return  selectedDifficulty
}

function handleOKClick(){

  defaultLevelName = inputval();
  
  defaultLevelSeconds = lvls[defaultLevelName];
  
secondsSpan.innerHTML= defaultLevelSeconds;
timeLeftSpan.innerHTML= defaultLevelSeconds;
lvlNameSpan.innerHTML= defaultLevelName;


}

//###############################################




  // Setting Level Name + Seconds + Score
lvlNameSpan.innerHTML = defaultLevelName;
secondsSpan.innerHTML = myspeed;
timeLeftSpan.innerHTML = 0;
scoreTotal.innerHTML = totalWords;

  // Disable Paste Event
input.onpaste = function () {
    return false;
}

  // Start Game
startButton.onclick = function () {
  if (words != '') {
    
  
    this.remove();
    input.focus();
    // Generate Word Function
    genWords();
  }else{
    listaddwords()
  }
}

function genWords() {
  
    // Get Random Word From Array
    let randomWord = words[Math.floor(Math.random() * words.length)];
    // Get Word Index
    let wordIndex = words.indexOf(randomWord);
    // Remove WordFrom Array
    words.splice(wordIndex, 1);
    // Show The Random Word
    theWord.innerHTML = randomWord;
    // Empty Upcoming Words
    upcomingWords.innerHTML = '';
    // Generate Words
    for (let i = 0; i < words.length; i++) {
      // Create Div Element
    let div = document.createElement("div");
    let txt = document.createTextNode(words[i]);
    div.appendChild(txt);
    upcomingWords.appendChild(div);
    }
    // Call Start Play Function
    startPlay();
}

let myseconds = 0;

function startPlay() {
  
    timeLeftSpan.innerHTML = 0;
    let start = setInterval(() => {
    timeLeftSpan.innerHTML++;
    if (theWord.textContent.toLowerCase() === input.value.toLowerCase()) {
        // Stop Timer
        myseconds += +timeLeftSpan.innerText

        clearInterval(start);
        // Compare Words
        
          // Empty Input Field
        input.value = '';
          // Increase Score
          const currentWord = theWord.textContent;
          const wordCount = currentWord.split(' ').filter(word => word !== '').length;
      
          scoreGot.innerHTML = parseInt(scoreGot.innerHTML) + wordCount;

        mywps = Math.round(totalWords /  (myseconds / 60)) 
        if (words.length > 0) {
            // Call Generate Word Function
            genWords();
        } else {
            if(mywps > defaultLevelSeconds){
            let span = document.createElement("span");
            span.className = 'good';
            let spanText = document.createTextNode("Congratz");
            span.appendChild(spanText);
            finishMessage.appendChild(span);

            

            speed.innerHTML = intervalawords(mywps , 'spanspeed')
            // Remove Upcoming Words Box
            upcomingWords.remove();
            
            setInterval(()=>{
                window.location.reload()
            }, 70000)
            }else{
                
                speed.innerHTML = intervalawords(mywps , 'spanspeedbad')
                let span = document.createElement("span");
                span.className = 'bad';
                let spanText = document.createTextNode("Game Over");
                span.appendChild(spanText);
                finishMessage.appendChild(span);

                setInterval(()=>{
                    window.location.reload()
                }, 7000)
            }
        }

        
    }
    }, 1000);
}

function intervalawords(mystop , span){
    
    let e = 0
    let myint = setInterval(()=>{
        speed.innerHTML= `your Typing speed is <span id="${span}">${e++}</span> words in minute`
        if(e >= mystop){
            clearInterval(myint)
            speed.innerHTML = `your Typing speed is <span id="${span}">${e}</span> words in minute`
        }
        

    },75)

}













//##############################################################################
let gem = document.querySelector('.game')




document.querySelector('.gear').onclick = function(){
    document.querySelector('.setting-box').classList.toggle("open");
  }
  
  const  colorsli = document.querySelectorAll(".colorslist li");
  
  colorsli.forEach(li =>{
    li.addEventListener("click", (e) =>{
  
        
  
        document.documentElement.style.setProperty("--main--color" , e.target.dataset.color);
        localStorage.setItem("color-option",  e.target.dataset.color);
  
  });
  
  
  });
  
  
  
  let addwords = document.querySelector('.addwords');
  
  addwords.addEventListener('click', listaddwords)

   function listaddwords() {
  
    let divcont = document.createElement('div');
    divcont.className = 'divcont';
    let divword = document.createElement('div');
    divword.className = 'divword';
  
    let removespan = document.createElement('span')
    removespan.className = 'removespan'
    removespan.innerHTML = 'X'
    divword.append(removespan)
  
  
    let inputword = document.createElement('input')
    inputword.name = "vv";
    inputword.className = 'inputword';
    let buttadd = document.createElement('button');
    buttadd.className = 'buttadd';
  
    gem.appendChild(divcont);
    divcont.appendChild(divword);
    divword.appendChild(inputword);
    divword.appendChild(buttadd);
    let buttext = document.createTextNode('Add');
    buttadd.appendChild(buttext);
  
    inputword.focus();
    document.querySelector('.setting-box').classList.remove("open");
  
  
    buttadd.addEventListener('click',()=> btnadd(inputword , divlist) )
    removespan.addEventListener('click' , ()=> removespanB())
  
  
  
    let ullist = document.createElement('div');
    let divlist = document.createElement('ul');
    ullist.appendChild(divlist)
    divword.appendChild(divlist)
    
    divlist.innerHTML = ''; // Clear the existing list before creating a new one
  
    for (let i = 0; i < words.length; i++) {
      divlist.innerHTML += `
        <li class="lists">${words[i]}</li>
      `;
  
    }
  scoreTotal.innerHTML= totalWords;
  
  
  }
  
  
  
  
  function btnadd(inpu , divlist) {
    if(inpu.value != ''){
  
      myword.push(inpu.value);
  
      localStorage.setItem('myword' , JSON.stringify(myword))
  
      inpu.value = '';
      inpu.focus()

      handleOKClick2()
 
  
      
  
      
    divlist.innerHTML = ""; // Clear the existing list before creating a new one
    for (let i = 0; i < myword.length; i++) {
      divlist.innerHTML += `
        <li class="lists">${myword[i]}</li>
      `;
  
    }
  
    //  document.querySelector('.divcont').remove()
    }
      
  createlist();
  scoreTotal.innerHTML= totalWords;
    }
  
    let locc = document.querySelector('.local ul')
  
  
  
    
  
  
  function createlist() {
    locc.innerHTML = ""; // Clear the existing list before creating a new one
    for (let i = 0; i < myword.length; i++) {
      locc.innerHTML += `
        <li class="lists" onclick="delett(event)">${myword[i]}</li>
      `;
    }
    
  scoreTotal.innerHTML= totalWords;
  }
  
  createlist();
  
  function delett(event) {
    const clickedWord = event.target.textContent;
    const index = myword.indexOf(clickedWord);
    if (index !== -1) {
      myword.splice(index, 1);
      localStorage.myword = JSON.stringify(myword);
      createlist();
      handleOKClick2()
    }
  }

  
function shwoli(val){
    val.classList.toggle('shwo')
  }

  
function removespanB(){
    document.querySelector('.divcont').remove()
  }
  

  
let renj = document.querySelector('.renj');

let typingtype = document.querySelector('.typingtype');

function shwoli(val){
  val.classList.toggle('shwo')
}


