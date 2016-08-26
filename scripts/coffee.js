document.addEventListener("DOMContentLoaded", function() {
    var coffeeMachine = {
        recipies: [
            {
                name: "current",
                customizable: false,
                size: "small",
                ingredients: [
                    {name: "milk", selected: false, percentage: 0},
                    {name: "chocolate", selected: false, percentage: 0},
                    {name: "cocoa", selected: false, percentage: 0},
                    {name: "cognac", selected: false, percentage: 0}
                ]
            },
            {
                name: "espresso",
                customizable: false,
                size: "small",
                ingredients: [
                    {name: "milk", selected: false, percentage: 0},
                    {name: "chocolate", selected: false, percentage: 0},
                    {name: "cocoa", selected: false, percentage: 0},
                    {name: "cognac", selected: false, percentage: 0}
                ]
            }, {
                name: "late",
                customizable: false,
                size: "large",
                ingredients: [
                    {name: "milk", selected: true, percentage: 20},
                    {name: "chocolate", selected: false, percentage: 10},
                    {name: "cocoa", selected: false, percentage: 10},
                    {name: "cognac", selected: false, percentage: 0}
                ]
            }, {
                name: "coffee",
                customizable: false,
                size: "middle",
                ingredients: [
                    {name: "milk", selected: false, percentage: 0},
                    {name: "chocolate", selected: false, percentage: 0},
                    {name: "cocoa", selected: false, percentage: 0},
                    {name: "cognac", selected: false, percentage: 0}
                ]
            }, {
                name: "macciato",
                customizable: false,
                size: "middle",
                ingredients: [
                    {name: "milk", selected: true, percentage: 10},
                    {name: "chocolate", selected: true, percentage: 5},
                    {name: "cocoa", selected: true, percentage: 10},
                    {name: "cognac", selected: false, percentage: 0}
                ]
            }, {
                name: "hard",
                customizable: false,
                size: "middle",
                ingredients: [
                    {name: "milk", selected: false, percentage: 0},
                    {name: "chocolate", selected: false, percentage: 0},
                    {name: "cocoa", selected: false, percentage: 0},
                    {name: "cognac", selected: true, percentage: 10}
                ]
            },
            {
                name: "custom1",
                customizable: true,
                size: "middle",
                ingredients: [
                    {name: "milk", selected: true, percentage: 0},
                    {name: "chocolate", selected: true, percentage: 0},
                    {name: "cocoa", selected: true, percentage:0 },
                    {name: "cognac", selected: true, percentage: 0}
                ]
            },
            {
                name: "custom2",
                customizable: true,
                size: "middle",
                ingredients: [
                    {name: "milk", selected: true, percentage: 0},
                    {name: "chocolate", selected: true, percentage: 0},
                    {name: "cocoa", selected: true, percentage: 0},
                    {name: "cognac", selected: true, percentage: 0}
                ]
            }],

        schedule: [
            {
                id: 1,
                enabled: false,
                recipeName: "late"
               // time: format of time?
            },
            {
                id: 2,
                enabled: false,
                recipeName: "espresso"
               // time:
            },
            {
                id: 3,
                enabled: false,
                recipeName: "macciato"
               // time:
            },
            {
                id: 4,
                enabled: false,
                recipeName: "hard"
                // time:
            },
            {
                id: 4,
                enabled: false,
                recipeName: "coffee"
               // time:
            },
            {
                id: 5,
                enabled: false,
                recipeName: "custom1"
                // time:
            },
            {
                id: 6,
                enabled: false,
                recipeName: "custom2"
                // time:
            }
        ],
        switchCurrentRecipie: function (recipeName) {
            var i = 0;
            while (this.recipies[i].name != recipeName) {
                i++;
            }
            this.recipies[0].size = this.recipies[i].size;
            for (var j = 0; j < this.recipies[0].ingredients.length; j++) {
                this.recipies[0].ingredients[j].selected = this.recipies[i].ingredients[j].selected;
                this.recipies[0].ingredients[j].percentage = this.recipies[i].ingredients[j].percentage;
            }
        },
        saveCustomRecipe: function (recipeName) {
            var i = 0;
            while (this.recipies[i].name != recipeName) {
                i++;
            }
            this.recipies[i].size = this.recipies[0].size;
            for (var j = 0; j < this.recipies[0].ingredients.length; j++) {
                this.recipies[i].ingredients[j].selected = this.recipies[0].ingredients[j].selected;
                this.recipies[i].ingredients[j].percentage = this.recipies[0].ingredients[j].percentage;
            }
        },
        updateCurrentRecipeSize: function (recipeSize) {
            this.recipies[0].size = recipeSize;
        },
        updateCurrentRecipeIngredientState: function (ingredientIndex) {
            this.recipies[0].ingredients[ingredientIndex].selected = !this.recipies[0].ingredients[ingredientIndex].selected;
            if(this.recipies[0].ingredients[ingredientIndex].selected){
                this.recipies[0].ingredients[ingredientIndex].percentage = 5;
            }else {
                this.recipies[0].ingredients[ingredientIndex].percentage = 0;
            }
        },
        updateCurrentRecipeIngredientPercentage: function (ingredientIndex,ingredientPercentage) {
            this.recipies[0].ingredients[ingredientIndex].percentage= ingredientPercentage;
        }
        
    };

    //View
    var coffeeMachineView = {
        selectRecipe: document.getElementById("custom"),//select
        buttonSaveRecipe: document.getElementById("save_recipe"),
        ingredientsButtonsArr: [
            document.getElementById("component-milk"), document.getElementById("component-chocolate"),
            document.getElementById("component-cocoa"), document.getElementById("component-cognac")
        ],
        rangeArray: [
            document.getElementById("milk"), document.getElementById("chocolate"),
            document.getElementById("cocoa"), document.getElementById("cognac")
        ],
        labelArray: [
            document.getElementById("label-milk-percentage"), document.getElementById("label-chocolate-percentage"),
            document.getElementById("label-cocoa-percentage"), document.getElementById("label-cognac-percentage")
        ],
        buttonSmall: document.getElementById("small"),
        buttonMiddle: document.getElementById("middle"),
        buttonLarge: document.getElementById("large"),
        depictCoffeeMachineMenu: function (coffeeMachineObject) {
            if (coffeeMachineObject.recipies[0].customizable) {
                this.buttonSaveRecipe.classList.add("button_active");
            } else {
                this.buttonSaveRecipe.disabled = false;
            }
            for (var i = 0; i < coffeeMachineObject.recipies[0].ingredients.length; i++) {
                if (coffeeMachineObject.recipies[0].ingredients[i].selected) {
                    this.ingredientsButtonsArr[i].classList.add("button_active");
                    this.rangeArray[i].disabled = false;
                } else {
                    this.ingredientsButtonsArr[i].classList.remove("button_active");
                    this.rangeArray[i].disabled = true;
                }
                this.rangeArray[i].value = coffeeMachineObject.recipies[0].ingredients[i].percentage;
                this.labelArray[i].innerHTML = coffeeMachineObject.recipies[0].ingredients[i].percentage + "%";
            }
            if (coffeeMachineObject.recipies[0].size === "small") {
                this.buttonSmall.classList.add("button_active");
                this.buttonMiddle.classList.remove("button_active");
                this.buttonLarge.classList.remove("button_active");
            } else if (coffeeMachineObject.recipies[0].size === "middle") {
                this.buttonMiddle.classList.add("button_active");
                this.buttonSmall.classList.remove("button_active");
                this.buttonLarge.classList.remove("button_active");
            } else {
                this.buttonLarge.classList.add("button_active");
                this.buttonSmall.classList.remove("button_active");
                this.buttonMiddle.classList.remove("button_active");
            }
        }
    };

    coffeeMachineView.depictCoffeeMachineMenu(coffeeMachine);
    
    
    //Controllers

    coffeeMachineView.selectRecipe.onchange = function () {
        coffeeMachine.switchCurrentRecipie(coffeeMachineView.selectRecipe.value);
        coffeeMachineView.depictCoffeeMachineMenu(coffeeMachine);
    };
    var makeCoffee = document.getElementById("make-coffee");
    makeCoffee.onclick = function () {
        makeCoffee.classList.add("button_active");
        makeCoffee.textContent="Making coffee";
        setTimeout(function() {
            makeCoffee.textContent="Make coffee";
            makeCoffee.classList.remove("button_active");
        }, 5000);
    };
    document.getElementById('execute').onclick = function (event) {
        if(event.target.tagName == 'BUTTON') {
            coffeeMachine.updateCurrentRecipeSize(event.target.value);
            coffeeMachineView.depictCoffeeMachineMenu(coffeeMachine);
        }     
    };
    coffeeMachineView.ingredientsButtonsArr[0].onclick = function () {
        coffeeMachine.updateCurrentRecipeIngredientState(0);
        coffeeMachineView.depictCoffeeMachineMenu(coffeeMachine);
    };
    coffeeMachineView.ingredientsButtonsArr[1].onclick = function () {
        coffeeMachine.updateCurrentRecipeIngredientState(1);
        coffeeMachineView.depictCoffeeMachineMenu(coffeeMachine);
    };
    coffeeMachineView.ingredientsButtonsArr[2].onclick = function () {
        coffeeMachine.updateCurrentRecipeIngredientState(2);
        coffeeMachineView.depictCoffeeMachineMenu(coffeeMachine);
    };
    coffeeMachineView.ingredientsButtonsArr[3].onclick = function () {
        coffeeMachine.updateCurrentRecipeIngredientState(3);
        coffeeMachineView.depictCoffeeMachineMenu(coffeeMachine);
    };
    coffeeMachineView.rangeArray[0].onchange = function () {
        coffeeMachine.updateCurrentRecipeIngredientPercentage(0,coffeeMachineView.rangeArray[0].value);
        coffeeMachineView.depictCoffeeMachineMenu(coffeeMachine);
    };
    coffeeMachineView.rangeArray[1].onchange = function () {
        coffeeMachine.updateCurrentRecipeIngredientPercentage(1,coffeeMachineView.rangeArray[1].value);
        coffeeMachineView.depictCoffeeMachineMenu(coffeeMachine);
    };
    coffeeMachineView.rangeArray[2].onchange = function () {
        coffeeMachine.updateCurrentRecipeIngredientPercentage(2,coffeeMachineView.rangeArray[2].value);
        coffeeMachineView.depictCoffeeMachineMenu(coffeeMachine);
    };
    coffeeMachineView.rangeArray[3].onchange = function () {
        coffeeMachine.updateCurrentRecipeIngredientPercentage(3,coffeeMachineView.rangeArray[3].value);
        coffeeMachineView.depictCoffeeMachineMenu(coffeeMachine);
    };
    coffeeMachineView.buttonSaveRecipe.onclick = function () {
        coffeeMachine.saveCustomRecipe(coffeeMachineView.selectRecipe.value);
        coffeeMachineView.depictCoffeeMachineMenu(coffeeMachine);
    };
})
//var scheduleView ={}




        




