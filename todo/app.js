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
        oldTodo: "",
        // 计划状态过滤器
        todoFilter: "all",
        // 计划状态
        todoStatus: [
            { status: "all", desc: "所有任务"},
            { status: "unfinish", desc: "未完成任务"},
            { status: "finish", desc: "已完成任务"}
        ],
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
        },
        todoListFilter() {
            var res;

            switch (this.todoFilter) {
            case "all":
                res = this.todoList;
                break;
            case "unfinish":
                res = this.todoList.filter((item) => { return !item.isChecked;});
                break;
            case "finish":
                res = this.todoList.filter((item) => {return item.isChecked;});
                break;
            default:
                res = this.todoList;
                break;
            }
            return res;
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

function watchHashChange() {
    app.todoFilter = window.location.hash.slice(1);
}

watchHashChange();

window.addEventListener("hashchange", watchHashChange);
