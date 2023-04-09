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

                    let newPost = newPostDom(data.data.post);
                    let flash = data.data.flash
                    $('#post-list-container>ul').prepend(newPost);
                    

                    deletePost($(' .delete-post-button', newPost))

                    createComment(data.data.post._id)
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
    <div class="post-comments" >
       
            <form action="/comments/create" method="POST" id="commentForm-${post._id}">
                <input type="text" name="content" placeholder="type here comments" >
                <input type="hidden" name="post" value="${post._id}">
                <input type="submit" value="Add comment">
            </form>

           

                <div class="post-comments-list">
                    <ul class="post-comments-${post._id} ">
                       
                    </ul>
                </div>
    </div>
</li>`)
    }

    //  delete post method 

    let deletePost = function (deleteLink) {
        // console.log("sss", deleteLink)
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




    let newCommentDom = function (data) {
        // console.log("xx", data)
        return $(`<li id="comment-${data.comment._id}">
    <p>
       
            <small>
                <a class="commentLink" href="/comments/delete/${data.comment._id}">x</a>

            </small>
            

                ${data.comment.content}
                    <br>
                    <small>
                        ${data.userName.name}
                    </small>
    </p>
</li>`)
    }


    // create comment in dom

    let createComment = function (postId) {

        let commentForm = $(`#commentForm-${postId}`)

        commentForm.submit(function (e) {
            e.preventDefault();

            $.ajax({
                type: 'post',
                url: '/comments/create',
                data: commentForm.serialize(),
                success: function (data) {

                    let newComment = newCommentDom(data.data)
                    // let commentd = data.data
                    let commentPost = $(`.post-comments-${data.data.comment.post}`).prepend(newComment)
                    deleteComment($(' .commentLink', newComment))


                }, error: function (error) {
                    console.log(error.responseText)
                }
            })
        })
    }






    let deleteComment = function (delLink) {
        // console.log(delLink)
        $(delLink).click(function (e) {
            e.preventDefault();

            $.ajax({
                type: 'get',
                url: $(delLink).prop('href'),
                success: function (data) {


                    $(`#comment-${data.data.comment_id}`).remove();


                    // console.log(data.data)

                }, error: function (error) {
                    console.log(error.responseText)
                }
            })
        })
    }



    createPost();

}