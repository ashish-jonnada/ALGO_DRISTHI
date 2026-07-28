const generate = document.querySelector("#generateButton");

let isStartEnabled = false;
if (!isStartEnabled) {
  start.disabled = true;
}
let result;
generate.addEventListener("click", () => {
  openPopup();

  // console.log(result.steps);
});
const generatePopup = document.querySelector("#generatePopUp");

function openPopup() {
  hidePopupMessage();
  generatePopup.style.display = "flex";
}

function closePopup() {
  generatePopup.style.display = "none";
}

const closeButton = document.querySelector(".closeButton");

closeButton.addEventListener("click", () => {
  closePopup();
});

const generateArrayButton = document.querySelector("#generateArrayButton");
const arraySizeSelect = document.querySelector("#array-size-select");

generateArrayButton.addEventListener("click", () => {
  emptyState.style.display = "none";
  const activeModeButton = document.querySelector(".mode-btn.active");
  console.log(activeModeButton.dataset.mode);
  const arraySize = Number(arraySizeSelect.value);
  if (activeModeButton.dataset.mode === "random") {
    const randomArray = generateRandomArray(arraySize);
    console.log(arraySize);
    loadArray(randomArray);
    closePopup();
  } else {
    const input = customArrayInput.value;

    console.log(input);

    const values = input.split(",");

    console.log(values);
    const customArray = values.map((value) => {
      return Number(value);
    });

    console.log(customArray);
    const emptyinput = customArrayInput.value.trim();

    if (emptyinput === "") {
      showPopupMessage("Please enter an array.");
      return;
    }
    if (customArray.length !== arraySize) {
      showPopupMessage("Please enter exactly " + arraySize + " values.");

      return;
    }
    if (customArray.some(Number.isNaN)) {
      showPopupMessage("Please enter only integers.");
      return;
    }
    if (customArray.some((value) => !Number.isInteger(value))) {
      showPopupMessage("Please enter only integers.");
      return;
    }
    hidePopupMessage();
    loadArray(customArray);
    closePopup();
  }
});

function loadArray(array) {
  displayArray(array);
  const graphContainer = createGraphContainer();
  renderBars(array, graphContainer);
  renderIndices(array, graphContainer);
  result = bubbleSort(array);
  isStartEnabled = true;
  if (isStartEnabled) {
    start.disabled = false;
  }
}

const modeButtons = document.querySelectorAll(".mode-btn");

const customInputSection = document.querySelector(".custom-input-section");

modeButtons.forEach((button) => {
  button.addEventListener("click", () => {
    modeButtons.forEach((btn) => {
      btn.classList.remove("active");
    });
    button.classList.add("active");
    if (button.dataset.mode === "random") {
      customInputSection.style.display = "none";
    } else {
      customInputSection.style.display = "block";
    }
  });
});
const customArrayInput = document.querySelector("#custom-array-input");

const popupMessage = document.querySelector("#popup-message");
function showPopupMessage(message) {
  popupMessage.textContent = message;

  popupMessage.style.display = "block";
}
function hidePopupMessage() {
  popupMessage.textContent = "";

  popupMessage.style.display = "none";
}
