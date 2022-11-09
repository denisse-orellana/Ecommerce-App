const productos = [
    {
      id: 1,
      title: 'Tablet New Model',
      price: 85,
      stock: 70,
      image: 'https://home.ripley.cl/store/Attachment/WOP/D113/2000379185788/2000379185788_2.jpg'
    },
    {
      id: 2,
      title: 'Smartphone X 22 Model',
      price: 99,
      stock: 50,
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSGpx5nmcY_IYSSfdG56PqXmZEuB51ozQnlilnMhExHol75jte47pe444eLHc_L8k6wSsI&usqp=CAU'
    }, 
    {
      id: 3,
      title: 'Laptop NewModel 22',
      price: 99,
      stock: 200,
      image: 'https://media.wired.com/photos/5fb2cc575c9914713ead03de/master/w_1920,c_limit/Gear-Apple-MacBook-Air-top-down-SOURCE-Apple.jpg'
    }, 
    {
      id: 4,
      title: 'Mouse NewModel',
      price: 15,
      stock: 600,
      image: 'https://image.shutterstock.com/image-photo/wireless-computer-mouse-isolated-on-260nw-95568295.jpg'
    }, 
    {
      id: 5,
      title: 'Printer NewModel 22',
      price: 85,
      stock: 45,
      image: 'https://i.pcmag.com/imagery/roundups/00DKaTkOIH7Z34XdzIgHtH9-8..v1569492690.jpg'
    }, 
    {
      id: 6,
      title: 'Monitor New Model',
      price: 55,
      stock: 20,
      image: 'https://m.media-amazon.com/images/I/71aAsI1QIkL._SX679_.jpg'
    }, 
    {
      id: 7,
      title: 'Audifonos Air Pod 22',
      price: 55,
      stock: 20,
      image: 'https://www.paris.cl/dw/image/v2/BCHW_PRD/on/demandware.static/-/Sites-cencosud-master-catalog/default/dw0ac91eb0/images/imagenes-productos/742/604974-0000-001.jpg?sw=320&sh=409&sm=fit'
    }, 
    {
      id: 8,
      title: 'Working Desk',
      price: 199,
      stock: 10,
      image: 'https://nypost.com/wp-content/uploads/sites/2/2021/02/Coleshome-Desk.jpg'
    }, 
    {
      id: 9,
      title: 'Working Chair',
      price: 35,
      stock: 40,
      image: 'https://m.media-amazon.com/images/I/61hUIz8wuyL.jpg'
    }, 
    {
      id: 10,
      title: 'Soporte computador Último modelo 22 Soporta peso',
      price: 30,
      stock: 50,
      image: 'https://http2.mlstatic.com/D_NQ_NP_2X_837986-MLC40695367153_022020-F.webp'
    }
  ]

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

const addCardProducts = (data) => {
    data.forEach((product, index) => {
        let lista = document.createElement("div")

        let h3 = document.createElement("h3")
        h3.innerHTML = product.title

        let cardDiv = document.createElement("div")
        cardDiv.className = "card-product"

        let image = document.createElement("img")
        image.src = product.image || product.thumbnail

        let price = document.createElement("p")
        price.innerHTML = (product.prices) ? `${product.prices.prices[0].currency_id} $${product.prices.prices[0].amount}` : `US$ ${product.price}` 

        let buyButton = document.createElement("a")
        buyButton.style.display = "inline"
        buyButton.innerHTML = 'Buy'
        if (product.prices) { buyButton.href = product.permalink }

        let addCartButton = document.createElement("button")
        addCartButton.className = 'cart-button'
        addCartButton.innerHTML = `<i class="fa-solid fa-cart-plus"></i>`
        addCartButton.onclick = function() { addToCart(`${index}`) }

        cardDiv.append(h3)
        cardDiv.append(image)
        cardDiv.append(price)
        cardDiv.append(buyButton)
        cardDiv.append(addCartButton)
        lista.append(cardDiv)   

        document.getElementById("root").append(lista)
    })
}

const showProducts = async () => {
    let productsOne = await mostrarProductos()

    let productsML = await mostrarProductosML()
    let productsTwo = productsML.results

    allProducts = [ ...productsOne, ...productsTwo]
    // console.log(allProducts)
    addCardProducts(allProducts)
}

// Adding the cart

let cart = ''
let sidebar = document.getElementById('sidebar')
let cartButton = document.querySelector('.cart')
let cartItems = document.querySelector('.cart-items')
let payButton = document.querySelector('.pay-button')

const showCard = () => {
    sidebar.style.display = "inline"
    cart = 1
}

const hideCard = () => {
    sidebar.style.display = "none"
    cart = ''
}

cartButton.addEventListener('click', () => {
    (cart) ? hideCard() : showCard()
})

// JavaScript Reactivity: Adding the states

// 1. State
const cartState = {
    cart: []
}

//  7. Remove product from the cart
let deleteProduct = (indexProduct) => {
    const prevCartState = getCartState()
    actualCartState = prevCartState.cart.filter((product, index) => index != parseInt(indexProduct))
    // console.log(actualCartState)
    setCartState({ cart: actualCartState })
}

// 2. Template UI

const cartTemplate = () => {
    if (cartState.cart.length < 1) {
        payButton.style.display = "none"
        cartItems.innerHTML = cartState.cart.length
        return `<p class="cart-empty"><i class="fa-regular fa-circle-xmark"></i> Empty</p>`
    } 

    let cartProducts = cartState.cart.map((product, indexProduct) => 
        `<li><p class="div-cart">${product.title}.</p><strong>Price: $${product.price || product.prices.prices[0].amount}</strong> <button onclick="deleteProduct(${indexProduct})" class="remove-product-button"><i class="fa-solid fa-xmark"></i></button></li>`
    ).join("")

    cartItems.innerHTML = cartState.cart.length
    payButton.style.display = "inline"
    
    return cartProducts
}

// 3. Render UI
const renderCart = () => {
    let cartList = document.getElementById('cart-list')
    if (!cartList) return
    cartList.innerHTML = cartTemplate()
}

// 4. Set State
const setCartState = (obj) => {
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
    let product = allProducts[index]

    const lastCartState = getCartState()
    lastCartState.cart.push(product)
    setCartState(lastCartState)
}

document.addEventListener('DOMContentLoaded', showProducts)
document.addEventListener('DOMContentLoaded', renderCart)