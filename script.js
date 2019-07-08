var app = new Vue ({
    el: "#app",
    
    data: {
        pages: [
            "blog","post","update"
        ],
        posts: [],
        current_page: "blog",
        categories: [
            "all",
            "clothing",
            "outdoors",
            "books",
            "cards",
            "coins",
            "keychains",
            "comic books",
            "misc."
        ],
        selected_category: "all",
        post_editing: undefined,

        post_title: undefined,
        post_author: undefined,
        post_category: "all",
        post_image: undefined,
        post_text: undefined,

        drawer: false,
        delete_code: "",
        url: "https://collector-blog-a.herokuapp.com",
        //url: "http://localhost:3000",
    },
    
    created: function () {
        window.addEventListener("keyup", this.keyEvents);
    },

    methods: {
        keyEvents: function (event) {
            if (event.which == 83) {
                if (this.delete_code == "") {
                    this.delete_code = "S";
                } else {
                    this.delete_code = "";
                }
            } else if (event.which == 78) {
                if (this.delete_code == "S") {
                    this.delete_code = "SN";
                } else {
                    this.delete_code = "";
                }
            }
            else if (event.which == 65) {
                if (this.delete_code == "SN") {
                    this.delete_code = "SNA";
                } else {
                    this.delete_code = "";
                }
            }
            else if (event.which == 80) {
                if (this.delete_code == "SNA") {
                    this.delete_code = "SNAP";
                } else {
                    this.delete_code = "";
                }
            }
            
        },
        getPosts: function () {
            fetch(this.url + "/posts").then(function (res) {
                res.json().then(function (data) {
                    app.posts = data.posts;
                });
            });
        },
        submitPost: function () {
            var req_body = {
                title: this.post_title,
                author: this.post_author,
                category: this.post_category,
                image: this.post_image,
                text: this.post_text,
            };
            

            fetch(this.url + "/post", {
                method: "POST",
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify(req_body)
            }).then(function (response) {
                app.getPosts();
            })

            //Reset New Post Variables
            this.post_title = undefined;
            this.post_author = undefined;
            this.post_category = "all";
            this.post_image = undefined;
            this.post_text = undefined;

            this.current_page = "blog";
            this.selected_category = "all";
        },
        deletePost: function (post) {
            fetch(this.url + "/post/" + post._id,{
                method: "DELETE"
            }).then(function (response) {
                if (response.status == 204) {
                    console.log("Worked");
                    app.getPosts();
                } else if (response.status == 400) {
                    response.json().then(function(data) {
                        alert(data.msg);
                    });
                }
            })
        },
        editPost: function (post) {
            this.current_page = this.pages[2];
            this.post_editing = post;
        },
        updatePost: function (post) {
            fetch(this.url + "/post/" + post._id,{
                method: "PUT",
				headers: {
					"Content-type": "application/json"
				},
				body: JSON.stringify(post)
            }).then(function (response) {
                console.log(response.status);
                if (response.status == 400 || response.status == 404) {
					response.json().then(function (data) {
						alert(data.msg);
					});
				} else if (response.status == 204) {
                    app.getPosts();
                    app.current_page = "blog";
                    app.selected_category = "all";
				}
            });
        }
    },

    computed: {
        computed_posts: function () {
            if (this.selected_category == "all") {
                return this.posts;
            } else {
                var computed_posts = this.posts.filter(function(post) {
                    return post.category == app.selected_category;
                });
                return computed_posts;
            }
        },
        displayImage: function (image) {
            image = undefined;
        },
        showDelete: function () {
            return this.delete_code == "SNAP";
        },
    },
})