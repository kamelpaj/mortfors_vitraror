import React, { Component } from 'react';
import logo from './MORTFORS.jpg';
import './App.css';
import axios from 'axios';

class App extends Component {
	constructor() {
		super();
		this.state = {items: null, kvitton: null, suppliers: null}

		axios.get('http://localhost:3000/get_articles')
		.then((resp) => {
			this.setState({items: resp.data});
		})
		.catch(err => {
			console.log('err', err);
		});

		axios.get('http://localhost:3000/kvitto')
		.then((resp) => {
			console.log(resp.data);
			this.setState({kvitton: resp.data});
		})
		.catch(err => {
			console.log('err', err);
		});

		axios.get('http://localhost:3000/supplier_list')
		.then((resp) => {
			console.log(resp.data);
			this.setState({suppliers: resp.data});
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

	getKvittoLista() {
		if(this.state.kvitton === null) {
			return (<p>Loading</p>)
		}

		const kvitton = this.state.kvitton;

		const assortmentList = kvitton.map((kvitto, i) =>
			<tr key={i + kvitto.produktid}>
				<td>{kvitto.produktid}</td>
				<td>{kvitto.antal}</td>
				<td>{kvitto.datum}</td>
				<td>{kvitto.säljstyckpris}</td>
				<td>{kvitto.orderid}</td>
			</tr>
		);

		return (
			<table>
				<tbody>
					<tr>
						<th>Produkt</th>
						<th>Antal</th>
						<th>Datum</th>
						<th>Pris</th>
						<th>Orderid</th>
					</tr>
					{assortmentList}
				</tbody>
			</table>
		)
	}

	getSupplierList() {
		if(this.state.suppliers === null) {
			return (<p>Loading</p>)
		}

		const suppliers = this.state.suppliers;

		const assortmentList = suppliers.map((supplier, i) =>
			<tr key={i + supplier.produktid}>
				<td>{supplier.leverantörid}</td>
				<td>{supplier.produktid}</td>
				<td>{supplier.tillverkare}</td>
				<td>{supplier.styckinköpspris}</td>
			</tr>
		);

		return (
			<table>
				<tbody>
					<tr>
						<th>LeverantörID</th>
						<th>ProduktID</th>
						<th>Tillverkare</th>
						<th>Inköpspris</th>
					</tr>
					{assortmentList}
				</tbody>
			</table>
		)
	}

  render() {
    return (
      <div className="App">
        <header className="App-header">
					<div className="App-header-wrapper">
	          <img src={logo} className="App-logo" alt="logo" />
	          <h1 className="App-title">***MÖRTFORS ADMIN***</h1>
					</div>
        </header>

				<main>
					<div className="Assortment-list">
						<h3>Lagersaldo</h3>
						{this.getAssortment()}
					</div>

					<div className="Kvitto-lista">
						<h3>Kvittolista</h3>
						{this.getKvittoLista()}
					</div>

					<div className="Leverantör-lista">
						<h3>Leverantörlista</h3>
						{this.getSupplierList()}
					</div>

				</main>

				<footer style={{padding: "30px", backgroundColor: "#555", width: "100%", marginTop: "40px"}}></footer>
      </div>
    );
  }
}

export default App;
