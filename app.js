import { productos } from "./products.js"

let url = "https://api.mercadolibre.com/sites/MLA/search"

let allProducts = []

const isOk = true

const customFetch = (time, task) => {
  return new Promise((resolve, reject) => {
      setTimeout(() => {
          if (isOk) {
              resolve(task)
          } else {
              reject("Error")
          }
      }, time)
  })
}

const mostrarProductos = async() => {
    try {
        const data = await customFetch(2000, productos)
        // console.log(data)
        return data
    } catch (error) {
        console.error(error);
    }
}

const mostrarProductosML = async() => {
    try {
        const response = await axios.get(url, {
            params: {
                q: 'tecnología'
            },
        })
        if (response.status === 200) {
            const data = response.data
            // console.log(data)
            return data
        } else if (response.status = 404) {
            console.log('The product cannot be found.')
        } else {
            console.log('Ups.. Something went wrong.')
        }
    } catch (error) {
        console.error(error)
    }
}

const addCardProducts = (product) => {
    let lista = document.createElement("div")

    let h3 = document.createElement("h3")
    h3.innerHTML = product.title

    let cardDiv = document.createElement("div")
    cardDiv.className = "card-product"

    let image = document.createElement("img")
    image.src = product.image

    let price = document.createElement("p")
    price.innerHTML = `US$ ${product.price}`

    let buyButton = document.createElement("button")
    buyButton.innerHTML = 'Buy'

    cardDiv.append(h3)
    cardDiv.append(image)
    cardDiv.append(price)
    cardDiv.append(buyButton)
    lista.append(cardDiv)   

    document.getElementById("root").append(lista)
}

const addCardProductsML = (product) => {
    let div = document.createElement("div")
    div.className = "card-product"

    let h3 = document.createElement("h3")
    h3.innerHTML = product.title

    let image = document.createElement("img")
    image.src = product.thumbnail
    image.alt = product.title

    let price = document.createElement("p")
    price.innerHTML = `${product.prices.prices[0].currency_id} $${product.prices.prices[0].amount}`

    let buyButton = document.createElement("a")
    buyButton.style.display = "inline"
    buyButton.innerHTML = 'Buy'
    buyButton.href = product.permalink

    div.append(h3)
    div.append(image)
    div.append(price)
    div.append(buyButton)
    document.getElementById("root").append(div)
}

const addCard = (products) => {
    products.forEach(product => {
        (typeof product.id === 'number') ? addCardProducts(product) : addCardProductsML(product)
    })
}

const showProducts = async () => {
    let productsOne = await mostrarProductos()

    let productsML = await mostrarProductosML()
    let productsTwo = productsML.results

    allProducts = [ ...productsOne, ...productsTwo]
    console.log(allProducts)
    addCard(allProducts)
}

window.addEventListener('load', showProducts)

// Adding the states

// 1. State
const carState = {
    carList: []
}

// 2. Template UI
const carTemplate = () => {
    if (carState.carList.length < 1) {
        return `<p>Car empty</p>`
    }
}

