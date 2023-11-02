let posts

$(document).ready(function(){
    $("#loginFront").show()
    $("#registerFront").hide()
    $("#inProgress").hide()

    // $("#loginFront").hide()
    // $("#registerFront").hide()
    // $("#inProgress").show()

    let userID

    $("#registerer").click(function(){
        $("#loginFront").hide()
        $("#registerFront").show()
    });

    $("#loginer").click(function(){
        $("#loginFront").show()
        $("#registerFront").hide()
    });

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
                getPost(10);
                $("#registerFront").hide()
                $("#inProgress").show()
                showPosts(posts);
            },
            error: function(xhr, status, error) {
                var err = eval("An error has occured" + "(" + xhr.responseText + ")");
                alert(err.Message);
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
                if(data.success == false){
                    alert("Error: User may not exist. Register instead");
                }else{
                    userID = data.user.id
                    console.log(userID)
                    getPost(10);
                    $("#loginFront").hide();
                    $("#inProgress").show();
                    showPosts(posts);
                }
            },
            error: function(xhr, status, error) {
                var err = eval("An error has occured" + "(" + xhr.responseText + ")");
                alert(err.Message);
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
            },
            error: function(xhr, status, error) {
                var err = eval("An error has occured" + "(" + xhr.responseText + ")");
                alert(err.Message);
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
            },
            error: function(xhr, status, error) {
                var err = eval("An error has occured" + "(" + xhr.responseText + ")");
                alert(err.Message);
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
            },
            error: function(xhr, status, error) {
                var err = eval("An error has occured" + "(" + xhr.responseText + ")");
                alert(err.Message);
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
            },
            error: function(xhr, status, error) {
                var err = eval("An error has occured" + "(" + xhr.responseText + ")");
                alert(err.Message);
            }
        });
    });


});

function getPost(page){
    $.ajax({
        type: "GET",
        async: false,
        url: `http://hyeumine.com/forumGetPosts.php?page=${page}`,
        success: (data) => {
            posts = JSON.parse(data)
            console.log(posts)
        },
        error: function(xhr, status, error) {
            var err = eval("An error has occured" + "(" + xhr.responseText + ")");
            alert(err.Message);
        }
    });
}

function showPosts(posts){
    $("#posts").html("");
    posts.forEach((post) => {
        $("#posts").append(`
            <div class="wholePost">
                <div>${post.user} posted: </div>
                <div class="indivPost">
                    <div class="postItself">${post.post}</div>
                </div>
                <div class="date">${post.date}</div>
            </div>
            <div c  lass="replies" id=${post.id}></div>
        `);

        posts.forEach((reply) => {
            $(`#${post.id}`).append(`
                <div class="wholePost">
                    <div>${reply.user} replied to ${post.user}: </div>
                    <div class="indivPost">
                        <div class="postItself">${reply}</div>
                    </div>
                    <div class="date">${reply.date}</div>
                </div>
            `);
        });
    });
}