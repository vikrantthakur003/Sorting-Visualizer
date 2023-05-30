let randomize_array = document.getElementById("randomize_array_btn");
let sort_btn = document.getElementById("sort_btn");
let bars_container = document.getElementById("bars_container");
let select_algo = document.getElementById("algo");
let speed = document.getElementById("speed");
let slider = document.getElementById("slider");
let minRange = 1;
let maxRange = slider.value;
let numOfbars = slider.value;
let heightFactor = 4;
let speedFactor = 1;
let unsorted_array = new Array(numOfbars);


slider.addEventListener("input", function () {
    numOfbars = slider.value;
    maxRange = slider.value;

    bars_container.innerHTML = "";
    unsorted_array = createArray();
    renderBars(unsorted_array);
})


speed.addEventListener("change", (e) => {
    speedFactor = parseInt(e.target.value);
});

let algotouch = "";

select_algo.addEventListener("change", function () {
    algotouch = select_algo.value;
})

function randomNum(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function createArray() {
    let array = new Array(numOfbars);
    for (let i = 0; i < numOfbars; i++) {
        array[i] = randomNum(minRange, maxRange);
    }
    return array;
}


document.addEventListener("DOMContentLoaded", function () {
    unsorted_array = createArray();
    renderBars(unsorted_array);
})

function renderBars(array) {
    for (let i = 0; i < numOfbars; i++) {
        let bar = document.createElement("div");
        bar.classList.add("bar");
        bar.style.height = array[i] * heightFactor + "px";
        bars_container.appendChild(bar);
    }
}

randomize_array.addEventListener("click", function () {
    unsorted_array = createArray();
    bars_container.innerHTML = "";
    renderBars(unsorted_array);
});

function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

async function bubbleSort(array) {
    let bars = document.getElementsByClassName("bar");

    for (let i = 0; i < array.length; i++) {
        for (let j = 0; j < array.length - i - 1; j++) {
            if (array[j] > array[j + 1]) {
                for (let k = 0; k < bars.length; k++) {
                    if (k != j && k != j + 1) {
                        bars[k].style.backgroundColor = "aqua";
                    }
                }

                let temp = array[j];
                array[j] = array[j + 1];
                array[j + 1] = temp;

                bars[j].style.height = array[j] * heightFactor + "px";
                bars[j].style.backgroundColor = "crimson";

                bars[j + 1].style.height = array[j + 1] * heightFactor + "px";
                bars[j + 1].style.backgroundColor = "crimson";

                await sleep(speedFactor);
            }
        }
        await sleep(speedFactor);
    }

    for (let k = 0; k < bars.length; k++) {
        bars[k].style.backgroundColor = "aqua";
    }
    return array;
}


async function InsertionSort(array) {
    let bars = document.getElementsByClassName("bar");

    for (let i = 1; i < array.length; i++) {
        let key = array[i];
        let j = i - 1;

        while (i >= 0 && array[j] > key) {
            array[j + 1] = array[j];
            bars[j + 1].style.height = array[j + 1] * heightFactor + "px";
            bars[j + 1].style.backgroundColor = "yellow";

            await sleep(speedFactor);

            for (let k = 0; k < bars.length; k++) {
                if (k != j + 1) {
                    bars[k].style.backgroundColor = "aqua";
                }
            }
            j = j - 1;
        }
        array[j + 1] = key;
        bars[j + 1].style.height = array[j + 1] * heightFactor + "px";
        bars[j + 1].style.backgroundColor = "lightgreen";

        await sleep(speedFactor);
    }
    for (let k = 0; k < bars.length; k++) {
        bars[k].style.backgroundColor = "aqua";
    }
    return array;
}


async function HeapSort(array) {
    let bars = document.getElementsByClassName("bar");
    for (let i = Math.floor(array.length / 2); i >= 0; i--) {
        await heapify(array, array.length, i);
    }


    for (let i = array.length - 1; i >= 0; i--) {
        await swap(array, 0, i, bars);
        await heapify(array, i, 0);
    }

    for (let k = 0; k < bars.length; k++) {
        bars[k].style.backgroundColor = "aqua";
        await sleep(speedFactor);
    }
    return array;
}

async function heapify(array, n, i) {
    let bars = document.getElementsByClassName("bar");

    let largest = i;
    let left = 2 * i + 1;
    let right = 2 * i + 2;

    if (left < n && array[left] > array[largest]) {
        largest = left;
    }
    if (right < n && array[right] > array[largest]) {
        largest = right;
    }
    if (largest != i) {
        await swap(array, i, largest, bars);
        await heapify(array, n, largest);
    }
}

async function swap(array, i, j, bars) {
    let temp = array[i];
    array[i] = array[j];
    array[j] = temp;

    bars[i].style.height = array[i] * heightFactor + "px";
    bars[j].style.height = array[j] * heightFactor + "px";

    bars[i].style.backgroundColor = "crimson";
    bars[j].style.backgroundColor = "crimson";

    await sleep(speedFactor);

    for (let k = 0; k < bars.length; k++) {
        if (k != i && k != j) {
            bars[k].style.backgroundColor = "aqua";
        }
    }

    return array;
}

sort_btn.addEventListener("click", function () {
    switch (algotouch) {
        case "bubble":
            bubbleSort(unsorted_array);
            break;
        case "insertion":
            InsertionSort(unsorted_array);
            break;
        case "heap":
            HeapSort(unsorted_array);
            break;
        default:
            bubbleSort(unsorted_array);
            break;
    }
})