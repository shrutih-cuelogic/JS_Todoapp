var searchTodoTaskServices = (function() {

    var activeUser = mainServices.getActiveUser(),
        filteredTasks = [],
        allTaskList = mainServices.getAllTasks(activeUser);

    var searchTasksDuedateWise = function() {

        mainServices.hideForms();
        var fromDate = new Date(document.getElementById("fromDate").value),
            toDate = new Date(document.getElementById("toDate").value);

        filteredTasks = [];

        if (!document.getElementById("fromDate").value | !document.getElementById("toDate").value) {

            alert("<span style='color:red'>Please select from date</span>");
            return false;

        } else if (fromDate > toDate) {

            alert("<span style='color:red'>From date must be less than To date</span>")
            return false;
        }

        allTaskList.forEach(function(task, index) {
            var dueDate = new Date(task["dueDate"]);
            if (dueDate >= fromDate && dueDate <= toDate) {
                filteredTasks.push(task);
            }
        });

        showSearchRes(filteredTasks);

    }

    var searchTasksCategoryWise = function() {

        mainServices.hideForms();
        var food = document.querySelectorAll('input[name="searchCategory"]')[0].checked;
        var health = document.querySelectorAll('input[name="searchCategory"]')[1].checked;
        var study = document.querySelectorAll('input[name="searchCategory"]')[2].checked;
        var other = document.querySelectorAll('input[name="searchCategory"]')[3].checked;
        var selectedCategory = [];
        filteredTasks = [];

        if (food) {
            selectedCategory.push(document.querySelectorAll('input[name="searchCategory"]')[0].value);
        }
        if (health) {
            selectedCategory.push(document.querySelectorAll('input[name="searchCategory"]')[1].value);
        }
        if (study) {
            selectedCategory.push(document.querySelectorAll('input[name="searchCategory"]')[2].value);
        }
        if (other) {
            selectedCategory.push(document.querySelectorAll('input[name="searchCategory"]')[3].value);
        }
        if (selectedCategory.length == 0) {
            alert("Select the Category");
            return false;
        }

        allTaskList.forEach(function(task, index) {
            if (selectedCategory.indexOf(task["category"]) != -1) {
                filteredTasks.push(task);
            }
        });

        showSearchRes(filteredTasks);

    }

    var searchTasksIsDone = function() {

        mainServices.hideForms();
        var isDone = document.getElementById("searchIsDone").checked;
        filteredTasks = [];
        if (allTaskList.length != 0) {
            allTaskList.forEach(function(task, index) {
                if (task["isDone"] == isDone) {
                    filteredTasks.push(task);
                }
            });
        }

        showSearchRes(filteredTasks);
    }

    var searchTasksIsPending = function() {

        mainServices.hideForms();
        var isPending = document.getElementById("searchIsPending").checked;

        if (!isPending) {
            alert("Select the Pending Checkbox");
            return false;
        }
        var today = new Date();
        filteredTasks = [];

        allTaskList.forEach(function(task, index) {
            var dueDate = new Date(task["dueDate"]);
            if (dueDate > today) {
                filteredTasks.push(task);
            }
        });

        showSearchRes(filteredTasks);
    }

    var showSearchRes = function(filteredTasks) {
        document.getElementById('toDoList').innerHTML = "<h3><span style='color:red'> No Results Found <span></h3>";
        if (filteredTasks.length != 0) {
            mainServices.displayToDoTask(filteredTasks);
        }
    }

    var service = {};
    service.searchTasksDuedateWise = searchTasksDuedateWise;
    service.searchTasksCategoryWise = searchTasksCategoryWise;
    service.searchTasksIsDone = searchTasksIsDone;
    service.searchTasksIsPending = searchTasksIsPending;
    return service;

})();