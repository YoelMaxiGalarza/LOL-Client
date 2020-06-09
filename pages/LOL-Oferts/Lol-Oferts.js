const TOTAL_SKINS = 6;
const MAX_BLUE_ESSENCE = 20000;
const MAX_RIOT_POINTS = 5000;
const MIN_DISCOUNT = 15;
const MAX_DISCOUNT = 90;
const SKIN_PRICES = [420, 750, 975, 1350, 1850, 3250];
const CHAMPIONS_DATA_URL = 'http://ddragon.leagueoflegends.com/cdn/10.6.1/data/en_US/champion.json';
const SKINS_BASE_URL = 'http://ddragon.leagueoflegends.com/cdn/img/champion/loading/';

var blueEssence = document.getElementById('blue_essence');
var riotPoints = document.getElementById('riot_points');
var skinImages = document.getElementsByClassName('img-thumbnail');
var stockPrices = document.getElementsByClassName("stockPrices");
var newPrices = document.getElementsByClassName("newPrices");
var discounts = document.getElementsByClassName("disc");

// Set random blue essence and riot points
blueEssence.innerText = getRandomNumber(1, MAX_BLUE_ESSENCE);
riotPoints.innerText = getRandomNumber(1, MAX_RIOT_POINTS);

// Set random stock prices, discounts and new prices
for (var i = 0; i < TOTAL_SKINS; i++) {
    // Set random stock price
    var randomPriceIndex = getRandomNumber(0, SKIN_PRICES.length - 1);
    stockPrices[i].textContent = SKIN_PRICES[randomPriceIndex];

    // Set random discount
    discounts[i].textContent = getRandomNumber(MIN_DISCOUNT, MAX_DISCOUNT) + "%";

    // Update new price
    var stockPrice = parseInt(stockPrices[i].textContent);
    var discSkin = parseInt(discounts[i].textContent);
    newPrices[i].textContent = getDiscountPrice(stockPrice, discSkin);
}

// Send a HTTP request to that URL and set the random skins using the response
fetch(CHAMPIONS_DATA_URL).then(response => response.json()).then(setRandomSkins);

function setRandomSkins(response) {
    // Get only the name of the campions from the response as an array
    var championNames = Object.keys(response.data);

    // Iterate over each skin image element and set a new random img src
    for (var skin of skinImages) {
        // Get a new random skin URL
        var randomSkinUrl = getRandomSkinUrl(championNames);

        // Set the new src of the actual skin
        skin.src = randomSkinUrl;
    }
}

// Get a list of champion names (string[]) and return a random skin img URL
function getRandomSkinUrl(championNames) {
    // Get a random index between 0 and the number of current champions
    var randomChampIndex = getRandomNumber(0, championNames.length - 1);

    // Get a random champion name using the random index
    var randomChampName = championNames[randomChampIndex];

    /* We use the variables that we have just defined and set up the URL of the chosen skin
    URL example: http://ddragon.leagueoflegends.com/cdn/img/champion/loading/Aatrox_1.jpg */
    return `${SKINS_BASE_URL}${randomChampName}_1.jpg`;
}

// Get random number between min and max (including both)
function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

// Function that calculates the new price of the skins in base of the discount
function getDiscountPrice(price, discount) {
    return Math.floor((price - ((parseInt(discount) * parseInt(price)) / 100)));
}

//Discounts of the skins
for (var i = 0; i < discounts.length; i++) {
    //Random stock skin's prices
    var randomSkinIndex = getRandomNumber(0, SKIN_PRICES.length -1);
    stockPrices[i].textContent = SKIN_PRICES[randomSkinIndex];
    //Random Skin's Discount
    discounts[i].textContent = getRandomNumber(MIN_DISCOUNT, MAX_DISCOUNT) + "%";
    //Changin all the stock prices, skin's discount and
    //setting the new prices calculating the stock prices and discounts
    var stockPrice = parseInt(stockPrices[i].textContent);
    var discSkin = parseInt(discounts[i].textContent);
    newPrices[i].textContent = getDiscountPrice(stockPrice, discSkin);
}