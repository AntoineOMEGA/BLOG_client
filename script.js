var app = new Vue ({
    el: "#app",
    
    data: {
        pages: [
            "blog","post"
        ],
        current_page: "blog",
        posts: [
            {
                title: "Rare Seashell",
                author: "Mr. Squid",
                category: "cards",
                date: "Today",
                image: "seashell.jpg",
                text: "Rare swordfish sea shell. efksejngksjnkjngekjrngkjgkjtnkjrngkjhnkr rktjhjkrtnhrk krjthnkrtjnhr tkr tjhkrjt hkrtnlerkenlrb emrhek,rne,drkrtekmwjlwrkneglr..."
            },
            {
                title: "Rare shell",
                author: "Mr. Squid",
                category: "coins",
                date: "Today",
                image: "seashell.jpg",
                text: "Rare swordfish sea shell. efksejngksjnkjngekjrngkjgkjtnkjrngkjhnkr rktjhjkrtnhrk krjthnkrtjnhr tkr tjhkrjt hkrtnlerkenlrb emrhek,rne,drkrtekmwjlwrkneglr..."
            },
            {
                title: "Seashell",
                author: "Mr. Squid",
                category: "outdoors",
                date: "Today",
                image: "seashell.jpg",
                text: "Rare swordfish sea shell. efksejngksjnkjngekjrngkjgkjtnkjrngkjhnkr rktjhjkrtnhrk krjthnkrtjnhr tkr tjhkrjt hkrtnlerkenlrb emrhek,rne,drkrtekmwjlwrkneglr..."
            }
        ],
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
    },
    
    methods: {
        submitPost: function () {
            var current_date = new Date;
            var post_date = (current_date.getMonth() + 1) + "/" + current_date.getDate() + "/" + current_date.getFullYear();
            var new_post = {
                title: this.post_title,
                author: this.post_author,
                category: this.post_category,
                date: post_date,
                image: this.post_image,
                text: this.post_text,
            }
            this.posts.push(new_post);
            this.current_page = "blog";

            //Reset New Post Variables
            this.post_title = undefined;
            this.post_author = undefined;
            this.post_category = "all";
            this.post_image = undefined;
            this.post_text = undefined;
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
    },
})