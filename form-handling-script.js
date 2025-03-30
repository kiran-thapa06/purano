document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    const successAlert = document.getElementById('form-success');
    const errorAlert = document.getElementById('form-error');
    
    // Check for URL parameters (for non-AJAX form submissions)
    const urlParams = new URLSearchParams(window.location.search);
    if(urlParams.has('status')) {
        const status = urlParams.get('status');
        if(status === 'success') {
            successAlert.style.display = 'block';
            setTimeout(() => {
                successAlert.style.display = 'none';
            }, 5000);
        } else if(status === 'error') {
            errorAlert.style.display = 'block';
            setTimeout(() => {
                errorAlert.style.display = 'none';
            }, 5000);
        }
    }
    
    // If you want to use AJAX submission instead of direct form submission
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(contactForm);
        
        // Send form data using fetch API
        fetch('send-email.php', {
            method: 'POST',
            body: formData,
            headers: {
                'X-Requested-With': 'XMLHttpRequest'
            }
        })
        .then(response => response.json())
        .then(data => {
            if(data.success) {
                // Show success message
                successAlert.style.display = 'block';
                errorAlert.style.display = 'none';
                
                // Reset form
                contactForm.reset();
                
                // Hide success message after 5 seconds
                setTimeout(() => {
                    successAlert.style.display = 'none';
                }, 5000);
            } else {
                // Show error message
                errorAlert.style.display = 'block';
                successAlert.style.display = 'none';
                
                // Hide error message after 5 seconds
                setTimeout(() => {
                    errorAlert.style.display = 'none';
                }, 5000);
            }
        })
        .catch(error => {
            // Show error message
            errorAlert.style.display = 'block';
            successAlert.style.display = 'none';
            
            // Hide error message after 5 seconds
            setTimeout(() => {
                errorAlert.style.display = 'none';
            }, 5000);
        });
    });
});