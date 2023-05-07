//variable
const input = document.querySelector('.input')
const addbutton = document.querySelector('.add')
const container = document.querySelector('.contain')
const editbutton = document.querySelector('.edit')

const list=[]
let idofElementtoEdit = null;
editbutton.style = "display:none"

//funtion
const updatetodoinstorage = ()=>{
    const stringified = JSON.stringify(list);
    localStorage.setItem('arr',stringified)
}

const showEdit =(id)=>{
    const element = list.find((ele) =>ele.id===id);
    input.value = element.text;
    addbutton.style="display:none"
    editbutton.style="display:inline"
    idofElementtoEdit=id;
    updatetodoinstorage()
}
const handleadd = () => {
    const val = input.value
    input.value=""
    if(val!=null && val!=""){
        list.push({
            text:val,
            completed:false,
            id:Date.now()
        })
        renderlist()
        updatetodoinstorage()
    }else{
         return window.alert("Invalid input")
    }
}
function renderlist () {
    container.innerHTML = ''
    list.forEach((ele)=>{
        const li = document.createElement("li")
        li.innerHTML=ele.text
        container.appendChild(li)
        const del = document.createElement("button")
        const edit = document.createElement("button")
         edit.innerHTML="Edit"
        del.innerHTML="Done"
        li.appendChild(del)
        li.appendChild(edit)
        del.addEventListener('click',()=>{
            li.remove()
            const id = ele.id
            const index = list.findIndex(ele => ele.id = id)
            list.splice(index,1)
            updatetodoinstorage()
        })
        edit.addEventListener('click',(e)=>{
            showEdit(ele.id)
 })


        li.style =`
        position:relative`

        del.style = `
        margin-left:10px;
        background-color:orange;
        color:white;
        border:2px solid hotpink;
        border-radius:10%;
        position:absolute;
        left:210px
        `
        edit.style = `
        margin-left:10px;
        background-color:orange;
        color:white;
        border:2px solid hotpink;
        border-radius:10%;
        position:absolute;
        left:250px
        `
     })
}

const handleEdit = () => {
    const newvalue = input.value
    const element = list.find((ele) => ele.id === idofElementtoEdit)
    element.text = newvalue
    renderlist()
    addbutton.style = "display:inline"
    editbutton.style ="display:none"
    input.value=""
    updatetodoinstorage()
}
const reload=((obj) => {
    obj.forEach((ele)=>{
        list.push({
            text:ele.text,
            completed:ele.completed,
             id:ele.id,  
        })
     })
     renderlist()
})

const initialise = () => {
    if(!localStorage.getItem('arr')){
        updatetodoinstorage()
    }
    const data = localStorage.getItem('arr')
    const finaldata = JSON.parse(data)
    // console.log(finaldata)
    updatetodoinstorage()
    reload(finaldata)
    updatetodoinstorage()

}


// setInterval(() => {
//     const stringified = JSON.stringify(list);
//     localStorage.setItem('arr',stringified)
// }, 500);

//main
initialise()
 addbutton.addEventListener('click',handleadd)
 editbutton.addEventListener('click',handleEdit)

