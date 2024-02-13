import { getLocalStorage, saveToLocalStorage, removeFromLocalStorage } from "./localStorage.js";

let nameInputBtn = document.getElementById("nameInputBtn");
let groupInputBtn = document.getElementById("groupInputBtn");
let nameInput = document.getElementById("nameInput");
let groupInput = document.getElementById("groupInput");

let nameAddition = document.getElementById("nameAddition");
let groupPlacement = document.getElementById("groupPlacement");
let numberCount = document.getElementById("numberCount");

function popNames() {
    nameAddition.innerHTML = "";
    groupPlacement.innerHTML = "";

    let namesArray = getLocalStorage();
    let counter = 0;

    namesArray.forEach(names => {
        let holderDiv = document.createElement("div");
        holderDiv.className = "my-2 flex justify-between";

        let nameP = document.createElement('p');
        nameP.innerText = names;
        nameP.className = "ml-10 p-1 text-xl";

        let removeBtn = document.createElement('button');
        removeBtn.innerText = "Remove"
        removeBtn.className = "text-xl mr-10 text-center bg-red-400 w-20 p-1 rounded-lg";
        removeBtn.addEventListener('click', function () {
            removeFromLocalStorage(names)
            popNames();
        });

        holderDiv.appendChild(nameP);
        holderDiv.appendChild(removeBtn);
        nameAddition.appendChild(holderDiv);

        counter++;
    });
    numberCount.innerText = counter;
};

popNames();

function randomGroups(numby, isTrue) {
    groupPlacement.innerHTML = "";

    let namesArray = getLocalStorage();
    let intNumby = Number(numby);

    let holderDiv = document.createElement("div");
    holderDiv.className = "";

    let textP = document.createElement('p');
    textP.className = "text-xl";
    if (isTrue) {
        textP.innerText = `You Chose The Group Size Of: ${numby}`;
        holderDiv.appendChild(textP);

        let groupP = document.createElement('p');
        groupP.className = "text-xl";

        // intNumby is the group size, namesArray.length is how many people there are, remainder checks to see if there will be people left, sourt removes the remainder to have a balanced namesArray.length
        // 11, 2
        if (intNumby === 1) {
            let randomNum = Math.floor(Math.random() * namesArray.length);
            groupP.innerText = namesArray[randomNum];
            holderDiv.appendChild(groupP);
        } else {
            let remainder = namesArray.length % intNumby;

            let alertP = document.createElement('p');
            alertP.className = "text-lg my-2 mx-5";

            let sourt = namesArray.length - remainder;
            let groupsCount = sourt / intNumby;
            let shadowNamesArray = namesArray;

            if (remainder > 1) {
                groupsCount++;
                alertP.innerText = `When making groups, there were ${remainder} names remaining. They were put into an unfilled group.`;
                holderDiv.appendChild(alertP);
                remainder = 0;
            } else if (remainder === 1) {
                alertP.innerText = `When making groups, there was ${remainder} name remaining. They were put into an existing group.`;
                holderDiv.appendChild(alertP);
            }

            for (let i = 1; i < groupsCount + 1; i++) {
                groupP.innerText += `Group ${i}: `;
                for (let j = 0; j < intNumby; j++) {
                    if (shadowNamesArray.length !== 0) {
                        let randomNum = Math.floor(Math.random() * shadowNamesArray.length);

                        groupP.innerText += shadowNamesArray[randomNum] + " ";

                        shadowNamesArray.splice(shadowNamesArray.indexOf(shadowNamesArray[randomNum]), 1);
                    };
                };
                if (remainder !== 0) {
                    let randomNum = Math.floor(Math.random() * shadowNamesArray.length);

                    groupP.innerText += shadowNamesArray[randomNum] + " ";

                    shadowNamesArray.splice(shadowNamesArray.indexOf(shadowNamesArray[randomNum]), 1);

                    remainder--;
                };
                groupP.appendChild(document.createElement('br'));
            };
            holderDiv.appendChild(groupP);
        };
    } else {
        textP.innerText = `You Chose A Group Size That Was Invalid Or Not A Number`;
        holderDiv.appendChild(textP);
    };
    groupPlacement.appendChild(holderDiv);
};

nameInputBtn.addEventListener('click', function () {
    if (nameInput.value !== "") {
        saveToLocalStorage(nameInput.value);
    };

    nameInput.value = "";
    popNames();
});

groupInputBtn.addEventListener('click', function () {
    let isValid = true;
    let namesArray = getLocalStorage();

    if (isNaN(groupInput.value) || groupInput.value > namesArray.length || groupInput.value === "") {
        isValid = false;
    };

    randomGroups(groupInput.value, isValid);
    groupInput.value = "";
});