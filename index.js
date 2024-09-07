
let nextPositions = [{x:0 , y:0 }]
let head = nextPositions[0]
let gameover = false;
let direction = "right"
let previousdirection;
let X;
let Y;
let wait = (time)=>{
  return new Promise((res ,rej)=>{
    setTimeout(()=>{
          res();
    } , time)
  })
}
const creategameboard = ()=>{
   let Maindiv = document.createElement('div')
   Maindiv.style.border = '2px solid black'
   Maindiv.style.width = '500px'
   Maindiv.style.backgroundColor='rgb(220, 220, 220)'
   Maindiv.setAttribute('id','mainbox')
   for(let i = 0 ; i<=9 ; i++){
    let Row = document.createElement('div')
    Row.classList.add('row');
     for(let j = 0; j<=9; j++){
        let Col = document.createElement('div')
        Col.classList.add('col')
        Col.classList.add(`${j}_${i}`)
        Col.setAttribute('id' , `${j}_${i}`)
        Row.appendChild(Col);
     }
     Maindiv.appendChild(Row);
   }
  document.body.appendChild(Maindiv)
}

let controlsKey = ()=>{
   document.addEventListener('keydown' , (e)=>{
        switch(e.key){    
           case "ArrowUp":
              previousdirection = direction;
              if(previousdirection != 'down'){
                 direction = 'up'
              } 
             break;
   
           case "ArrowDown":
            previousdirection = direction;
            if(previousdirection != 'up'){
              direction = 'down'
           } 
              break;

           case "ArrowRight":
            previousdirection = direction;
            if(previousdirection != 'left'){
              direction = 'right'
           }  
              break;

           case "ArrowLeft":
            previousdirection = direction;
            if(previousdirection != 'right'){
              direction = 'left'
           } 
              break;      
        }
   })
}

let foodgenerator = ()=>{
   X = Math.floor(Math.random()*9)
   Y = Math.floor(Math.random()*9) 
  let foodBox = document.getElementById(`${X}_${Y}`)
   foodBox.classList.add('food')

  let obj = {x : nextPositions[nextPositions.length-1].x ,y : nextPositions[nextPositions.length-1].y}
  nextPositions.push(obj)
}


const headMovement = async()=>{
 try{  
    nextPositions.forEach(element => {
      let currentHeadPosition = document.getElementById(`${element.x}_${element.y}`)
      currentHeadPosition.classList.add('head'); 
    });
  }catch(err){
      gameover = true
  }

if(direction === "right"){
  await wait(100)
    head.x =head.x + 1
     console.log('x = ',head.x)
}else if(direction === "left"){
  await wait(100)
  head.x =head.x - 1
    console.log('y = ',head.y)  
}else if(direction === "up" ){
  await wait(100)
  head.y =head.y - 1
    console.log('x = ',head.x)
}else if(direction === "down"){
  await wait(100)
  head.y =head.y + 1
    console.log('y = ',head.y)
}

if(!gameover){
  document.querySelectorAll('.head').forEach(element => {
    if(element.classList.contains('head') && element.classList.contains('food')){
      element.classList.remove('food'); 
    foodgenerator();
    }
    element.classList.remove('head');
  });
    headMovement()
    snakeFollowed()
    owntouchmiss()
}else{
  let done =  confirm("GameOver")
  if(done){
    window.location.reload()
  }
}
controlsKey()
}


const snakeFollowed = () => {
  let newHead = {...head}
  var newSnake = [newHead]
   for(let i = 0; i<=nextPositions.length - 1; i++){
         newSnake.push(nextPositions[i])
         console.log("New Snake" , newSnake)
   }
   newSnake.pop()
   nextPositions = newSnake
  }

const owntouchmiss = ()=>{
    for(let i = 1 ; i<=nextPositions.length - 1 ; i++){
     if(nextPositions.length > 3){
      if(nextPositions[0].x == nextPositions[i].x && nextPositions[0].y == nextPositions[i].y){
        let done =  confirm("GameOver")
  if(done){
    window.location.reload()
  }
    } 
     } 
     
    }
}  

creategameboard();
headMovement();
foodgenerator();
