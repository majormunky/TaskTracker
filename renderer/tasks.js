exports.tasks = JSON.parse(localStorage.getItem("tasks")) || {}

exports.getTasksForDate = dateStr => {
	if (dateStr in this.tasks) {
		return this.tasks[dateStr]
	}
	return false;
}

exports.addTaskForDate = (dateStr, taskType, taskHours, taskMinutes) => {
	console.log("Adding task for date")
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

exports.updateTaskForDate = (dateStr, taskType, taskHours, taskMinutes) => {
	console.log("Updating task for date")
	if (!(dateStr in this.tasks)) {
		console.log("Trying to update item but can't find date: " + dateStr)
		return false;
	}

	if (!(taskType in this.tasks[dateStr])) {
		console.log("Unable to find task type (" + taskType + ") for date: " + taskType)
		return false;
	}

	this.tasks[dateStr][taskType]["hours"] = parseInt(taskHours)
	this.tasks[dateStr][taskType]["minutes"] = parseInt(taskMinutes)

	this.save()
}

exports.save = () => {
	localStorage.setItem("tasks", JSON.stringify(this.tasks))
}
