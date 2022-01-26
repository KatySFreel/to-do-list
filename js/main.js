const offerBtn = document.getElementById('offer__btn');
const offerInput = document.getElementById('offer__input'); 
const wrapperList = document.querySelector('.wrapper__list');

let tasks;
!localStorage.tasks ? tasks = [] : tasks = JSON.parse(localStorage.getItem('tasks'));

let todoItem = [];

function Task(desc) {
	this.desc = desc;
	this.completed = false;
}

const createTemplate = (task, index) => {
	return `
		<div class="todo-item ${task.completed ? 'checked' : ''}">
			<div class="desc">${task.desc}</div>
			<div class="buttons">
				<input onclick="completeTask(${index})" class="btn-complete" type="checkbox" ${task.completed ? 'checked' : ''}>
				<button onclick="deleteTask(${index})" class="btn-delete offer__btn" type="">Удалить</button>
			</div>
		</div>
	`
}

const filterTasks = () =>  {
	const activeTasks = tasks.length && tasks.filter(item => item.completed == false);
	const completeTasks = tasks.length && tasks.filter(item => item.completed == true);
	tasks = [...activeTasks, ...completeTasks];
}

const fillH = () => {
	wrapperList.innerHTML = "";
	if(tasks.length > 0) {
		filterTasks();
		tasks.forEach((item, index) => {
			wrapperList.innerHTML += createTemplate(item, index);
		});
		todoItem = document.querySelectorAll('.todo-item');
	}
}

fillH();

const updateLocal = () => {
	localStorage.setItem('tasks', JSON.stringify(tasks));
}

const completeTask = (index) => {
	tasks[index].completed = !tasks[index].completed;
	if(tasks[index].completed) {
		todoItem[index].classList.add('checked');
	} else {
		todoItem[index].classList.remove('checked');
	}
	updateLocal();
	fillH();
}

offerBtn.addEventListener('click', () => {
	tasks.push(new Task(offerInput.value));
	updateLocal();
	fillH();
	offerInput.value = '';
})

const deleteTask = index => {
	todoItem[index].classList.add('del')
	setTimeout(() => {
		tasks.splice(index, 1);
		updateLocal();
		fillH();
	},500)
}
