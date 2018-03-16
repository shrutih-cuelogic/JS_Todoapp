var localStorageServices = (function() {

    var setLocalStorage = function(key, value) {
        localStorage.setItem(key, JSON.stringify(value));
    }

    var getLocalStorage = function(key) {
        return JSON.parse(localStorage.getItem(key));
    }

    var service = {};
    service.setLocalStorage = setLocalStorage;
    service.getLocalStorage = getLocalStorage;
    return service;

})();