const form = document.querySelector('.login-form')

document.addEventListener('DOMContentLoaded', () => {
    if (form.id === 'profile-form') {
        form.addEventListener('submit', (event) => {
            event.preventDefault();
            alert('Изменения успешно сохранены!');
        });
    }
    else if (form.id === 'login-form') {
        form.addEventListener('submit', (event) => {
            event.preventDefault();
            alert('Вы успешно вошли в аккаунт!');
            window.location.href = '/index.html';
        });
    }
    else if (form.id === 'registration-form') {
        form.addEventListener('submit', (event) => {
            event.preventDefault();
            alert('Вы успешно зарегистрировались!');
            window.location.href = '/index.html';
        });
    }
});