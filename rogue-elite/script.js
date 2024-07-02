var characterClasses = [
    {
      name:"knight",
      maxHp: 120,
      hp: 120,
      shield: 0,
      armor: 0,
      hitbox: 1,
      vievRange: 3,
      dmg: 18, 
      crit: 0,
      exp: 0,
      lvl: 1,
      gold: 0,
      talent: {
        effect: function(){
            playerStats.crit += 20;
        },
        description: "Your critical chance is increased by 20%",
      },
      perk:[
        {
            effect: function(){
                playerStats.armor += 1
            },
            name: "Thick Skin",
            description: "Your armor is increased by 1"
        },

        {
            effect: function(){
                playerStats.levelUp.hp += 10
            },
            name: "Dungeon Dweller",
            description: "You get 10 more max HP each level"
        }
      ],
      startOfFight: [],
      everyThird: [],
      levelUp: 
        { 
            dmg: 2,
            hp: 5,
            crit: 1,
            shield:0,
            armor:0,
            skill: [
                {   name: "Apex",
                    description: function(){ return "Upgrades your talent. Your critical hit chance is increased by additional 7%"},
                    effect: function(){
                        playerStats.crit += 7
                    },
                    
                },

                {   
                    name: "Swordplay 1",
                    description: function(){return "Increases damage by 1"},
                    effect: function(){
                        playerStats.dmg += 1
                    },
                    upg: function(){
                        
                        playerStats.levelUp.skill.push(
                            { 
                                name: "Swordplay 2",
                                description: function(){return "Increases damage by 2"},
                                effect: function(){
                                    playerStats.dmg += 2
                                },
                                upg: function(){

                                    playerStats.levelUp.skill.push(
                                        { 
                                            name: "Swordplay 3",
                                            description: function(){return "Increases damage by 3"},
                                            effect: function(){
                                                playerStats.dmg += 3
                                            },
                                            
                                        }
                                    )
                                    
                                }
                            }
                        )
                    }
                    
                },
                {   name: "Rest",
                    description: function(){return "Recover 30 health points"},
                    effect: function(){
                        playerStats.hp += 30
                        playerStats.hp > playerStats.maxHp ? playerStats.hp = playerStats.maxHp : null
                    },
                    
                },

                {   name: "Bulldozer",
                    description: function(){return `Get one time bonus damage increase, 2% of your maximum health (${this.value()} damage)`},
                    effect: function(){
                       playerStats.dmg += Math.round(playerStats.maxHp * 0.02)
                    },
                    value: function(){return Math.round(playerStats.maxHp * 0.02)}

                    
                },
                { name: "Ram",
                    description: function(){return `At the start of a fight deal 8% of your max health to enemy`},
                    effect: function(){
                        
                            playerStats.startOfFight.push({

                                name: "Ram",
                                dmg: function(){return Math.round(playerStats.maxHp * 0.08)},
                                heal: function(){return 0},
                                shield: function(){return 0},
                                tag: function(){
                                    return `<li>You Ram your enemy, dealing <span class='list-item-dmg'>${this.dmg()} damage</span></li>`;
                                },
                            }) 
                        
                    },
                    

                },

            ],

        },
      
    },

    {
      name:"mage",
      maxHp: 80,
      hp: 80,
      shield: 0,
      armor: 0,
      hitbox: 1,
      vievRange: 3,
      dmg: 5, 
      crit: 0,
      exp: 0,
      lvl: 1,
      gold: 0,
      talent: {
        effect: function(){
            playerStats.startOfFight.push({
                name: "Fireball",
                dmg:  function(){return 20},
                heal:  function(){return 0},
                shield:  function(){return 0},
                tag: function(){
                    return `<li>You blast your enemy with Fireball for <span class='list-item-dmg'>${this.dmg()} damage</span></li>`;
                },
            },)
        },
        description: "At the start of a fight, you cast a fireball, dealing 20 damage to enemy"
      },
      perk: [
        {
            effect: function(){
                playerStats.startOfFight.push({
                    name: "Magic Shield",
                    dmg:  function(){return 0},
                    heal:  function(){return 0},
                    shield:  function(){return 17},
                    tag: function(){
                        return `<li>You cast Magic Shield protecting you for <span class='list-item-shield'>${this.shield()} damage</span></li>`;
                    },
                    
                    
                }
        )
            },
            name: "Magic Shield",
            description: "You start each fight with magic shield, preventing up to 20 dmg",
        },
        {
            effect: function(){
                let randomItem = items[1].pop()
                randomItem.effect()
                combatLog.innerHTML = combatLog.innerHTML + `<li>item received: <span class='list-item-lvl'>${randomItem.name}</span></li>`
                itemsBar.innerHTML = itemsBar.innerHTML += `<div class = 'items-bar-item' style='background-image:url("${randomItem.icon}")'
                                                             name ='${randomItem.name}' onmouseover = 'showDescription(this)' onmouseout = 'hideDescription(this)'> </div>
                                                             
                                                             <div class = 'items-bar-item-description' id = '${randomItem.name}'>
                                                             <div class = 'items-bar-name'>${randomItem.name}</div>
                                                             <div class = 'items-bar-description'> ${randomItem.description}</div>
                                                             </div>`
            },
            name: "Astral Conjuration",
            description: "Get random level 2 item",
        }

      ],
      startOfFight: [],
      everyThird: [],
      levelUp: 
        { 
            dmg: 1,
            hp: 3,
            crit: 0,
            shield:0,
            armor:0,
            skill: [
                {   
                    name: "Apex",
                    description: function(){ return `Upgrades your talent. Your Fireball deals 20 additional damage`},
                    effect: function(){
                        playerStats.startOfFight[0].dmg = function(){return 40}
                        
                    },
                    
                },

                {   
                    name: "Ice Shards",
                    description: function(){ return "Every third attack, you cast an Ice Shard, dealing 15 damage"},
                    effect: function(){
                        playerStats.everyThird.push( {
                            name: "Ice Shards",
                            dmg:  function(){return 15},
                            heal:  function(){return 0},
                            shield:  function(){return 0},
                            tag: function(){
                                return `<li>Ice Shard deals <span class='list-item-dmg'>${this.dmg()} damage</span></li>`;
                            },
                            
                        },
                )
                    },
                    
                },
                {   
                    name: "Insight",
                    description: function(){ return `Increases exp gained by 10%`},
                    effect: function(){

                        enemyArray.map((x) =>{
                            x.exp = Math.round(x.exp * 1.10)
                        })
                        
                    },
                    upg: function(){
                        
                        playerStats.levelUp.skill.push(
                            { 
                                name: "Insight 2",
                                description: function(){ return `Increases exp gained by 15%`},
                                effect: function(){
                                    enemyArray.map((x) =>{
                                        x.exp = Math.round(x.exp * 1.10)
                                    })
                                },
                                upg: function(){

                                    playerStats.levelUp.skill.push(
                                        { 
                                            name: "Insight 3",
                                            description: function(){ return `Increases exp gained by 20%`},
                                            effect: function(){
                                                enemyArray.map((x) =>{
                                                    x.exp = Math.round(x.exp * 1.10)
                                                })
                                            },
                                            
                                        }
                                    )
                                    
                                }
                            }
                        )
                    }
                    
                },

            ],

        },
      

      },

       {
      name:"paladin",
      maxHp: 100,
      hp: 100,
      shield: 0,
      armor: 0,
      hitbox: 1,
      vievRange: 3,
      dmg: 7, 
      crit: 5,
      exp: 0,
      lvl: 1,
      gold: 0,
      talent: {
        effect: function(){
            playerStats.startOfFight.push({
                name: "Holy Light",
                dmg:  function(){return 0},
                heal:  function(){return 10},
                shield:  function(){return 0},
                tag: function(){
                    return `<li>You cast holy light and recover <span class='list-item-heal'>${this.heal()} health</span></li>`;
                },
                
            },)
        },
        description: "At the start of a fight, you heal 10 health"
      },
      perk:[
        {
            effect: function(){
                playerStats.everyThird.push( {
                    name: "Smite",
                    dmg:  function(){return 8},
                    heal:  function(){return 3},
                    shield:  function(){return 0},
                    tag: function(){
                        return `<li>You smite your enemy dealing <span class='list-item-dmg'>${this.dmg()} damage</span> and heal yourself for <span class='list-item-heal'>${this.heal()} health</span></li>`;
                    },
                    
                },
        )
            },
            name: "Holy Smite",
            description: "Every third attack you smite your enemy dealing 8 damage and healing yourself for 3 health",
        },
        {
            effect: function(){
                playerStats.levelUp.crit += 3
            },
            name: "Crusade",
            description: "Each level, you receive 3% critical chance increase",

        },

      ],
      startOfFight: [],
      everyThird: [], 
      levelUp:
        { 
            dmg: 2,
            hp: 3,
            crit: 1,
            shield:0,
            armor:0,
            skill: [

            ],

        },
      

      }
      
]

