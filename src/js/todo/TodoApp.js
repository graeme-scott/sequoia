import React from 'react';
import ReactDOM from 'react-dom';

const TodoForm = ({addTodo}) => {
  let input;

  return (
    <form onSubmit={(e) => {
        e.preventDefault();
        addTodo(input.value);
        input.value = '';
      }}>
      <input className="todo-input col-md-12" ref={node => {
        input = node;
      }} />

      <button className="todo-button">+</button>
    </form>
  );
};

const Todo = ({todo, remove}) => {
  return (<a href="#" className="list-group-item" onClick={() => {remove(todo.id)}}>{todo.text}</a>);
}

const TodoList = ({todos, remove}) => {
  const todoNode = todos.map((todo) => {
    return (<Todo todo={todo} key={todo.id} remove={remove}/>)
  });
  
  return (<div className="list-group" style={{marginTop:'30px'}}>{todoNode}</div>);
}

window.id = 0;

class TodoApp extends React.Component{
  constructor(props){
    super(props);

    this.state = {
      data: []
    }
  }

  addTodo(val){
    if (val !== '') {
      const todo = {text: val, id: window.id++}

      this.state.data.push(todo);
      this.setState({data: this.state.data});      
    }
  }

  handleRemove(id){
    const remainder = this.state.data.filter((todo) => {
      if(todo.id !== id) return todo;
    });

    this.setState({data: remainder});
  }

  render(){
    return (
      <div className="todo">
        <h2>
          Todo List
          {
            (this.state.data.length === 0)
              || ' (' + this.state.data.length + ')'
          }
        </h2>
        <TodoForm addTodo={this.addTodo.bind(this)}/>
        <TodoList 
          todos={this.state.data} 
          remove={this.handleRemove.bind(this)}
        />
      </div>
    );
  }
}

ReactDOM.render(<TodoApp />, document.getElementById('todoContainer'));