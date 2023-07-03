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
                    // let flash = data.data.flash
                    $('#post-list-container>ul').prepend(newPost);


                    deletePost($(' .delete-post-button', newPost))


                    new PostComments(data.data.post._id)


                    new ToggleLike(' .toggle-like-button', newPost)

                    new Noty({
                        theme: 'relax',
                        type: 'success',
                        text: 'post created! ',
                        layout: 'topRight',
                        timeout: 1500
                    }).show();

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
                <a class="delete-post-button" href="/post/destroy/${post._id}">
                <i class="fa-sharp fa-solid fa-trash"></i>
                </a>
            </small>
           
                ${post.content}

                    <small>
                        ${post.user.name}
                    </small>
                   
                    <small>
                        <a class="toggle-like-button" data-likes="0"
                            href="/likes/toggle/?id=${post._id}&type=Post">
                            0 Likes
                        </a>
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
        
        $(deleteLink).click(function (e) {
            e.preventDefault();
            $.ajax({
                type: 'get',
                url: $(deleteLink).prop('href'),
                success: async function (data) {

                  await  $(`#post-${data.data.post_id}`).remove();

                  new Noty({
                    theme: 'relax',
                    type: 'error',
                    text: 'post deleted! ',
                    layout: 'topRight',
                    timeout: 1500
                }).show();

                }, error: function (error) {
                    console.log(error.responseText);
                }

            })

        })
    }



    let convertPostsToAjax = function(){
        $('#posts-list-container>ul>li').each(function(){
            let self = $(this);
            let deleteButton = $(' .delete-post-button', self);
            deletePost(deleteButton);

            // get the post's id by splitting the id attribute
            let postId = self.prop('id').split("-")[1]
            new PostComments(postId);
        });
    }
   

    createPost();
    convertPostsToAjax()
}