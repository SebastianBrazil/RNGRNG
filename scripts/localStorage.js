const saveToLocalStorage = (savingData) => {
    let savedName = getLocalStorage();
    if (!savedName.includes(savingData)) {
        savedName.push(savingData);
    }
    localStorage.setItem("SavedNames", JSON.stringify(savedName));
};

const getLocalStorage = () => {
    let localStorageData = localStorage.getItem("SavedNames");
    if (localStorageData === null) {
        return [];
    };
    return JSON.parse(localStorageData);
};

const removeFromLocalStorage = (savingData) => {
    let savedName = getLocalStorage();
    let removeName = savedName.indexOf(savingData);
    savedName.splice(removeName, 1);
    localStorage.setItem("SavedNames", JSON.stringify(savedName));
};

export { saveToLocalStorage, getLocalStorage, removeFromLocalStorage };