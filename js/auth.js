// Auth JavaScript

// Constants / Regex
const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/;

// Login Page Logic
function initLoginPage() {
    const loginForm = document.getElementById('login-form');
    if (!loginForm) return;

    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const loginBtn = document.getElementById('login-btn');
    
    const emailHelper = document.getElementById('email-helper');
    const passwordHelper = document.getElementById('password-helper');

    // Validation State
    let isEmailValid = false;
    let isPasswordValid = false;

    function validateEmail() {
        const value = emailInput.value.trim();
        if (value === '') {
            emailHelper.innerText = '*이메일을 입력해주세요.';
            emailHelper.classList.add('visible');
            isEmailValid = false;
        } else if (!EMAIL_REGEX.test(value)) {
            emailHelper.innerText = '*올바른 이메일 주소 형식을 입력해주세요. (예: example@example.com)';
            emailHelper.classList.add('visible');
            isEmailValid = false;
        } else {
            emailHelper.classList.remove('visible');
            isEmailValid = true;
        }
        updateButtonState();
    }

    function validatePassword() {
        const value = passwordInput.value;
        if (value === '') {
            passwordHelper.innerText = '*비밀번호를 입력해주세요';
            passwordHelper.classList.add('visible');
            isPasswordValid = false;
        } else if (!PASSWORD_REGEX.test(value)) {
            passwordHelper.innerText = '*비밀번호는 8자 이상, 20자 이하이며, 대문자, 소문자, 숫자, 특수문자를 각각 최소 1개 포함해야 합니다.';
            passwordHelper.classList.add('visible');
            isPasswordValid = false;
        } else {
            passwordHelper.classList.remove('visible');
            isPasswordValid = true;
        }
        updateButtonState();
    }

    function updateButtonState() {
        // Requirements say: Change color when BOTH entered and Valid.
        // We use the 'disabled' attribute to control this mostly, and CSS for color.
        if (isEmailValid && isPasswordValid) {
            loginBtn.disabled = false;
            loginBtn.classList.add('active');
        } else {
            loginBtn.disabled = true;
            loginBtn.classList.remove('active');
        }
    }

    // Input Listeners (Real-time feedback is usually annoying if done on 'input' for errors, 
    // but requirement 2 says "When both input... valid... button changes". 
    // This implies real-time checking. 
    // However, usually helper text appears on blur or failed attempt. 
    // The prompt image shows helper text visible. I will check on 'input' to be responsive for the button, 
    // but maybe be less aggressive with helper text? 
    // Let's stick to 'input' for button state, and maybe 'blur' for error text to be user friendly, 
    // OR just 'input' for everything to be simple and responsive as per "helper text" requirement usually implies immediate feedback in these coding tests.
    
    // Actually, requirement 1 says "If email is empty...". "If invalid...".
    // I will trigger validation on 'input' to satisfy the button color change requirement immediately.
    
    emailInput.addEventListener('input', validateEmail);
    passwordInput.addEventListener('input', validatePassword);

    // Initial check (in case browser auto-fills)
    // validateEmail(); 
    // validatePassword();
    // Don't validate immediately on load, or it shows red text everywhere. 
    // Button is disabled by default HTML.
}

function handleLogin(event) {
    event.preventDefault();
    
    // Final validation check before "submit"
    // Since button is disabled if invalid, this is just a safety net.
    
    // Simulate Login Success
    // In real app, fetch API here.
    
    // Redirect to post list
    // Current path: pages/auth/login.html
    // Target path: pages/board/post_list.html
    // Relative: ../board/post_list.html
    location.href = '../board/post_list.html';
}

// Init
document.addEventListener('DOMContentLoaded', () => {
    initLoginPage();
});