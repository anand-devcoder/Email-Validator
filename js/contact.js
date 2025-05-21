const form = document.getElementById('contactForm');
const popup = document.getElementById('popupMessage');
const popupIcon = document.getElementById('popupIcon');
const popupText = document.getElementById('popupText');

function showPopup(message, isError = false) {
    popupText.textContent = message;
    
    if (isError) {
        popupIcon.textContent = '❌';
        popup.classList.add('error');
    } else {
        popupIcon.textContent = '✅';
        popup.classList.remove('error');
    }

    popup.style.display = 'flex';
    
    setTimeout(() => {
        popup.style.display = 'none';
    }, 3000); // Auto-hide after 3 seconds
}

form.addEventListener('submit', function(e) {
    e.preventDefault();
    const formData = new FormData(form);

    fetch(form.action, {
        method: 'POST',
        body: formData
    })
    .then(response => {
        if (response.ok) {
            showPopup('Message sent successfully!');
            form.reset();
        } else {
            showPopup('Failed to send message.', true);
        }
    })
    .catch(error => {
        console.error('Error:', error);
        showPopup('There was an error sending your message.', true);
    });
});

