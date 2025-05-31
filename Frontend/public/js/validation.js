
$(document).ready(function(){
    $('#addEmployeeForm').submit(function(e){
        let isValid = true;
        let errorMsg = '';

        const name = $('#name').val().trim();
        const email = $('#email').val().trim();
        const mobile = $('#mobile').val().trim();
        const designation = $('#designation').val().trim();
        const gender = $('input[name="gender"]:checked').val();
        const course = $('input[name="course"]:checked');
        const image = $('#image').val();

        if(!name){
            errorMsg += 'Name is required.\n';
            isValid = false;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if(!email || !emailRegex.test(email)){
            errorMsg += 'Enter a valid email.\n';
            isValid = false;
        }

        if(!mobile || !/^\d{10}$/.test(mobile)){
            errorMsg += 'Mobile must be 10 digits.\n';
            isValid = false;
        }

        if(!designation){
            errorMsg += 'Please select a designation.\n';
            isValid = false;
        }

        if(!gender){
            errorMsg += 'Please select gender.\n';
            isValid = false;
        }

        if(course.length === 0){
            errorMsg += 'Select at least one course.\n';
            isValid = false;
        }

         if(!image){
            errorMsg += 'Profile image is required.\n';
            isValid = false;
        }

         if(!isValid){
            alert(errorMsg);
            e.preventDefault();
        }
    });
});