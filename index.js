const maxItemLevel = 42;
const powerBrackets = {
  10: 1.1275, // multiplier for levels from 11 to 20, incl 11 and 20,
  20: 1.20351, // multiplier for levels from 21 to 30, incl 21 and 30,
  30: 1.10365, // multiplier for levels from 31 to 40, incl 31 and 40,
  40: 1.1552, // multiplier for levels from 41 to 50, incl 41 and 50
};
window.addEventListener("DOMContentLoaded", () => {
  // On any of the item fields changing, try update the items total power
  const itemInputs = {
    1: {
      $level: document.getElementById("item-1-level"),
      $power: document.getElementById("item-1-power"),
    },
    2: {
      $level: document.getElementById("item-2-level"),
      $power: document.getElementById("item-2-power"),
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
  function updateItemLevel(itemNumber) {
    const itemLevel = Number(itemInputs[itemNumber].$level.value);
    const itemPower = Number(itemInputs[itemNumber].$power.value);

    //
    // VALIDATION
    //

    // If theres no bracket, eg user has only typed "1" for "19" for the level, dont change anything
    if (itemLevel.length === 1) {
      return false;
    }
    // If either level or power fields are empty, do nothing
    if (!itemLevel || !itemPower) {
      return false;
    }
    // If item level is over the cap, return false
    if (itemLevel > maxItemLevel) {
      return false; // TODO SHOW ERROR TO USER THEY CANT GO OVER MAX
    }

    let updatedPower = itemPower;
    let itemLevelCounter = itemLevel;
    // for each level until 42, increase using multiplier
    while (itemLevelCounter < maxItemLevel) {
      const closestBracket = Number(
        itemLevelCounter.toString().slice(0, -1) + "0",
      ); // round to lowest 10
      const multiplier = powerBrackets[closestBracket];
      updatedPower = updatedPower * multiplier;
      itemLevelCounter++;
    }
    updatedPower = Math.round(updatedPower);
    document.getElementById(`item-${itemNumber}-result`).value = updatedPower;
    displayWhichItemIsStronger();
  }
  function displayWhichItemIsStronger() {
  }
});
