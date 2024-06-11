import { describe, test, expect, beforeEach, afterEach, jest } from '@jest/globals';
import jsdom from 'jsdom'
const Game = require('../src/Game')

const { JSDOM } = jsdom
const dom = new JSDOM('<html><body id="root"></body></html>')
const createInstance = () => new DomController('#root')

global.window = dom.window
global.document = dom.window.document

describe('DOM controller', () => {
	test('Creates empty table', () => {
		const domController = createInstance()

		domController.createTable()

		expect(document.querySelectorAll('table').length).toBe(1)

		afterEach(() => {
			document.body.innerHTML = ''
		})
	})

	test('Creates table with 3 rows and 3 columns', () => {
		const domController = createInstance()

		domController.createTable(3, 3)

		expect(document.querySelectorAll('table').length).toBe(1)
		expect(document.querySelectorAll('tr').length).toBe(3)
		expect(document.querySelectorAll('td').length).toBe(9)
	})

	test('Remembers indices of last clicked cell', () => {
		const domController = createInstance()

		domController.createTable(3, 3)
		document.querySelector('table td').click()

		expect(domController.lastClickedIndices).toEqual([0, 0])
	})
})