let posts

$(document).ready(function(){
    // getPost(1);

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

    });

    $("#newPost").click(function(){

    });

    $("#deletePost").click(function(){

    });

    $("#replyPost").click(function(){

    });

    $("#deleteReply").click(function(){

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