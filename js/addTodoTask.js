var addTodoTaskServices = (function() {

    var isReminder, reminderDate, taskDesc, dueDate,
        isPublic, isReminder, allTaskList, isDone = false,
        category = "",
        activeUser = mainServices.getActiveUser();
    document.getElementById("firstlastnameNav").innerHTML = activeUser;

    document.getElementById("addTaskForm").onsubmit = function() {

        taskDesc = document.getElementById("taskDesc").value;
        dueDate = document.getElementById("dueDate").value;
        isPublic = document.getElementById("isPublic").checked;
        isReminder = document.getElementById("isReminder").checked;
        reminderDate = document.getElementById("reminderDate").value;
        category = categories(this);

        storeToDoTask();
        mainServices.closeForm("addTaskForm");
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
        if (mainServices.getAllTasks(activeUser) === null) {
            allTaskList = []
            allTaskList.push(task)
            mainServices.setAllTasks(activeUser, allTaskList);
        } else {
            allTaskList = mainServices.getAllTasks(activeUser);
            allTaskList.push(task)
            mainServices.setAllTasks(activeUser, allTaskList);
        }

        mainServices.displayToDoTask(allTaskList);
    }

    var categories = function(form) {

        if (form.category[0].checked == true) {
            return form.category[0].value;
        } else if (form.category[1].checked == true) {
            return form.category[1].value;
        } else if (form.category[2].checked == true) {
            return form.category[2].value;
        } else if (form.category[3].checked == true) {
            return form.category[3].value;
        }
    }

    mainServices.displayToDoTask(mainServices.getAllTasks(activeUser));

    var addTodoTask = function() {

        mainServices.closeForm("editTaskForm");
        document.getElementById("addTaskForm").removeAttribute("hidden");
        mainServices.clearAllTodoCategories("category");
    }

    var service = {};
    service.addTodoTask = addTodoTask;
    return service;

})();