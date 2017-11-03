//存取localstorage中的数据
var store = {
	save(key, value) {
		localStorage.setItem(key, JSON.stringify(value));
	},
	fetch(key){
		return JSON.parse(localStorage.getItem(key)) || [];
	}
};
/*var list = [
{
	title:'吃饭打豆豆',
	isChecked:false
},
{
	title:'吃饭打豆豆',
	isChecked:true
}
];*/
//取出所有值
var list = store.fetch("miaov-new-class");

var vm = new Vue({
  el: '.main',
  data: {
    list: list,
    todo: '',
    edtorTodos: '' ,  //记录正在编辑的todo
    beforeTitle:'',
    visibility: "all"
  },
  watch:{
  	list:{
  		handler:function(){
  			store.save("miaov-new-class", this.list);
  		},
  		deep:true
  	}
  },
  computed:{
  	filteredList:function(){
  		//过滤的时候有三种情况 all un finished
  		var filter = {
  			all:function(){
  				return list
  			},
  			finished:function(){
  				return list.filter(function(item){
  					return item.isChecked;
  				})
  			},
  			unfinished:function(){
  				return list.filter(function(item){
  					return !item.isChecked;
  				})
  			}
  		}
  		return filter[this.visibility] ? filter[this.visibility](list): list;
  	}
  },
  methods:{
  	addTodo(ev){
  		//向list中添加一项任务
  		this.list.push({
  				title:this.todo,
  				isChecked: false
  			});
  		this.todo = '';
  	},
  	deletTodo(todo){
  		var index =this.list.indexOf(todo);
  		this.list.splice(index, 1)
  	},
  	edtorTodo(todo){//编辑任务
  		this.beforeTitle = todo.title;
  		this.edtorTodos = todo;
  	},
  	edtorTodoed(todo){//编辑任务成功
  		this.edtorTodos = '';
  	},
  	cancelTodo(todo){//取消编辑任务
  		todo.title = this.beforeTitle;
  		this.beforeTitle = '';
  		//显示div，隐藏input
  		this.edtorTodos = ''
  	}
  },
  directives: {
  	"focus": {
  		update(el, binding) {
  			if(binding.value){
  				el.focus();
  			}
  		}
  	}
  }
});

function watchHashChange(){
	var hash = window.location.hash.slice(1);

	vm.visibility = hash;
}

watchHashChange();

window.addEventListener("hashchange", watchHashChange);