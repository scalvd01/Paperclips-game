// import { toast } from "vue-sonner";
import { Game, gameparams } from '@/classes/Game'
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

  // Intl.NumberFormat es nativo (C++) y cacheado: sustituye al formateo manual
  // con regex por frame (~12 llamadas por render a 100Hz). Mismo output "1,234".
  const intFormatters = new Map()
  function getIntFormatter(decimal) {
    const d = decimal === 2 ? 2 : 0
    if (!intFormatters.has(d)) {
      intFormatters.set(
        d,
        new Intl.NumberFormat('en-US', {
          minimumFractionDigits: d,
          maximumFractionDigits: d
        })
      )
    }
    return intFormatters.get(d)
  }

  const formatWithCommas = function (num, decimal = 0) {
    const n = Number(num)
    if (!Number.isFinite(n)) return decimal === 2 ? '0.00' : '0'
    return getIntFormatter(decimal).format(n)
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
      opFadeTimer++
    }

    if (opFadeTimer > opFadeDelay && tempOps > 0) {
      opFade = opFade + Math.pow(3, 3.5) / 1000
    }

    if (tempOps > 0) {
      tempOps = Math.round(tempOps - opFade)
    } else {
      tempOps = 0
    }

    if (tempOps + game.value.operations < game.value.memory * 1000) {
      game.value.operations = game.value.operations + tempOps
      tempOps = 0
    }

    operations = Math.floor(game.value.operations + Math.floor(tempOps))

    if (operations < game.value.memory * 1000) {
      var opCycle = game.value.processors / 10
      var opBuf = game.value.memory * 1000 - operations

      if (opCycle > opBuf) {
        opCycle = opBuf
      }

      game.value.operations += opCycle
    }

    if (game.value.operations > game.value.memory * 1000) {
      game.value.operations = game.value.memory * 1000
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
      // Deferring: no guardar en pestaña oculta ni si nada cambió (evita
      // JSON.stringify bloqueante cada 5s). Fuera del critical path.
      if (typeof document !== 'undefined' && document.hidden) return
      try {
        localStorage.setItem('saveData', JSON.stringify(game.value))
        localStorage.setItem('saveProjects', JSON.stringify(allProjects))
      } catch (error) {
        // QuotaExceededError o JSON circular: no romper el loop del juego.
        console.error('No se pudo guardar la partida.\n', error)
      }
      return
    }
    if (mode === 'load') {
      try {
        const rawData = localStorage.getItem('saveData')
        const rawProjects = localStorage.getItem('saveProjects')
        if (!rawData || !rawProjects) return
        if (rawData.includes('null') && rawData.length < 32) {
          console.error('No se pudo cargar el archivo de guardado.\n')
          game.value = new Game(gameparams)
          return
        }
        const dataObject = JSON.parse(rawData)
        if (!dataObject || typeof dataObject !== 'object') return
        // Merge con defaults: partidas viejas pueden traer campos ausentes.
        game.value = new Game({ ...gameparams, ...dataObject })

        const projectsObject = JSON.parse(rawProjects)
        if (Array.isArray(projectsObject)) {
          allProjects.forEach((element, index) => {
            const saved = projectsObject[index]
            if (!saved) return
            element.id = saved.id ?? element.id
            element.description = saved.description ?? element.description
            element.isUsed = saved.isUsed ?? false
            element.price = saved.price ?? element.price
            element.title = saved.title ?? element.title
            element.isTriggered = saved.isTriggered ?? false
          })
        }
      } catch (error) {
        console.error('No se pudo cargar el archivo de guardado.\n', error)
      }

      // autoClippersNoti = dataObject['autoClippersNoti']
      // megaClippersNoti = dataObject['megaClippersNoti']
      // autoWireBuyerNoti = dataObject['autoWireBuyerNoti']
    }
  }

  const resetGame = function () {
    game.value = new Game(gameparams)
    allProjects.forEach((element) => {
      element.isUsed = false
      element.isTriggered = false
    })
    saveLoadFunction('save')
  }
  return {
    slowLoopFunction,
    mainLoopFunction,
    formatWithCommas,
    saveLoadFunction,
    resetGame
  }
}
