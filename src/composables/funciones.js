import { storeToRefs } from "pinia";
import { useCountersStore } from "@/stores/counters";
import { useStatesStore } from "@/stores/states";
import { toast } from "vue-sonner";

export const funciones = () => {
  const store = useCountersStore();
  const {
    paperclips,
    availableFunds,
    unsoldInventory,
    pricePerClip,
    publicDemand,
    clipsMadePerSecond,
    wireLongitude,
    wireCost,
    autoClippers,
    megaClippers,
  } = storeToRefs(store);
  const { buyWire } = store;

  const states = useStatesStore();
  const { autoWireBuyer } = storeToRefs(states);

  var income = 0;
  var transaction = 1;
  var clipsSold = 0;
  function sellClips(clipsDemanded) {
    if (unsoldInventory.value > 0) {
      // console.log(clipsDemanded);
      if (clipsDemanded > unsoldInventory.value) {
        transaction =
          Math.floor(unsoldInventory.value * pricePerClip.value * 1000) / 1000;
        availableFunds.value = availableFunds.value + transaction;
        income = income + transaction;
        clipsSold = clipsSold + unsoldInventory.value;
        unsoldInventory.value = 0;
      } else {
        transaction =
          Math.floor(clipsDemanded * pricePerClip.value * 1000) / 1000;
        availableFunds.value =
          Math.floor((availableFunds.value + transaction) * 100) / 100;
        income = income + transaction;
        clipsSold = clipsSold + clipsDemanded;
        unsoldInventory.value = unsoldInventory.value - clipsDemanded;
      }
    }
  }

  var wirePriceCounter = 0;
  var wireBasePrice = 20;
  var wirePriceTimer = 0;
  function adjustWirePrice() {
    wirePriceTimer++;

    if (wirePriceTimer > 250 && wireBasePrice > 15) {
      wireBasePrice = wireBasePrice - wireBasePrice / 1000;
      wirePriceTimer = 0;
    }

    if (Math.random() < 0.015) {
      wirePriceCounter++;
      var wireAdjust = 6 * Math.sin(wirePriceCounter);
      wireCost.value = Math.ceil(wireBasePrice + wireAdjust);
      // console.log("wire cost updated");
    }
  }

  const formatWithCommas = function (num, decimal) {
    var hasDot = false;
    var base = num.toString();
    if (base.indexOf("e+") !== -1) {
      var splittedExponentNum = base.split("e+"),
        exponent = splittedExponentNum[1],
        str = "";
      if (base.indexOf(".") !== -1) {
        base = splittedExponentNum[0].split(".");
        exponent -= base[1].length;
        base = base.join("");
      }
      while (exponent--) {
        str = str + "0";
      }
      base = base + str;
    }
    if (base.indexOf(".") !== -1) {
      hasDot = true;
    }
    if (decimal === 0) {
      if (base.length <= 3 && !hasDot) return base;
    }
    if (typeof decimal === "undefined") {
      decimal = 0;
    }
    var leftNum = hasDot ? base.substr(0, base.indexOf(".")) : base;
    if (decimal === 0) {
      if (num <= 999) return leftNum;
      else return leftNum.replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");
    }
    var dec = hasDot ? base.substr(base.indexOf("."), decimal + 1) : ".";
    while (dec.length < decimal + 1) {
      dec += "0";
    }
    if (num <= 999) return leftNum + dec;
    else return leftNum.replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,") + dec;
  };

  var incomeTracker = [0];
  var incomeThen;
  var incomeNow;
  var trueAvgRev;
  var avgSales;
  var incomeLastSecond;
  var sum;

  function autoClip(number) {
    if (wireLongitude.value >= 1) {
      if (number > wireLongitude.value) {
        number = wireLongitude.value;
      }

      paperclips.value = paperclips.value + number;
      unsoldInventory.value = unsoldInventory.value + number;
      wireLongitude.value = wireLongitude.value - number;
    }
  }

  var secTimer = 0;
  var humanFlag = 1;

  //SLOW LOOP
  const slowLoopFunction = function () {
    // console.log("slow loop");
    // Wire Price Fluctuation

    adjustWirePrice();

    // Sales Calculator

    if (humanFlag == 1) {
      if (Math.random() < publicDemand.value / 100) {
        sellClips(Math.floor(0.7 * Math.pow(publicDemand.value, 1.15)));
      }

      // Fire Once a Second

      secTimer++;
      if (secTimer >= 10) {
        // calculateRev(); //implementar con la mejora de insights para ver lo que vendes (avgSales y avgRev)
        secTimer = 0;
      }
    }

    // Auto-Save

    // saveTimer++;
    // if (saveTimer >= 250) {
    //   save();
    //   saveTimer = 0;
    // }
  };

  var clipRateTemp = 0;
  var prevClips = 0;
  var clipRateTracker = 0;
  var autoClippersNoti = false;
  var megaClippersNoti = false;
  var autoWireBuyerNoti = false;

  //MAIN LOOP
  const mainLoopFunction = function () {
    //para el clips per second
    clipRateTracker++;

    if (clipRateTracker < 100) {
      var cr = paperclips.value - prevClips;
      clipRateTemp = clipRateTemp + cr;
      prevClips = paperclips.value;
    } else {
      clipRateTracker = 0;
      clipsMadePerSecond.value = clipRateTemp;
      clipRateTemp = 0;
    }
    ////////////////////

    autoClip(1 * (autoClippers.value / 100));
    autoClip(1 * (megaClippers.value * 5));

    if (
      wireLongitude.value < 1 &&
      autoWireBuyer.value &&
      availableFunds.value >= wireCost.value
    ) {
      buyWire();
    }

    if (availableFunds.value >= 5 && !autoClippersNoti) {
      autoClippersNoti = !autoClippersNoti;
      toast.success("Buy some Auto Clippers!");
    }
    if (autoClippers.value == 30 && !megaClippersNoti) {
      megaClippersNoti = !megaClippersNoti;
      toast.success("Mega Clippers Unlocked!");
    }
    if (paperclips.value >= 3000 && !autoWireBuyerNoti) {
      autoWireBuyerNoti = !autoWireBuyerNoti;
      toast.success("Auto Wire Buyer Unlocked!");
    }
  };

  const saveLoadFunction = function (mode) {
    const data = {
      paperclips: paperclips.value,
      availableFunds: availableFunds.value,
      unsoldInventory: unsoldInventory.value,
      pricePerClip: pricePerClip.value,
      wireLongitude: wireLongitude.value,
      wireCost: wireCost.value,
      autoClippers: autoClippers.value,
      megaClippers: megaClippers.value,
      autoClippersNoti: autoClippersNoti,
      megaClippersNoti: megaClippersNoti,
      autoWireBuyerNoti: autoWireBuyerNoti,
    };
    if (mode === "save") {
      localStorage.setItem("saveData", JSON.stringify(data));
    }
    if (mode === "load") {
      const dataObject = JSON.parse(localStorage.getItem("saveData"));
      // console.log(dataObject);
      paperclips.value = parseFloat(dataObject["paperclips"]);
      availableFunds.value = parseFloat(dataObject["availableFunds"]);
      unsoldInventory.value = parseFloat(dataObject["unsoldInventory"]);
      pricePerClip.value = parseFloat(dataObject["pricePerClip"]);
      wireLongitude.value = parseFloat(dataObject["wireLongitude"]);
      autoClippers.value = parseFloat(dataObject["autoClippers"]);
      megaClippers.value = parseFloat(dataObject["megaClippers"]);
      autoClippersNoti = dataObject["autoClippersNoti"];
      megaClippersNoti = dataObject["megaClippersNoti"];
      autoWireBuyerNoti = dataObject["autoWireBuyerNoti"];
    }
  };
  return {
    slowLoopFunction,
    mainLoopFunction,
    formatWithCommas,
    saveLoadFunction,
  };
};
