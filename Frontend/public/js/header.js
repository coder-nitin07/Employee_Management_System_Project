

$(document).ready(function () {
    $('#logoutBtn').on('click', function () {
        localStorage.removeItem('token');
        window.location.href = '/login';
    });
});