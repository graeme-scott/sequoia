import React from 'react';
import ReactDOM from 'react-dom';

const TaskForm = ({addTask}) => {
  let input;
  let description;
  let label;

  return (
    <div className="task-modal">
      <form onSubmit={(e) => {
          e.preventDefault();

          if (input.value !== '') {
            addTask(input.value, description.value, label.value);

            input.value = '';
            description.value = '';
            label.value = 'none';
          }
        }}>
        <h3>Add new task</h3>

        <input className="task-input col-md-12" ref={node => {
          input = node;
        }} />

        <textarea className="task-description" ref={node => {
          description = node;
        }} />

        <span className="select-wrapper">
          <select className="task-priority" ref={node => {
            label = node;
          }}>
            <option value="none">No label</option>
            <option value="low">Low priority</option>
            <option value="high">High priority</option>
          </select>
        </span>

        <div className="task-button-wrapper">
          <button className="task-button">Add task</button>
        </div>
      </form>
    </div>
  );
};

const Task = ({task, remove}) => {
  return (
    <div className="task-card">
      <a href="#" className="list-group-item" onClick={() => {remove(task.id)}}>X</a>

      <div className="task-card-content">
        <h3 className="task-card-heading">{task.text}</h3>
        <p className="task-card-description">{task.description}</p>
      </div>

      <div className="task-label-container">
        <span className={task.label}>{task.label}</span>
      </div>
    </div>
  );
}

const TaskList = ({tasks, remove}) => {
  if (tasks.length > 0) {
    const taskNode = tasks.map((task) => {
      return (<Task task={task} key={task.id} remove={remove}/>)
    });

    return (<div className="list-container">
      <h3>Tasks</h3>

      <div className="list-group">
        {taskNode}
        <div className="task-card filler" />
        <div className="task-card filler" />
        <div className="task-card filler" />
        <div className="task-card filler" />
        <div className="task-card filler" />
      </div>
    </div>);
  } else {
    return (<div className="task-none-message">No tasks are available</div>);
  }
}

window.id = 1;

class TaskManagerApp extends React.Component{
  constructor(props){
    super(props);

    this.state = {
      data: []
    }

    this._handleFilter = this._handleFilter.bind(this);
    this._openModal = this._openModal.bind(this);
  }

  componentDidMount() {
    document.querySelector('.loader-wrapper').classList.add('fade');
  }

  addTask(input, description, label){
    if (input !== '') {
      const task = {text: input, description: description, label: label, id: window.id++}

      this.state.data.push(task);
      this.setState({data: this.state.data});
    }
  }

  handleRemove(id){
    const remainder = this.state.data.filter((task) => {
      if(task.id !== id) return task;
    });

    this.setState({data: remainder});
  }

  _handleFilter(e) {
    var cards = document.querySelectorAll('.task-card:not(.filler)');
    var filter = e.currentTarget.value;

    if (filter === 'all') {
      cards.forEach( function(card) {
        card.classList.remove('hide');
        card.classList.add('show');
      });
    } else {
      cards.forEach( function(card) {
        if (card.querySelector('.task-label-container span').classList.contains(filter)) {
          card.classList.remove('hide');
          card.classList.add('show');
        } else {
          card.classList.add('hide');
          card.classList.remove('show');
        }
      });
    }
  }

  _openModal() {
    document.querySelector('.task-modal').classList.toggle('open');
    document.querySelector('.task-overlay').classList.toggle('open');
  }

  render(){
    return (
      <div className="task">
        <nav className="task-nav">
          <button className="task-button" onClick={() => this._openModal()}>Add new</button>

          <div className="task-filter-container">
            <span className="select-wrapper-label">Filter:</span>

            <span className="select-wrapper">
              <select className="task-filter" onChange={(e) => this._handleFilter(e)}>
                <option value="all">Show all</option>
                <option value="none">No Label</option>
                <option value="high">High</option>
                <option value="low">Low</option>
              </select>
            </span>
          </div>
        </nav>

        <div className="task-overlay" onClick={() => this._openModal()}></div>

        <TaskForm addTask={this.addTask.bind(this)}/>

        <TaskList
          tasks={this.state.data}
          remove={this.handleRemove.bind(this)}
        />
      </div>
    );
  }
}

ReactDOM.render(<TaskManagerApp />, document.getElementById('taskContainer'));
