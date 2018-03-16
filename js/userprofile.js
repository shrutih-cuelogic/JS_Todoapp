var userprofilePageServices = (function() {
    var activeUser = localStorageServices.getLocalStorage("activeUser");

    var getActiveUserObject = function() {
        return localStorageServices.getLocalStorage(activeUser);
    }

    var activeUserObject = getActiveUserObject();
    document.getElementById("firstlastnameNav").innerHTML = activeUserObject["firstName"] + " " + activeUserObject["lastName"];
    document.getElementById("userProfile").setAttribute('src', activeUserObject["image"]);
    document.getElementById("firstname").value = activeUserObject["firstName"];
    document.getElementById("lastname").value = activeUserObject["lastName"];
    document.getElementById("userAddress").value = activeUserObject["address"];
    document.getElementById(activeUserObject["gender"]).checked = true;
    
    var changeFName = function(firstname) {
        activeUserObject["firstname"] = firstname.value;
        localStorageServices.setLocalStorage(activeUser, activeUserObject);

    }
    var changeLName = function(last_name) {
        activeUserObject["lastname"] = lastname.value;
        localStorageServices.setLocalStorage(activeUser, activeUserObject);

    }
    var changeGender = function(gender) {
        activeUserObject["gender"] = gender.value;
        localStorageServices.setLocalStorage(activeUser, activeUserObject);

    }
    var changeAddr = function(address) {
        activeUserObject["userAddress"] = address.value;
        localStorageServices.setLocalStorage(activeUser, activeUserObject);
    }

    var changeUserProfileImage = function(input) {
        if (input.files && input.files[0]) {
            var reader = new FileReader();

            reader.onload = function(e) {
                document.getElementById('userProfile').setAttribute('src', e.target.result);
                activeUserObject['image'] = e.target.result;
                localStorageServices.setLocalStorage(activeUser, activeUserObject);
            };
            reader.readAsDataURL(input.files[0]);
        }
    }

    var service = {};

    service.changeFName = changeFName;
    service.changeLName = changeLName;
    // service.changeGender = changeGender;
    service.changeAddr = changeAddr;
    service.changeUserProfileImage = changeUserProfileImage;

    return service;

})();