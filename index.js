//
// DATA
//
const maxItemLevel = 50;
const maxPossiblePowerForEachItemLevel = {
  weapon: {
    10: {
      legendary: 425,
      epic: 408,
      rare: 378,
    },
    11: {
      legendary: 480,
      epic: 460,
      rare: 427,
    },
    12: {
      legendary: 541,
      epic: 519,
      rare: 481,
    },
    "13": {
      "legendary": 610,
      "epic": 585,
      "rare": 542,
    },
    "14": {
      "legendary": 688,
      "epic": 660,
      "rare": 612,
    },
    "15": {
      "legendary": 775,
      "epic": 744,
      "rare": 690,
    },
    "16": {
      "legendary": 874,
      "epic": 839,
      "rare": 778,
    },
    "17": {
      "legendary": 986,
      "epic": 946,
      "rare": 877,
    },
    "18": {
      "legendary": 1112,
      "epic": 1067,
      "rare": 989,
    },
    "19": {
      "legendary": 1253,
      "epic": 1203,
      "rare": 1115,
    },
    "20": {
      "legendary": 1413,
      "epic": 1357,
      "rare": 1257,
    },
    "21": {
      "legendary": 1594,
      "epic": 1530,
      "rare": 1417,
    },
    "22": {
      "legendary": 1918,
      "epic": 1841,
      "rare": 1706,
    },
    "23": {
      "legendary": 2308,
      "epic": 2216,
      "rare": 2053,
    },
    "24": {
      "legendary": 2778,
      "epic": 2666,
      "rare": 2471,
    },
    "25": {
      "legendary": 3343,
      "epic": 3209,
      "rare": 2974,
    },
    "26": {
      "legendary": 4023,
      "epic": 3862,
      "rare": 3579,
    },
    "27": {
      "legendary": 4842,
      "epic": 4648,
      "rare": 4307,
    },
    "28": {
      "legendary": 5828,
      "epic": 5594,
      "rare": 5184,
    },
    "29": {
      "legendary": 7013,
      "epic": 6732,
      "rare": 6239,
    },
    "30": {
      "legendary": 8441,
      "epic": 8102,
      "rare": 7508,
    },
    "31": {
      "legendary": 10158,
      "epic": 9751,
      "rare": 9036,
    },
    "32": {
      "legendary": 11210,
      "epic": 10760,
      "rare": 9971,
    },
    "33": {
      "legendary": 12370,
      "epic": 11874,
      "rare": 11003,
    },
    "34": {
      "legendary": 13650,
      "epic": 13103,
      "rare": 12142,
    },
    "35": {
      "legendary": 15062,
      "epic": 14459,
      "rare": 13399,
    },
    "36": {
      "legendary": 16621,
      "epic": 15955,
      "rare": 14786,
    },
    "37": {
      "legendary": 17607,
      "epic": 17607,
      "rare": 16316,
    },
    "38": {
      "legendary": 20239,
      "epic": 19429,
      "rare": 18005,
    },
    "39": {
      "legendary": 22333,
      "epic": 21440,
      "rare": 19868,
    },
    "40": {
      "legendary": 24644,
      "epic": 23659,
      "rare": 21925,
    },
    "41": {
      "legendary": 27194,
      "epic": 26108,
      "rare": 24194,
    },
    "42": {
      "legendary": 31410,
      "epic": 30154,
      "rare": 27944,
    },
    "43": {
      "legendary": 36280,
      "epic": 34828,
      "rare": 32275,
    },
    "44": {
      "legendary": 41904,
      "epic": 40226,
      "rare": 37278,
    },
    "45": {
      "legendary": 48401,
      "epic": 46462,
      "rare": 43056,
    },
    "46": {
      "legendary": 55904,
      "epic": 53663,
      "rare": 49730,
    },
    "47": {
      "legendary": 64571,
      "epic": 61981,
      "rare": 57438,
    },
    "48": {
      "legendary": 74582,
      "epic": 71588,
      "rare": 66341,
    },
    "49": {
      "legendary": 86145,
      "epic": 82684,
      "rare": 76623,
    },
    "50": {
      "legendary": 99500,
      "epic": 95500,
      "rare": 88500,
    },
  },
};
const upradeMultipliers = { // eg a level 10 item will have its power multiplied by 1.1275 when becoming level 11. Might be 1 or 2 off
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
    40: 1.10, // same as above
  },
};

