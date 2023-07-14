document.addEventListener('DOMContentLoaded', function() {

    const likeButtons = document.querySelectorAll('.like-button');
    likeButtons.forEach(button => {
        button.addEventListener('click', function() {
            const postId = this.dataset.postId;
            fetch('/api/posts/like', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ postId: postId })
            })
            .then(response => response.json())
            .then(data => {
            
            })
            .catch(error => {
                console.error('Error liking post:', error);
            });
        });
    });

    const editButtons = document.querySelectorAll('.edit-btn');
    editButtons.forEach(button => {
        button.addEventListener('click', function() {
            const postId = this.dataset.postId;
            window.location.href = `/edit-post/${postId}`; // Redirect to edit post page
        });
    });

    // Delete post event listener
    const deleteButtons = document.querySelectorAll('.delete-btn');
    deleteButtons.forEach(button => {
        button.addEventListener('click', async function() {
            const postId = this.dataset.postId;
            try {
                const response = await fetch(`/api/posts/${postId}`, {
                    method: 'DELETE',
                });
                if (response.ok) {
                    alert('Post deleted');
                    location.reload();
                } else {
                    alert('Failed to delete post');
                }
            } catch (error) {
                console.error('Error deleting post:', error);
            }
        });
    });
});