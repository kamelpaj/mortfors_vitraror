import React, { Component } from 'react';
import logo from './MORTFORS.jpg';
import './App.css';
import axios from 'axios';

class App extends Component {
	constructor() {
		super();

		this.state = {items: null}
	}

	componentDidMount() {
		axios.get('http://localhost:3000/get_articles')
			.then((resp) => {
				this.setState({items: resp.data});
			})
			.catch(err => {
				console.log('err', err);
			});
	}

	getAssortment() {
		if(this.state.items === null) {
			return (<p>Loading</p>)
		}

		const items = this.state.items;
		console.log(items);

		const assortmentList = items.map((item) =>
			<tr key={item.produktid}>
				<td>{item.produktid}</td>
				<td>{item.saldo}</td>
				<td>{item.säljstyckpris}</td>
				<td>{item.tillverkare}</td>
			</tr>
		);

		return <table>{assortmentList}</table>
	}

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Välkommen till Mörtfors vitvaror</h1>
        </header>

				<main>
					<div>{this.getAssortment()}</div>
				</main>
      </div>
    );
  }
}

export default App;
