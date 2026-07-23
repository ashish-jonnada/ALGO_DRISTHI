const generate = document.querySelector("#generateButton");
let result;
generate.addEventListener("click", () => {
  const randomArray = generateRandomArray();
  const graphContainer = createGraphContainer();

  renderBars(randomArray, graphContainer);
  renderIndices(randomArray, graphContainer);
  displayArray(randomArray);

  result = bubbleSort(randomArray);
  // console.log(result.steps);
});

const start = document.querySelector("#startButton");

const next = document.querySelector("#nextButton");

const previous = document.querySelector("#previousButton");

const resetbutton = document.querySelector("#resetButton");

start.addEventListener("click", () => {
  unhideButtons();
  hideButtons();
  unhidePanel();
  currentStep = 0;

  const step = result.steps[currentStep];
  renderStep(step);

  if (result.steps.length === 1) {
    next.disabled = true;
  }
});

function unhideButtons() {
  next.style.display = "inline-block";
  previous.style.display = "inline-block";
  resetbutton.style.display = "inline-block";
}

const rightpanel = document.querySelector("#right-panel");

function unhidePanel() {
  rightpanel.style.display = "flex";
}

function hideButtons() {
  generate.style.display = "none";
  start.style.display = "none";
}

function compare(randomArray, i, j, steps, swapped) {
  // console.log(`Comparing ${randomArray[j]} with ${randomArray[j + 1]}`);
  recordStep(
    steps,
    randomArray,
    {
      type: "compare",
      firstIndex: j,
      secondIndex: j + 1,
      firstValue: randomArray[j],
      secondValue: randomArray[j + 1],
      passNumber: i,
    },
    createVariableState(i + 1, i, j, swapped),
  );
  if (randomArray[j] > randomArray[j + 1]) {
    return true;
  } else {
    return false;
  }
}

