const passwordValidation = () => {

    const passwordInput = document.getElementById('id_password');
    const passError = document.getElementById('password-error');
    const confError = document.getElementById('confirm-error');
    const confirmInput = document.getElementById('id_confirm_password');
    let isFormValid = true;

    const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_\-+=])[A-Za-z\d!@#$%^&*()_\-+=]{8,}$/;

    if (!passwordPattern.test(passwordInput.value)) {
        passwordInput.classList.add('error');
        passError.style.display = 'block';
        isFormValid = false;
    } else {
        passwordInput.classList.remove('error');
        passError.style.display = 'none';
    }

    if (passwordInput.value !== confirmInput.value) {
        confirmInput.classList.add('error');
        confError.style.display = 'block';
        isFormValid = false;
    } else {
        confirmInput.classList.remove('error');
        confError.style.display = 'none';
    }

    return isFormValid;

}

document.addEventListener('DOMContentLoaded', () => {

    const registrationForm = document.getElementById('registration-form');
    
    registrationForm.addEventListener('submit', (event) => {
        event.preventDefault();
        if (passwordValidation()) {
            alert('Вы успешно зарегистрировались!');
            window.location.href = '/index.html';
        }
    });

});