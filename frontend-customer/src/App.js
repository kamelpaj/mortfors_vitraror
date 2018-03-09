import React, { Component } from 'react';
import logo from './MORTFORS.jpg';
import './App.css';

const getAssortment = () => {
	const tempAssortmentJSON = [
		['Kyl', 2, 2500, 'Siemens'],
		['Frys', 3, 1500, 'Electrolux'],
		['Dammsugare', 15, 750, 'Damm AB']
	]

	const assortmentList = (
		<ul>
			{tempAssortmentJSON.map((article) => {
				return (<li>{article}</li>)
			})}
		</ul>
	)

	return assortmentList
}

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Välkommen till Mörtfors vitvaror</h1>
        </header>

				<main>
					<div>{getAssortment()}</div>
				</main>
      </div>
    );
  }
}

export default App;
