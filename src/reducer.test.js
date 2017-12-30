import reducer from './reducer';
import {restartGame, generateAuralUpdate, makeGuess} from './actions';

describe('reducer', () => {
	const guess= 55
	const endGameState = {
			guesses: [42,33,88,44],
    		feedback: "You're Cold...",
    		auralStatus: '',
    		correctAnswer: 99
	}
	it('should set the initial state if nothing is given', () => {
		const state = reducer(undefined, {type: '_UNKNOWN'});
		expect(state).toEqual({
			guesses: [],
    		feedback: 'Make your guess!',
    		auralStatus: '',
    		correctAnswer: state.correctAnswer
		})
	})

	it('should return the current state on an unknown action', () => {
		let currentState= {}
		const state= reducer(currentState, {type:'_UNKNOWN'})
		expect(state).toBe(currentState)
	})

	describe('makeGuess', () => {
		it('should add the current guess to the lists of guesses', ()=> {
			let state= {
				guesses: [],
    			feedback: 'Make your guess!',
    			auralStatus: '',
    			correctAnswer: 88
			}
			state= reducer(state, makeGuess(86));
			state= reducer(state, makeGuess(87))
			expect(state).toEqual({
			guesses: [86,87],
    		feedback: "You're Hot!",
    		auralStatus: '',
    		correctAnswer: state.correctAnswer
			})
		})
		it ('should tell the user they are ice cold from the correctAnswer', () => {
			let state= reducer(endGameState, makeGuess(1))
			expect(state.feedback).toEqual("You're Ice Cold...")
		})
		it ('should tell the user they are cold from the correctAnswer', () => {
			let state= reducer(endGameState, makeGuess(59))
			expect(state.feedback).toEqual("You're Cold...")
		})
		it ('should tell the user they are warm to the correctAnswer', () => {
			let state= reducer(endGameState, makeGuess(79))
			expect(state.feedback).toEqual("You're Warm.")
		})
		it ('should tell the user they are hot from the correctAnswer', () => {
			let state= reducer(endGameState, makeGuess(98))
			expect(state.feedback).toEqual("You're Hot!")
		})
	})
	describe('restartGame', () => {
		it('should reset the game state to the original setting', () => {
			let state = reducer(endGameState, restartGame());
			expect(state).toEqual({
				guesses: [],
    			feedback: 'Make your guess!',
    			auralStatus: '',
    			correctAnswer: state.correctAnswer
			})
		})
	})
	describe('generateAuralUpdate', () => {
		it('should return the current status of the game', () => {
			let state= reducer(endGameState, generateAuralUpdate())
			expect(state.auralStatus).toEqual("Here's the status of the game right now: You're Cold... You've made 4 guesses. In order of most- to least-recent, they are: 44, 88, 33, 42")
		})
	})
})

