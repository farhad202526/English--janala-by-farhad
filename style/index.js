



const creatElment =(arr) =>{
    const createHtml =arr.map(item=>`<span class="btn">${item}</span>`).join("");
    return createHtml;

}

// procunciation 

function pronounceWord(word) {
  const utterance = new SpeechSynthesisUtterance(word);
  utterance.lang = "en-EN"; // English
  window.speechSynthesis.speak(utterance);
}

/* leasonsloes  */

const leasonlogad=()=>{
    fetch("https://openapi.programming-hero.com/api/levels/all")

    .then(res=>res.json())
    .then((json)=>displyleasson(json.data))
};

/* remove all btn */ 
const removeActiveClass=()=>{
    const LeasonBtn=document.getElementsByClassName("leason-btn");
   for(const btn of LeasonBtn){
    btn.classList.remove("active");
   }


}

/* manage spainner */
const manageSpinner = (statas) => {
    if(statas==true){
        document.getElementById("spanin").classList.remove("hidden");
        document.getElementById("word-contraner").classList.add("hidden");
    }else{
        document.getElementById("spanin").classList.add("hidden");
        document.getElementById("word-contraner").classList.remove("hidden");
    }
};



/* loadlessonword */
const loadLessonWord=(id)=>{
    manageSpinner(true);
  
  const url=`https://openapi.programming-hero.com/api/level/ ${id}`
 fetch(url)
 .then(res=>res.json())
 .then((data)=>{
    removeActiveClass();

    const clickBtn =document.getElementById(`lesson-btn-${id}`);
   /*  console.log(clickBtn) */
   clickBtn.classList.add("active");
    displpyWord(data.data)
 });

}

const loadWordDetails= async(id)=>{
    const url=`https://openapi.programming-hero.com/api/word/${id}`
    
    
    const res=await fetch(url);
    const datails=await res.json();
    displyWordDetails(datails.data);

}

const displyWordDetails=(word)=>{
    console.log(word)

    const wordDetailsContaner =document.getElementById("datails-box");


/*     {
    "word": "Eager",
    "meaning": "আগ্রহী",
    "pronunciation": "ইগার",
    "level": 1,
    "sentence": "The kids were eager to open their gifts.",
    "points": 1,
    "partsOfSpeech": "adjective",
    "synonyms": [
        "enthusiastic",
        "excited",
        "keen"
    ],
    "id": 5
} */

    wordDetailsContaner.innerHTML=` <div>
      <h2 class="text-2xl font-bold">${word.word} (<i class="fa-solid fa-microphone-lines"></i>:${word.pronunciation})</h2>
      
    </div>
    <div>
      <h2 class="font-bold">meaning </h2>
      <p>${word.meaning}</p>
    </div>
    <div>
      <h2 class="font-bold">Example</h2>
      <p>${word.sentence}</p>
    </div>
    <div>
      <h2 class="font-bold">সমার্থক শব্দ গুলো</h2>
      <div class="flex gap-2 mt-2">
        ${creatElment(word.synonyms)}
      </div>
    </div>`
    document.getElementById("my_modal_5").showModal();
}



/* {
    "id": 5,
    "level": 1,
    "word": "Eager",
    "meaning": "আগ্রহী",
    "pronunciation": "ইগার"
} */

const displpyWord=(Words)=>{

   const WordContaner=document.getElementById("word-contraner");
   WordContaner.innerHTML="";
  
   if(Words.length==0){
    WordContaner.innerHTML=`<div class=" rounded-xl  col-span-full text-center py-8 space-y-10 font-bangla
    ">
    <img class="mx-auto" src="assets/alert-error.png" alt="">
      <p class="text-2xl font-medium text-gray-400">এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।</p>
      <h2 class="font-bold text-4xl">নেক্সট Lesson এ যান</h2>
    </div>`;
    manageSpinner(false);

    return;

   }

    for(const word of Words){   

        console.log(word)

        const cardDiv=document.createElement("div");

        cardDiv.innerHTML=` <div class="crad  bg-white py-10 px-11 rounded-xl shadow-sm text-center  border-1 border-slate-400 space-y-4  ">
        <h2 class=" font-bold text-2xl">${word.word? word.word:"shobdo nai"}</h2>
        <p class=" font-semibold">Meaning /Pronounciation</p>
        <div class="font-bangla text-2xl font-bold ">${word.meaning ?word.meaning : "Meaning not available"} / ${word.pronunciation ? word.pronunciation : "Pronunciation not available"}</div>
        <div class="flex  items-center  justify-between mt-2 gap-4 px-4">
            <button onclick="loadWordDetails(${word.id})" class="btn"><i class="fa-solid fa-circle-info"></i></button>
            <button onclick="pronounceWord('${word.word}')" class="btn" ><i class="fa-solid fa-volume-high"></i></button>
        </div>

    </div>`
        WordContaner.append(cardDiv);
    }

    manageSpinner(false);
      
 
}

/* lessone all */
const displyleasson=(leasons)=>{
    
    /* get level contaner */
    const leveLcontaner=document.getElementById("level-container");

   /*  level-container empy */
   leveLcontaner.innerHTML="";
    /* donig loop for all leason */
    for(const leason of leasons){
        console.log(leason)
        /* create a new div for each */
        const btnDiv=document.createElement("div");
        btnDiv.innerHTML=`
        <button id="lesson-btn-${leason.level_no}" onclick="loadLessonWord(${leason.level_no})" class="btn btn-outline btn-success  leason-btn">
        <i class="fa-solid fa-book-open"></i>
         Lesson ${leason.level_no}
        </button>`


        leveLcontaner.append(btnDiv);


    };
   


}

leasonlogad()


document.getElementById("btn-search").addEventListener("click",()=>{
    removeActiveClass()
    const searchvalue =document.getElementById("input-search").value.trim().toLowerCase();
    console.log(searchvalue);


    fetch("https://openapi.programming-hero.com/api/words/all")

    .then(res=>res.json())
    .then((data)=>{
        const allWords=data.data;

        // const allterWord=allWords.find(word=>word.word.toLowerCase()===searchInput);
        const filerWord= allWords.filter(word=>word.word.toLowerCase().includes(searchvalue));

        displpyWord(filerWord)
    })
        



    

})

