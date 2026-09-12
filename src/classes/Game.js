import { ref } from 'vue'

export class Game {
  constructor(params = null) {
    // Seguro ante saves corruptos o parciales: merge con defaults.
    const g = { ...gameparams, ...(params || {}) }
    this.paperclips = g.paperclips ?? 0
    this.availableFunds = g.availableFunds
    this.unsoldInventory = g.unsoldInventory
    this.isAvgSalesAndRevUnlocked = g.isAvgSalesAndRevUnlocked
    this.avgSales = g.avgSales
    this.avgRev = g.avgRev
    this.pricePerClip = g.pricePerClip
    this.publicDemand = g.publicDemand
    this.marketingLevel = g.marketingLevel
    this.marketingCost = g.marketingCost
    this.demandBonus = g.demandBonus
    this.universesSwitched = g.universesSwitched

    this.clipsSoldPerSecond = g.clipsSoldPerSecond
    this.clipsMadePerSecond = g.clipsMadePerSecond
    this.isAutoWireBuyerUnlocked = g.isAutoWireBuyerUnlocked
    this.wireLongitude = g.wireLongitude
    this.wireCost = g.wireCost
    this.wireBonus = g.wireBonus
    this.timesWirePurchased = g.timesWirePurchased
    this.isAutoClipperUnlocked = g.isAutoClipperUnlocked
    this.autoClippers = g.autoClippers
    this.autoClipperCost = g.autoClipperCost
    this.autoClipperBoost = g.autoClipperBoost
    this.isMegaClipperUnlocked = g.isMegaClipperUnlocked
    this.megaClippers = g.megaClippers
    this.megaClipperCost = g.megaClipperCost
    this.megaClipperBoost = g.megaClipperBoost

    this.isUpgradesCardUnlocked = g.isUpgradesCardUnlocked

    this.isResearchUnlocked = g.isResearchUnlocked
    this.researchLevel = g.researchLevel
    this.nextResearchLevel = g.nextResearchLevel
    this.processors = g.processors
    this.memory = g.memory
    this.operations = g.operations
    this.isCreativityUnlocked = g.isCreativityUnlocked
    this.creativity = g.creativity
    this.creativitySpeed = g.creativitySpeed

    this.updatePublicDemand()
  }
  addPaperclips(cantidad) {
    this.paperclips += cantidad
    this.unsoldInventory += cantidad
    this.wireLongitude -= cantidad
  }
  substractPaperclips(cantidad) {
    this.paperclips -= cantidad
  }
  lowerPricePerClip() {
    this.pricePerClip -= 0.01
    this.updatePublicDemand()
  }
  risePricePerClip() {
    this.pricePerClip += 0.01
    this.updatePublicDemand()
  }
  updatePublicDemand() {
    // Clamp: un save corrupto con price<=0 disparaba publicDemand a Infinity
    // y arrastraba clipsSoldPerSecond (NaN en la UI a 100Hz).
    if (!Number.isFinite(this.pricePerClip) || this.pricePerClip < 0.01) {
      this.pricePerClip = 0.01
    }
    this.publicDemand =
      (1 + 0.1 * this.universesSwitched) *
      Math.pow(1.1, this.marketingLevel - 1) *
      this.demandBonus *
      (0.8 / this.pricePerClip)
    this.updateClipsSoldPerSecond()
  }
  updateClipsSoldPerSecond() {
    this.clipsSoldPerSecond =
      Math.min(1, this.publicDemand / 100) * 7 * Math.pow(this.publicDemand, 1.15)
  }
  incrementMarketingLevel() {
    this.marketingLevel += 1
    this.availableFunds -= this.marketingCost
    this.updateMarketingCost()
    this.updatePublicDemand()
  }
  updateMarketingCost() {
    this.marketingCost = Math.floor(this.marketingCost * 2)
  }
  buyWire() {
    this.wireLongitude += 1000 * this.wireBonus
    this.availableFunds -= this.wireCost
    this.timesWirePurchased += 1
  }
  buyAutoClipper() {
    this.autoClippers += 1
    this.availableFunds -= this.autoClipperCost
    this.updateAutoClipperCost()
  }
  updateAutoClipperCost() {
    this.autoClipperCost = Math.pow(1.1, this.autoClippers) + 5
  }
  buyMegaClipper() {
    this.megaClippers += 1
    this.availableFunds -= this.megaClipperCost
    this.updateMegaClipperCost()
  }
  updateMegaClipperCost() {
    this.megaClipperCost = Math.pow(1.07, this.megaClippers) * 1000
  }
  toggleAutoWireBuyer() {
    this.autoWireBuyer = !this.autoWireBuyer
  }
  addResearchLevel() {
    this.researchLevel += 1
  }
  addProcessor() {
    this.processors += 1
    this.creativitySpeed =
      Math.log10(this.processors) * Math.pow(this.processors, 1.1) + this.processors - 1
  }
  addMemory() {
    this.memory += 1
  }
  applyProjectEffect(effectFunction) {
    effectFunction()
  }
}

export const gameparams = {
  paperclips: 0,
  availableFunds: 0,
  unsoldInventory: 0,
  isAvgSalesAndRevUnlocked: false,
  avgSales: 0,
  avgRev: 0,
  pricePerClip: 0.25,
  publicDemand: 0,
  demandBonus: 1,
  marketingLevel: 1,
  marketingCost: 100,
  universesSwitched: 0,

  clipsSoldPerSecond: 0,
  clipsMadePerSecond: 0,
  isAutoWireBuyerUnlocked: false,
  wireLongitude: 1000,
  wireCost: 20,
  wireBonus: 1,
  timesWirePurchased: 0,
  isAutoClipperUnlocked: false,
  autoClippers: 0,
  autoClipperCost: 5,
  autoClipperBoost: 1,
  isMegaClipperUnlocked: false,
  megaClippers: 0,
  megaClipperCost: 500,
  megaClipperBoost: 1,

  isResearchUnlocked: false,
  researchLevel: 2,
  nextResearchLevel: 3000,
  processors: 1,
  memory: 1,
  operations: 0,
  isCreativityUnlocked: false,
  creativity: 0,
  creativitySpeed: 1
}

const game = ref(new Game(gameparams))
export default game
