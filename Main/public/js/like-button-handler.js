function likePost(postId) {
    fetch(`/api/posts/like`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ postId, userId: '{{current_user.id}}' }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Something went wrong while liking the post');
        }
        return response.json();
      })
      .then((data) => {
        const likeCount = document.getElementById(`like-count-${postId}`);
        const likeButton = document.querySelector(`button[data-post-id="${postId}"]`);
  
        // Check if the user has already liked the post
        if (data.alreadyLiked) {
          // Display a message or disable the like button
          likeButton.disabled = true;
          likeButton.textContent = 'Liked';
          likeButton.classList.add('liked');
        }
  
        // Update the like count
        likeCount.textContent = data.likeCount;
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }

// Add event listeners to like buttons
const likeButtons = document.querySelectorAll('.like-btn');
likeButtons.forEach(button => {
    const postId = button.getAttribute('data-post-id');
    button.addEventListener('click', () => likePost(postId));
});