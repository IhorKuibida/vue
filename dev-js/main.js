var app = new Vue({
    el:"#app",
    data:{
        user: "Ihor",
        link:"https://google.com",
        open: 10,
        colors:['green', 'red', 'blue']
    },
    computed:{
        title : function() {
            return this.user +" "+this.open;
        }
    },
    methods:{
        changeTitle: function (e){ this.open = e.target.value}
        
    }
});

let das = () => {
    return "hello world";
   
}