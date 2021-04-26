const maxItemLevel = 42;
const powerBrackets = {
  weapon: {
    10: 1.1275, // multiplier for levels from 11 to 20, incl 11 and 20,
    20: 1.20351, // multiplier for levels from 21 to 30, incl 21 and 30,
    30: 1.10365, // multiplier for levels from 31 to 40, incl 31 and 40,
    40: 1.1552, // multiplier for levels from 41 to 50, incl 41 and 50
  },
  armor: {
    10: 1.102, // multiplier for levels from 31 to 40, incl 31 and 40,
    20: 1.102, // multiplier for levels from 31 to 40, incl 31 and 40,
    30: 1.10, // multiplier for levels from 31 to 40, incl 31 and 40,
  },
};
window.addEventListener("DOMContentLoaded", () => {
  // On any of the item fields changing, try update the items total power
  const itemInputs = {
    1: {
      $level: document.getElementById("item-1-level"),
      $power: document.getElementById("item-1-power"),
      $result: document.getElementById("item-1-result"),
    },
    2: {
      $level: document.getElementById("item-2-level"),
      $power: document.getElementById("item-2-power"),
      $result: document.getElementById("item-2-result"),
    },
  };
  itemInputs[1].$level.addEventListener("keyup", () => {
    updateItemLevel(1);
  });
  itemInputs[1].$power.addEventListener("keyup", () => {
    updateItemLevel(1);
  });
  itemInputs[2].$level.addEventListener("keyup", () => {
    updateItemLevel(2);
  });
  itemInputs[2].$power.addEventListener("keyup", () => {
    updateItemLevel(2);
  });
  function getSelectedItemType() {
    const $weapon = document.getElementById("weapon");
    //const $armor = document.getElementById("armor");
    if ($weapon.checked) {
      return "weapon";
    } else {
      return "armor";
    }
  }
  function updateItemLevel(itemNumber) {
    const itemLevel = Number(itemInputs[itemNumber].$level.value);
    const itemPower = Number(itemInputs[itemNumber].$power.value);

    //
    // VALIDATION
    //
    // If theres no bracket, eg user has only typed "1" for "19" for the level, clear item result
    if (itemLevel.toString().length === 1) {
      // todo clear item result
      return false;
    }
    // If either level or power fields are empty, do nothing
    if (!itemLevel || !itemPower) {
      return false;
    }
    // If item level is over the cap, return false
    if (itemLevel > maxItemLevel) {
      return false;
    }

    //
    // CALCULATION
    //
    let updatedPower = itemPower;
    let itemLevelCounter = itemLevel;
    // for each level until 42, increase using multiplier
    while (itemLevelCounter < maxItemLevel) {
      const closestBracket = Number(
        itemLevelCounter.toString().slice(0, -1) + "0",
      ); // round to lowest 10
      const type = getSelectedItemType();
      const multiplier = powerBrackets[type][closestBracket];
      updatedPower = updatedPower * multiplier;
      itemLevelCounter++;
    }
    updatedPower = Math.round(updatedPower);
    document.getElementById(`item-${itemNumber}-result`).value = updatedPower;
    displayWhichItemIsStronger();
  }
  function displayWhichItemIsStronger() {
    const itemOneResult = Number(itemInputs[1].$result.value);
    const itemTwoResult = Number(itemInputs[2].$result.value);
    // If either fields dont have a value of some sort, then clear the highlight
    if (
      !itemOneResult || !itemTwoResult || isNaN(itemOneResult) ||
      isNaN(itemTwoResult)
    ) {
      itemInputs[1].$result.classList.remove("highlight-good", "highlight-bad");
      itemInputs[1].$result.classList.remove("highlight-good", "highlight-bad");
      return false;
    }
    if (itemOneResult === itemTwoResult) {
      itemInputs[1].$result.classList.add("highlight-good");
      itemInputs[2].$result.classList.remove("highlight-bad");
      itemInputs[1].$result.classList.remove("highlight-bad");
      itemInputs[2].$result.classList.add("highlight-good");
      return true;
    }
    if (itemOneResult > itemTwoResult) {
      itemInputs[1].$result.classList.add("highlight-good");
      itemInputs[2].$result.classList.add("highlight-bad");
      itemInputs[1].$result.classList.remove("highlight-bad");
      itemInputs[2].$result.classList.remove("highlight-good");
    } else {
      itemInputs[1].$result.classList.add("highlight-bad");
      itemInputs[2].$result.classList.add("highlight-good");
      itemInputs[1].$result.classList.remove("highlight-good");
      itemInputs[2].$result.classList.remove("highlight-bad");
    }
  }
});