window.addEventListener("DOMContentLoaded", () => {
  const radioButtons = {
    $weapon: document.getElementById("weapon-switch"),
    $armor: document.getElementById("armour-switch"),
    $check: document.getElementById("check-switch"),
    $compare: document.getElementById("compare-switch"),
  };
  const itemInputs = {
    compare: {
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
    },
    check: {
      $level: document.getElementById("check-level"),
      $power: document.getElementById("check-power"),
      $rarity: document.getElementById("check-rarity"),
      $result: document.getElementById("check-result"),
    },
  };

  // On the type changed, adjust the UI accordingly to display the proper cards
  radioButtons.$check.addEventListener("change", () => {
    radioButtons.$armor.setAttribute("disabled", true);
    updateCards(true);
  });
  radioButtons.$compare.addEventListener("change", () => {
    radioButtons.$armor.removeAttribute("disabled");
    updateCards(false);
  });
  radioButtons.$weapon.addEventListener("change", () => {
    radioButtons.$check.removeAttribute("disabled");
    updateItemLevel(1);
    updateItemLevel(2);
  });
  radioButtons.$armor.addEventListener("change", () => {
    radioButtons.$check.setAttribute("disabled", true);
    updateItemLevel(1);
    updateItemLevel(2);
  });

  function updateCards(isSingle) {
    if (isSingle === true) {
      // Hide compare cards, display single card
      document.getElementById("check-container").classList.remove(
        "display-none",
      );
      document.getElementById("compare-container").classList.add(
        "display-none",
      );
    } else {
      document.getElementById("check-container").classList.add("display-none");
      document.getElementById("compare-container").classList.remove(
        "display-none",
      );
    }
  }

  // On any of the item fields changing, try update the items total power
  itemInputs.compare[1].$level.addEventListener("keyup", () => {
    updateItemLevel(1);
  });
  itemInputs.compare[1].$power.addEventListener("keyup", () => {
    console.log("yyy");
    updateItemLevel(1);
  });
  itemInputs.compare[2].$level.addEventListener("keyup", () => {
    updateItemLevel(2);
  });
  itemInputs.compare[2].$power.addEventListener("keyup", () => {
    updateItemLevel(2);
  });
  function handleSingle() {
    console.log("inside single");
    const level = itemInputs.check.$level.value;
    const power = itemInputs.check.$power.value;
    const rarity = itemInputs.check.$rarity.value.toLowerCase();
    console.log(level, power, rarity);

    //
    // VALIDATION
    //
    // If theres no bracket, eg user has only typed "1" for "19" for the level, clear item result
    if (level.toString().length === 1) {
      return false;
    }
    // If either level or power fields are empty, do nothing
    if (!level || !power || !rarity) {
      return false;
    }
    // If item level is over the cap, return false
    if (level > maxItemLevel) {
      return false;
    }

    const maxPowerForLevel =
      maxPossiblePowerForEachItemLevel.weapon[level][rarity];
    const minPowerForLevel =
      maxPossiblePowerForEachItemLevel.weapon[level - 1][rarity] + 1;
    let percentage = ((power - minPowerForLevel) * 100 /
      (maxPowerForLevel - minPowerForLevel));
    percentage = Math.ceil(percentage);
    if (percentage > 100) {
      percentage = 100;
    }

    let colour = "";
    switch (true) {
      case (percentage === 100):
        colour = "#b18300";
        break;
      case (percentage > 75):
        colour = "purple";
        break;
      case (percentage > 50):
        colour = "blue";
        break;
      case (percentage > 25):
        colour = "orange";
        break;
      default:
        colour = "red";
        break;
    }
    document.querySelector("div#check-result > div").style.width = percentage +
      "%";
    document.querySelector("div#check-result > div").style.background = colour;
  }
  itemInputs.check.$level.addEventListener("keyup", () => {
    handleSingle();
  });
  itemInputs.check.$rarity.addEventListener("change", () => {
    handleSingle();
  });
  itemInputs.check.$power.addEventListener("keyup", () => {
    handleSingle();
  });

  function getSelectedItemType() {
    const $weapon = document.getElementById("weapon-switch");
    if ($weapon.checked) {
      return "weapon";
    } else {
      return "armor";
    }
  }
  function updateItemLevel(itemNumber) {
    const itemLevel = Number(itemInputs.compare[itemNumber].$level.value);
    const itemPower = Number(itemInputs.compare[itemNumber].$power.value);

    //
    // VALIDATION
    //
    // If theres no bracket, eg user has only typed "1" for "19" for the level, clear item result
    if (itemLevel.toString().length === 1) {
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
    // for each level until the max, increase using multiplier
    while (itemLevelCounter < maxItemLevel) {
      const closestBracket = Number(
        itemLevelCounter.toString().slice(0, -1) + "0",
      ); // round to lowest 10
      const type = getSelectedItemType();
      const multiplier = upradeMultipliers[type][closestBracket];
      updatedPower = updatedPower * multiplier;
      itemLevelCounter++;
    }
    updatedPower = Math.round(updatedPower);
    document.getElementById(`item-${itemNumber}-result`).value = updatedPower;
    displayWhichItemIsStronger();
  }
  function displayWhichItemIsStronger() {
    const itemOneResult = Number(itemInputs.compare[1].$result.value);
    const itemTwoResult = Number(itemInputs.compare[2].$result.value);
    // If either fields dont have a value of some sort, then clear the highlight
    if (
      !itemOneResult || !itemTwoResult || isNaN(itemOneResult) ||
      isNaN(itemTwoResult)
    ) {
      itemInputs.double[1].$result.classList.remove(
        "highlight-good",
        "highlight-bad",
      );
      itemInputs.double[2].$result.classList.remove(
        "highlight-good",
        "highlight-bad",
      );
      return false;
    }
    if (itemOneResult === itemTwoResult) {
      itemInputs.compare[1].$result.classList.add("highlight-good");
      itemInputs.compare[2].$result.classList.remove("highlight-bad");
      itemInputs.compare[1].$result.classList.remove("highlight-bad");
      itemInputs.compare[2].$result.classList.add("highlight-good");
      return true;
    }
    if (itemOneResult > itemTwoResult) {
      itemInputs.compare[1].$result.classList.add("highlight-good");
      itemInputs.compare[2].$result.classList.add("highlight-bad");
      itemInputs.compare[1].$result.classList.remove("highlight-bad");
      itemInputs.compare[2].$result.classList.remove("highlight-good");
    } else {
      itemInputs.compare[1].$result.classList.add("highlight-bad");
      itemInputs.compare[2].$result.classList.add("highlight-good");
      itemInputs.compare[1].$result.classList.remove("highlight-good");
      itemInputs.compare[2].$result.classList.remove("highlight-bad");
    }
  }
});
