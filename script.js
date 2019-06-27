var app = new Vue ({
    el: "#app",
    
    data: {
        pages: [
            "blog","post"
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

        post_title: undefined,
        post_author: undefined,
        post_category: "all",
        post_image: undefined,
        post_text: undefined,

        drawer: false,
        url: "https://collector-blog-a.herokuapp.com",
    },
    
    created: function () {
        this.getPosts();
    },

    methods: {
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
        }
    },
})