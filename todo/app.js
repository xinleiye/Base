var todoList = [
    {
        todoTitle: "Angular4学习",
        isChecked: false
    },
    {
        todoTitle: "Vue学习",
        isChecked: false
    },
    {
        todoTitle: "英语学习",
        isChecked: false
    }
]

var app = new Vue({
    el: ".main",
    data: {
        todoList: todoList,
        todoNew: ""
    },
    methods: {
        addTodoNew(){
            this.todoList.push({
                todoTitle: this.todoNew,
                isChecked: false
            });
            this.todoNew = "";
        },
        deleteTodo(item){
            var pos = this.todoList.indexOf(item);
            if (pos !== -1) {
                this.todoList.splice(pos, 1);
            }
        }
    }
});