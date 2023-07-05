document.addEventListener("DOMContentLoaded", function () {
    
    const likeButtons = document.querySelectorAll('.like-btn');
    likeButtons.forEach(button => {
        button.addEventListener('click', function() {
            const postId = this.dataset.postId;
         
            console.log(`Liked post ${postId}`);
        });
    });

 
    document.querySelector('.new-post-form').addEventListener('submit', async (event) => {
        event.preventDefault();
        const form = event.target;
        const formData = new FormData(form);

        const response = await fetch(form.action, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                title: formData.get('title'),
                content: formData.get('content'),
                category: formData.get('category')
            })
        });

        if (response.ok) {
            location.reload();
        } else {
            alert('Failed to submit post');
        }
    });
});


function filterPostsByCategory(category) {
    const posts = document.querySelectorAll('.post');
    posts.forEach(post => {
        if (category === '' || post.dataset.category === category) {
            post.style.display = 'block';
        } else {
            post.style.display = 'none';
        }
    });
}
