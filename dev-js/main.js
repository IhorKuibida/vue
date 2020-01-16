var app = new Vue({
    el:"#app",
    data:{
        user: "Ihor",
        link:"https://google.com",
        open: 10,
        colors:[
            {
                id:234,
                color:"green"
            },
            {
                id:235,
                color:"red"
            },
            {
                id:236,
                color:"grey"

            }
        ]
    },
    computed:{
        title : function() {
            return this.user +" "+this.open;
        }
    },
    methods:{
        changeTitle: function (e){ this.open = e.target.value},
        showColor(color){this.open = color; }
        
    }
});

let das = () => {
    return "hello world";
   
}