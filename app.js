import { productos } from "./products.js"

let elMostrarBtn = document.getElementById('mostrarBtn')
let mercadoLibreButton = document.getElementById('mercadoLibreButton')
let url = "https://api.mercadolibre.com/sites/MLA/search"

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


// ---------------------------  Then Promise ---------------------------- //
// const mostrarProductos = () => {
//   customFetch(2000, productos).then(
//       data => {
//           let lista = document.createElement("div")
//           for (let i=0; i<data.length; i++) {
//               let h3 = document.createElement("h3")
//               h3.innerHTML = data[i].title

//               let cardDiv = document.createElement("div")
//               cardDiv.className = "card-product"

//               let image = document.createElement("img")
//               image.src = data[i].image

//               let price = document.createElement("p")
//               price.innerHTML = `US$ ${data[i].price}`

//               let buyButton = document.createElement("button")
//               buyButton.innerHTML = 'Buy'

//               cardDiv.append(h3)
//               cardDiv.append(image)
//               cardDiv.append(price)
//               cardDiv.append(buyButton)
//               lista.append(cardDiv)
//           }
//           document.getElementById("root").append(lista)
//       }
//   )
// }
// ---------------------------  Then Promise ---------------------------- //



// ---------------------------  Async Await Promise --------------------- //
const mostrarProductos = async() => {
    try {
        const data = await customFetch(2000, productos)
        // console.log(data)
        getCard(data)
        return data
    } catch (error) {
        console.error(error);
    }
}

const getCard = (data) => {
    let lista = document.createElement("div")
    for (let i=0; i<data.length; i++) {
        let h3 = document.createElement("h3")
        h3.innerHTML = data[i].title

        let cardDiv = document.createElement("div")
        cardDiv.className = "card-product"

        let image = document.createElement("img")
        image.src = data[i].image

        let price = document.createElement("p")
        price.innerHTML = `US$ ${data[i].price}`

        let buyButton = document.createElement("button")
        buyButton.innerHTML = 'Buy'

        cardDiv.append(h3)
        cardDiv.append(image)
        cardDiv.append(price)
        cardDiv.append(buyButton)
        lista.append(cardDiv)   
    }
    document.getElementById("root").append(lista)

    elMostrarBtn.style.display = "none"
    mercadoLibreButton.style.display = "none"
    backBtn.style.display = "inline"
}
// ---------------------------  Async Await Promise --------------------- //


const mostrarProductosML = async() => {
    try {
        setTimeout(async () => {
            const response = await axios.get(url, {
                params: {
                    q: 'libros'
                },
            })

            if (response.status === 200) {
                const data = response.data
                console.log(data)
                addCard(data)
                return data
            } else if (response.status = 404) {
                console.log('The product cannot be found.')
            } else {
                console.log('Ups.. Something went wrong.')
            }

          }, 2000)
    } catch (error) {
        console.error(error)
    }
}

const addCard = (data) => {
    let products = data.results
    // console.log(products)
    products.forEach(product => {
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

        elMostrarBtn.style.display = "none"
        mercadoLibreButton.style.display = "none"
        backBtn.style.display = "inline"
        backBtn.style.background = "#FFCC70"
        backBtn.style.color = "#282828"
    });
}

elMostrarBtn.addEventListener('click', mostrarProductos)
mercadoLibreButton.addEventListener('click', mostrarProductosML)