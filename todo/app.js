var storage = {
    save(key, value) {
        localStorage.setItem(key, JSON.stringify(value));
    },
    fetch(key) {
        return JSON.parse(localStorage.getItem(key)) || [];
    }
}

var todoList = storage.fetch("todoList");

var app = new Vue({
    el: ".main",
    data: {
        todoList: todoList,
        // 保存新增的计划
        todoNew: "",
        // 保存正在编辑的计划
        editingTodo: "",
        // 保存计划的原值，用于按esc取消编辑时，还原原值
        oldTodo: ""
    },
    watch: {
        todoList: {
            handler() {
                storage.save("todoList", this.todoList);
            },
            deep: true
        }
    },
    computed:{
        unCompleteTodo() {
            return this.todoList.filter((item) => {return !item.isChecked;}).length;
        }
    },
    methods: {
        addTodoNew() {
            this.todoList.push({
                todoTitle: this.todoNew,
                isChecked: false
            });
            this.todoNew = "";
        },
        deleteTodo(item) {
            var pos = this.todoList.indexOf(item);
            if (pos !== -1) {
                this.todoList.splice(pos, 1);
            }
        },
        editTodo(item) {
            this.oldTodo = item.todoTitle;
            this.editingTodo = item;
        },
        editTodoSuccess() {
            this.editingTodo = "";
        },
        editTodoCancel(item) {
            item.todoTitle = this.oldTodo;
            this.oldTodo = "";
            this.editingTodo = "";
        }
    },
    directives: {
        "focus": {
            update(elem, binding) {
                if (binding.value) {
                    elem.focus();
                }
            }
        }
    }
});