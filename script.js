const newTask = document.querySelector('.newTaskBtn');
const taskContainer = document.querySelector('.taskContainer');
const clearAllBtn = document.querySelector('.clearTasks');
const progressBar = document.querySelector('.progressCur');
const allTracker = document.getElementById('allTracker');
const completedTracker = document.getElementById('completedTracker');

// preset task html
const task = `
        <div class='task'>
            <div class="checkbox"></div>
            <span id='task'>water the flowers</span>
        </div>
        <div class="right">
            <img src="images/delete_icon.svg" alt="">
            <span>edit</span>
        </div>
`;

// updates progress bar width & task count above
function updateProgress(){
        // declare var
    const tasks = document.querySelectorAll('#task')
    let count = 0
    let all = tasks.length
        // count complete tasks
    for(let i = 0 ; i < tasks.length ; i++) {
        if (tasks[i].parentNode.classList.contains('completeText')) count++
    }
        // update HTML and CSS
    completedTracker.textContent = count
    allTracker.textContent = all
    progressBar.style.width = 100*count/all + '%'
};

// create task function
function CreateTask(name) {
    taskContainer.appendChild(
        Object.assign(
            document.createElement('div'),
            {innerHTML: task}
        )
    )
};

// add onclick to btns (used when creating new task)
function addClickCapability(){
    const tasks = document.getElementsByClassName("task")
    const task = tasks[tasks.length-1]
    
    const fullTask = task.parentNode
    let completeBtn = fullTask.children[0]
    let removeBtn = fullTask.children[1].children[0]
    let editBtn = fullTask.children[1].children[1]

    completeBtn.onclick = function(){
        if (!this.classList.contains('completeText')){
            this.classList.add('completeText')
            this.children[0].classList.add('completeBox')
        }
        else {
            this.classList.remove('completeText')
            this.children[0].classList.remove('completeBox')
        }
        updateProgress()
    }

    removeBtn.onclick = function(){
        this.parentNode.parentNode.remove()
        updateProgress()
    }

    editBtn.onclick = function(){
        console.log(this)
        let newName = prompt('new name:', this.parentNode.parentNode.children[0].children[1].textContent)
        let cur = newName.replace(' ','')
        if (cur === "") return
        this.parentNode.parentNode.children[0].children[1].textContent = newName
    }

};

// onclick newTask -> new task
newTask.onclick = function(){    // new task
    let name = prompt('reminder name')
    let cur = name.replace(' ','')  //if task name empty -> skip
    if (cur === "") return
    CreateTask(name)     // create empty task
    const taskSpans = document.querySelectorAll('#task')        // set task name
    taskSpans[taskSpans.length-1].textContent = name
    addClickCapability()    // add click capability
    updateProgress()        //update progbar
};

// clear tasks
clearAllBtn.onclick = function(){
    const tasks = document.querySelector('.taskContainer').children
    while (tasks.length != 0)  tasks[0].remove()
    updateProgress()
};

// spacebar click creates new task
document.body.onkeyup = function(e) {
    if (e.key == " " || e.code == "Space" || e.keyCode == 32    // if clicked key is spacebar
    ) {     // new task
        let name = prompt('reminder name')      // ask for name
        let cur = name.replace(' ','')                    // check if name is empty
        if (cur === "") return
        CreateTask(name)                                  // create task
        const taskSpans = document.querySelectorAll('#task')    // set task name
        taskSpans[taskSpans.length-1].textContent = name
        addClickCapability()    // add click capability
        updateProgress()    //update progbar
    }
};