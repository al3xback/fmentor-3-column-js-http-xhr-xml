import { sendHttpRequest } from './util.js';

const URL =
	'https://gist.githubusercontent.com/al3xback/696a65ff6e3c1884b5350f2bf7fb1ca6/raw/18f813d490fc206912739881eb489c68d02ddd08/3-column-data.xml';

const cardsWrapperEl = document.querySelector('.cards-wrapper');
const cardsTemplate = document.getElementById('cards-template');
const cardTemplate = document.getElementById('card-template');
const loadingEl = document.querySelector('.loading');

const removeLoading = () => {
	loadingEl.parentElement.removeChild(loadingEl);
};

const handleError = (msg) => {
	removeLoading();

	const errorEl = document.createElement('p');
	errorEl.className = 'error';
	errorEl.textContent = msg;

	cardsWrapperEl.appendChild(errorEl);
};

const renderCardsContent = (data) => {
	const parser = new DOMParser();
	const dataDoc = parser.parseFromString(data, 'text/xml');

	const getElementValue = (parentEl, name) => {
		return parentEl.getElementsByTagName(name)[0].childNodes[0].nodeValue;
	};

	const carsData = dataDoc.getElementsByTagName('car');

	const cardsTemplateNode = document.importNode(cardsTemplate.content, true);
	const cardsEl = cardsTemplateNode.querySelector('.cards');

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

		const cardTitleEl = cardEl.querySelector('.card__title');
		cardTitleEl.textContent = name;

		const cardDescriptionEl = cardEl.querySelector('.card__desc');
		cardDescriptionEl.textContent = description;

		const cardImageEl = cardEl.querySelector('.card__img');
		cardImageEl.src = './images/icons/' + image;

		cardsEl.appendChild(cardTemplateNode);
	}

	/* [init] */
	removeLoading();
	cardsWrapperEl.appendChild(cardsTemplateNode);
};

sendHttpRequest('GET', URL, renderCardsContent, handleError);
