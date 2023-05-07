//variables
const loadercontainer = document.querySelector('.loader')
const app_id = '1fbc3087'
const app_key = '650150df3349a69f17f5249c73e05ca6'
const input = document.querySelector('input')
const button = document.querySelector('button')
const outputcontainer = document.querySelector('.output')
//functions
const showloader = () => {
    loadercontainer.style = 'display:flex'
}
const hideloader = () => {
    loadercontainer.style = 'dispaly:none'
}
const generateendpoint = (searchString) => `https://api.edamam.com/api/recipes/v2?type=public&q=${searchString}&app_id=${app_id}&app_key=${app_key}`

const generatecard = (image, title) => `
<div class="card">
            <img src="${image}" alt="flower">
            <h1>${title}</h1>
            <ul>
                <li>the recipe is great</li>
                <li>Its easy to make</li>
                <li>sure you will love it</li>
                <li>happy cooking!!!</li>
            </ul>
        </div>`

const getrecipe = async () =>{
    try{
        showloader()
        const search = input.value
        const responce = await fetch(generateendpoint(search))
        console.log(responce)
        const data = await responce.json()
        console.log(data)
        const recipes = data.hits
        console.log(recipes)
        outputcontainer.innerHTML = '' 
        recipes.forEach((obj) => {
            const {recipe} = obj;
            const div = document.createElement('div')
            div.innerHTML = generatecard(recipe.image,recipe.label)
            outputcontainer.appendChild(div)
        });
    }catch(error){
        console.log(error)
    }finally{
        hideloader()
        input.value=""
    }
}


button.addEventListener('click',getrecipe)
