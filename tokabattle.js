const readline = require('readline')

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})

const tokamens = {
  tikawika: new Tokamen("Tikawika", 100, "electric", null, {thunderbolt: "thunderbolt", tackle: "tackle"}),
  burnbabyburn: new Tokamen("Burnbabyburn", 100, "fire", null, {ember: "ember", tackle: "tackle"}),
  watercannon: new Tokamen("Watercannon", 100, "water", null, {ember: "watergun", tackle: "tackle"}),
}

function Tokamen(name, health, type1, type2, attacks){
  this.name = name
  this.health = health
  this.type1 = type1
  this.type2 = type2
  this.attacks = attacks

  this.allTokamenAttacks = {
    thunderbolt: {damage: 15, hitrate: .8, type: "electric"},
    ember: {damage: 15, hitrate: .8, type: "fire"},
    watergun: {damage: 15, hitrate: .8, type: "water"},
    tackle: {damage: 9, hitrate: .98, type: "normal"},
  }

  this.calculateDamage = function (baseAttack, hitrate){
    const generatedForHitRate = Math.random()
    if(generatedForHitRate > hitrate) return 0;
    const damage = Math.round(Math.random() * (baseAttack-5) + 5) 
    return damage 
  }

  this.attackTokamen = function (attackedTokamen, attackName){
    let damage = this.calculateDamage(this.allTokamenAttacks[attackName].damage, this.allTokamenAttacks[attackName].hitrate)
    effectivenessMutliplier = this.calculateTypeMultiplier(this.allTokamenAttacks[attackName].type, attackedTokamen.type1)
    damage = damage * effectivenessMutliplier
    if(effectivenessMutliplier > 1) console.log('OMG! This is a super effective attack!')
    attackedTokamen.health = attackedTokamen.health - damage
  }

  this.calculateTypeMultiplier = function(typeAttack, typeAttackedTokamen){
    const effectiveMap = {water: "fire" electric: "water"}
    for(effectiveElement of Object.keys(effectiveMap)){ //water, electric
      if(typeAttack === effectiveElement && typeAttackedTokamen === effectiveMap[effectiveElement]){ 
        return 1.5
      }
    }
    return 1
  }
  
}

function battle(tokamen1, tokamen2){

  checkGameOver(tokamen1, tokamen2)
  rl.question(`please choose an attack for ${tokamen1.name}, you can choose: ${Object.keys(tokamen1.attacks)}\n`, function(userInputLine){
    if(userInputLine in tokamen1.attacks){
      resolveattacks(tokamen1, tokamen2, userInputLine)

      //When a correct user input is given we need to make the program loop by invoking the same function as before
      battle(p1, p2)
    }
    else {
      console.log(`You typed ${userInputLine}, which is not a valid attack. Try again\n`)

      //When a wrong user input is given we need to make the program loop by invoking the same function as before, but without doing the actual battle
      battle(p1, p2)
    }
  })
}

function checkGameOver(tokamen1, tokamen2){
  if(tokamen.health < 1){
      console.log(tokamen2.name + " wins!\n")
      rl.close()
      process.exit()
    }
    if(tokamen2.health < 1){
      console.log(tokamen1.name + " wins!\n")
      rl.close()
      process.exit()
    }
}

function resolveAttacks(tokamen1, tokamen2, userInputLine){
  tokamen1.attackTokamen(tokamen2, tokamen1.attacks['userInputLine'])
  console.log(`${tokamen1.name} uses ${userInputLine}!`)
  tokamen2.attackTokamen(tokamen1, tokamen2.attacks["tackle"])
  console.log(`${tokamen2.name} uses tackle!`)
  console.log(`${tokamen1.name}: ${tokamen1.health} hp ----- ${tokamen2.name}: ${tokamen2.health} hp`)
}

//This starts the program and sets the tokamens
let p1 = tokamens.tikawika
let p2 = tokamens.watercannon
battle(p1, p2)