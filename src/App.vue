<template>
  <div class="container">
    <div class="section">
      <div class="img">
        <img src="./assets/logo.png" alt="logo" width="50px" height="50px" class="logo">
      </div>
      <div class="heading">
        <h2>To Do List</h2>
      </div>
      <div class="input-tag">
        <!-- input for adding new task -->
        <input type="text" v-if="!editedTask" placeholder="Add New Tasks..." v-model="inputTask" @keyup.enter="addTodo"/>
        <!-- inputbox for updating selected task -->
        <input type="text" v-if="editedTask" placeholder="Update Task..." v-model="taskonEdit" @keyup.enter="updateTodo(taskonEdit)" />
        <!-- button icon for adding new task on clicking -->
        <button type="button" v-if="!editedTask" class="plusIcon" @click="addTodo"><i class="fas fa-plus icon" aria-hidden="true"></i></button>
        <!-- button icon for updating task on clicking -->
        <button type="button" v-if="editedTask" class="plusIcon" @click="updateTodo(taskonEdit)"><i class="fas fa-edit editedIcon" aria-hidden="true"></i></button>
      </div>
      <h3>List of Todos</h3>
      <div class="todolists" v-for="(todo, index) in todos" :key="index" >
          <p :class="{complete:todo.completed}" @click="toggleComplete(index)"><i class="far fa-circle circleIcon"></i> {{ todo.task }}</p>
          <i v-if="!todo.completed" class="far fa-edit editIcon" @click="editTodo(index)"></i>
          <i v-if="todo.completed" class="far fa-trash-alt trashIcon" @click="removeItem(index)"></i>
      </div>
      <div class="buttons">
        <button type="button" class="btn" @click="clearCompleted">Clear completed</button>
        <button type="button" class="btn" @click="clearAll">Clear all</button>
      </div>
      <p>Pending Tasks: {{ incomplete }}</p>
    </div>
  </div>
</template>
<script>
  export default{
    data(){
      return{
        inputTask: "",
        taskonEdit: "",
        todos: JSON.parse(localStorage.getItem('todos')) || [],
        editedTask: false,
        editId: ""
      }
    },
    methods: {
      // adds todo data
      addTodo(){
        if(this.inputTask){
          this.todos.unshift(
            {
              task: this.inputTask,
              completed: false,
            }
          )
          this.saveTodos();
        }
          this.inputTask = ""
       
      },
      // toggle the todolist into completed or incomplete
      toggleComplete(index){
        this.todos[index].completed = !this.todos[index].completed;
        this.saveTodos();
      },

      // deletes item from the todo list
      removeItem(index){
        this.todos.splice(index,1);
        this.saveTodos();
      },

      // shows incompleted todos
      inProgress(todo){
      return !this.isCompleted(todo);
      },

      // shows completed todos
      isCompleted(todo){
      return todo.completed;
      },

      // clear the completed todos
      clearCompleted(){
       this.todos = this.todos.filter(this.inProgress);
       this.saveTodos();
      },

      // clear all the todos item
      clearAll(){
      this.todos = [];
      this.saveTodos();
      },

      // edit the clicked todo
      editTodo(index){
        this.todos.forEach((EditToDo, i) => {
          if(i === index){
            this.taskonEdit = EditToDo.task;
            this.editedTask = true;
            this.editId = index;
          }
        });
      
      },
      updateTodo(updateTask){
        this.todos[this.editId].task = updateTask;
        this.editedTask = false;
        this.saveTodos();
      },
      saveTodos(){
        localStorage.setItem('todos',JSON.stringify(this.todos));
      }
    },
    computed: {
      incomplete(){
        return this.todos.filter(this.inProgress).length;
      }
    },
  }
</script>
<style scoped>
.section{
  width: 280px;
  min-height: 300px;
  margin: 0 auto;
  border: 1px solid grey;
  border-radius: 10px;
  padding: 10px 15px;
  box-shadow: 5px 5px 5px 5px olive;
}
.img{
  display: flex;
  justify-content: center;
}
.heading{
  text-align: center;
  color: rgb(25, 233, 25);
}
.input-tag{
  display: flex;
  flex-direction: row;
  border: 1px solid grey;
  border-radius: 2px;
}
input{
  width: 220px;
  height: 20px;
  padding: 5px 10px;
  outline: none;
  border: none;
}
h3{
  text-align: center;
  color: orange;
  text-transform: uppercase;
  text-decoration: underline;
}
.todolists{
  display: flex;
  align-items: center;
  justify-content: space-between;
  border: 1px solid rgb(243, 57, 11);
  border-radius: 5px;
  margin: 10px 0;
  padding: 0 5px;
  transition: 0.3s ease-in;
}
.todolists:hover{
  transition: 0.3s ease-out;
  cursor: pointer;
  transform: scale(1.06); 
}
.buttons{
  margin-top: 15px;
  display: flex;
  align-items: center;
  justify-content: space-around;
}
.btn{
  padding: 10px 15px;
  border-radius: 6px;
  background-color: rgb(46, 148, 167);
  color: white;
  border: none;
  font-size: 14px;
}
.plusIcon{
  background-color: white;
  outline: none;
  border: none;
  cursor: pointer;
}
.icon{
  font-size: 15px;
  color: rgb(73, 73, 219);
  margin-right: -35px;
}
.circleIcon{
  margin-right: 20px;
}
.editedIcon{
  margin-right: -35px;
  color: green;
  font-size: 15px;
}
.trashIcon{
  color: purple;
}
.complete{
  text-decoration: line-through;
  color: rgb(31, 134, 54);
}
.complete i::before{
  content: "\f058";
  color: green;
}
</style>