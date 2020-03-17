const {getTasksForDate, addTaskForDate, updateTaskForDate, deleteTaskForDate} = require("./tasks")

let showModal = document.getElementById("show-modal")
let prevDay = document.getElementById("prev-day")
let nextDay = document.getElementById("next-day")
let dateInput = document.getElementById("selected-date")
let modal = document.getElementById("modal");
let closeModal = document.getElementById("close-modal")
let addItem = document.getElementById("add-item")
let saveItem = document.getElementById("save-item")
let deleteItem = document.getElementById("delete-item")
let taskType = document.getElementById("task-type")
let hoursInput = document.getElementById("add-hours")
let minutesInput = document.getElementById("add-minutes")
let itemBox = document.getElementById("items")
let editButtons = document.querySelector(".edit-button")
let selectedDate = new Date()

function buildDateString(date) {
	let monthNum = date.getMonth() + 1
	return monthNum + "-" + date.getDate() + "-" + date.getFullYear()
}

function updateDateBox() {
	dateInput.value = buildDateString(selectedDate);	
}

function buildTime(hours, minutes) {
	let minFraction = minutes / 60
	let result = parseFloat(hours) + minFraction
	return parseFloat(result.toFixed(2))
}

prevDay.addEventListener("click", e => {
	selectedDate.setDate(selectedDate.getDate() - 1)
	updateDateBox()
	refreshTasks()
})

nextDay.addEventListener("click", e => {
	selectedDate.setDate(selectedDate.getDate() + 1)
	updateDateBox()
	refreshTasks()
})

showModal.addEventListener("click", e => {
	modal.style.display = "flex"
	saveItem.style.display = "none"
	deleteItem.style.display = "none"
	addItem.style.display = "inline"
})

closeModal.addEventListener("click", e => {
	modal.style.display = "none"
})

addItem.addEventListener("click", e => {
	let kind = taskType.value
	let hours = hoursInput.value
	let minutes = minutesInput.value
	// let totalTime = buildTime(hours, minutes)
	let selectedDateStr = buildDateString(selectedDate)

	addTaskForDate(selectedDateStr, kind, hours, minutes)

	refreshTasks()
	closeModal.click()
})

saveItem.addEventListener("click", e => {
	let kind = taskType.value
	let hours = hoursInput.value
	let minutes = minutesInput.value
	let selectedDateStr = buildDateString(selectedDate)

	updateTaskForDate(selectedDateStr, kind, hours, minutes)
	refreshTasks()
	closeModal.click()
})

deleteItem.addEventListener("click", e => {
	let kind = taskType.value
	let selectedDateStr = buildDateString(selectedDate)

	deleteTaskForDate(selectedDateStr, kind)
	refreshTasks()
	closeModal.click()
})

function addEditButtonListeners() {
	console.log("addEditButtonListeners running")
	let editButtons = document.querySelectorAll(".edit-button")

	for (var i = 0; i < editButtons.length; i++) {
		console.log("found edit button")
		editButtons[i].addEventListener("click", e => {
			let item = e.target.dataset.item
			let hours = e.target.dataset.timeHours
			let minutes = e.target.dataset.timeMinutes
			let date = buildDateString(selectedDate)

			
			showModal.click()
			addItem.style.display = "none"
			saveItem.style.display = "inline"
			deleteItem.style.display = "inline"
			taskType.value = item
			hoursInput.value = hours
			minutesInput.value = minutes
		})
	}
}

function refreshTasks() {
	console.log("Refreshing Tasks")
	let selectedDateStr = buildDateString(selectedDate)
	let taskItems = getTasksForDate(selectedDateStr)
	let task
	let output = ""
	for (var item in taskItems) {
		task = taskItems[item]
		output += "<div class='task-item'>"
		output += "<button class='edit-button' data-item='" + item + "' ";
		output += "data-time-hours='" + task.hours + "' ";
		output += "data-time-minutes='" + task.minutes + "'>Edit</button>"
		output += "<h1>" + item + "</h1>"
		output += "<div class='task-time-hours'>" + parseInt(task.hours) + "</div>"
		output += "<div class='task-time-minutes'>" + parseInt(task.minutes) + "</div>"
		output += "<div class='task-status'>" + task.status + "</div></div>"
	}
	items.innerHTML = output;
	addEditButtonListeners();
}

updateDateBox()
refreshTasks()