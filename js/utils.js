function generateRandomArray() {
  const randomNumbers = [];
  const arrayLength = 5;
  const min = 1;
  const max = 50;

  for (let i = 0; i < arrayLength; i++) {
    const randomNum = Math.floor(Math.random() * (max - min + 1)) + min;

    randomNumbers.push(randomNum);
  }
  return randomNumbers;
}

function displayArray(randomArray) {
  const generatedArray = document.querySelector("#js-generatedArray");

  generatedArray.innerHTML = "";

  randomArray.forEach((value) => {
    const box = document.createElement("div");
    box.className = "array-box";
    box.textContent = value;

    generatedArray.appendChild(box);
  });

  document.querySelector("#array-size").textContent =
    `Size : ${randomArray.length}`;
}

function swap(randomArray, i, j) {
  let temp = randomArray[i];
  randomArray[i] = randomArray[j];
  randomArray[j] = temp;
}

function recordStep(steps, randomArray, stepData, variableChanges) {
  steps.push({
    ...stepData,
    arrayState: [...randomArray],
    variableState: variableChanges,
  });
}

function createVariableState(currentPass, i, j, swapped) {
  const variableChanges = {
    currentPass: i + 1,
    i: i,
    j: j,
    swapped: swapped,
  };
  return variableChanges;
}
