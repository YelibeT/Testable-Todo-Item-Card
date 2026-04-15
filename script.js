const dueDate=new Date("2026-04-16T18:00:00Z")
const time=document.getElementById("time-remaining")
const checkbox=document.getElementById("complete-toggle")
const title=document.getElementById("todo-title")
const status=document.getElementById("status")

function updateTimeRemaining(){
    const now= new Date()
    const diff= dueDate-now;
    
    if (diff<=0){
        const hours=Math.floor(Math.abs(diff)/(1000*60*60))
        if (hours===0){
            time.textContent="Due now!"
        }else{
            time.textContent=`Overdue by ${hours} hours`
        }
        return;
    }
    const days=Math.floor(diff/(1000*60*60*24));
    if (days===0){
        time.textContent="Due tomorrow"
    }
    else{
        time.textContent=`Due in ${days} days`;
    }
}
updateTimeRemaining();
setInterval(updateTimeRemaining,60000)
checkbox.addEventListener("change",()=>{
    if(checkbox.checked){
        title.style.textDecoration="line-through"
        status.textContent="Done"
    }else{
        title.style.textDecoration='none'
        status.textContent="Pending"
    }
});

const editButton=document.querySelector('[data-testid="test-todo-edit-button"]')
editButton.addEventListener("click", ()=>console.log("edit clicked"))
const deleteButton=document.querySelector('[data-testid="test-todo-delete-button"]')
deleteButton.addEventListener("click",()=>console.log("delete clicked"))
