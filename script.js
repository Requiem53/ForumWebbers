let posts

$(document).ready(function(){
    let userID
    getPost(1);

    $("#createUser").click(function(){
        const rFirstName = $("#rFirstName").val();
        const rLastName = $("#rLastName").val();
        const rUserName = $("#rUserName").val();
        $.ajax({
            type: "POST",
            url: "http://hyeumine.com/forumCreateUser.php",
            data: {
                firstName : rFirstName,
                lastName : rLastName,
                username : rUserName
            },
            success: (data) => {
                data = JSON.parse(data);
                console.log(data)
            }
        });
    });

    $("#login").click(function(){
        const lUserName = $("#lUserName").val();
        $.ajax({
            type: "POST",
            url: "http://hyeumine.com/forumLogin.php",
            data: {
                username : lUserName
            },
            success: (data) => {
                data = JSON.parse(data);
                console.log(data)
                userID = data.user.id
                console.log(userID)
            }
        });
    });

    $("#newPost").click(function(){
        const message = $("#postNew").val();
        $.ajax({
            type: "POST",
            url: "http://hyeumine.com/forumNewPost.php",
            data: {
                id : userID,
                post : message
            },
            success: (data) => {
                data = JSON.parse(data);
                console.log(data)
            }
        });
    });

    $("#deletePost").click(function(){
        const deleteCode = $("#postDelete").val();
        $.ajax({
            type: "GET",
            url: "http://hyeumine.com/forumDeletePost.php",
            data: {
                id : deleteCode
            },
            success: (data) => {
                data = JSON.parse(data);
                console.log(data)
            }
        });
    });

    $("#replyPost").click(function(){
        const replyCode = $("#postReply").val();
        const replyMsg = $("#postReplyCode").val();
        $.ajax({
            type: "POST",
            url: "http://hyeumine.com/forumReplyPost.php",
            data: {
                user_id : userID,
                post_id : replyCode,
                reply : replyMsg
            },
            success: (data) => {
                data = JSON.parse(data);
                console.log(data)
            }
        });
    });

    $("#deleteReply").click(function(){
        const deleteCode = $("#postReplyCodeDelete").val();
        $.ajax({
            type: "GET",
            url: "http://hyeumine.com/forumDeleteReply.php",
            data: {
                id : deleteCode
            },
            success: (data) => {
                data = JSON.parse(data);
                console.log(data)
            }
        });
    });


});

function getPost(page){
    $.ajax({
        type: "GET",
        url: "http://hyeumine.com/forumGetPosts.php",
        success: (data) => {
            posts = JSON.parse(data)
            console.log(posts)
        }
    });
}