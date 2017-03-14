import React from 'react';
import request from 'axios';
import { validations, validate } from '../lib/validations';
const endpoint = '';

const ContactForm = React.createClass({
	getInitialState() {
		return {
			name: '',
			email: '',
			phone: '',
			company: '',
			errors: {
				name: false,
				email: false,
				phone: false,
				company: false
			},
			rules: {
				 name: 'isEmpty',
				 email: 'isEmail',
				 phone: 'containsNumber|higherThen:7',
				 company: 'isEmpty'
			}
		}
	},

	getDefaultProps() {
		return {
			messages: {
				name: ' Nombre requerido.',
				email: 'Debe ser un email valido.',
				phone: 'Debe ser un teléfono valido.',
				company: 'Empresa requerida.'
			}
		}
	},

	handleChange(field, e) {
		let val = e.target.value;
		this.setState({...this.state, [field]: val});
	},
	
	validate() {
		let errs = {};
		let v = validate(this.state.errors, this.state.rules, this.state);

		this.setState({errors: v.errors});
		console.log(v.isValid);
	},

	handleSubmit(e) {
		e.preventDefault();

		this.validate();
	},

	storeContact() {
		const data = this.state;
		request
		.post(endpoint, data)
		.then()
	},

	render() {
		const { errors, name, email, phone, company } = this.state;
		const { messages } = this.props;
		let styleErr = { color: '#F1364E' };
		let styleHidden = { display: 'none' };
		let errName = errors['name'] ? styleErr : styleHidden;
		let errEmail = errors['email'] ? styleErr : styleHidden;
		let errPhone = errors['phone'] ? styleErr : styleHidden;
		let errCompany = errors['company'] ? styleErr : styleHidden;

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
					<p className="help-block" style={errName}>{messages.name}</p>
				</div>

				<div className="form-group">
					<input 
						placeholder="Email" 
						type="text" 
						className="form-control" 
						value={ email }
						onChange={this.handleChange.bind(null, 'email')} 
					/>
					<p className="help-block" style={errEmail}>{messages.email}</p>
				</div>

				<div className="form-group">
					<input 
						placeholder="Teléfono" 
						type="text" 
						className="form-control" 
						value={ phone }
						onChange={this.handleChange.bind(null, 'phone')} 
					/>
					<p className="help-block" style={errPhone}>{messages.phone}</p>
				</div>

				<div className="form-group">
					<input 
						placeholder="Empresa" 
						type="text" 
						className="form-control" 
						value={ company }
						onChange={this.handleChange.bind(null, 'company')} 
					/>
					<p className="help-block" style={errEmail}>{messages.company}</p>
				</div>
				
				<div className="form-group">
					<button className="btn btn-default">Enviar</button>
				</div>
			</form>
		)
	}
});

export default ContactForm;