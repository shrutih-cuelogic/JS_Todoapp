var sortTodoTaskServices = (function() {

    var activeUser = mainServices.getActiveUser();
    var filteredTasks = [];
    var allTaskList;

    function GetSort(dueDate) {
        return function(x, y) {
            if (new Date(x[dueDate]) > new Date(y[dueDate])) {
                return 1;
            } else if (new Date(x[dueDate]) < new Date(y[dueDate])) {
                return -1;
            }
            return 0;
        }
    }

    var sortTaskAscOrder = function() {
        allTaskList = mainServices.getAllTasks(activeUser);
        allTaskList.sort(GetSort("dueDate"));
        allTaskList.reverse();
        mainServices.displayToDoTask(allTaskList);
    }

    var sortTaskDescOrder = function() {
        allTaskList = mainServices.getAllTasks(activeUser);
        allTaskList.sort(GetSort("dueDate"));
        mainServices.displayToDoTask(allTaskList);
    }

    var service = {};
    service.sortTaskAscOrder = sortTaskAscOrder;
    service.sortTaskDescOrder = sortTaskDescOrder;
    return service;

})();