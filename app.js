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

const addCardProducts = (product, index) => {
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
    buyButton.className = 'buy-button'

    let addCartButton = document.createElement("button")
    addCartButton.className = 'cart-button'
    addCartButton.innerHTML = `<i class="fa-solid fa-cart-plus"></i>`
    addCartButton.onclick = function() {
        addToCart(`${index}`)
    }

    cardDiv.append(h3)
    cardDiv.append(image)
    cardDiv.append(price)
    cardDiv.append(buyButton)
    cardDiv.append(addCartButton)
    lista.append(cardDiv)   

    document.getElementById("root").append(lista)
}

const addCardProductsML = (product, index) => {
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

    let addCartButton = document.createElement("button")
    addCartButton.className = 'cart-button'
    addCartButton.innerHTML = `<i class="fa-solid fa-cart-plus"></i>`
    addCartButton.onclick = function() {
        addToCart(`${index}`)
    }

    div.append(h3)
    div.append(image)
    div.append(price)
    div.append(buyButton)
    div.append(addCartButton)

    document.getElementById("root").append(div)
}

const addCard = (products) => {
    products.forEach((product, index) => {
        (typeof product.id === 'number') ? addCardProducts(product, index) : addCardProductsML(product, index)
    })
}

const showProducts = async () => {
    let productsOne = await mostrarProductos()

    let productsML = await mostrarProductosML()
    let productsTwo = productsML.results

    allProducts = [ ...productsOne, ...productsTwo]
    // console.log(allProducts)
    addCard(allProducts)
}

window.addEventListener('DOMContentLoaded', showProducts)

// Adding the states

// 1. State
const cartState = {
    cart: []
}
console.log(cartState)

// 2. Template UI
const cartTemplate = () => {
    if (cartState.cart.length < 1) {
        return `<p><i class="fa-regular fa-circle-xmark"></i> Cart empty</p>`
    }

    let cartProducts = cartState.cart.map((product, index) => `<li>${product.charAt(0).toUpperCase() + product.slice(1).toLowerCase()} <button><i class="fa-solid fa-xmark"></i></button></li>`).join("")
    return cartProducts
}

// 3. Render UI
const renderCart = () => {
    let cartList = document.getElementById('cart-list')
    if (!cartList) return
    cartList.innerHTML = cartTemplate()
}

document.addEventListener('DOMContentLoaded', renderCart)

// 4. Set State
const setCarState = (obj) => {
    for (let key in obj) {
        if (cartState.hasOwnProperty(key)) {
            cartState[key] = obj[key]
        }
    }
    renderCart()
}

// 5. Get the copy of cartState
const getCartState = () => JSON.parse(JSON.stringify(cartState))

// 6. Add product to cart
const addToCart = (index) => {
    console.log(`adding cart, index: ${index}`)
}
