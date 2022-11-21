class PuzzleTs {
  dimension: number;
  board: HTMLElement;
  randomValues: number[];
  boardValues: number[][];
  array: HTMLElement[][];
  moves: number;
  win: boolean;
  image: HTMLElement;
  public constructor(dimension: number, board: HTMLElement, image: HTMLElement) {
    this.dimension = dimension;
    this.board = board;
    this.image = image;
    this.randomValues = [];
    this.boardValues = [];
    this.array = [];
    this.moves = 0;
    this.win = false;
  }

  init() {
    this.array = this.arrayBidimensional(this.dimension);
    this.board.style.gridTemplateColumns = `repeat(${this.dimension}, 1fr)`;

    this.randomValues = this.generateRandomNumbers();
    this.boardValues = this.ArrayValues(this.randomValues);
    this.createBoard(this.boardValues);
    this.introduceBoard();

    this.game();
  }

  public arrayBidimensional(n: number): (HTMLElement[][]){
    let array = new Array(n);
    for (let i = 0; i < n; i++) {
      array[i] = new Array(n);
    }
    return array;
  }

  public arrayBidimensionalNumber(n: number): (number[][]){
    let array = new Array(n);
    for (let i = 0; i < n; i++) {
      array[i] = new Array(n);
    }
    return array;
  }
  
  public findPosition(array: HTMLElement[][], num: number): number[] {
    let position = [] as number[];
    for (let i = 0; i < array.length; i++) {
      for (let j = 0; j < array.length; j++) {
        if (Number(array[i][j].innerHTML) === num) {
          position.push(i, j);
        }
      }
    }
    return position;
  }
 
  
  public findPositionValues(array: number[][], num: number): number[] {
    let position = [] as number[];
    for (let i = 0; i < array.length; i++) {
      for (let j = 0; j < array.length; j++) {
        if (Number(array[i][j]) === num) {
          position.push(i, j);
        }
      }
    }
    return position;
  }
  
  public generatePositions(i: number, j: number): number[][] {
    let positions = [] as number[][];
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
  
  public createButton(value: string): HTMLElement {
    let button = document.createElement("button");
    button.classList.add("side");
    button.innerHTML = value;
    return button;
  }
  
  public generateRandomNumbers() : number[] {
    let numbers = [] as number[];
    for (let i = 1; i <= this.array.length * this.array.length; i++) {
      numbers.push(i);
    }
    numbers = numbers.sort(() => Math.random() - 0.5);
    return numbers;
  }
  
  public createBoard(newBoard: number[][]) {
    for (let i = 0; i < this.array.length; i++) {
      for (let j = 0; j < this.array.length; j++) {
        this.array[i][j] = this.createButton(newBoard[i][j].toString());
      }
    }
  }
  
  public introduceBoard() {
    for (let i = 0; i < this.array.length; i++) {
      for (let j = 0; j < this.array.length; j++) {
        this.board.appendChild(this.array[i][j]);
      }
    }
  }
  
  public validate_win(): boolean {
    let win = true;
    let ind = 1;
    for (let i = 0; i < this.boardValues.length; i++) {
      for (let j = 0; j < this.boardValues.length; j++) {
        if (Number(this.boardValues[i][j]) !== ind) {
          win = false;
          break;
        }
        ind++;
      }
    }
    return win;
  }
  
  public newBoard(position: number) {
    let positionClicked = this.findPositionValues(this.boardValues, position);
    let tagButtonpositionClicked =
    this.boardValues[positionClicked[0]][positionClicked[1]];
  
    let posicionActiva = this.findPositionValues(this.boardValues, this.dimension * this.dimension);
    let tagButtonPosicionActiva =
    this.boardValues[posicionActiva[0]][posicionActiva[1]];
  
    this.boardValues[positionClicked[0]][positionClicked[1]] = tagButtonPosicionActiva;
    this.boardValues[posicionActiva[0]][posicionActiva[1]] = tagButtonpositionClicked;
  }
  
  public addClassSideActive() {
    let sideFinal = this.findPositionValues(this.boardValues, this.dimension * this.dimension);
    this.array[sideFinal[0]][sideFinal[1]].classList.add("active");
    this.array[sideFinal[1]][sideFinal[0]].ariaDisabled = "true";
  }
  
  public addBackgroundImage() {
    for (let i = 0; i < this.array.length; i++) {
      for (let j = 0; j < this.array.length; j++) {
        if (Number(this.array[i][j].innerHTML) !== this.dimension * this.dimension) {
          this.array[i][
            j
          ].style.backgroundImage = `url("images/image${this.dimension}-${this.array[i][j].innerHTML}.jpg")`;
        }
      }
    }
  }
  
  public ArrayValues(newArray: number[]): number[][] {
    let arrayCopy = this.arrayBidimensionalNumber(this.array.length);
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
      this.array[posicion[0]][posicion[1]]?.addEventListener("click", (e) => {
        e.preventDefault();
        let target = e.target as HTMLElement;
        this.newBoard(Number(target.innerHTML));
        this.board.innerHTML = "";
  
        this.createBoard(this.boardValues);
        this.introduceBoard();
        if (this.validate_win()) {
          this.board.style.display = "none";
          this.image.style.width = "400px";
          this.image.style.height = "400px";
        } else {
          this.game();
        }
      });
    });
  }

  getWinner() {
    return this.win;
  }
}
