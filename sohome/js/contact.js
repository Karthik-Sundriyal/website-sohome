// Contact form submission using EmailJS
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    const formStatus = document.getElementById('formStatus');

    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Display sending status
            formStatus.textContent = 'Sending message...';
            formStatus.className = 'form-status';
            formStatus.style.display = 'block';
            
            // Get form data
            const formData = {
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                subject: document.getElementById('subject').value,
                message: document.getElementById('message').value,
                to_email: 'enter mail here'
            };

            // Send the email using EmailJS
            // Note: You need to create a template in EmailJS dashboard with these parameters
            emailjs.send(
                'SERVICE_ID', // Replace with your EmailJS service ID
                'TEMPLATE_ID', // Replace with your EmailJS template ID
                formData
            )
            .then(function(response) {
                console.log('Email sent successfully:', response);
                formStatus.textContent = 'Your message has been sent successfully! We will contact you soon.';
                formStatus.className = 'form-status success';
                contactForm.reset();
            })
            .catch(function(error) {
                console.error('Email sending failed:', error);
                formStatus.textContent = 'There was an error sending your message. Please try again later.';
                formStatus.className = 'form-status error';
            });
        });
    }
}); 