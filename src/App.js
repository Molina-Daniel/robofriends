import React, { Component } from 'react';
import CardList from './CardList';
import SearchBox from './SearchBox';
import { robots } from './robots';
import './App.css';

class App extends Component {
	constructor() {
		super()
		this.state = {
			robots: [],
			searchfield: ''
		}
	}

	componentDidMount() {
		fetch('https://jsonplaceholder.typicode.com/users')
			.then(res => res.json())
			.then(users => this.setState({ robots: users}));
	}

	onSearchChange = (event) => {
		this.setState({ searchfield: event.target.value })
	}

	render() {
		const filteredRobots = this.state.robots.filter(robot => {
			return robot.name.toLocaleLowerCase().includes(this.state.searchfield.toLocaleLowerCase());
		})
		
		if (this.state.robots.length === 0) {
			return <h1>Waiting for the robots...</h1>
		} else {
			return (
				<div className='tc'>
				  <h1 className='f1'>RoboFriends</h1>
				  <SearchBox searchChange={this.onSearchChange}/>
				  <CardList robots={filteredRobots} />
				</div>
    		);
		}
	}
}

export default App;