var registrationServices = (function() {

    var image;

    document.getElementById("registrationForm").onsubmit = function() {

        var re = /[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}/igm;
        var firstName = document.getElementById("firstName").value;
        var lastName = document.getElementById("lastName").value;
        var email = document.getElementById("email").value;
        var address = document.getElementById("address").value;
        var password = document.getElementById("password").value;
        var confirm_password = document.getElementById("confirm_password").value;
        document.getElementById("genderError").innerHTML = "";
        
        var form = this;
        if ((form.gender[0].checked == false) && (form.gender[1].checked == false)) {
            document.getElementById("genderError").innerHTML = "Please select any one gender";
            return false;
        }
        if (form.gender[0].checked == true) {
            gender = form.gender[0].value;
        } else {
            gender = form.gender[1].value;
        }

        var validEmail;
        if (re.test(email)) {
            validEmail = email;
        } else {
            document.getElementById("incorrectEmail").innerHTML = "Enter the valid email address!<br />";
        }
        
        document.getElementById("confirm_passworderror").innerHTML = "";
        document.getElementById("emailError").innerHTML = "";

        var form = this;
        if (password != confirm_password) {
            document.getElementById("confirm_passworderror").innerHTML = "<span style='color: red;'>Your password does not match</span>";
            return false;
        }
        if (localStorageServices.getLocalStorage("AllUsers") === null) {
            allUsersEmail = []
            allUsersEmail.push(validEmail)
            localStorageServices.setLocalStorage("AllUsers", allUsersEmail);
        } else {
            allUsersEmail = localStorageServices.getLocalStorage("AllUsers");
            if (allUsersEmail.indexOf(validEmail) === -1) {
                allUsersEmail.push(validEmail)
                localStorageServices.setLocalStorage("AllUsers", allUsersEmail);
            } else {
                document.getElementById("emailError").innerHTML = "<span style='color: red;'>E-mail Id is already exist</span>";
                return false
            }
        }
        setUserDetails(validEmail, firstName, lastName, gender, address, password);
    }

    var setUserDetails = function(validEmail, firstName, lastName, gender, address, password) {

        var user = { "validEmail": validEmail, "firstName": firstName, "lastName": lastName, "gender": gender, "address": address, "password": password, "image": image };
        localStorageServices.setLocalStorage(validEmail, user);
        localStorageServices.setLocalStorage("activeUser", validEmail);

    }

    var setProfileImage = function(input) {
        if (input.files && input.files[0]) {
            var reader = new FileReader();
            reader.onload = function(e) {
                document.getElementById('profile_img').removeAttribute("hidden");
                document.getElementById('profile_img')
                    .setAttribute('src', e.target.result);
                image = e.target.result;

            };
            reader.readAsDataURL(input.files[0]);
        }
    }

    var service = {};
    service.setUserDetails = setUserDetails;
    service.setProfileImage = setProfileImage;

    return service;

})();