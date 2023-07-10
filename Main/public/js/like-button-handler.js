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

      // Add thumbs-up symbol if it doesn't exist
      const likeSymbol = document.querySelector(`span[data-post-id="${postId}"]`);
      if (!likeSymbol) {
        const newLikeSymbol = document.createElement('span');
        newLikeSymbol.setAttribute('data-post-id', postId);
        newLikeSymbol.textContent = '👍';
        likeButton.after(newLikeSymbol);
      }
    })
    .catch((error) => {
      console.error('Error:', error);
    });
}