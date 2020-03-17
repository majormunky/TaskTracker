exports.tasks = JSON.parse(localStorage.getItem("tasks")) || {}

exports.getTasksForDate = dateStr => {
	if (dateStr in this.tasks) {
		return this.tasks[dateStr]
	}
	return false;
}

exports.addTaskForDate = (dateStr, taskType, taskHours, taskMinutes) => {
	if (!(dateStr in this.tasks)) {
		this.tasks[dateStr] = {}
	}
	if (!(taskType in this.tasks[dateStr])) {
		this.tasks[dateStr][taskType] = {"hours": 0, "minutes": 0, "status": false}
	}

	this.tasks[dateStr][taskType]["hours"] += parseInt(taskHours)
	this.tasks[dateStr][taskType]["minutes"] += parseInt(taskMinutes)

	this.save()
}

exports.save = () => {
	localStorage.setItem("tasks", JSON.stringify(this.tasks))
}
