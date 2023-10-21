const validatePassword = () => {
    const password = document.getElementById(`password`);
    const passwordFeedback = document.getElementById(`passwordfeedback`);
    if (password.value.length >= 8) {
        password.classList.remove('is-invalid')
        password.classList.add('is-valid')
        passwordFeedback.innerHTML = ''
    }else{
        password.classList.remove('is-valid')
        password.classList.add('is-invalid')
        passwordFeedback.innerHTML = 'Password minimal 8 karakter!';
    }
}

const validatePasswordConfirm = () => {
    const password = document.getElementById(`password`);
    const passwordConfirm = document.getElementById(`passwordconfirm`);
    const passwordConfirmFeedback = document.getElementById(`passwordconfirmfeedback`);
    const signup = document.getElementById('signup');
    if (passwordConfirm.value.length >= 8) {
        if (password.value === passwordConfirm.value) {
            passwordConfirm.classList.remove('is-invalid')
            passwordConfirm.classList.add('is-valid')
            passwordConfirmFeedback.innerHTML = ''
            signup.disabled = false
        }else{
            passwordConfirm.classList.remove('is-valid')
            passwordConfirm.classList.add('is-invalid')
            passwordConfirmFeedback.innerHTML = 'Password tidak sama!';
        }
    }else{
        passwordConfirm.classList.remove('is-valid')
        passwordConfirm.classList.add('is-invalid')
        passwordConfirmFeedback.innerHTML = 'Password minimal 8 karakter!';
        signup.disabled = true
    }
}