import readLine from "readline";



function printUserGuid(){
        console.log("Select an Action: ");
        console.log("1. Add new Task");
        console.log("2. List all tasks");
        console.log("3. List completed tasks");
        console.log("4. Mark task as done");
        console.log("5. Delete a task");
        console.log("6. Sort tasks by the due date");
        console.log("7. Sort tasks by priority");
        console.log("8. Clear all tasks\n");



}


let read = readLine.createInterface({
    input:process.stdin,
    output:process.stdout
});


let tasks = [];
function userInput(){

    printUserGuid();
    read.question('Enter your Choice or type \'e\' to exit: ', (input) => {
        switch(input.trim()){
            case 'e':
                read.close();
                break;
            case '1':
                read.question("Task Description : ", (description) => {
                    console.log(description);
                    read.question("Task Date (Year-Month-Day) : ", (date) => {
                        console.log(date);
                            read.question("Task Priority (0 - 3)  : ", (priority) => {
                                let num = Number(priority);
                                
                                if(isNaN(priority))
                                    console.log("Priority must be a number\n");
                                else if(num < 0 ||num > 3)
                                    console.log("priority should be between 0 and 3\n");
                                else{
                                    let task = new Task(description,priority);
                                    task.date = new Date(date);
                                    tasks.push(task);
                                    console.log("Task Added Successfully\n");
                                }
                                
                                userInput();
                                
                            });
                        
                    
                       
                    });
                  
                });
               
           
                break;
            case '2': 
                if(tasks.length == 0){
                    console.log("There are no tasks currently\n");
                    userInput();
                    break;
                }
                console.log("-----------------")
                tasks.forEach((task,index)=>{
                    console.log(`Task ${index+1} ==> ${task.printInfo()} `);
                });
                console.log("-----------------")
                userInput();
                break;
            case '3':
                let completedTasks = tasks.filter((task)=>{
                    return task.completed;
                });
                if(completedTasks.length == 0){
                    console.log("There are no completed tasks currently");
                    userInput();
                    break;
                }
                console.log("-----------------")
                completedTasks.forEach((task,index)=>{
                    console.log(`Task ${index} ==> ${task.printInfo()} `);
                });
                console.log("-----------------")
                userInput();
                break;
            case '4':
                if(tasks.length == 0){      
                    console.log("There are no tasks currently\n");
                    userInput();
                    break;
                }
                tasks.forEach((task,index)=>{
                    console.log(`Task ${index} ==> ${task.printInfo()} `);
                });
                read.question(`Please choose the index of the task (from 0 to ${tasks.length-1}): `,(index)=>{
                    if(isNaN(index) || index < 0 || index >= tasks.length){
                        console.log(`Your Index : ${index} is out of range \n`);
                        userInput();
                    }
                    let updated = tasks.filter((task,i,arr) => {
                        return i == index;
                    })[0]; //filter by defualt returns array even if there is one element that meets the condition 
                    updated.completed = true;
                    console.log("Task Updated Successsfully!");
                    tasks[index] = updated;
                    userInput();
                });
                break;
            case '5':
                if(tasks.length == 0){      
                    console.log("There are no tasks currently\n");
                    userInput();
                    break;
                }
                tasks.forEach((task,index)=>{
                    console.log(`Task ${index} ==> ${task.printInfo()} `);
                });
                read.question(`Please choose the index of the task (from 0 to ${tasks.length-1}): `,(index)=>{
                    if(isNaN(index) || index < 0 || index >= tasks.length){
                        console.log(`Your Index : ${index} is out of range \n`);
                        userInput();
                    }
                    tasks.splice(index,1); // the value '1' indicated how many elements to delete starting from the given index
                    console.log("Task Deleted Successfully");
                    userInput();
                });
                break;
            case '6':
                if(tasks.length == 0){      
                    console.log("There are no tasks currently\n");
                    userInput();
                }
                
                tasks.sort((t1,t2)=> t1.date < t2.date);
                userInput();
                break;
            case '7':
                if(tasks.length == 0){      
                    console.log("There are no tasks currently\n");
                    userInput();
                    break;
                }
                tasks.sort((t1,t2)=>{
                  return  t1.priority - t2.priority;
                } );
                userInput();
                break;
            case '8':
                tasks = [];
                userInput();
                break;
            default:
                console.log("Invalid choice! \n")
                userInput();

        
        }   
      });
}


function Task(description,priority){
        this.description = description;
        this.priority = priority;
    }
   

function main () {
    console.log("*****************")
    console.log("Welocom to JS TODO-APP");
  
    Task.prototype.date = new Date("2023-5-19"); //default date for all 'Task' Object instances is the current date
    Task.prototype.completed = false; //initially the task is not completed 
    Task.prototype.printInfo = function(){
        return (`Description: ${this.description} , Priority: ${this.priority} , Completed: ${this.completed} , Date: ${this.date.toDateString()}`);
    }
    let task = new Task("task1",0)
    ,task1 = new Task("task2",1);

    tasks.push(task,task1);
    userInput();
   
 
}

main();
