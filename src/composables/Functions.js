// import { toast } from "vue-sonner";
import { Game } from '@/classes/Game'
import game from '@/classes/Game'
import allProjects from '@/composables/Projects'

export default function () {
  let income = 0
  let transaction = 1
  let clipsSold = 0
  function sellClips(clipsDemanded) {
    if (game.value.unsoldInventory > 0) {
      if (clipsDemanded > game.value.unsoldInventory) {
        transaction = Math.floor(game.value.unsoldInventory * game.value.pricePerClip * 1000) / 1000
        game.value.availableFunds += transaction
        income += transaction
        clipsSold += game.value.unsoldInventory
        game.value.unsoldInventory = 0
      } else {
        transaction = Math.floor(clipsDemanded * game.value.pricePerClip * 1000) / 1000
        game.value.availableFunds =
          Math.floor((game.value.availableFunds + transaction) * 100) / 100
        income = income + transaction
        clipsSold = clipsSold + clipsDemanded
        game.value.unsoldInventory -= clipsDemanded
      }
    }
  }

  let wirePriceCounter = 0
  let wireBasePrice = 20
  let wirePriceTimer = 0
  function adjustWirePrice() {
    wirePriceTimer++

    if (wirePriceTimer > 250 && wireBasePrice > 15) {
      wireBasePrice = wireBasePrice - wireBasePrice / 1000
      wirePriceTimer = 0
    }

    if (Math.random() < 0.015) {
      wirePriceCounter++
      let wireAdjust = 6 * Math.sin(wirePriceCounter)
      game.value.wireCost = Math.ceil(wireBasePrice + wireAdjust)
    }
  }

  const formatWithCommas = function (num, decimal) {
    let hasDot = false
    let base = num.toString()
    if (base.indexOf('e+') !== -1) {
      let splittedExponentNum = base.split('e+'),
        exponent = splittedExponentNum[1],
        str = ''
      if (base.indexOf('.') !== -1) {
        base = splittedExponentNum[0].split('.')
        exponent -= base[1].length
        base = base.join('')
      }
      while (exponent--) {
        str = str + '0'
      }
      base = base + str
    }
    if (base.indexOf('.') !== -1) {
      hasDot = true
    }
    if (decimal === 0) {
      if (base.length <= 3 && !hasDot) return base
    }
    if (typeof decimal === 'undefined') {
      decimal = 0
    }
    let leftNum = hasDot ? base.substr(0, base.indexOf('.')) : base
    if (decimal === 0) {
      if (num <= 999) return leftNum
      else return leftNum.replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1,')
    }
    let dec = hasDot ? base.substr(base.indexOf('.'), decimal + 1) : '.'
    while (dec.length < decimal + 1) {
      dec += '0'
    }
    if (num <= 999) return leftNum + dec
    else return leftNum.replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1,') + dec
  }

  function autoClip(number) {
    if (game.value.wireLongitude >= 1) {
      if (number > game.value.wireLongitude) {
        number = game.value.wireLongitude
      }

      game.value.paperclips += number
      game.value.unsoldInventory += number
      game.value.wireLongitude -= number
    }
  }

  let incomeTracker = [0]
  let avgRev = 0
  let incomeThen
  let incomeNow
  let trueAvgRev
  let avrgSales
  let incomeLastSecond
  let sum
  function calculateRev() {
    incomeThen = incomeNow
    incomeNow = income
    incomeLastSecond = Math.round((incomeNow - incomeThen) * 100) / 100

    incomeTracker.push(incomeLastSecond)

    if (incomeTracker.length > 10) {
      incomeTracker.splice(0, 1)
    }

    sum = 0

    for (let i = 0; i < incomeTracker.length; i++) {
      sum = Math.round((sum + incomeTracker[i]) * 100) / 100
    }

    trueAvgRev = sum / incomeTracker.length

    let chanceOfPurchase = game.value.publicDemand / 100
    if (chanceOfPurchase > 1) {
      chanceOfPurchase = 1
    }
    if (game.value.unsoldInventory < 1) {
      chanceOfPurchase = 0
    }

    avrgSales = chanceOfPurchase * (0.7 * Math.pow(game.value.publicDemand, 1.15)) * 10
    avgRev =
      chanceOfPurchase *
      (0.7 * Math.pow(game.value.publicDemand, 1.15)) *
      game.value.pricePerClip *
      10

    if (game.value.publicDemand > game.value.unsoldInventory) {
      avgRev = trueAvgRev
      avrgSales = avgRev / game.value.pricePerClip
    }

    game.value.avgSales = avrgSales

    game.value.avgRev = avgRev
  }

  let tempOps = 0
  let opFadeTimer = 0
  let opFadeDelay = 800
  let opFade = 0
  let operations = 0
  function calculateOperations() {
    if (tempOps > 0) {
      opFadeTimer++;
    }
  
    if (opFadeTimer > opFadeDelay && tempOps > 0) {
      opFade = opFade + Math.pow(3, 3.5) / 1000;
    }
  
    if (tempOps > 0) {
      tempOps = Math.round(tempOps - opFade);
    } else {
      tempOps = 0;
    }
  
    if (tempOps + game.value.operations < game.value.memory * 1000) {
      game.value.operations = game.value.operations + tempOps;
      tempOps = 0;
    }
  
    operations = Math.floor(game.value.operations + Math.floor(tempOps));
  
    if (operations < game.value.memory * 1000) {
      var opCycle = game.value.processors / 10;
      var opBuf = game.value.memory * 1000 - operations;
  
      if (opCycle > opBuf) {
        opCycle = opBuf;
      }
  
      game.value.operations += opCycle;
    }
  
    if (game.value.operations > game.value.memory * 1000) {
      game.value.operations = game.value.memory * 1000;
    }
  }

  let fib1 = 2
  let fib2 = 3
  function calculateResearchLevel() {
    if (game.value.paperclips > game.value.nextResearchLevel - 1) {
      game.value.researchLevel += 1

      let fibNext = fib1 + fib2
      game.value.nextResearchLevel = fibNext * 1000
      fib1 = fib2
      fib2 = fibNext
    }
  }

  let creativityCounter = 0
  function calculateCreativity() {
    creativityCounter++

    let creativityThreshold = 400

    let s = game.value.universesSwitched / 10
    let ss = game.value.creativitySpeed + game.value.creativitySpeed * s

    let creativityCheck = creativityThreshold / ss

    if (creativityCounter >= creativityCheck) {
      if (creativityCheck >= 1) {
        game.value.creativity += 1
      }

      if (creativityCheck < 1) {
        game.value.creativity = game.value.creativity + ss / creativityThreshold
      }

      creativityCounter = 0
    }
  }

  let secTimer = 0
  let humanFlag = 1

  //SLOW LOOP
  const slowLoopFunction = function () {

    

    // Wire Price Fluctuation
    adjustWirePrice()
    // Sales Calculator
    if (humanFlag == 1) {
      if (Math.random() < game.value.publicDemand / 100) {
        sellClips(Math.floor(0.7 * Math.pow(game.value.publicDemand, 1.15)))
      }
      // Fire Once a Second
      if (game.value.isAvgSalesAndRevUnlocked) {
        secTimer++
        if (secTimer >= 10) {
          calculateRev()
          secTimer = 0
        }
      }
    }
  }

  let clipRateTemp = 0
  let prevClips = 0
  let clipRateTracker = 0
  // let autoClippersNoti = false
  // let megaClippersNoti = false
  // let autoWireBuyerNoti = false

  //MAIN LOOP
  const mainLoopFunction = function () {
    autoClip(game.value.autoClipperBoost * (game.value.autoClippers / 100))
    autoClip(game.value.megaClipperBoost * (game.value.megaClippers * 5))

    if (game.value.isResearchUnlocked) {
      calculateOperations()
      calculateResearchLevel()
    }
    if (game.value.isCreativityUnlocked && game.value.operations >= game.value.memory * 1000) {
      calculateCreativity()
    }

    //para el clips per second
    clipRateTracker++

    if (clipRateTracker < 100) {
      let cr = Math.floor(game.value.paperclips) - prevClips
      clipRateTemp = clipRateTemp + cr
      prevClips = Math.floor(game.value.paperclips)
    } else {
      clipRateTracker = 0
      game.value.clipsMadePerSecond = clipRateTemp
      clipRateTemp = 0
    }

    if (
      game.value.wireLongitude < 1 &&
      game.value.autoWireBuyer &&
      game.value.availableFunds >= game.value.wireCost
    ) {
      game.value.buyWire()
    }

    // if (game.value.availableFunds >= 5 && !autoClippersNoti) {
    //   autoClippersNoti = !autoClippersNoti
    //   //   toast.success("Buy some Auto Clippers!");
    // }
    // if (game.value.autoClippers == 30 && !megaClippersNoti) {
    //   megaClippersNoti = !megaClippersNoti
    //   //   toast.success("Mega Clippers Unlocked!");
    // }
    // if (game.value.paperclips >= 3000 && !autoWireBuyerNoti) {
    //   autoWireBuyerNoti = !autoWireBuyerNoti
    //   //   toast.success("Auto Wire Buyer Unlocked!");
    // }
  }

  const saveLoadFunction = function (mode) {
    if (mode === 'save') {
      localStorage.setItem('saveData', JSON.stringify(game.value))
      localStorage.setItem('saveProjects', JSON.stringify(allProjects))
    }
    if (mode === 'load') {
      const dataObject = JSON.parse(localStorage.getItem('saveData'))

      game.value = new Game(dataObject)
      const projectsObject = JSON.parse(localStorage.getItem('saveProjects'))
      allProjects.forEach((element, index) => {
        element.id = projectsObject[index].id
        element.description = projectsObject[index].description
        element.isUsed = projectsObject[index].isUsed
        element.price = projectsObject[index].price
        element.title = projectsObject[index].title
        element.isTriggered = projectsObject[index].isTriggered
      })

      // autoClippersNoti = dataObject['autoClippersNoti']
      // megaClippersNoti = dataObject['megaClippersNoti']
      // autoWireBuyerNoti = dataObject['autoWireBuyerNoti']
    }
  }
  return {
    slowLoopFunction,
    mainLoopFunction,
    formatWithCommas,
    saveLoadFunction
  }
}
