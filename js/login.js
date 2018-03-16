var loginServices = (function() {

    document.getElementById("loginForm").onsubmit = function() {
        var email = document.getElementById("login_email").value;
        var password = document.getElementById("login_password").value;
        var activeUser = localStorageServices.getLocalStorage(email);
        if (!activeUser || activeUser["password"] != password) {
            document.getElementById("loginError").innerHTML = "Invalid Email-id and Password";
            return false;
        }

        localStorageServices.setLocalStorage("activeUser", activeUser["validEmail"]);
    }

    var service = {};
    return service;

})();