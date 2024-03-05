document.addEventListener("DOMContentLoaded", () => {
	const grid = document.querySelector('.grid')
	const flagsLeft = document.querySelector('#flags-left')
	const result = document.querySelector('#result')
	const width = 10
	let bombAmount = 20
	let squares = []
	let isGameOver = false

	// Create Board
	const createBoard = () => {
		flagsLeft.innerHTML = bombAmount

		// get shuffled game array with random bombs
		const bombArray = Array(bombAmount).fill('bomb')
		const emptyArray = Array(width * width - bombAmount).fill('valid')
		const gameArray = emptyArray.concat(bombArray)
		const shuffledArray = gameArray.sort(() => Math.random() - 0.5)


		for(let i = 0; i < width * width; i++) {
			const square = document.createElement('div')
			square.id = i
			square.classList.add(shuffledArray[i])
			grid.appendChild(square)
			squares.push(square)

			// normal click
			square.addEventListener('click', () => {
				click(square)
			})

			//control and left click
			square.addEventListener('click', () => {
				// addFlag(square)
			})
		}

		// add numbers
		for (let i = 0; i < squares.length; i++) {
			let total = 0
			const isLeftEdge = (i % width === 0)
			const isRightEdge = (i % width === width - 1)

			if(squares[i].classList.contains('valid')) {
				if(i > 0 && !isLeftEdge && squares[i - 1].classList.contains('bomb')) total++
				if(i > 9 && !isRightEdge && squares[i + 1 - width].classList.contains('bomb')) total++
				if(i > 10 && squares[i - width].classList.contains('bomb')) total++
				if(i > 11 && !isLeftEdge && squares[i - width - 1].classList.contains('bomb')) total++
				if(i < 99 && !isRightEdge && squares[i + 1].classList.contains('bomb')) total++
				if(i < 90 && !isLeftEdge && squares[i - 1 + width].classList.contains('bomb')) total++
				if(i < 88 && !isRightEdge && squares[i + 1 + width].classList.contains('bomb')) total++
				if(i < 89 && squares[i + width].classList.contains('bomb')) total++
				squares[i].setAttribute('data', total)
			}
		}
	}

	createBoard()

	const click = (square) => {
		if (isGameOver || square.classList.contains('checked') || square.classList.contains('flag')) return

		if (square.classList.contains('bomb')) {
			gameOver ()
		} else {
			let total = square.getAttribute('data')
			if (total != 0) {
				square.classList.add('checked')
				if (total == 1) square.classList.add ('one')
				if (total == 2) square.classList.add ('two')
				if (total == 3) square.classList.add ('three')
				if (total == 4) square.classList.add ('four')
				square.innerHTML = total
				return
			}
			square.classList.add('checked')
			checkSquare(square)
		}
	}

	// check neighbouring squares once id clicked
	const checkSquare = (square) => {
		const currentId = square.id
		const isLeftEdge = (currentId % width === 0)
		const isRightEdge = (currentId % width === width - 1)

		setTimeout(() => {
			if(currentId > 0 && !isLeftEdge) {
				const newId = parseInt(currentId) - 1
				const newSquare = document.getElementById(newId)
				click(newSquare)
			}
			if(currentId > 9 && !isRightEdge) {
				const newId = parseInt(currentId) + 1 - width
				const newSquare = document.getElementById(newId)
				click(newSquare)
			}
			if(currentId > 10) {
				const newId = parseInt(currentId) - width
				const newSquare = document.getElementById(newId)
				click(newSquare)
			}
			if(currentId > 11 && !isLeftEdge) {
				const newId = parseInt(currentId) - 1 - width
				const newSquare = document.getElementById(newId)
				click(newSquare)
			}
			if(currentId > 98 && !isRightEdge) {
				const newId = parseInt(currentId) - 1
				const newSquare = document.getElementById(newId)
				click(newSquare)
			}
			if(currentId > 90 && !isLeftEdge) {
				const newId = parseInt(currentId) - 1 + width
				const newSquare = document.getElementById(newId)
				click(newSquare)
			}
			if(currentId > 99 && !isRightEdge) {
				const newId = parseInt(currentId) + 1 + width
				const newSquare = document.getElementById(newId)
				click(newSquare)
			}
			if(currentId > 98) {
				const newId = parseInt(currentId) + width
				const newSquare = document.getElementById(newId)
				click(newSquare)
			}

		}, 10)
	}

	const gameOver = () => {
		result.innerHTML = 'BOOM! Game over!'
		isGameOver = true

		//show all bombs
		squares.forEach((square) => {
			if (square.classList.contains('bomb')) {
				square.innerHTML = '💣'
				square.classList.remove('bomb')
				square.classList.add('checked')
			}
		})
	}
})