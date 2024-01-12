import game from '@/classes/Game'
import { reactive } from 'vue'

const allProjects = reactive([])

let project1 = {
  id: 'p1',
  title: 'projectRevTrackerTitle',
  description: 'projectRevTrackerDescription',
  price: '(500 ops)',
  isUsed: false,
  isTriggered: false,
  trigger() {
    return true
  },
  isPurchasable() {
    return game.value.operations >= 500
  },
  effect() {
    game.value.isAvgSalesAndRevUnlocked = true
    game.value.operations -= 500
  }
}
allProjects.push(project1)

let project2 = {
  id: 'p2',
  title: 'projectImprovedAutoClippersTitle',
  description: 'projectImprovedAutoClippersDescription',
  price: '(750 ops)',
  isUsed: false,
  isTriggered: false,
  trigger() {
    return game.value.autoClippers >= 1
  },
  isPurchasable() {
    return game.value.operations >= 750
  },
  effect() {
    game.value.autoClipperBoost +=0.25
    game.value.operations -= 750
  }
}
allProjects.push(project2)

let project3 = {
  id: 'p3',
  title: 'projectEvenBetterAutoClippersTitle',
  description: 'projectEvenBetterAutoClippersDescription',
  price: '(2,500 ops)',
  isUsed: false,
  isTriggered: false,
  trigger() {
    return project2.isUsed
  },
  isPurchasable() {
    return game.value.operations >= 2500
  },
  effect() {
    game.value.autoClipperBoost +=0.5
    game.value.operations -= 2500
  }
}
allProjects.push(project3)

let project4 = {
  id: 'p4',
  title: 'projectOptimizedAutoClippersTitle',
  description: 'projectOptimizedAutoClippersDescription',
  price: '(5,000 ops)',
  isUsed: false,
  isTriggered: false,
  trigger() {
    return project3.isUsed
  },
  isPurchasable() {
    return game.value.operations >= 5000
  },
  effect() {
    game.value.autoClipperBoost +=0.75
    game.value.operations -= 5000
  }
}
allProjects.push(project4)

let project5 = {
  id: 'p5',
  title: 'projectHadwigerClipDiagramsTitle',
  description: 'projectHadwigerClipDiagramsDescription',
  price: '(6,000 ops)',
  isUsed: false,
  isTriggered: false,
  trigger() {
    return project20.isUsed
  },
  isPurchasable() {
    return game.value.operations >= 6000
  },
  effect() {
    game.value.autoClipperBoost +=5
    game.value.operations -= 6000
  }
}
allProjects.push(project5)

let project6 = {
  id: 'p6',
  title: 'projectMegaClippersTitle',
  description: 'projectMegaClippersDescription',
  price: '(12,000 ops)',
  isUsed: false,
  isTriggered: false,
  trigger() {
    return game.value.autoClippers >= 75
  },
  isPurchasable() {
    return game.value.operations >= 12000
  },
  effect() {
    game.value.isMegaClipperUnlocked = true
    game.value.operations -= 12000
  }
}
allProjects.push(project6)

let project7 = {
  id: 'p7',
  title: 'projectImprovedMegaClippersTitle',
  description: 'projectImprovedMegaClippersDescription',
  price: '(14,000 ops)',
  isUsed: false,
  isTriggered: false,
  trigger() {
    return game.value.isMegaClipperUnlocked
  },
  isPurchasable() {
    return game.value.operations >= 14000
  },
  effect() {
    game.value.megaClipperBoost  +=0.25
    game.value.operations -= 14000
  }
}
allProjects.push(project7)

let project8 = {
  id: 'p8',
  title: 'projectEvenBetterMegaClippersTitle',
  description: 'projectEvenBetterMegaClippersDescription',
  price: '(17,000 ops)',
  isUsed: false,
  isTriggered: false,
  trigger() {
    return project7.isUsed
  },
  isPurchasable() {
    return game.value.operations >= 17000
  },
  effect() {
    game.value.megaClipperBoost  +=0.5
    game.value.operations -= 17000
  }
}
allProjects.push(project8)

let project9 = {
  id: 'p9',
  title: 'projectOptimizedMegaClippersTitle',
  description: 'projectOptimizedMegaClippersDescription',
  price: '(19,500 ops)',
  isUsed: false,
  isTriggered: false,
  trigger() {
    return project8.isUsed
  },
  isPurchasable() {
    return game.value.operations >= 19500
  },
  effect() {
    game.value.megaClipperBoost  +=1
    game.value.operations -= 19500
  }
}
allProjects.push(project9)

