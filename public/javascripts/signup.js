function signup(host) {
    if (!validate()) return;    
    let data = $('#signup-form').serialize();
    $('#submit-button').attr('disabled', true);

    $.post(`http://${host}/signup`, data, function(res) {
        if (res.error) {
            // todo: add specific error handling for api messages
            // and for connection messages
            console.error(res.error);
        } 
        $('#submit-button')
            .attr('hidden', true)
            .removeAttr('disabled');
        $('#success-alert').removeAttr('hidden');
        clearFields();
    });
}

function validate() {
    let first = $.trim($('#first-name').val());
    let last = $.trim($('#last-name').val());
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
    return validateTextField('#first-name', '#first-name-group');
} 

function clearFirstName() {
    $('#first-name').val('');
    clearFieldState('#first-name', '#first-name-group');
}

function validateLastName() {
    return validateTextField('#last-name', '#last-name-group');
}

function clearLastName() {
    $('#last-name').val('');
    clearFieldState('#last-name', '#last-name-group');
}

function validateEmail() {
    return validateEmailField('#email', '#email-group');
}

function clearEmail() {
    $('#email').val('');
    clearFieldState('#email', '#email-group');
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
    $('#first-name').blur(function() {
        validateFirstName();
    });

    $('#last-name').blur(function() {
        validateLastName();
    });

    $('#email').blur(function() {
        validateEmail();
    });
});
