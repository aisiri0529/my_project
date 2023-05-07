
const generateRandomResponse = () =>(Math.random()*10).toFixed(0)%3

const rock = document.querySelector(".r")
const paper = document.querySelector(".p")
const scissor = document.querySelector(".s")
const us = document.querySelector(".user")
const cs = document.querySelector(".comp")
const msg = document.querySelector(".win")
const rnd = document.querySelector('.rnd')
let compscore =0
let uscore =0
let rn=0

rock.addEventListener("click", () => game(0))
paper.addEventListener("click", () => game(1))
scissor.addEventListener("click", () => game(2))


const game = (option) =>{
    compres = generateRandomResponse()
    rn++
    rnd.innerHTML=rn
    switch(option){
        case 0:
            switch(compres){
                case 0: 
                    msg.innerHTML ="tie"
                break;
                case 1:
                    msg.innerHTML ="looser!!!"
                    compscore++
                    cs.innerHTML=compscore
                    break;
                case 2:
                    msg.innerHTML ="winner!!!"
                    uscore++
                    us.innerHTML=uscore
                    break;
                default:break;
                 }
                break;
        case 1:
            switch(compres){
                case 0: 
                    msg.innerHTML ="winner!!!"
                    uscore++
                    us.innerHTML=uscore
                    break;
                case 1:
                    msg.innerHTML ="tie"
                    break;
                case 2:
                    msg.innerHTML ="looser!!!"
                    compscore++
                    cs.innerHTML=compscore
                    break;
                default:
                    break;
                 }
                break;
            case 2 :
                switch(compres){
                    case 0:
                        msg.innerHTML ="looser!!!"
                        compscore++
                        cs.innerHTML=compscore
                        break;
                    case 1:
                        msg.innerHTML ="winner!!!"
                        uscore++
                        us.innerHTML=uscore
                        break;
                    case 2:
                        msg.innerHTML ="tie"
                        break;
                    default:
                        break;
                 }
                 break;
             }
}
