var mainServices = (function() {

    var logout = function() {

        localStorageServices.setLocalStorage("activeUser", "");
    }
    var getActiveUser = function() {
        return localStorageServices.getLocalStorage("activeUser");
    }

    var getAllTasks = function(activeUser) {
        return localStorageServices.getLocalStorage(activeUser + "Tasks");
    }

    var setAllTasks = function(activeUser, taskList) {
        return localStorageServices.setLocalStorage(activeUser + "Tasks", taskList);
    }
    
    var clearAllTodoCategories = function(category) {

        document.querySelectorAll('input[name="' + category + '"]')[0].checked = false;
        document.querySelectorAll('input[name="' + category + '"]')[1].checked = false;
        document.querySelectorAll('input[name="' + category + '"]')[2].checked = false;
        document.querySelectorAll('input[name="' + category + '"]')[3].checked = false;
    }

    var closeForm = function(form_id) {
        document.getElementById(form_id).setAttribute("hidden", "hidden");
    }

    var hideForms = function() {
        document.getElementById("addTaskForm").setAttribute("hidden", "hidden");
        document.getElementById("editTaskForm").setAttribute("hidden", "hidden");
    }

    var displayToDoTask = function(allTaskList) {

        mainServices.hideForms();
        var taskData = "";

        if(!allTaskList){
            document.getElementById('toDoList').innerHTML = "<h3> No Results Found..!!! </h3>";
            return false;
        }

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
                    '<span class="text">' + task["taskDesc"] + '</span><br> <br>' +
                    '<div class="tools">' +
                    '<a onclick="editTodoTaskServices.editTodoTask(' + index + ')"><button><span class="glyphicon glyphicon-pencil pull-right"></span></button></a>&nbsp; &nbsp; &nbsp; &nbsp; ' +
                    '<a onclick="deleteTodoTaskServices.deleteTodoTask(' + index + ')"><button><span class="glyphicon glyphicon-trash pull-right"></span></button></i></a>' +
                    '</div>' +
                    '</li></br>';
            });
        }


        document.getElementById('toDoList').innerHTML = taskData;

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

    var category = function(checkbox, category) {
        mainServices.clearAllTodoCategories(category);
        checkbox.checked = true;
    }

    var service = {};
    service.logout = logout;
    service.getActiveUser = getActiveUser;
    service.getAllTasks = getAllTasks;
    service.setAllTasks = setAllTasks;
    service.TodoReminder = TodoReminder;
    service.clearAllTodoCategories = clearAllTodoCategories;
    service.displayToDoTask = displayToDoTask;
    service.category = category;
    service.closeForm = closeForm;
    service.hideForms = hideForms;
    return service;

})();
