{
    // method to submit the form data for new post using AJAX

    let createPost = function () {
        let newPostForm = $('#new-post-form');

        newPostForm.submit(function (e) {
            e.preventDefault();

            $.ajax({
                type: 'post',
                url: '/post/create',
                data: newPostForm.serialize(),
                success: function (data) {
                    // console.log(data.data.post)
                    let newPost = newPostDom(data.data.post);

                      console.log(newPost)
                    $('#post-list-container>ul').prepend(newPost);
                    deletePost($('.delete-post-button', newPost))

                }, error: function (error) {
                    console.log(error.responseText);
                }
            })

        });


    }

    // method to create a post in DOM
    let newPostDom = function (post) {
        return $(`<li id="post-${post._id}">
    <p>
       
            <small>
                <a class="delete-post-button" href="/post/destroy/${post._id}">x</a>
            </small>
           
                ${post.content}

                    <small>
                        ${post.user.name}
                    </small>
    </p>
    <!-- comments -->
    <div class="post-comments">
       
            <form action="/comments/create" method="POST">
                <input type="text" name="content" placeholder="type here comments" required>
                <input type="hidden" name="post" value="${post._id}">
                <input type="submit" value="Add comment">
            </form>

           

                <div class="post-comments-list">
                    <ul id="post-comments-${post._id} ">
                       
                    </ul>
                </div>
    </div>
</li>`)
    }

    //  delete post method 

    let deletePost = function (deleteLink) {
        // console.log(deleteLink)  
        $(deleteLink).click(function (e) {
            e.preventDefault();



            $.ajax({
                type: 'get',
                url: $(deleteLink).prop('href'),

                success: function (data) {

                    
                    $(`#post-${data.data.post_id}`).remove();
                }, error: function (error) {
                    console.log(error.responseText);
                }
                
            })

        })
    }



    // let deleteComment = function (delLink) {
    //     $(delLink).click(function (e) {
    //         e.preventDefault();

    //         $.ajax({
    //             type: 'get',
    //             url: $(delLink).prop('href'),
    //             success: function (data) {
    //                 console.log(data);
    //                 //    $(`#comment-$`)
    //             }, error: function (error) {
    //                 console.log(error.responseText)
    //             }
    //         })


    //     })
    // }



    createPost();
}