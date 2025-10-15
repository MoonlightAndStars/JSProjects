(function () {
  const tableContainer = document.querySelector(".table");

  const requiredContainer = document.getElementById("div-box");

  const inputByCellNumbers = document.querySelector("#cell-numbers");

  const rowInput = document.querySelector("#row-input");

  const columnInput = document.querySelector("#column-input");


  let gSize = 0;


function renderGrid(size) {
    gSize = size**2;
  tableContainer.innerHTML = "";
  tableContainer.style.gridTemplateColumns = `repeat(${size}, 50px)`;
  tableContainer.style.gridTemplateRows = `repeat(${size}, 50px)`;

  for (let i = 1; i <= size ** 2; i++) {
    const box = document.createElement("button");
    box.classList.add("box");
    box.innerText = i;
    tableContainer.appendChild(box);
  }
}

requiredContainer.addEventListener("input", (e) => {
  const val = Number(e.target.value);
  if (isNaN(val)) return;
  if (val < 1 || val > 10) return;
  renderGrid(val);
});

//! select elements and toggle class.
  tableContainer.addEventListener("click", (e)=>{
    e.stopPropagation();
    document
      .querySelectorAll(".box.active")
      .forEach((b) => b.classList.remove("active"));
    if(e.target == tableContainer){
        return;
    } else {
        e.target.classList.toggle("active");
    }
    console.log(e.target.innerText)
  })

//! remove class by double clicking the already selected element.

  tableContainer.addEventListener("dblclick", function(e){
    if(e.target === tableContainer) return;
    e.target.classList.remove("active")
  })

//! selecting element based on column input...

inputByCellNumbers.addEventListener("input", (e) => {
  let value = Number(e.target.value);
  console.log(value);
  if (value > gSize || value < 1 || isNaN(value)) return;

  document
    .querySelectorAll(".box")
    .forEach((b) => b.classList.remove("active"));

  document.querySelectorAll(".box").forEach((box) => {
    if (Number(box.innerText) === value) {
      box.classList.add("active");
    }
  });
});

//!! selecting rows..

function selectByRowAndCol() {
  const row = Number(rowInput.value);
  const col = Number(columnInput.value);
  const size = Math.sqrt(gSize);

  if (!row || !col || isNaN(row) || isNaN(col)) return; // ignore empty/invalid
  if (row < 1 || row > size || col < 1 || col > size) {
    console.warn("Invalid row or column for current grid size");
    return;
  }

  const index = (row - 1) * size + (col - 1);

  console.log(row);
  console.log(col);
  console.log(index);

  document
    .querySelectorAll(".box")
    .forEach((b) => b.classList.remove("active"));
  const boxes = document.querySelectorAll(".box");
  if (boxes[index]) boxes[index].classList.add("active");
}
   

  rowInput.addEventListener("input", selectByRowAndCol);
  columnInput.addEventListener("input", selectByRowAndCol);

 renderGrid(3)
})();
