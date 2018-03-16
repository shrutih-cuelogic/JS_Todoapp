var mainServices = (function() {

    var logout = function() {

        localStorageServices.setLocalStorage("activeUser", "");
    }
    var getActiveUser = function() {
        return localStorageServices.getLocalStorage("activeUser");
    }

    var getAllData = function(activeUser) {
        return localStorageServices.getLocalStorage(activeUser + "Data");
    }

    var setAllData = function(activeUser, dataList) {
        return localStorageServices.setLocalStorage(activeUser + "Data", dataList);
    }

    var closeForm = function(form_id) {
        document.getElementById(form_id).setAttribute("hidden", "hidden");
    }

    var hideForm = function() {
        document.getElementById("addFormData").setAttribute("hidden", "hidden");
        document.getElementById("editFormData").setAttribute("hidden", "hidden");
    }

    var service = {};
    service.logout = logout;
    service.getActiveUser = getActiveUser;
    service.getAllData = getAllData;
    service.setAllData = setAllData;
    service.closeForm = closeForm;
    service.hideForm = hideForm;
    return service;

})();
