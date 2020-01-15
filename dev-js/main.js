var app = new Vue({
    el:"#app",
    data:{
        user: "Ihor",
        link:"https://google.com",
    },
    methods:{
        changeTitle: function (e){ this.user = e.target.value}
    }
});