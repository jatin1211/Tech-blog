async function deleteFormHandler(event) {
    event.preventDefault();

    const id = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1
    ];
    const response = await fetch(`/api/posts/${id}`, {
        method: 'DELETE'
    });

    if (response.ok) {
        document.location.replace('/edit-posts/');
    } else {
        alert(response.statusText);
    }
}

//update if class is different in form handler
document.querySelector('#delete-blog-btn').addEventListener('click', deleteFormHandler);