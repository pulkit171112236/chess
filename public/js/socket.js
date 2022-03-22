console.log('------client-socket--------')
const socket = io()
socket.on('event', (data) => {
  console.log('--event---')
  location.reload()
  // fetch('')
  // if (data.action === 'restart' || data.action === 'undo') {
  //   fetch('')
  // } else if (data.action === 'move') {
  //   const from = data.from
  //   const to = data.to

  // }
})

// getting data from ejs
function getEjsData(element) {
  return JSON.parse(document.currentScript.getAttribute(element))
}

var board = getEjsData('board')
var cursor = getEjsData('cursor')
var player = getEjsData('player')

let state = 'ready'
let from, to

// click event handler
const handleClick = (event) => {
  const cell = event.target
  let col = cell.classList[0].split('-')[1]
  let row = cell.parentNode.classList[0].split('-')[1]
  console.log(row, col)

  if (state === 'ready') {
    console.log('state -> active')
    state = 'active'
    cell.classList.add('active')
    from = {
      row: row,
      col: col,
    }
  } else {
    to = {
      row: row,
      col: col,
    }

    console.log('state -> ready')
    state = 'ready'
    var activeCell = document.querySelector(`.row-${from.row} .col-${from.col}`)
    activeCell.classList.remove('active')
    // posting action to server
    fetch('', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: from,
        to: to,
      }),
    })
      .then((res) => {
        console.log('res:', res)
        if (res.status == 200) {
          return res.json()
        } else {
          throw Error('Move not validated from server')
        }
      })
      .then((resData) => {
        console.log('resData:', resData)
      })
      .catch((err) => {
        console.log(err)
      })
  }
}

// adding piece classes
for (let i = 0; i < 8; i++) {
  for (let j = 0; j < 8; j++) {
    var cell = document.querySelector(`.row-${i} .col-${j}`)
    cell.classList.add((i + j) & 1 ? 'black' : 'white')

    if (board[i][j]) {
      cell.classList.add(board[i][j] || '')
    }
    cell.addEventListener('click', handleClick)
  }
}

// restart button
document.querySelector('#restart').addEventListener('click', () =>
  fetch('action', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      action: 'restart',
    }),
  })
)

// undo button
document.querySelector('#undo').addEventListener('click', () =>
  fetch('action', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      action: 'undo',
    }),
  })
)