var playerStats = []

var checkForLvlUp = []

var enemyArray = [
    {
    name: "skeleton",
    tier: 0,
    hitbox: 1,
    hp: 50,
    dmg: 7,
    exp: 30,
    evade: 0,
    lifesteal: 0,
    item: 50,

    },

    {
    name:"ghost",
    tier: 0,
    hitbox: 1,
    hp: 35,
    dmg: 5,
    exp: 35,
    evade: 40,
    lifesteal: 0,
    item: 50,

    },
    {
    name:"bat",
    tier: 0,
    hitbox: 1,
    hp: 25,
    dmg: 4,
    exp: 25,
    evade: 0,
    lifesteal: 50,
    item: 50,
    
        },
        {
    name:"ninja",
    tier: 0,
    hitbox: 1,
    hp: 40,
    dmg: 5,
    exp: 40,
    evade: 15,
    lifesteal: 15,
    item: 50,
    
        },
         {
    name:"dragon",
    tier: 1,
    hitbox: 2,
    hp: 100,
    dmg: 12,
    exp: 140,
    evade: 0,
    lifesteal: 0,
    item: 50,
    
        }
    
]

var items = [
  [  
    {
        name: "Gorgon's Shield",
        description: "Grants 8 shield",
        icon: "shield.png",
        effect : function(){
            playerStats.shield += 10
        },
    },
    {
        name: "Brass Helmet",
        description: "Grants 1 armor",
        icon: "brass-helmet.png",
        effect : function(){
            playerStats.armor += 1
        },
    },
    {
        name: "Bottled Flame",
        description: "Deals 4 damage to enemy at the start of a fight",
        icon: "bottle.png",
        effect : function(){
            playerStats.startOfFight.push(
                {
                    name: "Bottled Flame",
                    dmg:  function(){return 4},
                    heal:  function(){return 0},
                    shield:  function(){return 0},
                    tag: function(){
                        return `<li>You throw a flaming bottle at the enemy, dealing <span class='list-item-dmg'>${this.dmg()} damage</span></li>`;
                    },
                },
            )
                
            
        },
    },


],
[
    {
        name: "Sword of Might",
        description: "Increases damage by 5",
        icon: "sword-of-might.png",
        effect : function(){
            playerStats.dmg += 5
        },
    },

    {
        name: "Pointy Dagger",
        description: "Increases critical chance by 8%",
        icon: "pointy-dagger.png",
        effect : function(){
            playerStats.crit += 8
        },
    },
]
]

