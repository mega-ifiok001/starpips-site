document.getElementById('contact-form').addEventListener('submit',  function(event) {
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
        phneNumber:phneNumber,
        message: message
    };

    let xhr = new XMLHttpRequest();
    xhr.open('POST', '/');
    xhr.setRequestHeader('content-type', 'application/json');
    xhr.onload =  function(){
console.log(xhr.responseText);
if(xhr.responseText == 'success'){
    alert('email sent ');
    fname = '',
    email = '',
    message = ''
}else{
    alert('something is wrong ')
}
    }

    xhr.send(JSON.stringify(formData));

    

  
});
