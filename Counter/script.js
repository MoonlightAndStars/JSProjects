(function () {
  const countNumber = document.querySelector(".count-value");
  const incrementButton = document.querySelector(".button--increment");
  const decrementButton = document.querySelector(".button--decrement");
  const stepsInput = document.querySelector("#input-steps");
  const resetButton = document.querySelector(".button--reset");

  function Counter() {
    let initialValue = 0;

    return {
      increment(value, steps) {
        return value + steps;
      },
      decrement(value, steps) {
        return value - steps;
      },
      reset() {
        return initialValue;
      },
    };
  }

  const counter = Counter();

  const getNumber = (el) => parseInt(el.value || el.innerText) || 0;

  function updateStepClasses(prev, curr) {
    stepsInput.classList.remove(
      "steps__input--increasing",
      "steps__input--decreasing",
      "steps__input--neutral"
    );
    if (curr > prev) {
      stepsInput.classList.add("steps__input--increasing");
    } else if (curr < prev) {
      stepsInput.classList.add("steps__input--decreasing");
    } else {
      stepsInput.classList.add("steps__input--neutral");
    }
  }

  incrementButton.addEventListener("click", () => {
    decrementButton.classList.remove("button--active");
    incrementButton.classList.add("button--active");

    const steps = getNumber(stepsInput);
    const value = getNumber(countNumber);

    countNumber.innerText = counter.increment(value, steps);
  });

  decrementButton.addEventListener("click", () => {
    incrementButton.classList.remove("button--active");
    decrementButton.classList.add("button--active");

    const steps = getNumber(stepsInput);
    const value = getNumber(countNumber);

    countNumber.innerText = counter.decrement(value, steps);
  });

  resetButton.addEventListener("click", () => {
    countNumber.innerText = counter.reset();
    incrementButton.classList.remove("button--active");
    decrementButton.classList.remove("button--active");
  });

  //styling input steps based on step change
  let previousValue = getNumber(stepsInput);

  stepsInput.addEventListener("input", () => {
    let currentValue = getNumber(stepsInput);

    //handling negative values
    if (currentValue < 0) {
      stepsInput.value = 0;
      currentValue = 0;
    }

    updateStepClasses(previousValue, currentValue);
    previousValue = currentValue;
  });

  //keyboardevents
  document.addEventListener("keydown", (e) => {
    // console.log(e)
    // console.log(e.target)
    let steps = getNumber(stepsInput);
    let value = getNumber(countNumber);

    switch (e.key) {
      case "+":
        e.preventDefault();
        countNumber.innerText = counter.increment(value, steps);
        incrementButton.classList.add("button--active");
        decrementButton.classList.remove("button--active");
        break;

      case "-":
        e.preventDefault();
        countNumber.innerText = counter.decrement(value, steps);
        decrementButton.classList.add("button--active");
        incrementButton.classList.remove("button--active");
        break;

      case "PageUp":
        e.preventDefault();
        stepsInput.value = steps + 1;
        updateStepClasses(previousValue, steps + 1);
        previousValue = steps + 1;
        break;

      case "PageDown":
        e.preventDefault();
        stepsInput.value = Math.max(0, steps - 1);
        updateStepClasses(previousValue, stepsInput.value);
        previousValue = getNumber(stepsInput);
        break;

      default:
        break;
    }
  });
})();