for (let i = 0 ; i < items.length; i++)
    {
        items[i] = items[i].sort((x,y)=> Math.random() - .5)
    }



var enemyStats = {} 

var main = document.getElementById("main")

var screen = document.getElementById("screen")

var itemsBar = document.getElementById("items-bar")

var combatLog = document.getElementById("combat-log")

var combatLogArr = []

var statsBarPlayerClass = document.getElementById("player-class")

var statsBarPlayerShield = document.getElementById("player-shield")

var statsBarPlayerArmor = document.getElementById("player-armor")

var statsBarPlayerLvl = document.getElementById("player-lvl")

var statsBarPlayerExp = document.getElementById("player-exp")

var statsBarPlayerDmg = document.getElementById("player-dmg")

var statsBarPlayerCrit = document.getElementById("player-crit")

var lvlUpScreen = document.getElementById("lvl-up-screen")

var playerHP = document.getElementById("hp-bar-player-nums")

var playerHealthBar = document.getElementById("hp-bar-player-value")

var playerShieldBarAura = document.getElementById("shield-bar")

var playerShieldBar = document.getElementById("shield-bar-player")

var enemyHP = document.getElementById("hp-bar-enemy-nums")

var enemyHealthBarValue = document.getElementById("hp-bar-enemy-value")

var enemyHealthBar = document.getElementById("hp-bar-enemy")

var intro = document.getElementById("intro")

var combatScreen = document.getElementById("combat-screen")

var combatScreenEnemy = document.getElementById("combat-screen-enemy")

var disableMove = true

function resolveTimer() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve('resolved');
      },700);
    });
  }

 
