import { describe, test, expect, beforeEach, afterEach, jest } from '@jest/globals';
import jsdom from 'jsdom'
const Game = require('../src/Game')

const {JSDOM} = jsdom
const dom = new JSDOM('<html><body id="root"></body></html>')

global.window = dom.window
global.document = dom.window.document

describe('DOM controller', () => {
	test('Creates empty table', () => {
			const domController = new DomController('#root')

			domController.createTable()

			expect(document.querySelectorAll('table').length).toBe(1)
	})
})