function createValidator(id, errorFunction, validationChecker) {
  const form = document.getElementsByTagName("form")[0];
  const component = document.getElementById(id);
  const componentError = document.querySelector("#" + id + " + span.error");
  component.addEventListener("input", function (event) {
    if (validationChecker(component)) {
      // componentError.textContent = "helo";
      componentError.className = "error noselect";
      component.reportValidity();
    } else {
      errorFunction(component, componentError);
      componentError.className = "error active";
    }
  });

  form.addEventListener("submit", function (event) {
    if (!validationChecker(component)) {
      errorFunction(component, componentError);
      event.preventDefault();
    }
  });
}

errorFunction = {
  email: function (component, componentError) {
    if (component.validity.valueMissing) {
      componentError.textContent = "enter email";
    } else if (component.validity.patternMismatch) {
      componentError.textContent = "invalid email";
    } else if (component.validity.tooShort) {
      componentError.textContent = `email too short`;
    }
    componentError.className = "error active";
  },

  country: function (component, componentError) {
    if (component.validity.patternMismatch) {
      componentError.textContent = "enter a valid country";
    } else if (component.validity.valueMissing) {
      componentError.textContent = "enter a country";
    }
    componentError.className = "error active";
  },

  zip: function (component, componentError) {
    if (component.validity.valueMissing) {
      componentError.textContent = "enter a zip code.";
    } else if (component.validity.patternMismatch) {
      componentError.textContent = "6 digit zip needed";
    } 
    componentError.className = "error active";
  },

  password: function (component, componentError) {
    if (component.validity.valueMissing) {
      componentError.textContent = "Please enter a password.";
    } else if (component.validity.patternMismatch) {
      componentError.textContent =
        "password weak";
    } else if (component.validity.tooShort) {
      componentError.textContent = 'increase pwd length';
    }
    componentError.className = "error active";
  },

  password2: function (component, componentError) {
    if (component.validity.valueMissing) {
      componentError.textContent = "Please confirm a password.";
    } else if (component.dataset.pwdmatch == "false") {
      componentError.textContent =
        "passwords do not match";
    }
    componentError.className = "error active";
  },
};

validationChecker = {
  email: (a) => a.validity.valid,
  country: (a) => a.validity.valid,
  zip: (a) => a.validity.valid,
  password: (a) => a.validity.valid,
  password2: (password2) => {
    let password1 = document.getElementById("password");
    if (password1.value === password2.value && password2.value.length) {
      password2.dataset.pwdmatch = "true";
      password2.setCustomValidity("");
      return true;
    } else {
      password2.dataset.pwdmatch = "false";
      password2.setCustomValidity("invalid");
      return false;
    }
  },
};

["email", "country", "zip", "password", "password2"].forEach((element) => {
  createValidator(element, errorFunction[element], validationChecker[element]);
});