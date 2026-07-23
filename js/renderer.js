const visulaizer = document.querySelector("#visualizer");

function createGraphContainer() {
  const graphContainer = document.createElement("div");
  graphContainer.className = "graph-container";

  visulaizer.innerHTML = "";
  visulaizer.appendChild(graphContainer);

  return graphContainer;
}

const SCALE_FACTOR = 6;
function renderBars(randomArray, graphContainer) {
  const barsContainer = document.createElement("div");
  barsContainer.className = "bars-container";
  for (const nums of randomArray) {
    const column = document.createElement("div");
    column.className = "column";
    const bar = document.createElement("div");
    bar.className = "bar";
    const span = document.createElement("span");
    span.className = "value";
    span.innerText = nums;
    column.appendChild(span);
    column.appendChild(bar);
    barsContainer.appendChild(column);
    bar.style.height = `${nums * SCALE_FACTOR}px`;
  }
  graphContainer.appendChild(barsContainer);
}

function renderIndices(randomArray, graphContainer) {
  const indexContainer = document.createElement("div");
  indexContainer.className = "index-container";
  for (let i = 0; i < randomArray.length; i++) {
    const indexes = document.createElement("span");
    indexes.className = "index";
    indexes.innerText = i;
    indexContainer.appendChild(indexes);
  }
  graphContainer.appendChild(indexContainer);
}

function renderStep(step) {
  const array = step.arrayState;
  renderArray(array);
  updateStatus(step);
  highlightBar(step);
  highlightPseudocode(step);
  updateVariables(step.variableState);
}

function renderArray(array) {
  visulaizer.innerHTML = " ";
  const graphContainer = createGraphContainer();
  renderBars(array, graphContainer);
  renderIndices(array, graphContainer);
}

function highlightBar(step) {
  const bars = document.querySelectorAll(".bar");
  if (step.passNumber > 0) {
    const length = bars.length;
    const start = length - step.passNumber;
    for (let i = start; i < length; i++) {
      bars[i].style.backgroundColor = "#22C55E";
    }
  }
  if (step.type === "sorted") {
    for (let i = 0; i < bars.length; i++) {
      bars[i].style.backgroundColor = "#22C55E";
    }
  }
  switch (step.type) {
    case "compare":
      bars[step.firstIndex].style.backgroundColor = "#FACC15";
      bars[step.secondIndex].style.backgroundColor = "#FACC15";
      break;
    case "swap-needed":
      bars[step.firstIndex].style.backgroundColor = "#F97316";
      bars[step.secondIndex].style.backgroundColor = "#F97316";
      break;
    case "swap":
      bars[step.firstIndex].style.backgroundColor = "#EF4444";
      bars[step.secondIndex].style.backgroundColor = "#EF4444";
      break;
    case "no-swap":
      bars[step.firstIndex].style.backgroundColor = "#3b82f6";
      bars[step.secondIndex].style.backgroundColor = "#3b82f6";
      break;
  }
}

const status = document.querySelector("#status");

function updateStatus(step) {
  switch (step.type) {
    case "compare":
      status.innerHTML = `Comparing ${step.firstValue} and ${step.secondValue}...`;
      break;
    case "swap-needed":
      status.innerHTML = `${step.firstValue} is bigger than ${step.secondValue}, so let's swap them.`;
      break;
    case "swap":
      status.innerHTML = `Swapping ${step.firstValue} and ${step.secondValue}.`;
      break;
    case "no-swap":
      status.innerHTML = `${step.firstValue} is already smaller than ${step.secondValue},
      so we'll leave them as they are.`;
      break;
    case "pass":
      if (step.passNumber === 1) {
        status.innerHTML = `Pass ${step.passNumber} completed.
      The last element is now sorted and won't move again.`;
        break;
      }
      status.innerHTML = `Pass ${step.passNumber} completed.
      The last ${step.passNumber} elements are now sorted and won't move again.`;
      break;
    case "outer-loop":
      status.innerHTML = `Starting Pass ${step.passNumber + 1}.`;
      break;
    case "swapped-false":
      status.innerHTML = `Starting a new pass.
      No swaps have happened yet.`;
      break;
    case "inner-loop":
      status.innerHTML = `Checking the next pair of elements.`;
      break;
    case "swapped-true":
      status.innerHTML = `A swap happened in this pass.
      We'll keep checking the remaining elements.`;
      break;
    case "check-swapped":
      status.innerHTML = `Checking whether any swaps happened in this pass.`;
      break;
    case "break":
      status.innerHTML = `No swaps happened in this pass.
      The array is already sorted, so we'll stop here.`;
      break;
    case "sorted":
      status.innerHTML = `Done! 🎉
      The entire array is now sorted.`;
      break;
  }
}

const Pseudocodelines = document.querySelectorAll(".pseudo-line");
function highlightPseudocode(step) {
  console.log(step.type);
  Pseudocodelines.forEach((line) => {
    line.classList.remove("active-line");
    line.classList.remove("completed-line");
  });

  if (step.type === "sorted") {
    Pseudocodelines.forEach((line) => {
      line.classList.add("completed-line");
    });
    return;
  }

  let lineType = step.type;
  if (lineType === "swap-needed" || lineType === "no-swap") {
    lineType = "compare";
  }
  
  const currentLine = document.querySelector(`[data-line="${lineType}"]`);
  if (currentLine) {
    currentLine.classList.add("active-line");
  }
  console.log(currentLine);
}

const currentPassValue = document.getElementById("current-pass-value");
const swappedValue = document.getElementById("swapped-value");
const iValue = document.getElementById("i-value");
const jValue = document.getElementById("j-value");

console.log(iValue);
function updateVariables(variableState) {
  console.log(currentPassValue);
  if (variableState.currentPass === null) {
    currentPassValue.textContent = `Current Pass : — `;
  } else {
    currentPassValue.textContent = `Current Pass : ${variableState.currentPass}`;
  }
  if (variableState.swapped === null) {
    swappedValue.textContent = `swapped : — `;
  } else {
    swappedValue.textContent = `swapped : ${variableState.swapped}`;
  }
  if (variableState.i === null) {
    iValue.textContent = `i : —`;
  } else {
    iValue.textContent = `i : ${variableState.i}`;
  }
  if (variableState.j === null) {
    jValue.textContent = `j : —`;
  } else {
    jValue.textContent = `j : ${variableState.j}`;
  }
}