function bubbleSort(randomArray) {
  const originalArray = [...randomArray];
  let n = randomArray.length;
  let steps = [];
  let isSorted = false;
  let completedPasses = 0;
  let swapped = null;
  if (n <= 1) {
    recordStep(
      steps,
      randomArray,
      {
        type: "outer-loop",
        passNumber: 0,
        currentI: 0,
      },
      createVariableState(1, 0, null, null),
    );

    recordStep(
      steps,
      randomArray,
      {
        type: "sorted",
        passNumber: 0,
        reason: "Single-ELement",
      },
      createVariableState(1, 0, null, null),
    );

    return { originalArray, randomArray, steps };
  }
  for (let i = 0; i < n - 1; i++) {
    recordStep(
      steps,
      randomArray,
      {
        type: "outer-loop",
        passNumber: i,
        currentI: i,
      },
      createVariableState(i + 1, i, null, swapped),
    );
    swapped = false;
    recordStep(
      steps,
      randomArray,
      {
        type: "swapped-false",
        passNumber: i,
        currentI: i,
        swapped: false,
      },
      createVariableState(i + 1, i, null, false),
    );
    for (let j = 0; j < n - 1 - i; j++) {
      recordStep(
        steps,
        randomArray,
        {
          type: "inner-loop",
          passNumber: i,
          currentI: i,
          currentJ: j,
        },
        createVariableState(i + 1, i, j, swapped),
      );
      let isCompare = compare(randomArray, i, j, steps, swapped);
      if (isCompare) {
        // console.log(
        //   `${randomArray[j]} is greater than ${randomArray[j + 1]} swap Needed`
        // );
        recordStep(
          steps,
          randomArray,
          {
            type: "swap-needed",
            firstIndex: j,
            secondIndex: j + 1,
            firstValue: randomArray[j],
            secondValue: randomArray[j + 1],
            passNumber: i,
          },
          createVariableState(i + 1, i, j, swapped),
          // {
          //   currentPass: i + 1,
          //   i: i,
          //   j: j,
          //   swapped: swapped,
          // },
        );
        // console.log(`swapping ${randomArray[j]} and ${randomArray[j + 1]}`);

        swap(randomArray, j, j + 1, steps);
        recordStep(
          steps,
          randomArray,
          {
            type: "swap",
            firstIndex: j,
            secondIndex: j + 1,
            firstValue: randomArray[j],
            secondValue: randomArray[j + 1],
            passNumber: i,
          },
          createVariableState(i + 1, i, j, swapped),
          // {
          //   currentPass: i + 1,
          //   i: i,
          //   j: j,
          //   swapped: swapped,
          // },
        );
        swapped = true;
        recordStep(
          steps,
          randomArray,
          {
            type: "swapped-true",
            passNumber: i,
            currentI: i,
            currentJ: j,
            swapped: true,
          },
          createVariableState(i + 1, i, j, true),
          // {
          //   currentPass: i + 1,
          //   i: i,
          //   j: j,
          //   swapped: true,
          // },
        );
      } else if (isCompare == false) {
        // console.log(
        //   `${randomArray[j]} is less than ${randomArray[j + 1]} No swap Needed`,
        // );
        recordStep(
          steps,
          randomArray,
          {
            type: "no-swap",
            firstIndex: j,
            secondIndex: j + 1,
            firstValue: randomArray[j],
            secondValue: randomArray[j + 1],
            passNumber: i,
          },
          createVariableState(i + 1, i, j, swapped),
          // {
          //   currentPass: i + 1,
          //   i: i,
          //   j: j,
          //   swapped: swapped,
          // },
        );
      }
    }
    recordStep(
      steps,
      randomArray,
      {
        type: "pass",
        passNumber: i + 1,
      },
      createVariableState(i + 1, i, null, swapped),
      // {
      //   currentPass: i + 1,
      //   i: i,
      //   j: null,
      //   swapped: swapped,
      // },
    );

    recordStep(
      steps,
      randomArray,
      {
        type: "check-swapped",
        passNumber: i + 1,
        currentI: i,
        swapped: swapped,
      },
      createVariableState(i + 1, i, null, swapped),
      // {
      //   currentPass: i + 1,
      //   i: i,
      //   j: null,
      //   swapped: swapped,
      // },
    );
    if (!swapped) {
      isSorted = true;

      recordStep(
        steps,
        randomArray,
        {
          type: "break",
          passNumber: i + 1,
          currentI: i,
        },
        createVariableState(i + 1, i, null, false),
        // {
        //   currentPass: i + 1,
        //   i: i,
        //   j: null,
        //   swapped: false,
        // },
      );

      recordStep(
        steps,
        randomArray,
        {
          type: "sorted",
          passNumber: i + 1,
          reason: "no-swaps",
        },
        createVariableState(i + 1, i, null, false),
        // {
        //   currentPass: i + 1,
        //   i: i,
        //   j: null,
        //   swapped: false,
        // },
      );
      // console.log("Array Was Sorted successfully");
      break;
    }

    completedPasses = i + 1;
    // console.log(`pass ${i + 1} completed`);
  }
  if (!isSorted) {
    recordStep(
      steps,
      randomArray,
      {
        type: "sorted",
        passNumber: completedPasses,
        reason: "passes-complete",
      },
      createVariableState(completedPasses, completedPasses - 1, null, swapped),
      // {
      //   currentPass: completedPasses,
      //   i: completedPasses - 1,
      //   j: null,
      //   swapped: swapped,
      // },
    );
  }
  return { originalArray, randomArray, steps };
}

let currentStep = -1;
previous.disabled = true;

next.addEventListener("click", () => {
  const allSteps = result.steps;
  if (currentStep >= allSteps.length) {
    return;
  }
  currentStep++;
  const step = allSteps[currentStep];
  renderStep(step);
  if (currentStep === 1) {
    previous.disabled = false;
  }
  if (currentStep === allSteps.length - 1) {
    next.disabled = true;
  }
});

previous.addEventListener("click", () => {
  const allSteps = result.steps;
  next.disabled = false;
  if (currentStep <= 0) {
    return;
  }
  currentStep--;
  const step = allSteps[currentStep];
  renderStep(step);
  if (currentStep === 0) {
    previous.disabled = true;
  }
});

resetbutton.addEventListener("click", () => {
  currentStep = 0;

  previous.disabled = true;
  next.disabled = false;

  renderStep(result.steps[0]);

  if (result.steps.length === 1) {
    next.disabled = true;
  }
});
