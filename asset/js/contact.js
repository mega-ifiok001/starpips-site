document.getElementById('contact-form').addEventListener('submit', async function(event) {
    event.preventDefault(); // Prevent default form submission

    // Perform client-side validation
    const form = event.target;
    const name = form.querySelector('input[name="name"]').value.trim();
    const email = form.querySelector('input[name="email"]').value.trim();
    const message = form.querySelector('textarea[name="message"]').value.trim();

    if (!name || !email || !message) {
        document.querySelector('.ajax-response').innerText = 'Please fill out all required fields.';
        return;
    }

    // Prepare form data for AJAX
    const formData = {
        name: name,
        email: email,
        message: message
    };

    try {
        // Make AJAX request to the server
        const response = await fetch('http://localhost:3000/contact', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();
        console.log('Success:', data);
        document.querySelector('.ajax-response').innerText = data.message || 'Your message has been sent successfully!';
    } catch (error) {
        console.error('Error:', error);
        document.querySelector('.ajax-response').innerText = 'There was an error sending your message.';
    }
});
