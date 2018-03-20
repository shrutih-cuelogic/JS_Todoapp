var editTodoTaskServices = (function() {

    var activeUser = mainServices.getActiveUser(),
        allTaskList = mainServices.getAllTasks(activeUser);

    var editTodoTask = function(index) {

        mainServices.clearAllTodoCategories("editCategory");
        mainServices.closeForm("addTaskForm");

        document.getElementById("editTaskForm").removeAttribute("hidden");
        document.getElementById("editReminderDateDiv").setAttribute("hidden", "hidden");
        document.getElementById("editReminderDate").value = "";

        var task = allTaskList[index]

        document.getElementById("taskIndex").value = index;
        document.getElementById("editTaskDesc").value = task["taskDesc"];
        if (task["category"]) {
            document.getElementById(task["category"]).checked = true;
        }
        document.getElementById("editDueDate").value = task["dueDate"];
        document.getElementById("editIsReminder").checked = task["isReminder"];
        if (task["isReminder"]) {
            document.getElementById("editReminderDateDiv").removeAttribute("hidden");
            document.getElementById("editReminderDate").value = task["reminderDate"];
        }
        document.getElementById("editIspublic").checked = task["isPublic"];
        document.getElementById("editIsDone").checked = task["isDone"];
    }

    document.getElementById("editTaskForm").onsubmit = function() {

        taskDesc = document.getElementById("editTaskDesc").value;
        dueDate = document.getElementById("editDueDate").value;
        isPublic = document.getElementById("editIspublic").checked;
        isReminder = document.getElementById("editIsReminder").checked;
        reminderDate = document.getElementById('editReminderDate').value;
        isDone = document.getElementById("editIsDone").checked;
        index = document.getElementById("taskIndex").value;
        category = editCategories(this);

        updateTodoTask(index);
        mainServices.closeForm("editTaskForm");
        mainServices.clearAllTodoCategories("editCategory");
    }

    var editCategories = function(form) {
        if (form.editCategories[0].checked == true) {
            return form.editCategories[0].value;
        } else if (form.editCategories[1].checked == true) {
            return form.editCategories[1].value;
        } else if (form.editCategories[2].checked == true) {
            return form.editCategories[2].value;
        } else if (form.editCategories[3].checked == true) {
            return form.editCategories[3].value;
        }
    }

    var updateTodoTask = function(index) {

        allTaskList[index] = {
            "taskDesc": taskDesc,
            "category": category,
            "dueDate": dueDate,
            "isReminder": isReminder,
            "reminderDate": reminderDate,
            "isPublic": isPublic,
            "isDone": isDone
        }

        mainServices.setAllTasks(activeUser, allTaskList);
        mainServices.displayToDoTask(allTaskList)
    }

    var service = {};
    service.editTodoTask = editTodoTask;
    return service;

})();