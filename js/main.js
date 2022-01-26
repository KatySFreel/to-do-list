const offerBtn = document.getElementById('offer__btn');
const offerInput = document.getElementById('offer__input'); 
const wrapperList = document.querySelector('.wrapper__list');

let tasks;
!localStorage.tasks ? tasks = [] : tasks = JSON.parse(localStorage.getItem('tasks'));

function Task(desc) {
	this.desc = desc;
	this.completed = false;
}

const createTemplate = (task, index) => {
	return `
		<div class="todo-item">
			<div class="desc">${task.desc}</div>
			<div class="buttons">
				<input name="btn-complete" id="btn-complete" class="btn-complete" type="checkbox">
				<button class="btn-delete offer__btn" type="">Удалить</button>
			</div>
		</div>
	`
}

const fillH = () => {
	wrapperList.innerHTML = "";
	if(tasks.length > 0) {
		tasks.forEach((item, index) => {
			wrapperList.innerHTML += createTemplate(item, index);
		})
	}
}

const updateLocal = () => {
	localStorage.setItem('tasks', JSON.stringify(tasks));
}

offerBtn.addEventListener('click', () => {
	tasks.push(new Task(offerInput.value));
	updateLocal();
	fillH();
})