function charSelect(x){
   var getId = x.getAttribute("id")
   
   playerStats = characterClasses[getId]

   playerStats.talent.effect()

   for (let j = 0; j < playerStats.perk.length; j++){

    
    lvlUpScreen.innerHTML = lvlUpScreen.innerHTML +
    `<div class = 'lvl-up-screen-item' onclick = "chosePerk(this)" perkOption = "${j}" '>
      <div class = 'lvl-up-screen-item-name'>${playerStats.perk[j].name}</div>
      <div class = 'lvl-up-screen-item-description'>${playerStats.perk[j].description}</div>
     </div>`

   }
   
    playerStats.levelUp.skill = playerStats.levelUp.skill.sort((x,y)=> Math.random() - .5)
   

   document.documentElement.style.setProperty('--charClass', `url("${characterClasses[getId].name}.png")` );
    
   function updateHp(){

    playerStats.hp <= 0 ? playerStats.hp = 0 : null

    playerHP.textContent = playerStats.hp + "/" + playerStats.maxHp

    playerHealthBar.style.width = `${playerStats.hp / (playerStats.maxHp / 100)}%`

    }

   function updateEnemyHp(){

    enemyStats.hp <= 0 ? enemyStats.hp = 0 : null;
    
    enemyHP.textContent = enemyStats.hp + "/" + enemyStats.maxHp

    enemyHealthBarValue.style.width = `${enemyStats.hp / (enemyStats.maxHp / 100)}%`
   }

   

updateUi()



function getLvl(){

    var currentLevel = playerStats.lvl
    
    playerStats.lvl = lvlUpArray.filter((x) => x < playerStats.exp).length    
        
    if (currentLevel < playerStats.lvl ) {

       var lvlDiff = playerStats.lvl - currentLevel
       
       for (let i = 0; i < lvlDiff; i++)
        {   
            playerStats.maxHp += playerStats.levelUp.hp

            playerStats.hp += playerStats.levelUp.hp

            playerStats.dmg += playerStats.levelUp.dmg

            playerStats.crit += playerStats.levelUp.crit

            playerStats.shield += playerStats.levelUp.shield

            playerStats.armor += playerStats.levelUp.armor

            checkForLvlUp.push(currentLevel)

           

            }
            
        
            if ( lvlUpScreen.textContent == "")
                {
                    for (let j = 0; j < playerStats.levelUp.skill.length; j++)
                    {
                        var getSkill = playerStats.levelUp.skill[j]
                        
                        lvlUpScreen.innerHTML = lvlUpScreen.innerHTML + 
                        `<div class = 'lvl-up-screen-item' onclick = "chosePerk(this)" skillOption = "${j}" '>
                        <div class = 'lvl-up-screen-item-name'>${getSkill.name}</div>
                        <div class = 'lvl-up-screen-item-description'>${getSkill.description()}</div>
                       </div>`
                        
                       if (j == 1) {
                        break
                       }
                    }
                    
                    let removeOneLvl = checkForLvlUp.shift()
                }
               

           
            
           combatLog.innerHTML = `<li class='list-item-lvl'>You have gained level ${playerStats.lvl}</li>` + combatLog.innerHTML
        
            updateUi()

           
    }

   
}

getLvl()

 

for (var i = 0; i < 90; i++){

    for (var j = 0; j < 90; j++){

        var boxItem = document.createElement("div")

        boxItem.setAttribute("id", j + "-" + i)

        boxItem.classList.add("boxItem")

        screen.appendChild(boxItem)
    }

}


var player = document.getElementById("44-44")

player.classList.add("player")

player.style.opacity="1"

while (enemyLocationArray.length){

    var enemyId = enemyLocationArray.shift()

    var enemy = document.getElementById(enemyId)

    enemy.classList.add("enemy")

    let randomNum = Math.floor(Math.random() * enemyArray.length)

    var createEnemy = enemyArray[randomNum]
    
    enemy.setAttribute("enemyType",createEnemy.name)

    for (let i = 0; i < neighbourArr[createEnemy.hitbox].length; i++){


        var enemyIDX = enemyId.slice(0, enemyId.indexOf("-"))

        var enemyIDY = enemyId.slice(enemyId.indexOf("-") +1)

        var neighbourCheckEnemy = (Number(enemyIDX) + neighbourArr[createEnemy.hitbox][i][1]) + "-" + (Number(enemyIDY) + neighbourArr[createEnemy.hitbox][i][0])

        var neighbourEnemy = document.getElementById(neighbourCheckEnemy)

        neighbourEnemy.classList.add("enemyArea")

        neighbourEnemy.setAttribute("parent", enemyId)

        
    }

}

for (let i = 0; i < neighbourArr[playerStats.hitbox].length; i++){

    var playerIDX = player.id.slice(0, player.id.indexOf("-"))

    var playerIDY = player.id.slice(player.id.indexOf("-") +1)

    var neighbourCheck = (Number(playerIDX) + neighbourArr[playerStats.hitbox][i][1]) + "-" + (Number(playerIDY) + neighbourArr[playerStats.hitbox][i][0])

    var neighbour = document.getElementById(neighbourCheck)

    neighbour.classList.add("playerArea")

    if (neighbour.classList.contains("enemyArea"))

        {var playerGetsIntoAgro = neighbour.getAttribute("parent")}

}

for (let i = 0; i < neighbourArr[playerStats.vievRange].length; i++){

    var playerIDX = player.id.slice(0, player.id.indexOf("-"))

    var playerIDY = player.id.slice(player.id.indexOf("-") +1)

    var neighbourCheck = (Number(playerIDX) + neighbourArr[playerStats.vievRange][i][0]) + "-" + (Number(playerIDY) + neighbourArr[playerStats.vievRange][i][1])

    

    if (document.getElementById(neighbourCheck)){

        

        var neighbour = document.getElementById(neighbourCheck)

        neighbour.classList.add("visualArea")

        

        if (neighbour.classList.contains("enemyArea"))

            {var playerGetsIntoVisual = neighbour.getAttribute("parent")

                var getEnemyVisual = document.getElementById(playerGetsIntoVisual)

                getEnemyVisual.classList.add(getEnemyVisual.getAttribute("enemytype"))

                getEnemyVisual.classList.add("visualArea")

                getEnemyVisual.style.opacity="1"

                var discoveredEnemyArea = document.querySelectorAll(`[parent="${playerGetsIntoVisual}"]`)

                discoveredEnemyArea.forEach((element)=>{

                    element.classList.add("visualArea")

                })

            }

           neighbour.style.opacity = "0"

    }
    
}

document.body.addEventListener('keydown', async function (event) {

    const key = event.key;

    var location = player.id

    if (!disableMove){

        switch (key) {

            case "a":
               var getCoords = Number(location.slice(0, location.indexOf("-"))) - 1
               var newCoords = getCoords + "-" + location.slice(location.indexOf("-") +1)
               var newCoords2 = (getCoords - 1 )+ "-" + location.slice(location.indexOf("-") +1)
                break;

            case "d":
                var getCoords = Number(location.slice(0, location.indexOf("-"))) + 1
                var newCoords = getCoords + "-" + location.slice(location.indexOf("-") +1)
                var newCoords2 = (getCoords +1) + "-" + location.slice(location.indexOf("-") +1)
                break;

            case "w":
                var getCoords = Number(location.slice(location.indexOf("-") +1)) - 1
                var newCoords = location.slice(0, location.indexOf("-")) + "-" + getCoords  
                var newCoords2 = location.slice(0, location.indexOf("-")) + "-" + (getCoords -1) 
                break;

            case "s":
                var getCoords = Number(location.slice(location.indexOf("-") +1)) + 1
                var newCoords = location.slice(0, location.indexOf("-")) + "-" + getCoords  
                var newCoords2 = location.slice(0, location.indexOf("-")) + "-" + (getCoords +1)
                break;
        }
    } 
    


    if (document.getElementById(newCoords2)){

       

        player.classList.remove("player")

        player = document.getElementById(newCoords)

        player.classList.add("player")

       

        var playerArea = document.querySelectorAll(".playerArea")

        playerArea.forEach(( playerAreaBox )=>{

            playerAreaBox.classList.remove("playerArea")

        })



        var visualArea = document.querySelectorAll(".visualArea")

        visualArea.forEach(( visualAreaBox )=>{

            

           if (!visualAreaBox.classList.contains("enemyArea")) 

            {visualAreaBox.style.opacity = "0.55"}

        })

        
        
        player.style.opacity = "1"


        for (let i = 0; i < neighbourArr[playerStats.hitbox].length; i++){

            var playerIDX = player.id.slice(0, player.id.indexOf("-"))

            var playerIDY = player.id.slice(player.id.indexOf("-") +1)

            var neighbourCheck = (Number(playerIDX) + neighbourArr[playerStats.hitbox][i][1]) + "-" + (Number(playerIDY) + neighbourArr[playerStats.hitbox][i][0])

            var neighbour = document.getElementById(neighbourCheck)

            neighbour.classList.add("playerArea")

            if (neighbour.classList.contains("enemyArea"))

                {var playerGetsIntoAgro = neighbour.getAttribute("parent")}

        }

        for (let i = 0; i < neighbourArr[playerStats.vievRange].length; i++){

            var playerIDX = player.id.slice(0, player.id.indexOf("-"))

            var playerIDY = player.id.slice(player.id.indexOf("-") +1)

            var neighbourCheck = (Number(playerIDX) + neighbourArr[playerStats.vievRange][i][0]) + "-" + (Number(playerIDY) + neighbourArr[playerStats.vievRange][i][1])

            

            if (document.getElementById(neighbourCheck)){

                

                var neighbour = document.getElementById(neighbourCheck)

                neighbour.classList.add("visualArea")

                

                if (neighbour.classList.contains("enemyArea"))

                    {var playerGetsIntoVisual = neighbour.getAttribute("parent")

                        var getEnemyVisual = document.getElementById(playerGetsIntoVisual)

                        getEnemyVisual.classList.add(getEnemyVisual.getAttribute("enemytype"))

                        getEnemyVisual.classList.add("visualArea")

                        getEnemyVisual.style.opacity="1"

                        var discoveredEnemyArea = document.querySelectorAll(`[parent="${playerGetsIntoVisual}"]`)

                        discoveredEnemyArea.forEach((element)=>{

                            element.classList.add("visualArea")

                        })

                    }

                   neighbour.style.opacity = "0"

            }
            
        }
        
    }
    
    if (playerGetsIntoAgro){

        disableMove = true
        
        var getEnemyId = document.getElementById(playerGetsIntoAgro)

        var getEnemyType = getEnemyId.getAttribute("enemytype")

        var loadEnemy = enemyArray.find(x => x.name == getEnemyType)

        document.documentElement.style.setProperty('--enemyType', `url("${getEnemyType}.png")` );

        combatScreenEnemy.style.visibility="visible"

        enemyHealthBar.style.visibility="visible"
        
        
        var playerCombatShield = playerStats.shield

        var maxShieldArr = []

        var checkForStartOfFight = true

        var checkForEveryThird = 0

        var playerCombatDmg = playerStats.dmg

        var playerCombatCrit = playerStats.crit

        var playerCombatArmor = playerStats.armor
        
        var playerCombatExp = playerStats.exp
        var playerCombatLvl = playerStats.lvl
        var playerCombatEveryThird = playerStats.everyThird


        enemyStats.hp = loadEnemy.hp

        enemyStats.maxHp = loadEnemy.hp

        enemyStats.dmg = loadEnemy.dmg

        enemyStats.exp = loadEnemy.exp

        enemyStats.evade = loadEnemy.evade

        enemyStats.lifesteal = loadEnemy.lifesteal

        enemyStats.exp = loadEnemy.exp

        enemyStats.item = loadEnemy.item

        enemyStats.tier = loadEnemy.tier



        updateEnemyHp()

        updateHp()

        combatLogArr = []

        var enemyDmgAfterArmor = enemyStats.dmg - playerCombatArmor

        enemyDmgAfterArmor < 0 ? enemyDmgAfterArmor = 0 : null
        
        while (playerStats.hp > 0 && enemyStats.hp > 0 ){
            
            checkForEveryThird++
            
            if ( checkForStartOfFight ) {
                for (let i = 0; i < playerStats.startOfFight.length; i++)
                    {   
                        playerCombatShield = playerCombatShield + playerStats.startOfFight[i].shield()

                        playerStats.hp = playerStats.hp + playerStats.startOfFight[i].heal()

                        playerStats.hp > playerStats.maxHp ? playerStats.hp = playerStats.maxHp : null
                        
                        enemyStats.hp =  enemyStats.hp - playerStats.startOfFight[i].dmg()
                       
                        combatLogArr.push({

                            logMsg:  playerStats.startOfFight[i].tag(),

                            playerHp: playerStats.hp,

                            playerShield: playerCombatShield,

                            playerExp : "",
                            
                            enemyHp: enemyStats.hp
                          }  
                        )
                    }

                   

                checkForStartOfFight = false 

                
            }

             maxShieldArr.push(playerCombatShield)

             if (checkForEveryThird % 3 == 0){

                for (let i = 0; i < playerStats.everyThird.length; i++)
                    {
                        playerCombatShield = playerCombatShield + playerStats.everyThird[i].shield()

                        playerStats.hp = playerStats.hp + playerStats.everyThird[i].heal()

                        playerStats.hp > playerStats.maxHp ? playerStats.hp = playerStats.maxHp : null
                        
                        enemyStats.hp =  enemyStats.hp - playerStats.everyThird[i].dmg()
                       
                        combatLogArr.push({

                            logMsg:  playerStats.everyThird[i].tag(),

                            playerHp: playerStats.hp,

                            playerShield: playerCombatShield,

                            playerExp : "",
                            
                            enemyHp: enemyStats.hp
                          }  
                        )     
                    

                }
             }
            

            if (enemyStats.hp > 0){

                var evadeCheck = Math.floor(Math.random() * 100)

                evadeCheck < enemyStats.evade ? combatLogArr.push({

                    logMsg:"<li>You <span class='list-item-miss'>missed</span> the attack</li>",

                    playerHp: playerStats.hp,

                    playerShield: playerCombatShield,

                    playerExp : "",
                    
                    enemyHp: enemyStats.hp

                }) : null
    
                if (evadeCheck >=  enemyStats.evade){
                    
                    let critCheck = Math.floor(Math.random() * 100)

                    if (critCheck < playerCombatCrit){

                        enemyStats.hp = enemyStats.hp - playerCombatDmg
                        
                        combatLogArr.push({

                            logMsg:`<li>You crit for <span class='list-item-dmg'>${playerCombatDmg *2} damage</span></li>`,

                            playerHp: playerStats.hp,

                            playerShield: playerCombatShield,

                            playerExp : "",
                            
                            enemyHp: enemyStats.hp

                        
                        })
                
                        }
                     enemyStats.hp = enemyStats.hp - playerCombatDmg

                     critCheck < playerCombatCrit ? "" : combatLogArr.push({

                        logMsg:`<li>You have dealt <span class='list-item-dmg'> ${playerCombatDmg} damage</span> </li>`,

                        playerHp: playerStats.hp,

                        playerShield: playerCombatShield,

                        playerExp : "",
                        
                        enemyHp: enemyStats.hp
                    })
                }
            }

           
            if (enemyStats.hp <= 0 ) {
                
                playerStats.exp += enemyStats.exp

                combatLogArr.push({

                    logMsg:`<li>Enemy defeated, gained  <span class='list-item-lvl'>${enemyStats.exp} exp</span></li>`,

                    playerHp: playerStats.hp,

                    playerShield: playerCombatShield,

                    playerExp : enemyStats.exp,
                    
                    enemyHp: enemyStats.hp,

                })

                if ( (Math.floor(Math.random() * 100)) < enemyStats.item)
                    {    
                        
                        
                        var randomItemGenerator =  items[enemyStats.tier].pop()

                        combatLogArr.push({

                            logMsg:`<li>Item received: <span class='list-item-lvl'>${randomItemGenerator.name}</span></li>`,
        
                            playerHp: playerStats.hp,
        
                            playerShield: playerCombatShield,
        
                            playerExp : enemyStats.exp,
                            
                            enemyHp: enemyStats.hp,
        
                        })
                        
                       
                        }

                    
                
                 break
                       }


            if (playerCombatShield > 0){

                playerCombatShield = playerCombatShield - enemyStats.dmg

                var checkForShieldBreak = 0

                var shieldBreakDmg = 0

                if (playerCombatShield < 0)  
                    
                    {   
                        shieldBreakDmg = playerCombatShield + playerCombatArmor

                        shieldBreakDmg > 0 ? shieldBreakDmg = 0 : null
                        
                        playerStats.hp = playerStats.hp + shieldBreakDmg

                        checkForShieldBreak = Math.abs(playerCombatShield)
                    } 
                
                combatLogArr.push({

                    logMsg: `<li>Enemy deals <span class='list-item-shield'> ${enemyStats.dmg - checkForShieldBreak} damage</span> to your shield and 
                     <span class='list-item-dmg'>${ Math.abs( shieldBreakDmg ) } damage </span> to your health</li>`,

                     playerHp: playerStats.hp,

                     playerShield: playerCombatShield,

                     playerExp : "",
                     
                     enemyHp: enemyStats.hp

                
                })

                
            } 
                       

           else {

            playerStats.hp = playerStats.hp - enemyDmgAfterArmor

            var enemyLifestole = Math.ceil(enemyDmgAfterArmor * (enemyStats.lifesteal / 100))

            enemyStats.hp += enemyLifestole

            enemyStats.lifesteal > 0 ? combatLogArr.push({

                logMsg:`<li>Enemy deals <span class='list-item-dmg'> ${enemyDmgAfterArmor} damage</span> to you and recovers 
                <span class='list-item-heal'>${enemyLifestole} HP</span> from lifesteal</li>`,

                playerHp: playerStats.hp,

                playerShield: playerCombatShield,

                playerExp : "",
                
                enemyHp: enemyStats.hp
            
            }) 



            : combatLogArr.push({

                logMsg:`<li>Enemy deals <span class='list-item-dmg'> ${enemyDmgAfterArmor} damage</span> to you</li>`,

                playerHp: playerStats.hp,

                playerShield: playerCombatShield,

                playerExp : "",
                
                enemyHp: enemyStats.hp
            
                })

            
        }
            
            if (playerStats.hp <= 0) {

               

                combatLogArr.push({

                    logMsg: `You Died`,

                    playerHp: playerStats.hp,

                    playerShield: playerCombatShield,

                    playerExp : "",
                    
                    enemyHp: enemyStats.hp
                })
                     

                break

                      }
       
                   
        }
       

              for (let i = 0; i < combatLogArr.length; i++) {

               
                   
                var delay = await resolveTimer()

                   

                 var combatListItem = combatLogArr[i]

                 combatLog.innerHTML = combatListItem.logMsg + combatLog.innerHTML

                 playerStats.hp = combatListItem.playerHp

                 playerCombatShield = combatListItem.playerShield

                 enemyStats.hp = combatListItem.enemyHp


                 playerStats.hp <= 0 ? playerStats.hp = 0 : null


                 playerHP.textContent = playerStats.hp + "/" + playerStats.maxHp

                 playerHealthBar.style.width = `${playerStats.hp / (playerStats.maxHp / 100)}%`

                 playerCombatShield < 0 ? playerCombatShield = 0 : null

                 if (playerCombatShield > 0) {
 
                     playerShieldBarAura.style.scale = 1
 
                    }
 
                 playerShieldBar.style.width = `${playerCombatShield / (playerStats.maxHp /100)}%`
 
              
 
                 playerShieldBarAura.style.opacity = `${(playerCombatShield / (maxShieldArr[0]/100)) * 0.5}%`

            

            

            updateEnemyHp()

                   
       
    }
   
        if (randomItemGenerator){

           itemsBar.innerHTML = itemsBar.innerHTML += `<div class = 'items-bar-item' style='background-image:url("${randomItemGenerator.icon}")'
                                                             name ='${randomItemGenerator.name}' onmouseover = 'showDescription(this)' onmouseout = 'hideDescription(this)'> </div>
                                                             
                                                             <div class = 'items-bar-item-description' id = '${randomItemGenerator.name}'>
                                                             <div class = 'items-bar-name'>${randomItemGenerator.name}</div>
                                                             <div class = 'items-bar-description'> ${randomItemGenerator.description}</div>
                                                             </div>`

            randomItemGenerator.effect()

        }
        
        
        playerShieldBarAura.style.scale = "0"

        playerShieldBar.style.width = 0

        if (enemyStats.hp <= 0) {

            updateUi()

            getLvl()

            updateHp()

            getEnemyId.setAttribute("class", "boxItem")
            
            getEnemyId.style.opacity="0"

            var areaRemove = document.querySelectorAll(`[parent="${playerGetsIntoAgro}"]`)

            areaRemove.forEach((item)=>{

                item.setAttribute("class", "boxItem")

                item.removeAttribute("parent")
            })
            getEnemyId.removeAttribute("enemytype")

            setTimeout(function(){

                combatScreenEnemy.style.visibility="hidden"

            enemyHealthBar.style.visibility="hidden"

            },2000)
        }

        
        
        disableMove = false
    }


});

main.style.display = "block"

intro.style.display = "none"

}

