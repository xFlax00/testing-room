// Selecting active cells
const boardCells = document.querySelector(".board")
boardCells.childNodes.forEach((rowCell) => {
  rowCell.childNodes.forEach((cell) => {
    cell.onclick = () => {
      cell.classList.toggle("selected")
    }
  })
})

// New generation
const generation = (arr) => {
  let newCell = [];
  let diedCell = [];

  arr.forEach((x, i) => {
    x.forEach((y, j) => {
      let cont = 0;
      // Evitar erro no primeiro array
      if (i > 0) {
        // Evitar erro no primeiro elemento do array
        if (j > 0) {
          if (arr[i - 1][j - 1] === 1) cont++;
        }
        if (arr[i - 1][j] === 1) cont++;
        if (arr[i - 1][j + 1] === 1) cont++;
      }
      // Evitar erro no primeiro elemento do array
      if (j > 0) {
        if (arr[i][j - 1] === 1) cont++;
      }
      if (arr[i][j + 1] === 1) cont++;
      // Evitar erro no último array
      if (i < arr.length - 1) {
        // Evitar erro no primeiro elemento do array
        if (j > 0) {
          if (arr[i + 1][j - 1] === 1) cont++;
        }
        if (arr[i + 1][j] === 1) cont++;
        if (arr[i + 1][j + 1] === 1) cont++;
      }

      if (cont === 3) {
        newCell.push({ x: i, y: j });
      } else if (cont > 3 || cont < 2) {
        diedCell.push({ x: i, y: j });
      }
    });
  });

  newCell.forEach((cell) => {
    arr[cell.x][cell.y] = 1;
  });

  diedCell.forEach((cell) => {
    arr[cell.x][cell.y] = 0;
  });
};

// Comparing and rendering matrices
const compareAndRenderizing = (arr1, arr2) => {
  for(let i in arr1) {
    for(let j in arr2) {
      if(arr1[i][j] === 1 && !arr2[i][j].classList.contains("selected")) {
        arr2[i][j].classList.add("selected")
      }else if(arr1[i][j] === 0 && arr2[i][j].classList.contains("selected")) {
        arr2[i][j].classList.remove("selected")
      }
    }
  }
}

let boardGeneratedBinary = []
let boardGeneratedNode = []
// Creating binary and elements matrices
const renderGenerations = () => {
  let rowCells = [...boardCells.children]
  rowCells.forEach((node) => {
    let rowBinary = []
    let row = []
    nodesRow = [...node.children]
    nodesRow.forEach((cell) => {
      row.push(cell)
      if(cell.classList.contains("selected")){
        rowBinary.push(1)
        return
      }
      rowBinary.push(0)
    })
    boardGeneratedBinary.push(rowBinary)
    boardGeneratedNode.push(row)
  })

  generation(boardGeneratedBinary)
  compareAndRenderizing(boardGeneratedBinary, boardGeneratedNode)
}

