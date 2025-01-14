let likeCount = 1238;
let followCount = 1238;

function increaseLikes() {
  likeCount++;
  document.getElementById('like-count').innerHTML = `${likeCount} <em>Likes</em>`;
}

function increaseFollowers() {
  followCount++;
  document.getElementById('follow-count').innerHTML = `${followCount} <em>Followers</em>`;
}

function openSharePopup() {
    // Update share links with the current page URL
    const pageUrl = encodeURIComponent(window.location.href);
    const pageTitle = encodeURIComponent(document.title);

    document.getElementById('facebook-share').href = `https://www.facebook.com/sharer/sharer.php?u=${pageUrl}`;
    document.getElementById('twitter-share').href = `https://twitter.com/intent/tweet?text=${pageTitle}&url=${pageUrl}`;
    document.getElementById('linkedin-share').href = `https://www.linkedin.com/shareArticle?mini=true&url=${pageUrl}&title=${pageTitle}`;

    // Display the popup and overlay
    document.getElementById('share-popup').style.display = 'block';
    document.getElementById('overlay').style.display = 'block';
  }

  function closeSharePopup() {
    document.getElementById('share-popup').style.display = 'none';
    document.getElementById('overlay').style.display = 'none';
  }

// Feedback Modal Logic
function showFeedbackForm() {
  document.getElementById('feedback-modal').style.display = 'block';
  document.getElementById('overlay').style.display = 'block';
}

function closeFeedbackForm() {
  document.getElementById('feedback-modal').style.display = 'none';
  document.getElementById('overlay').style.display = 'none';
}

document.addEventListener('DOMContentLoaded', function () {
    // Initialize EmailJS
    emailjs.init('your_user_id'); // Replace with your EmailJS user ID
  
    const feedbackForm = document.getElementById('feedback-form');
    const feedbackText = document.getElementById('feedback-text');
    const successMessage = document.getElementById('success-message');
  
    feedbackForm.addEventListener('submit', (event) => {
      event.preventDefault();
  
      const feedback = feedbackText.value.trim();
      if (feedback) {
        // Prepare email parameters
        const emailParams = {
          to_email: 'kittubhawani@gmail.com',
          subject: 'Feedback',
          body: feedback,
        };
  
        // Send feedback via EmailJS
        emailjs.send('your_service_id', 'your_template_id', emailParams)
          .then(() => {
            // Clear the feedback text
            feedbackText.value = '';
  
            // Display the success message
            successMessage.style.display = 'block';
  
            // Hide the success message after 3 seconds
            setTimeout(() => {
              successMessage.style.display = 'none';
            }, 3000);
          })
          .catch(() => {
            alert('There was an error sending your feedback. Please try again.');
          });
      } else {
        alert('Please enter your feedback before submitting.');
      }
    });
  });
  
  