function Gameboard() {
  const gameboard = ["", "", "", "", "", "", "", "", ""];
  let availableSquare = [];

  const getAvailableSquare = () => {
    availableSquare = [];

    for (let i = 0; i < gameboard.length; i++) {
      if (gameboard[i] === "") {
        availableSquare.push(i);
      }
    }

    return availableSquare;
  };

  const getGameboard = () => gameboard;

  const putMarker = (player, position) => {
    if (availableSquare.includes(position)) {
      gameboard[position] = player.marker;
      availableSquare.splice(availableSquare.indexOf(position), 1);
    } else {
      return;
    }
  };

  const printGameboard = () => {
    console.log(gameboard);
  };

  return {
    getAvailableSquare,
    getGameboard,
    putMarker,
    printGameboard,
  };
}

function CreatePlayer(name, marker) {
  return {
    name,
    marker,
  };
}

function GameController() {
  const gameboard = Gameboard();

  const player1 = CreatePlayer("Player 1", "X");
  const player2 = CreatePlayer("Player 2", "O");

  let activePlayer = player1;

  const switchPlayerTurn = () => {
    activePlayer = activePlayer === player1 ? player2 : player1;
  };

  const getActivePlayer = () => activePlayer;

  const updateGame = () => {
    let gameCondition = false;
    const board = gameboard.getGameboard();
    const marker = getActivePlayer().marker;
    //Diagonal
    if(
        (board[0] === marker && board[4] === marker && board[8] === marker) ||
        (board[2] === marker && board[4] === marker && board[6] === marker)
    )  {
        gameCondition = true;
    }

    //Baris
    if(
        (board[0] === marker && board[1] === marker && board[2] === marker) ||
        (board[3] === marker && board[4] === marker && board[5] === marker) ||
        (board[6] === marker && board[7] === marker && board[8] === marker)
    )  {
        gameCondition = true;
    }

    //Kolom
    if(
        (board[0] === marker && board[3] === marker && board[6] === marker) ||
        (board[1] === marker && board[4] === marker && board[7] === marker) ||
        (board[2] === marker && board[5] === marker && board[8] === marker)
    )  {
        gameCondition = true;
    }

    return {
        gameCondition
    }
  }

  const playRound = (position) => {

    if (!gameboard.getAvailableSquare().includes(position)) {
      console.log("Square already taken.");
      return;
    } 
    else {
      gameboard.putMarker(getActivePlayer(), position);
    }

    const { gameCondition } = updateGame();

    console.log(
      `Dropping ${getActivePlayer().name}'s marker into square ${position}...`
    );

    if(gameCondition) {
        console.log(`${getActivePlayer().name} menang`);
        return;
    }

    if(!gameCondition) switchPlayerTurn();
    gameboard.printGameboard();

  };

  gameboard.printGameboard();

  return {
    playRound,
  };
}

const game = GameController();
game.playRound(0); // Player 1
game.playRound(1); // Player 2
game.playRound(4); // Player 1
game.playRound(2); // Player 2
game.playRound(8); // Player 1 menang
