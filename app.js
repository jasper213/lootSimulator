const roll = document.getElementById("reroll");

const resetItem = document.getElementById("resetItem");

const resetRoll = document.getElementById("rollReset");

const resetTotalSum = document.getElementById("resetTotalSum");

const loot = document.getElementById("loot");

const goldSum = document.getElementById("goldSum");

const history = document.getElementById("history");

const rollCount = document.getElementById("roll");

const storedItems = localStorage.getItem("duplicate")

const storedLoot = localStorage.getItem("storedLoot")

const storedGoldSum = localStorage.getItem("storedGold")

const storedTotalGold = localStorage.getItem("storedGoldAll")

const storedRolls = localStorage.getItem("rollsCount")

if(storedItems){
history.innerHTML =  storedItems;
totalSum.innerHTML = "Sum of all the items: " + storedTotalGold;
goldSum.innerHTML = "Sum of the gold you got: " +  storedGoldSum;
rollCount.innerHTML = "Rolls amounth: " + storedRolls;
loot.innerHTML = storedLoot;
};

let lootTable = 
[
{ loot:"Bones",          gold: 40,   chance: 1100 },
{ loot:"Tuna potatoes",  gold: 20,   chance: 850  },
{ loot:"Coal",           gold: 15,   chance: 600  },
{ loot:"Silver",         gold: 45,   chance: 350  },
{ loot:"Raw shark",      gold: 5,    chance: 250  },
{ loot:"Potion",         gold: 30,   chance: 150  },
{ loot:"Awakener's orb", gold: 350,  chance: 20   },
{ loot:"Virtus hat",     gold: 500,  chance: 12    },
{ loot:"Virtus top",     gold: 750,  chance: 5    },
{ loot:"Virtus bottom",  gold: 1000, chance: 1    }
];

let numberOfRolls = 0;
let sumOfAll = 0;
let duplicateAmounth = {};

roll.addEventListener("click", function(){

let randomDrop = [];
let randomGold = [];

let randomRolls = Math.floor(Math.random() * 3) + 1;
for(let i = 0; i < randomRolls; i++){
    let randomLoot = getLoot();

randomDrop.push(randomLoot.loot);
randomGold.push(randomLoot.gold);  
}

randomDrop.forEach((count) => {
duplicateAmounth[count] = (duplicateAmounth[count] || 0) + 1;
});

let sumOfItems = 0;
randomGold.forEach( gold => {
sumOfItems += gold;
sumOfAll += gold;
})


itemHistory = []
for(let property in duplicateAmounth){

itemHistory += property + ": " + duplicateAmounth[property] + "<br>";
}

localStorage.setItem("storedGold",sumOfItems);

localStorage.setItem("storedGoldAll",sumOfAll);

localStorage.setItem("duplicate",itemHistory);

localStorage.setItem("rollsCount",numberOfRolls)

localStorage.setItem("storedLoot", randomDrop)

totalSum.innerHTML = "Sum of  all the items: " + sumOfAll;

history.innerHTML = itemHistory

loot.innerHTML = randomDrop;

goldSum.innerHTML = "Sum of the gold you got: " + sumOfItems;

numberOfRolls++

rollCount.innerHTML = "Rolls amounth: " + numberOfRolls;


});
resetItem.addEventListener("click", function(){ 

for(let property in duplicateAmounth){
delete duplicateAmounth[property]
}
history.innerHTML = "";
loot.innerHTML = "";
goldSum.innerHTML = "Sum of the gold you got: 0" ;
});


resetTotalSum.addEventListener("click", function(){
sumOfAll -= sumOfAll;
history.innerHTML = "";
loot.innerHTML = "";
goldSum.innerHTML = "Sum of the gold you got: 0" ;
totalSum.innerHTML = "Sum of all the items: 0" 
localStorage.removeItem("storedGoldAll")

});


resetRoll.addEventListener("click", function(){
numberOfRolls -= numberOfRolls;
rollCount.innerHTML = "Rolls amounth: 0";
history.innerHTML = "";
loot.innerHTML = "";
goldSum.innerHTML = "Sum of the gold you got: 0" ;
localStorage.removeItem("rollsCount")
});

function getLoot(){
let totalChance = 0;
for(let i = 0; i < lootTable.length; i++){
  totalChance += lootTable[i].chance
  
}
  rand = (Math.random() * totalChance);



for(let i = 0; i < lootTable.length; i++){
  let loot = lootTable[i];
  let gold = lootTable[i];
  if(rand < loot.chance)
  {
    return {
      loot:loot.loot, 
      gold:gold.gold
    }

  }
  rand -= loot.chance
}

}









































