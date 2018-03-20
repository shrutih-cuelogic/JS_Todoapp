var todoListServices = (function() {

    var isReminder, reminderDate, taskDesc, dueDate, isPublic, isReminder, allTaskList;
    var isDone = false,
        category = "",
        activeUser = localStorageServices.getLocalStorage("activeUser");

    var getActiveUserObject = function() {
        return localStorageServices.getLocalStorage(activeUser);
    }
    var activeUserObject = getActiveUserObject();
    document.getElementById("firstlastnameNav").innerHTML = activeUserObject["firstName"] + " " + activeUserObject["lastName"];

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
        closeForm("editTaskForm");
        clearAllTodoCategories("editCategories");
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

        setAllTasks(allTaskList);
        displayToDoTask(allTaskList)
    }

    document.getElementById("addTaskForm").onsubmit = function() {

        taskDesc = document.getElementById("taskDesc").value;
        dueDate = document.getElementById("dueDate").value;
        isPublic = document.getElementById("isPublic").checked;
        isReminder = document.getElementById("isReminder").checked;
        reminderDate = document.getElementById("reminderDate").value;
        category = categories(this);

        storeToDoTask();
        closeForm("addTaskForm");
    }

    var categories = function(form) {

        if (form.categories[0].checked == true) {
            return form.categories[0].value;
        } else if (form.categories[1].checked == true) {
            return form.categories[1].value;
        } else if (form.categories[2].checked == true) {
            return form.categories[2].value;
        } else if (form.categories[3].checked == true) {
            return form.categories[3].value;
        }
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


    var getAllTasks = function() {
        return localStorageServices.getLocalStorage(activeUser + "tasks");
    }

    var setAllTasks = function(taskList) {
        return localStorageServices.setLocalStorage(activeUser + "tasks", taskList);
    }

    var hideForms = function() {
        document.getElementById("addTaskForm").setAttribute("hidden", "hidden");
        document.getElementById("editTaskForm").setAttribute("hidden", "hidden");
    }

    var storeToDoTask = function() {

        task = {
            "taskDesc": taskDesc,
            "category": category,
            "dueDate": dueDate,
            "isReminder": isReminder,
            "reminderDate": reminderDate,
            "isPublic": isPublic,
            "isDone": isDone
        }
        if (getAllTasks() === null) {
            allTaskList = []
            allTaskList.push(task)
            localStorageServices.setLocalStorage(activeUser + "tasks", allTaskList);
        } else {
            allTaskList = getAllTasks()
            allTaskList.push(task)
            localStorageServices.setLocalStorage(activeUser + "tasks", allTaskList);
        }

        displayToDoTask(allTaskList);
    }


    var displayToDoTask = function(TaskList) {

        allTaskList = TaskList;
        var taskData = "";

        if (allTaskList) {
            allTaskList.forEach(function(task, index, obj) {
                var isdone = '<li>';
                if (task["isDone"]) {
                    isdone = '<li class="done">';
                }
                taskData += isdone +
                    '<span class="handle ui-sortable-handle">' +
                    '<a href=""><i class="fa fa-ellipsis-v"></i></a>' +
                    '<i class="fa fa-ellipsis-v"></i>' +
                    '</span>&nbsp; ' +
                    '<input type="checkbox" value="' + index + '" id="task' + index + '"name="tasks">&nbsp;&nbsp;' +
                    '<span class="text">' + task["taskDesc"] + '</span>' +
                    '<div class="tools">' +
                    '<a onclick="todoListServices.editTodoTask(' + index + ')"><button><span class="glyphicon glyphicon-pencil pull-right"></span></button></a>&nbsp; &nbsp; ' +
                    '<a onclick="todoListServices.deleteTodoTask(' + index + ')"> <button><span class="glyphicon glyphicon-trash pull-right"></span></button></i></a>' +
                    '</div>' +
                    '</li>';
            });
        }


        document.getElementById('toDoList').innerHTML = taskData;

    }


    displayToDoTask(getAllTasks());

    var editTodoTask = function(index) {

        clearAllTodoCategories("editCategories");
        closeForm("addTaskForm");

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

    var addTodoTask = function() {

        closeForm("editTaskForm");
        document.getElementById("addTaskForm").removeAttribute("hidden");
        clearAllTodoCategories("category");
    }


    var closeForm = function(formId) {
        document.getElementById(formId).setAttribute("hidden", "hidden");
    }

    var TodoReminder = function(divId, dateId, reminder) {

        document.getElementById(dateId).removeAttribute("required");
        document.getElementById(divId).setAttribute("hidden", "hidden");
        reminderDate = ""
        if (reminder.checked == true) {

            document.getElementById(divId).removeAttribute("hidden");
            document.getElementById(dateId).setAttribute("required", "required");
        }
    }

    var clearAllTodoCategories = function(category) {

        document.querySelectorAll('input[name="' + category + '"]')[0].checked = false;
        document.querySelectorAll('input[name="' + category + '"]')[1].checked = false;
        document.querySelectorAll('input[name="' + category + '"]')[2].checked = false;
        document.querySelectorAll('input[name="' + category + '"]')[3].checked = false;

    }
    var category = function(checkbox, category) {
        clearAllTodoCategories(category);
        checkbox.checked = true;
    }

    var deleteTodoTask = function(index) {
        allTaskList.splice(index, 1);
        setAllTasks(allTaskList);
        displayToDoTask(allTaskList);
    }

    var TodoTaskBulkDelete = function() {

        hideForms();
        var checkboxes = document.getElementsByName("tasks");
        var deleteIndexArray = [];

        for (var i = 0; i < checkboxes.length; i++) {
            if (checkboxes[i].checked) {
                deleteIndexArray.push(checkboxes[i].value);
            }
        }

        for (var i = deleteIndexArray.length - 1; i >= 0; i--) {
            allTaskList.splice(deleteIndexArray[i], 1);
        }

        setAllTasks(allTaskList);
        displayToDoTask(allTaskList)
    }


    var service = {};
    service.displayToDoTask = displayToDoTask;
    service.TodoReminder = TodoReminder;
    service.addTodoTask = addTodoTask;
    service.editTodoTask = editTodoTask;
    service.updateTodoTask = updateTodoTask;
    service.closeForm = closeForm;
    service.deleteTodoTask = deleteTodoTask;
    service.category = category;
    service.TodoTaskBulkDelete = TodoTaskBulkDelete;
    service.hideForms = hideForms;
    service.getAllTasks = getAllTasks;
    return service;

})();