import React, { Component } from 'react';
import logo from './MORTFORS.jpg';
import './App.css';
import axios from 'axios';

class App extends Component {
	constructor() {
		super();
		this.state = {items: null}

		axios.get('http://localhost:3000/get_articles')
		.then((resp) => {
			this.setState({items: resp.data});
		})
		.catch(err => {
			console.log('err', err);
		});
	}

	componentDidMount() {
	}

	getAssortment() {
		if(this.state.items === null) {
			return (<p>Loading</p>)
		}

		const items = this.state.items;

		const assortmentList = items.map((item) =>
			<tr key={item.produktid}>
				<td>{item.produktid}</td>
				<td>{item.saldo}</td>
				<td>{item.säljstyckpris}</td>
				<td>{item.tillverkare}</td>
			</tr>
		);

		return (
			<table>
				<tbody>
					<tr>
						<th>Produkt</th>
						<th>Saldo</th>
						<th>Pris</th>
						<th>Tillverkare</th>
					</tr>
					{assortmentList}
				</tbody>
			</table>
		)
	}

	handleKeyPress = (event) => {
	  if(event.key === 'Enter'){
	    const submitValue = document.getElementById("search-field").value
			axios.get("http://localhost:3000/search?search="+submitValue)
				.then((resp) => {
					const newState = this.state
					newState["items"] = resp.data
					this.setState(newState)
				})
	  }
	}

  render() {
    return (
      <div className="App">
        <header className="App-header">
					<div className="App-header-wrapper">
	          <img src={logo} className="App-logo" alt="logo" />
	          <h1 className="App-title">Välkommen till Mörtfors vitvaror</h1>
					</div>
        </header>

				<main>
					<div className="Search-wrapper">
						<input
							type="text"
							name="search"
							placeholder="Sök efter produkt"
							className="Search-field"
							onKeyPress={(event) => {this.handleKeyPress(event)}}
							id="search-field"
						/>
					</div>

					<div
						className="Assortment-list">{this.getAssortment()}
					</div>

					<div className="New-order">
						<h3>Lägg en ny order då</h3>
						<form method="GET" action="http://localhost:3000/new_order">
							<label>Personnummer:</label>
							<input type="text" name="personnummer" />

							<label>Namn:</label>
							<input type="text" name="namn"/>

							<label>Adress:</label>
							<input type="text" name="adress"/>

							<label>Epost:</label>
							<input type="email" name="epost"/>

							<label>ProduktID:</label>
							<input type="text" name="produktid"/>

							<label>Antal:</label>
							<input type="text" name="antal"/>

							<button>Skicka!</button>
						</form>
					</div>
				</main>
      </div>
    );
  }
}

export default App;
