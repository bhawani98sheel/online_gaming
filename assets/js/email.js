// Handle Feedback Form
const feedbackForm = document.getElementById('feedback-form');
const feedbackText = document.getElementById('feedback-text');
const successMessage = document.getElementById('success-message');

feedbackForm.addEventListener('submit', (event) => {
  event.preventDefault();

  const feedback = feedbackText.value.trim();
  if (feedback) {
    // Sending feedback to the server
    fetch('/send-feedback', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ feedback: feedback }),
    })
      .then(response => response.json())
      .then(data => {
        if (data.message === 'Feedback sent successfully') {
          // Clear the feedback text and show success message
          feedbackText.value = '';
          successMessage.style.display = 'block';

          // Hide success message after 3 seconds
          setTimeout(() => {
            successMessage.style.display = 'none';
          }, 3000);
        } else {
          alert('Failed to send feedback. Please try again later.');
        }
      })
      .catch(error => {
        console.error('Error:', error);
        alert('An error occurred. Please try again.');
      });
  } else {
    alert('Please enter your feedback before submitting.');
  }
});
