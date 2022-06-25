//do things in functions
//create a function that return a list of api
//variable
const promiseApi = async ()=>{
    const domain = "https://pokeapi.co/api/v2/";
    const pokemon = "pokemon/"+"?limit=20&offset=20";
    try{
        const url = domain + pokemon;
        let response = await fetch(url);
        if(response.ok){
            let string = await response.json();
            return string.results;
        }
    }catch(errors){
        console.log(errors);
    }
}
//populate the dropbox.
const insertDropdown = (pokemons)=>{
    const getSelect = document.querySelector("#searchBar");
    //console.log(getSelect);
    for(const pokemon of pokemons){
        let option = document.createElement("option");
        //create the element 
        option.value = pokemon.id; //store option value to identifier
        option.text = pokemon.name;
        getSelect.appendChild(option);
        //option.firstChild.selected;
    } 
    return getSelect;

}
//get the selected pokemon name
const pokemonName = (getSelect)=>{
      //get the text string
      const optionValue = getSelect.options[getSelect.selectedIndex].text;
      return optionValue;
}
//get return value and create a function that display info 
const promiseDetail = async (name)=>{
    const domain = "https://pokeapi.co/api/v2/";
    const pokemonName = `pokemon/${name}`;
    const url = domain + pokemonName;
    try{
       const response = await fetch(url);
       if(response.ok){
        const list = await response.json();
        const abilities = list.abilities;
        const frontImg = list.sprites.front_default;
        const obj = {
            "name": list.name,
            "abilities": abilities,
            "frontImg": list.sprites.front_default,
           };
           return obj;
       }
    }catch(errors){
        console.log(errors);
    }
}

//function to get abilities,
const displayAbilities = (obj)=>{
    const domain = "https://pokeapi.co/api/v2/";
       const string = "";
       const divAppil = document.querySelector("#ability");
       //console.log(divAppil);
       let h1 = document.createElement("h1");
       h1.setAttribute("id","abilityHead")
       h1.innerHTML = "Abilities";
       divAppil.appendChild(h1);
    const objName = obj.abilities.forEach(async (obj)=>{
        let name = obj.ability.name;
        const url = domain + "ability/" + name;
        try{
            const response = await fetch(url);
            //Going to display this thing.
            if(response.ok){
                let string = await response.json();
                 let h2 = document.createElement("h2");
                 h2.setAttribute("id","abilityName");
                h2.innerHTML = string.name;
                let p = document.createElement("p");
                p.setAttribute("id","abilityPara");
                p.innerHTML = string.effect_entries[1].effect;
               divAppil.appendChild(h2);
                divAppil.appendChild(p);
            }
        }catch(errors){
            console.log(errors);
        }
    });
    return obj;
    //const url = domain + pokemonName;
}

//const abilities = async()
// display speices, 
const speices = async (obj)=>{
    //get the domain
    const domain = "https://pokeapi.co/api/v2/";
    //get the url
    const url = domain + "pokemon-species/" + obj.name;
    try{
        const respond = await fetch(url);
        if(respond.ok){
            const result = await respond.json();
            //get text entries
            const text = result.flavor_text_entries;
            console.log(text[1].flavor_text);
            let string = "";
            let veryUniqueString ="";
            //loop through the the object
            for(let i =0; i<=10;i++){
                //console.log(text[i]);
                 //trying something new
                string += text[i].flavor_text;
                oneString = string.split(",").filter((element,index,array)=>{
                    return index == array.indexOf(element);
                }).join(",");
        }
        const h2 = document.createElement("h2");
        const p = document.createElement("p");
        const species = document.getElementById("species");
        h2.innerHTML = "Background Info:";
        p.innerHTML = oneString;
        species.appendChild(h2);
        species.appendChild(p);
                //console.log(text);
        }
        return obj;
    }catch(errors){
        console.log(errors);
    }
}
//get images
const imgName = async (obj)=>{
    console.log(obj);
    //get obj name
    const name = obj.name;
    //get obj images
    const img = obj.frontImg;
    console.log(img);
    //get image
        const imgCreate = document.createElement("img");
        imgCreate.src = img;
        imgCreate.setAttribute("id","img")
        let src = document.getElementById("sprite");
        src.appendChild(imgCreate);
        console.log(imgCreate);

 
    //get div
    const imgDiv = document.getElementById("sprite");
    //imgDiv.appendChild(img);
    //get heading
    const h1 = document.getElementById("name");
    //append it to the div
    h1.innerHTML = name;

}
//display images and name
//create clear screen;
function clearScreen(){
    //get the div
    const divAbility = document.getElementById("ability");
    const divSprite = document.getElementById("sprite");
    const divSpecies = document.getElementById("species");
    divAbility.innerHTML = "";
    divSprite.innerHTML = "";
    divSpecies.innerHTML = "";
    //clear the div
}

//When the button click it will loop through the code.
function whenClick(e){
    const divAbility = document.getElementById("ability");
    //console.log(divAbility.childNodes);
    if(divAbility.childNodes.length>3){
        clearScreen();
    }
    promiseApi().then(insertDropdown)
    .then(pokemonName)
    .then(promiseDetail)
    .then(speices)
    .then(displayAbilities)
    .then(imgName);
    e.preventDefault(true);
}
promiseApi().then(insertDropdown)
.then(pokemonName)
.then(promiseDetail)
.then(speices)
.then(displayAbilities)
.then(imgName);

//create an on click event 
//promiseDetail(pokemonName());
const btn = document.getElementById("playBtn");
btn.onclick=whenClick;

