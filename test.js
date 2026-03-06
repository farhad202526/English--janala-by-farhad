


const creatElment =(arr) =>{
    const createHtml =arr.map(item=>`<span class="btn">${item}</span>`).join("");
    console.log(createHtml)

}

const synnim = ["hall","grass","gossdd"];
creatElment(synnim);