let project10 = {
  id: 'p10',
  title: 'projectImprovedWireExtrusionTitle',
  description: 'projectImprovedWireExtrusionDescription',
  price: '(1,750 ops)',
  isUsed: false,
  isTriggered: false,
  trigger() {
    return game.value.timesWirePurchased >= 1
  },
  isPurchasable() {
    return game.value.operations >= 1750
  },
  effect() {
    game.value.wireBonus  +=0.5
    game.value.operations -= 1750
  }
}
allProjects.push(project10)

let project11 = {
  id: 'p11',
  title: 'projectOptimizedWireExtrusionTitle',
  description: 'projectOptimizedWireExtrusionDescription',
  price: '(3,500 ops)',
  isUsed: false,
  isTriggered: false,
  trigger() {
    return false//se calcula con el watcher en el componente de upgrades
  },
  isPurchasable() {
    return game.value.operations >= 3500
  },
  effect() {
    game.value.wireBonus  +=0.75
    game.value.operations -= 3500
  }
}
allProjects.push(project11)

let project12 = {
  id: 'p12',
  title: 'projectWireBuyerTitle',
  description: 'projectWireBuyerDescription',
  price: '(7,000 ops)',
  isUsed: false,
  isTriggered: false,
  trigger() {
    return game.value.timesWirePurchased >= 15
  },
  isPurchasable() {
    return game.value.operations >= 7000
  },
  effect() {
    game.value.isAutoWireBuyerUnlocked  = true
    game.value.operations -= 7000
  }
}
allProjects.push(project12)

let project13 = {
  id: 'p13',
  title: 'projectMicrolatticeShapecastingTitle',
  description: 'projectMicrolatticeShapecastingDescription',
  price: '(7,500 ops)',
  isUsed: false,
  isTriggered: false,
  trigger() {
    return false//se calcula con el watcher en el componente de upgrades
  },
  isPurchasable() {
    return game.value.operations >= 7500
  },
  effect() {
    game.value.wireBonus  +=1
    game.value.operations -= 7500
  }
}
allProjects.push(project13)

let project14 = {
  id: 'p14',
  title: 'projectSpectralFrothAnnealmentTitle',
  description: 'projectSpectralFrothAnnealmentDescription',
  price: '(12,000 ops)',
  isUsed: false,
  isTriggered: false,
  trigger() {
    return false//se calcula con el watcher en el componente de upgrades
  },
  isPurchasable() {
    return game.value.operations >= 12000
  },
  effect() {
    game.value.wireBonus  +=2
    game.value.operations -= 12000
  }
}
allProjects.push(project14)

let project15 = {
  id: 'p15',
  title: 'projectQuantumFoamAnnealmentTitle',
  description: 'projectQuantumFoamAnnealmentDescription',
  price: '(15,000 ops)',
  isUsed: false,
  isTriggered: false,
  trigger() {
    return false//se calcula con el watcher en el componente de upgrades
  },
  isPurchasable() {
    return game.value.operations >= 15000
  },
  effect() {
    game.value.wireBonus  +=10
    game.value.operations -= 15000
  }
}
allProjects.push(project15)

let project16 = {
  id: 'p16',
  title: 'projectCreativityTitle',
  description: 'projectCreativityDescription',
  price: '(1000 ops)',
  isUsed: false,
  isTriggered: false,
  trigger() {
    return game.value.operations == game.value.memory * 1000
  },
  isPurchasable() {
    return game.value.operations >= 1000
  },
  effect() {
    game.value.isCreativityUnlocked  = true
    game.value.operations -= 1000
  }
}
allProjects.push(project16)

let project17 = {
  id: 'p17',
  title: 'projectIATitle',
  description: 'projectIADescription',
  price: '(10 creat)',
  isUsed: false,
  isTriggered: false,
  trigger() {
    return game.value.creativity >= 10
  },
  isPurchasable() {
    return game.value.creativity >= 10
  },
  effect() {
    game.value.researchLevel  +=1
    game.value.creativity -= 10
  }
}
allProjects.push(project17)

let project18 = {
  id: 'p18',
  title: 'projectLexicalProcessingTitle',
  description: 'projectLexicalProcessingDescription',
  price: '(50 creat)',
  isUsed: false,
  isTriggered: false,
  trigger() {
    return game.value.creativity >= 50
  },
  isPurchasable() {
    return game.value.creativity >= 50
  },
  effect() {
    game.value.researchLevel  +=1
    game.value.creativity -= 50
  }
}
allProjects.push(project18)