function chosePerk(x){

    x.style.backgroundColor = "green"

    disableMove = false
    
    if (playerStats.perk.length > 0) 
        {
            playerStats.perk[x.getAttribute("perkOption")].effect()

            playerStats.perk = []
            
            }

     else 
     {     
            var receiveSkill = playerStats.levelUp.skill[x.getAttribute("skillOption")]

            receiveSkill.effect()

            playerStats.levelUp.skill = playerStats.levelUp.skill.filter(a => a.name != receiveSkill.name )

            if ( receiveSkill.upg){
                receiveSkill.upg()
            }
            
            playerStats.levelUp.skill =  playerStats.levelUp.skill.sort((x,y)=> Math.random() - .5)

           

     }   

    updateUi()

    setTimeout(function(){

         lvlUpScreen.innerHTML = ""

       if (checkForLvlUp.length > 0) {

        for (let j = 0; j < playerStats.levelUp.skill.length; j++)
            {
                var getSkill = playerStats.levelUp.skill[j]
                
                lvlUpScreen.innerHTML = lvlUpScreen.innerHTML + 
                `<div class = 'lvl-up-screen-item' onclick = "chosePerk(this)" skillOption = "${j}" '>
                <div class = 'lvl-up-screen-item-name'>${getSkill.name}</div>
                <div class = 'lvl-up-screen-item-description'>${getSkill.description()}</div>
                </div>`

            }

            let removeOneLvl = checkForLvlUp.shift()
       }


    },  500)
    
    
   }

 function showDescription(x){

    var getDescriptionName = x.getAttribute("name")

    var revealDescription = document.getElementById(getDescriptionName)

    revealDescription.style.width = "unset"

 }  

 function hideDescription(x){

    var getDescriptionName = x.getAttribute("name")

    var revealDescription = document.getElementById(getDescriptionName)

    revealDescription.style.width = "0"

 } 

