'use strict';
import 'babel-polyfill';
import MultipleRender from 'react-multiple-render';
import ContactForm from './components/contactForm';

MultipleRender(ContactForm, '.bs-contact-form');
