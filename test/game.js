const Game = require('../src/Game')

const userName = 'user'
const computerName = 'computer'
const userMoveSymbol = '×'
const initialGameBoard = [
	['', '', ''],
	['', '', ''],
	['', '', '']
]

let game
beforeEach(() => { game = new Game() })

describe('Game', () => {
	test('Should return empty game board', () => {
		const board = game.getState()

		expect(board).toEqual(initialGameBoard)
	})

	test('Writes user\'s symbol in cell with given coordinates', () => {
		const x = 1, y = 1;
		game.acceptUserMove(x, y);

		const board = game.getState();
		expect(board[x][y]).toEqual(userMoveSymbol)
	})

	test('Throws an exception if user moves in taken cell', () => {
		const x = 2, y = 2

		game.acceptUserMove(x, y)
		const func = game.acceptUserMove.bind(game, x, y)

		expect(func).toThrow('cell is already taken')
	})

	test('Game saves user\'s move in history', () => {
		const x = 1, y = 1

		game.acceptUserMove(x, y)
		const history = game.getMoveHistory()

		expect(history).toEqual([{ turn: userName, x, y }])
	})

	test('Game saves computers\'s move in history', () => {
		const mock = jest.spyOn(global.Math, 'random').mockReturnValue(0.5)
		game.createComputerMove()
		const history = game.getMoveHistory()

		expect(history).toEqual([{ turn: computerName, x: 1, y: 1 }])
		mock.mockRestore()
	})

	test('Game saves 1 user\'s move and 1 computer\'s move in history', () => {
		const x = 1, y = 1

		game.acceptUserMove(x, y)
		game.createComputerMove()
		const history = game.getMoveHistory()

		expect(history.length).toBe(2)
		expect(history[0].turn).toEqual(userName)
		expect(history[1].turn).toEqual(computerName)
	})

	test('Computer moves in randomly chosen cell', () => {
		const userMoveSymbol = '×'
		const computerMoveSymbol = 'o'

		// ...
		const mock = jest.spyOn(global.Math, 'random').mockReturnValue(0.5)

		game.createComputerMove()
		const board = game.getState()

		expect(board[1][1]).toEqual(computerMoveSymbol)
		mock.mockRestore()
	})
})