function updateHp(){

  playerStats.hp <= 0 ? playerStats.hp = 0 : null

  playerHP.textContent = playerStats.hp + "/" + playerStats.maxHp

  playerHealthBar.style.width = `${playerStats.hp / (playerStats.maxHp / 100)}%`

    }   

function updateUi(){

    updateHp()

    statsBarPlayerClass.textContent = "Class: " + playerStats.name.toUpperCase()

    statsBarPlayerExp.textContent = "Exp: " + playerStats.exp

    statsBarPlayerLvl.textContent = "Level: " + playerStats.lvl

    statsBarPlayerDmg.textContent = "Damage: " + playerStats.dmg

    statsBarPlayerCrit.textContent = "Crit chance: " + playerStats.crit +"%"

    statsBarPlayerShield.textContent = "Shield: " + playerStats.shield 

    statsBarPlayerArmor.textContent = "Armor: " + playerStats.armor
    
    }

var neighbourArr = [
    [],

    [[-1,-1],[0,-1],[1,-1],[-1,0],[1,0],[-1,1],[0,1],[1,1]],

    [[-1,-2],[0,-2],[1,-2],[-2,-1],[-1,-1],[0,-1],[1,-1],[2,-1],[-2,0],[-1,0],[1,0],[2,0],[-2,1],[-1,1],[0,1],[1,1],[2,1],
    [-1,2],[0,2],[1,2]           
    ],

    [[-1,-4],[0,-4],[1,-4],[-2,-3],[-1,-3],[0,-3],[1,-3],[2,-3],[-3,-2],[-2,-2],[-1,-2],[0,-2],[1,-2],[2,-2],[3,-2],
    [-4,-1],[-3,-1],[-2,-1],[-1,-1],[0,-1],[1,-1],[2,-1],[3,-1],[4,-1],[-4,0],[-3,0],[-2,0],[-1,0],[1,0],[2,0],[3,0],[4,0],
    [-4,1],[-3,1],[-2,1],[-1,1],[0,1],[1,1],[2,1],[3,1],[4,1],[-3,2],[-2,2],[-1,2],[0,2],[1,2],[2,2],[3,2],
     [-2,3],[-1,3],[0,3],[1,3],[2,3],[-1,4],[0,4],[1,4]]
]

var enemyLocationArray = [ "17-17","79-36","74-55", "56-77", "8-30", "15-60", "60-15", "35-82", "40-40","49-49","55-60" ]

var lvlUpArray = [45,75,120,200,300,500]