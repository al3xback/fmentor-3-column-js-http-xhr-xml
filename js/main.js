import { sendHttpRequest } from './util.js';

const cardsEl = document.querySelector('.cards');
const cardTemplate = document.getElementById('card-template');
const loadingEl = document.querySelector('.loading');

const URL =
	'https://gist.githubusercontent.com/al3xback/696a65ff6e3c1884b5350f2bf7fb1ca6/raw/53e02181009d5a80e22bb2a2a1f9a8845103a657/3-column-data.xml';

const removeLoading = () => {
	loadingEl.parentElement.removeChild(loadingEl);
};

const handleError = (msg) => {
	removeLoading();

	const errorEl = document.createElement('p');
	errorEl.className = 'error';
	errorEl.textContent = msg;

	cardsEl.appendChild(errorEl);
};

const renderCardsContent = (data) => {
	const parser = new DOMParser();
	const dataDoc = parser.parseFromString(data, 'text/xml');

	const getElementValue = (parentEl, childEl) => {
		return parentEl.getElementsByTagName(childEl)[0].childNodes[0]
			.nodeValue;
	};

	removeLoading();

	const carsData = dataDoc.getElementsByTagName('car');

	for (const car of carsData) {
		const name = getElementValue(car, 'name');
		const description = getElementValue(car, 'description');
		const image = getElementValue(car, 'image');

		const cardTemplateNode = document.importNode(
			cardTemplate.content,
			true
		);
		const cardEl = cardTemplateNode.querySelector('.card');
		cardEl.classList.add('card--' + name.toLowerCase());

		const cardImageEl = cardEl.querySelector('.card__img');
		cardImageEl.src = './images/icons/' + image;

		const cardTitleEl = cardEl.querySelector('.card__title');
		cardTitleEl.textContent = name;

		const cardDescEl = cardEl.querySelector('.card__desc');
		cardDescEl.textContent = description;

		cardsEl.appendChild(cardTemplateNode);
	}
};

sendHttpRequest('GET', URL, renderCardsContent, handleError);
