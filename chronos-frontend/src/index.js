const CHRONOS_URL = "http://localhost:3000/api/v1";

document.addEventListener("DOMContentLoaded", () => {
    const isAuthenticated = localStorage.getItem('jwt_token');
    const data = JSON.parse(localStorage.getItem('data'));
    isAuthenticated && reSignInEmployee(data);
})