let project19 = {
  id: 'p19',
  title: 'projectCombinatoryHarmonicsTitle',
  description: 'projectCombinatoryHarmonicsDescription',
  price: '(100 creat)',
  isUsed: false,
  isTriggered: false,
  trigger() {
    return game.value.creativity >= 100
  },
  isPurchasable() {
    return game.value.creativity >= 100
  },
  effect() {
    game.value.researchLevel  +=1
    game.value.creativity -= 100
  }
}
allProjects.push(project19)

let project20 = {
  id: 'p20',
  title: 'projectTheHadwigerProblemTitle',
  description: 'projectTheHadwigerProblemDescription',
  price: '(150 creat)',
  isUsed: false,
  isTriggered: false,
  trigger() {
    return game.value.creativity >= 150
  },
  isPurchasable() {
    return game.value.creativity >= 150
  },
  effect() {
    game.value.researchLevel  +=1
    game.value.creativity -= 150
  }
}
allProjects.push(project20)

let project21 = {
  id: 'p21',
  title: 'projectTheTóthSausageConjectureTitle',
  description: 'projectTheTóthSausageConjectureDescription',
  price: '(200 creat)',
  isUsed: false,
  isTriggered: false,
  trigger() {
    return game.value.creativity >= 200
  },
  isPurchasable() {
    return game.value.creativity >= 200
  },
  effect() {
    game.value.researchLevel  +=1
    game.value.creativity -= 200
  }
}
allProjects.push(project21)

let project22 = {
  id: 'p22',
  title: 'projectDonkeySpaceTitle',
  description: 'projectDonkeySpaceDescription',
  price: '(250 creat)',
  isUsed: false,
  isTriggered: false,
  trigger() {
    return game.value.creativity >= 250
  },
  isPurchasable() {
    return game.value.creativity >= 250
  },
  effect() {
    game.value.researchLevel  +=1
    game.value.creativity -= 250
  }
}
allProjects.push(project22)

let project23 = {
  id: 'p23',
  title: 'projectMalePatternBaldnessTitle',
  description: 'projectMalePatternBaldnessDescription',
  price: '(20000 ops)',
  isUsed: false,
  isTriggered: false,
  trigger() {
    return game.value.operations >= 19000
  },
  isPurchasable() {
    return game.value.operations >= 20000
  },
  effect() {
    game.value.researchLevel  +=20
    game.value.operations -= 20000
  }
}
allProjects.push(project23)

let project24 = {
  id: 'p24',
  title: 'projectCureforCancerTitle',
  description: 'projectCureforCancerDescription',
  price: '(25000 ops)',
  isUsed: false,
  isTriggered: false,
  trigger() {
    return game.value.operations >= 24000
  },
  isPurchasable() {
    return game.value.operations >= 25000
  },
  effect() {
    game.value.researchLevel  +=10
    game.value.operations -= 25000
  }
}
allProjects.push(project24)

let project25 = {
  id: 'p25',
  title: 'projectNewSloganTitle',
  description: 'projectNewSloganDescription',
  price: '(25 creat, 2500 ops)',
  isUsed: false,
  isTriggered: false,
  trigger() {
    return project18.isUsed
  },
  isPurchasable() {
    return game.value.creativity >= 25 && game.value.operations >= 2500
  },
  effect() {
    game.value.demandBonus  +=0.5
    game.value.updatePublicDemand()
    game.value.creativity -= 25
    game.value.operations -= 2500
  }
}
allProjects.push(project25)

let project26 = {
  id: 'p26',
  title: 'projectCatchyJingleTitle',
  description: 'projectCatchyJingleDescription',
  price: '(45 creat, 4500 ops)',
  isUsed: false,
  isTriggered: false,
  trigger() {
    return project19.isUsed
  },
  isPurchasable() {
    return game.value.creativity >= 45 && game.value.operations >= 4500
  },
  effect() {
    game.value.demandBonus  *= 2
    game.value.updatePublicDemand()
    game.value.creativity -= 45
    game.value.operations -= 4500
  }
}
allProjects.push(project26)

let project27 = {
  id: 'p27',
  title: 'projectHypnoHarmonicsTitle',
  description: 'projectHypnoHarmonicsDescription',
  price: '(1 Nivel de investigación, 7500 ops)',
  isUsed: false,
  isTriggered: false,
  trigger() {
    return project26.isUsed
  },
  isPurchasable() {
    return game.value.researchLevel >= 1 && game.value.operations >= 7500
  },
  effect() {
    game.value.demandBonus  *= 5
    game.value.updatePublicDemand()
    game.value.researchLevel -= 1
    game.value.operations -= 7500
  }
}
allProjects.push(project27)


export default allProjects
