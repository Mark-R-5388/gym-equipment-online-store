document.querySelector('#homepage').addEventListener('click', () => {
  window.location.href = '/index.html'
})
let cartContainer = document.querySelector('#cart-main-container')
let parsedCart = JSON.parse(localStorage.getItem('cart'))
let cart = parsedCart
let costContainer = document.querySelector('#cost-container')
if (cart.length === 0) {
  cartContainer.innerHTML = '<h1>Cart is Empty</h1>'
}

function render(list) {
  list.forEach((item) => {
    // Create Equipment Container
    let equipmentContainer = createElement('div', 'cart-equipment-container')

    //Create Image Container
    let equipmentImageContainer = createElement(
      'div',
      'store-equipment-image-container'
    )
    //Create Image
    let equipmentImage = document.createElement('img')
    equipmentImage.classList.add('equipment-image')

    equipmentImage.src = item.img
    equipmentImage.alt = item.name
    equipmentImageContainer.appendChild(equipmentImage)

    //Create Equipment Information Container
    let equipmentInformationContainer = createElement(
      'div',
      'store-equipment-information'
    )

    // Create Name Section
    let equipmentName = createElement('h2', 'equipment-name')
    equipmentName.textContent = item.name
    // Create Price Section
    let equipmentPrice = createElement('h3', 'equipment-price')
    equipmentPrice.textContent = `$${item.price}`
    // create delete button
    let deleteButton = createElement('button', 'delete-item')
    deleteButton.textContent = 'delete'
    deleteButton.name = item.id

    equipmentInformationContainer.appendChild(equipmentName)
    equipmentInformationContainer.appendChild(equipmentPrice)
    equipmentInformationContainer.appendChild(deleteButton)

    equipmentContainer.appendChild(equipmentImageContainer)
    equipmentContainer.appendChild(equipmentInformationContainer)
    cartContainer.appendChild(equipmentContainer)
  })
  let deleteButtonArray = document.querySelectorAll('.delete-item')
  deleteButtonArray.forEach((button) => {
    button.addEventListener('click', (e) => {
      let deleteName = e.target.name
      let deleteItem = cart.findIndex((item) => {
        return item.id === deleteName
      })
      cart.splice(deleteItem, 1)
      localStorage.setItem('cart', JSON.stringify(cart))
      cartContainer.innerHTML = ''

      render(cart)
      costContainer.innerHTML = ''
      renderCost(cart)
    })
  })
  if (cart.length === 0) {
    cartContainer.innerHTML = '<h1>Cart is Empty</h1>'
  }
}

function renderCost(list) {
  // Create Text Container
  let textContainer = createElement('div', 'text-container')
  let cartTotalText = document.createElement('p')
  cartTotalText.textContent = 'Cart Total'
  let taxText = document.createElement('p')
  taxText.textContent = '10% Tax'
  let shippingText = document.createElement('p')
  shippingText.textContent = 'Shipping'
  let totalText = document.createElement('p')
  totalText.textContent = 'Total'

  textContainer.appendChild(cartTotalText)
  textContainer.appendChild(taxText)
  textContainer.appendChild(shippingText)
  textContainer.appendChild(totalText)

  // Create Math Container
  let mathContainer = createElement('div', 'math-container')
  let cartTotalMath = document.createElement('p')

  cartTotalMath.textContent = '$' + findCartTotal(list)
  let taxMath = document.createElement('p')
  taxMath.textContent = `$` + findTaxTotal(findCartTotal(list))
  let shippingMath = document.createElement('p')
  shippingMath.textContent = `$15.00`
  let totalMath = document.createElement('p')
  totalMath.textContent =
    `$` + findTotal(findCartTotal(list), findTaxTotal(findCartTotal(list)))

  mathContainer.appendChild(cartTotalMath)
  mathContainer.appendChild(taxMath)
  mathContainer.appendChild(shippingMath)
  mathContainer.appendChild(totalMath)

  costContainer.appendChild(textContainer)
  costContainer.appendChild(mathContainer)
  findCartTotal(list)
}

render(cart)
renderCost(cart)

// Find Costs
function findCartTotal(list) {
  let cartCostArray = list.map((item) => item.price)
  let cartCost = cartCostArray.reduce((item1, item2) => item1 + item2)

  return parseInt(cartCost).toFixed(2)
}

function findTaxTotal(amount) {
  let taxAmount = (amount * 0.1).toFixed(2)
  return parseInt(taxAmount).toFixed(2)
}
function findTotal(total, tax) {
  let totalAmount = parseInt(total) + parseInt(tax) + 15

  return parseInt(totalAmount).toFixed(2)
}
//Create Element
function createElement(element, className) {
  let newElement = document.createElement(element)
  newElement.classList.add(className)
  return newElement
}
