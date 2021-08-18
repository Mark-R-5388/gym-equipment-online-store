document.querySelector('#homepage').addEventListener('click', () => {
  window.location.href = '/index.html'
})
let cartContainer = document.querySelector('#cart-main-container')
let parsedCart = JSON.parse(localStorage.getItem('cart'))
let cart = parsedCart

function render(list) {
  list.forEach((item) => {
    // Create Equipment Container
    let equipmentContainer = createElement('div', 'store-equipment-container')

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

    equipmentInformationContainer.appendChild(equipmentName)
    equipmentInformationContainer.appendChild(equipmentPrice)

    equipmentContainer.appendChild(equipmentImageContainer)
    equipmentContainer.appendChild(equipmentInformationContainer)
    cartContainer.appendChild(equipmentContainer)
  })
}

render(cart)

//Create Element
function createElement(element, className) {
  let newElement = document.createElement(element)
  newElement.classList.add(className)
  return newElement
}
