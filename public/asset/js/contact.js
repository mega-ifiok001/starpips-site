document.getElementById('contact-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent default form submission

    // Perform client-side validation
    const form = event.target;
    const fname = form.querySelector('input[name="name"]').value.trim();
    const email = form.querySelector('input[name="email"]').value.trim();
    const message = form.querySelector('textarea[name="message"]').value.trim();
    const phneNumber = form.querySelector('input[name="number"]').value.trim();

    if (!fname || !email || !message) {
        document.querySelector('.ajax-response').innerText = 'Please fill out all required fields.';
        return;
    }

    // Prepare form data for AJAX
    const formData = {
        fname: fname,
        email: email,
        phneNumber: phneNumber,
        message: message
    };

    let xhr = new XMLHttpRequest();
    xhr.open('POST', '/');
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.onload = function() {
        console.log(xhr.responseText);
        if (xhr.status === 200 && xhr.responseText === 'Form received and email sent') {
            alert('Email sent successfully!');
            
            // Clear form fields
            form.querySelector('input[name="name"]').value = '';
            form.querySelector('input[name="email"]').value = '';
            form.querySelector('input[name="number"]').value = '';
            form.querySelector('textarea[name="message"]').value = '';
            
        } else {
            alert('Something went wrong. Please try again.');
        }
    };

    xhr.onerror = function() {
        alert('An error occurred while sending the request.');
    };

    xhr.send(JSON.stringify(formData));
});
