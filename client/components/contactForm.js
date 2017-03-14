import React from 'react';
import request from 'axios';
import { isNotEmail, isEmpty } from '../lib/validations';

const ContactForm = React.createClass({
	getInitialState() {
		return {
			name: '',
			email: '',
			errors: {
				name: false,
				email: false
			}
		}
	},

	handleChange(field, e) {
		let val = e.target.value;
		this.setState({...this.state, [field]: val});
	},
	
	validate() {
		let errs = {};
		const validations = Object.keys(this.state.errors)
		.map(field => {
			let val;
			val = isEmpty( this.state[field] );
			if(field == 'email') val = isNotEmail( this.state[field] );
			errs = {...errs, [field]: val};
			return val;
		});

		this.setState({errors: errs});
		return Promise.all(validations);
	},

	handleSubmit(e) {
		e.preventDefault();
		this.validate()
		.then(res => res.every(item => item == false))
		.then(isValid => {
			if(isValid) {
				console.log(this.state);
			}
		});
	},

	render() {
		const { errors, name, email } = this.state;
		let errName = errors['name'] ? { color: '#F1364E' } : { display: 'none' };
		let errEmail = errors['email'] ? { color: '#F1364E' } : { display: 'none' };

		return ( 
			<form onSubmit={this.handleSubmit}>
				<div className="form-group">
					<input
						placeholder="Nombre completo" 
						type="text" 
						className="form-control" 
						value={ name }
						onChange={this.handleChange.bind(null, 'name')} 
					/>
					<p className="help-block" style={errName} > Nombre requerido. </p>
				</div>

				<div className="form-group">
					<input 
						placeholder="Email" 
						type="text" 
						className="form-control" 
						value={ email }
						onChange={this.handleChange.bind(null, 'email')} 
					/>
					<p className="help-block" style={errEmail} > Debe ser un email valido. </p>
				</div>
				
				<div className="form-group">
					<button className="btn btn-default">Enviar</button>
				</div>
			</form>
		)
	}
});

export default ContactForm;