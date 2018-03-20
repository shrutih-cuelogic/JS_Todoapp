var deleteTodoTaskServices = (function() {

    var activeUser = mainServices.getActiveUser(),
        allTaskList = mainServices.getAllTasks(activeUser);

    var deleteTodoTask = function(index) {
        allTaskList.splice(index, 1);
        mainServices.setAllTasks(activeUser, allTaskList);
        mainServices.displayToDoTask(allTaskList);
    }

    var TodoTaskBulkDelete = function() {

        mainServices.hideForms();
        var checkboxes = document.getElementsByName("tasks");
        var deleteIndexArray = [];

        for (var i = 0; i < checkboxes.length; i++) {
            if (checkboxes[i].checked) {
                deleteIndexArray.push(checkboxes[i].value);
            }
        }

        if (deleteIndexArray.length == 0) {
            alert("Select tasks to delete");
            return false;
        }

        for (var i = deleteIndexArray.length - 1; i >= 0; i--) {
            allTaskList.splice(deleteIndexArray[i], 1);
        }

        mainServices.setAllTasks(activeUser, allTaskList);
        mainServices.displayToDoTask(allTaskList);
    }

    var service = {};
    service.deleteTodoTask = deleteTodoTask;
    service.TodoTaskBulkDelete = TodoTaskBulkDelete;
    return service;

})();