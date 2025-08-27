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

  const gameRules = () => {
    const winPattern = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    const checkWin = (marker) => {
      return winPattern.some((combo) =>
        combo.every((index) => gameboard.getGameboard()[index] === marker)
      );
    };

    return {
      checkWin,
    };
  };

  const playRound = (position) => {
    if (!gameboard.getAvailableSquare().includes(position)) {
      console.log("Square already taken.");
      return;
    } else {
      gameboard.putMarker(getActivePlayer(), position);
    }

    const { checkWin } = gameRules();

    console.log(
      `Putting ${getActivePlayer().name}'s marker into square ${position}.`
    );

    if (checkWin(getActivePlayer().marker)) {
      console.log(`${getActivePlayer().name} menang`);
      return;
    } else {
      switchPlayerTurn();
    }

    gameboard.printGameboard();
  };

  gameboard.printGameboard();

  return {
    playRound,
  };
}

const game = GameController();

game.playRound(0);
game.playRound(1);
game.playRound(4);
game.playRound(2);
game.playRound(8);
