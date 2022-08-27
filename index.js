const todoTitle = document.getElementById("title");
const todoDesc = document.getElementById("desc");
const submitToDoButton = document.getElementById("submit");
const mainList = document.getElementById("main");
const bogh = document.getElementById("alert");

const savedLctodo = localStorage.getItem("TODO");
const parseSaveTodo = JSON.parse(savedLctodo) ||  [];

let saveTodo = [...parseSaveTodo];




const createNewTodo =(title,desc,id,check)=>{
  const listItem = document.createElement("li");
  listItem.id = id;
const todoTitleHeading = document.createElement("h3");
const todoTitleInput = document.createElement("input");
todoTitleInput.disabled = true;
todoTitleInput.defaultValue = title;
todoTitleHeading.appendChild(todoTitleInput);
todoTitleInput.className = "form form-check border-0 w-100 border-0 input-font-edit text-black pt-1"
todoTitleInput.style.backgroundColor = "transparent"
if(check){
  todoTitleHeading.style.backgroundColor = "green"
}

const todoDescPara = document.createElement("p");
todoDescPara.innerHTML = desc;


listItem.appendChild(todoTitleHeading);
listItem.appendChild(todoDescPara);

const div = document.createElement("div");
div.className = "div"
const button1 = document.createElement("button");
button1.innerHTML = "Delete";
// button1.id = id;
button1.className = "btn btn-outline-danger"
const button2 = document.createElement("button");
button2.innerHTML = "Edit";
button2.className = "btn btn-outline-primary"
const button3 = document.createElement("button");
button3.innerHTML = "Check";
button3.className = "btn btn-outline-success"
div.appendChild(button1);
div.appendChild(button2);
div.appendChild(button3);





mainList.appendChild(listItem);
listItem.appendChild(div);
};

saveTodo.forEach((todo)=>{
  createNewTodo(todo.title , todo.desc , todo.id , todo.check) 
});

const handelCreateNewTodo = (event) =>{
  event.preventDefault();
  
  bogh.style.right = "100%"
       if(!todoTitle.value) return  bogh.style.right = "0%"  ,
     setTimeout(() => {
      bogh.style.right = "100%" 
    },2000);

    const newTodo = {
        id : Date.now(),
        title: todoTitle.value,
        desc: todoDesc.value,
        check : false,
    };

saveTodo.push(newTodo);
localStorage.setItem("TODO",JSON.stringify(saveTodo));



createNewTodo(newTodo.title , newTodo.desc , newTodo.id) 


};

submitToDoButton.addEventListener("click" , handelCreateNewTodo);
mainList.addEventListener("click", (event)=>{

  
  if(event.target.innerText === "Delete"){
  const todoElemnt = event.target.parentElement.parentElement
  const filterstodos = saveTodo.filter((item)=> item.id !== Number(todoElemnt.id));
  
  
  localStorage.setItem('TODO',JSON.stringify(filterstodos));
  location.reload();
}else if(event.target.innerText === "Check"){
  const todoElemnt = event.target.parentElement.parentElement;
  const filtredTodo = saveTodo.filter((item)=> item.id === Number(todoElemnt.id));
  const updatefiltredTodo = {...filtredTodo[0] , check:true};
  const filterstodos = saveTodo.filter((item)=> item.id !== Number(todoElemnt.id));
  
  const updatedSaveTodos = [...filterstodos, updatefiltredTodo];
  
  localStorage.setItem("TODO",JSON.stringify(updatedSaveTodos));
  location.reload();
}else if(event.target.innerText === "Edit"){
  const todoEl = event.target.parentElement.parentElement;
  todoEl.children[0].children[0].disabled = false;
  todoEl.children[0].children[0].select();
  todoEl.children[0].children[0].style.backgroundColor = "bule";
  event.target.innerText = "Save";
  event.target.addEventListener("click",()=>{
  const filtredTodo = saveTodo.filter(
    (item)=> item.id === Number(todoEl.id)
    );
  const updatefiltredTodo = {...filtredTodo[0] , title: todoEl.children[0].children[0].value};

  const filterstodos = saveTodo.filter(
    (item)=> item.id !== Number(todoEl.id)
    );
  
  const updatedSaveTodos = [...filterstodos, updatefiltredTodo];
  
  localStorage.setItem("TODO",JSON.stringify(updatedSaveTodos));
  location.reload();
  });
  
}
  });