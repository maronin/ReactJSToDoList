import React from 'react';

var ToDoApp = React.createClass({

	getInitialState: function () {
		var data = Cookies.getJSON('task-data')
		if (data) {
			return {
				data: data
			};	
		} else {
			return {
				data: []
			};	
		}
	},
	handleToggleComplete: function(id) {
		var data = this.state.data;

		for (var i in data) {
			if (data[i].id == id) {
				data[i].complete = data[i].complete === 'true' ? 'false' : 'true';
				break;
			}
		}
		this.setState({data});
		Cookies.set('task-data', data);
	},
	handleSubmit: function(task) {
		var data = this.state.data;
		var id = this.state.data.length + 1;
		var complete = 'false';
		data = data.concat([{id, task, complete}]);
		this.setState({data});
		Cookies.set('task-data', data);
	},
	clearTasks: function(e) {
		if (confirm("Are you sure you want to clear the list?")) {
			this.setState({"data": []});
			Cookies.set('task-data', []);
		}
	},
	render: function() {
		return (
			<div className="col-xs-10 col-xs-offset-1">
				<div className="well clearfix">	
					<h2 className="toDoHeader">To do list</h2>
					<hr></hr>
					<ToDoList data={this.state.data} toggleComplete={this.handleToggleComplete}/>					
					<AddTaskForm onAddTask={this.handleSubmit}/>

					<div className="btn btn-danger pull-right" type="button" id="clear" onClick={this.clearTasks}>Clear List</div>

				</div>
			</div>
		);
	}

});

var AddTaskForm = React.createClass({
	submitForm: function(e) {
		e.preventDefault();
		var task = this.refs.task.value.trim();
		
		if (!task) return;

		this.props.onAddTask(task);		
		this.refs.task.value = '';
	},
	render: function() {
		return (
			<form onSubmit={this.submitForm}>
				<input type="text" id="task" ref="task" className="addTask" placeholder="Add a task" />
			</form>
		)
	}
});

var ToDoList = React.createClass({
	toggleComplete: function(id) {
		this.props.toggleComplete(id);
		return;
	},
	render: function() {
		var listNodes;
		if (this.props.data) {
			listNodes = this.props.data.map(function (listItem) {
				return(
					<ToDoTask key={listItem.id} id={listItem.id} task={listItem.task} complete={listItem.complete} toggleComplete={this.toggleComplete}/>
				);
			}, this);
		}
		return (
			<ul className="list">
				{listNodes}
			</ul>
		);
	}

});

var ToDoTask = React.createClass({
	toggleComplete: function(e) {
		this.props.toggleComplete(this.props.id);
		return;
	},
	render: function() {
		var taskClass = 'task';
		var checkBoxClass = 'checkBox';
		var complete = this.props.complete === 'true';
		
		if (complete) {
			taskClass += ' complete';
			checkBoxClass += ' complete';
		}
		return (
			<li className={taskClass}>
				<div className={checkBoxClass} onClick={this.toggleComplete}></div>{this.props.task}
				<hr></hr>
			</li>

		);
	}
});

export default ToDoApp;
