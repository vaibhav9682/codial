class PostComments {
    constructor(postId) {
        this.postId = postId;
        this.postContainer = $(`#post-${postId}`);
        this.newCommentForm = $(`#commentForm-${postId}`);

        this.crateComment(postId);

        let self = this;

        $(' .delete-comment-button', this.postContainer).each(function () {
            self.deleteComment($(this));
        })

    }


    createComment(postId) {
        let pSelf = this;

        this.newCommentForm.submit(function (e) {
            e.preventDefault();
            let self = this;


            $.ajax({
                type: 'post',
                url: '/comments/create',
                data: $(self).serialize(),
                success: async function (data) {

                    let newComment = await pSelf.newCommentDom(data.data)

                    $(` .post-comments-${postId}`).prepend(newComment)
                    pSelf.deleteComment($(' .commentLink', newComment))

                    new ToggleLike(' .toggle-like-button', newComment)

                    new Noty({
                        theme: 'relax',
                        text: "Comment published!",
                        type: 'success',
                        layout: 'topRight',
                        timeout: 1500

                    }).show();

                }, error: function (error) {
                    console.log(error.responseText)
                }
            })
        })
    }


    newCommentDom(data) {
        // console.log("xx", data)
        return $(`<li id="comment-${data.comment._id}">
    <p>
       
            <small>
                <a class="commentLink" href="/comments/delete/${data.comment._id}">
                <i class="fa-solid fa-trash"></i>
                </a>

            </small>
            

                ${data.comment.content}
                    <br>
                    <small>
                        ${data.userName.name}
                    </small>
                    <small>
                    <a class="toggle-like-button" data-likes="0"
                        href="/likes/toggle/?id=${comment._id}&type=Comment">
                        0 Likes
                    </a>
                </small>

    </p>
</li>`)
    }

    deleteComment(delLink) {
        // console.log(delLink)
        $(delLink).click(function (e) {
            e.preventDefault();

            $.ajax({
                type: 'get',
                url: $(delLink).prop('href'),
                success: function (data) {


                    $(`#comment-${data.data.comment_id}`).remove();

                    new Noty({
                        theme: 'relax',
                        text: "Comment Deleted",
                        type: 'success',
                        layout: 'topRight',
                        timeout: 1500

                    }).show();


                }, error: function (error) {
                    console.log(error.responseText)
                }
            })
        })
    }



}
