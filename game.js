class Puzzle {
  constructor(dimension) {
    this.dimension = dimension;
    this.board = document.getElementById("board");
    this.image = document.getElementById("image");
    this.movesCounter = document.getElementById("moves");
    this.button = document.getElementById("button");
    this.randomValues = [];
    this.boardValues = [];
    this.array = [];
    this.moves = 0;
    this.win = false;
  }

  start() {
    this.button.disabled = true;
    this.array = this.arrayBidimensional(this.dimension);
    this.board.style.gridTemplateColumns = `repeat(${this.dimension}, 1fr)`;

    this.randomValues = this.generateRandomNumbers();
    this.boardValues = this.ArrayValues(this.randomValues);
    this.createBoard(this.boardValues);
    this.introduceBoard();

    this.game();
  }

  // ...

  arrayBidimensional(n) {
    let array = new Array(n);
    for (let i = 0; i < n; i++) {
      array[i] = new Array(n);
    }
    return array;
  }

  findPosition(array, num) {
    for (let i = 0; i < array.length; i++) {
      for (let j = 0; j < array.length; j++) {
        if (Number(array[i][j].innerHTML) === num) {
          return [i, j];
        }
      }
    }
  }

  findPositionValues(array, num) {
    for (let i = 0; i < array.length; i++) {
      for (let j = 0; j < array.length; j++) {
        if (Number(array[i][j]) === num) {
          return [i, j];
        }
      }
    }
  }

  generatePositions(i, j) {
    let positions = [];
    if (i > 0) {
      positions.push([i - 1, j]);
    }
    if (i < this.array.length - 1) {
      positions.push([i + 1, j]);
    }
    if (j > 0) {
      positions.push([i, j - 1]);
    }
    if (j < this.array.length - 1) {
      positions.push([i, j + 1]);
    }
    return positions;
  }

  createButton(value) {
    let button = document.createElement("button");
    button.classList.add("side");
    button.innerHTML = value;
    return button;
  }

  generateRandomNumbers() {
    let numbers = [];
    for (let i = 1; i <= this.array.length * this.array.length; i++) {
      numbers.push(i);
    }
    numbers = numbers.sort(() => Math.random() - 0.5);
    return numbers;
  }

  createBoard(newBoard) {
    for (let i = 0; i < this.array.length; i++) {
      for (let j = 0; j < this.array.length; j++) {
        this.array[i][j] = this.createButton(newBoard[i][j]);
      }
    }
  }

  introduceBoard() {
    for (let i = 0; i < this.array.length; i++) {
      for (let j = 0; j < this.array.length; j++) {
        this.board.appendChild(this.array[i][j]);
      }
    }
  }

  validate_win() {
    let ind = 1;
    for (let i = 0; i < this.boardValues.length; i++) {
      for (let j = 0; j < this.boardValues.length; j++) {
        if (Number(this.boardValues[i][j]) !== ind) {
          return false;
        }
        ind++;
      }
    }
    return true;
  }

  newBoard(position) {
    let positionClicked = this.findPositionValues(this.boardValues, position);
    let tagButtonpositionClicked =
      this.boardValues[positionClicked[0]][positionClicked[1]];

    let posicionActiva = this.findPositionValues(
      this.boardValues,
      this.dimension * this.dimension
    );
    let tagButtonPosicionActiva =
      this.boardValues[posicionActiva[0]][posicionActiva[1]];

    this.boardValues[positionClicked[0]][positionClicked[1]] =
      tagButtonPosicionActiva;
    this.boardValues[posicionActiva[0]][posicionActiva[1]] =
      tagButtonpositionClicked;
  }

  addClassSideActive() {
    let sideFinal = this.findPositionValues(
      this.boardValues,
      this.dimension * this.dimension
    );
    this.array[sideFinal[0]][sideFinal[1]].classList.add("active");
    this.array[sideFinal[1]][sideFinal[0]].disabled = true;
  }

  addBackgroundImage() {
    for (let i = 0; i < this.array.length; i++) {
      for (let j = 0; j < this.array.length; j++) {
        if (
          Number(this.array[i][j].innerHTML) !==
          this.dimension * this.dimension
        ) {
          this.array[i][
            j
          ].style.backgroundImage = `url("images/image${this.dimension}-${this.array[i][j].innerHTML}.jpg")`;
        }
      }
    }
  }

  addBackgroundImageComplete() {
    for (let i = 0; i < this.array.length; i++) {
      for (let j = 0; j < this.array.length; j++) {
        this.array[i][
          j
        ].style.backgroundImage = `url("images/image${this.dimension}-${this.array[i][j].innerHTML}.jpg")`;
      }
    }
  }

  ArrayValues(newArray) {
    let arrayCopy = this.arrayBidimensional(this.array.length);
    let ind = 0;
    for (let i = 0; i < this.array.length; i++) {
      for (let j = 0; j < this.array.length; j++) {
        arrayCopy[i][j] = newArray[ind];
        ind++;
      }
    }
    return arrayCopy;
  }

  game() {
    this.addClassSideActive();
    this.addBackgroundImage();

    let pos = this.findPosition(this.array, this.dimension * this.dimension);

    let positions = this.generatePositions(pos[0], pos[1]);

    positions.forEach((posicion) => {
      this.array[posicion[0]][posicion[1]].style.cursor = "pointer";
      this.array[posicion[0]][posicion[1]].addEventListener("click", (e) => {
        e.preventDefault();

        this.moves += 1;
        this.movesCounter.innerHTML = this.moves;

        this.newBoard(Number(e.target.innerHTML));
        this.board.innerHTML = "";

        this.createBoard(this.boardValues);
        this.introduceBoard();
        if (this.validate_win() && this.dimension <= 4) {
          this.addBackgroundImageComplete();
          this.win = true;
          this.image.style.display = "none";
          this.board.style.gap = "0px";
          this.button.style.display = "block";

          this.button.disabled = false;

          this.dimension += 1;
          this.button.addEventListener("click", (e) => {
            e.preventDefault();
            this.nextLevel();
          });
        } else {
          this.game();
        }
      });
    });
  }

  nextLevel() {
    this.image.style.display = "block";
    this.board.innerHTML = "";
    this.board.style.display = "grid";
    this.moves = 0;
    this.win = false;
    this.start();
  }
}

let initialGame = 3;
let game = new Puzzle(initialGame);
game.start();
