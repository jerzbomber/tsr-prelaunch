function signup(host) {
    if (!validate()) return;    
    let data = $('#signup-form').serialize();
    $.post(`http://${host}/signup`, data, function(res) {
        if (res.error) {
            console.log('error', res.error);
        } 
        $('#success-alert').removeAttr('hidden');
        clearFields();
    });
}

function validate() {
    let first = $.trim($('#firstName').val());
    let last = $.trim($('#lastName').val());
    let email = $.trim($('#email').val());

    let isFirstValid = validateFirstName();
    let isLastValid = validateLastName();
    let isEmailValid = validateEmail();

    if (!isFirstValid || !isLastValid || !isEmailValid) {
        return false;
    } else {
        return true;
    }
}

function clearFields() {
    clearFirstName();
    clearLastName();
    clearEmail();
}

function validateFirstName() {
    return validateTextField('#firstName', '#firstNameGroup');
} 

function clearFirstName() {
    $('#firstName').val('');
    clearFieldState('#firstName', '#firstNameGroup');
}

function validateLastName() {
    return validateTextField('#lastName', '#lastNameGroup');
}

function clearLastName() {
    $('#lastName').val('');
    clearFieldState('#lastName', '#lastNameGroup');
}

function validateEmail() {
    return validateEmailField('#email', '#emailGroup');
}

function clearEmail() {
    $('#email').val('');
    clearFieldState('#email', '#emailGroup');
}

function validateTextField(fieldSelector, groupSelector) {
    let fieldVal = $.trim($(fieldSelector).val());
    let isValid = fieldVal.length > 0;
    setFieldState(fieldSelector, groupSelector, isValid);
    return isValid;
}

function validateEmailField(fieldSelector, groupSelector) {
    let fieldVal = $.trim($(fieldSelector).val());
    let isValid = fieldVal.length > 0;
    if (isValid) {
        let result = /.+@.+/.test($('#email').val());
        isValid = result;
    }
    setFieldState(fieldSelector, groupSelector, isValid);
    return isValid;
}

function setFieldState(fieldSelector, groupSelector, isValid) {
    if (!isValid) {
        $(fieldSelector).addClass('form-control-danger');
        $(fieldSelector).removeClass('form-control-success');
        $(groupSelector).addClass('has-danger');
        $(groupSelector).removeClass('has-success');
    } else {
        $(fieldSelector).addClass('form-control-success');
        $(fieldSelector).removeClass('form-control-danger');
        $(groupSelector).addClass('has-success');
        $(groupSelector).removeClass('has-danger');
    }
}

function clearFieldState(fieldSelector, groupSelector) {
    $(fieldSelector).removeClass('form-control-success');
    $(groupSelector).removeClass('has-success');
    $(fieldSelector).removeClass('form-control-danger');
    $(groupSelector).removeClass('has-danger');
}

$(function() {
    $('#firstName').blur(function() {
        validateFirstName();
    });

    $('#lastName').blur(function() {
        validateLastName();
    });

    $('#email').blur(function() {
        validateEmail();
    });
});
