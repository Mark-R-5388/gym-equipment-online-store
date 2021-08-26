const gymEquipment = [
  { img: './equipment-pics/barbell.jpeg', name: 'barbell', price: 150 },
  { img: './equipment-pics/bike.jpeg', name: 'stationary bike', price: 300 },
  { img: './equipment-pics/dumbbells.jpeg', name: 'dumbbells', price: 100 },
  {
    img: './equipment-pics/gymnastics-rings.jpeg',
    name: 'gymnastics rings',
    price: 60,
  },
  { img: './equipment-pics/kettlebells.jpeg', name: 'kettle bells', price: 80 },
  {
    img: './equipment-pics/medicine-balls.jpeg',
    name: 'medicine ball',
    price: 30,
  },
  {
    img: './equipment-pics/resistance-band.jpeg',
    name: 'resistance band',
    price: 10,
  },
  { img: './equipment-pics/rower.jpeg', name: 'rower machine', price: 250 },
  { img: './equipment-pics/squat-rack.jpeg', name: 'squat rack', price: 350 },
  { img: './equipment-pics/treadmill.jpeg', name: 'treadmill', price: 400 },
  {
    img: './equipment-pics/weight-bench.jpeg',
    name: 'weight bench',
    price: 100,
  },
  {
    img: '/equipment-pics/weight-plate.jpeg',
    name: 'weight plate',
    price: 50,
  },
]

// Main Container
let gymStoreContainer = document.querySelector('#store-main-container')

// Cart Section
function loadCart() {
  if (localStorage.length > 0) {
    let parsedCart = JSON.parse(localStorage.getItem('cart'))
    let cart = parsedCart
    return cart
  } else {
    return []
  }
}
let cart = loadCart()

document.querySelector('#cart-amount').textContent = cart.length

// Search Elements
let search = {
  searchInput: '',
  selectInput: '',
}

// Search Filter
document.querySelector('#text-search').addEventListener('input', (e) => {
  search.searchInput = e.target.value
  let filteredList = gymEquipment.filter((item) => {
    if (item.name.toLowerCase().includes(search.searchInput.toLowerCase())) {
      return item
    }
  })
  if (filteredList.length === 0) {
    gymStoreContainer.innerHTML = '<h1>Sorry.....no search results</h1>'
  } else {
    gymStoreContainer.innerHTML = ''
    render(filteredList)
  }
})

// Select Filter
document.querySelector('#select-order').addEventListener('change', (e) => {
  search.selectInput = e.target.value
  let selectList = gymEquipment.map((item) => {
    return item
  })
  if (search.selectInput === 'price-high') {
    selectList.sort((item1, item2) => {
      return item2.price - item1.price
    })
  }
  if (search.selectInput === 'price-low') {
    selectList.sort((item1, item2) => {
      return item1.price - item2.price
    })
  }
  if (search.selectInput === 'alphabetical') {
    selectList.sort((item1, item2) => {
      if (item1.name < item2.name) {
        return -1
      } else if (item1.name > item2.name) {
        return 1
      } else {
        return 0
      }
    })
  }
  if (search.selectInput === 'base') {
    gymStoreContainer.innerHTML = ''

    render(gymEquipment)
  }
  gymStoreContainer.innerHTML = ''
  render(selectList)
})

// Click to go to cart
document.querySelector('#cart').addEventListener('click', () => {
  window.location.href = '/cart.html'
})

// Render The List
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
    // Add to cart
    let addToCartButton = createElement('button', 'add-to-cart')
    addToCartButton.classList.add('button')
    addToCartButton.textContent = 'add to cart'
    addToCartButton.name = item.name

    // Merge All Together
    equipmentInformationContainer.appendChild(equipmentName)
    equipmentInformationContainer.appendChild(equipmentPrice)
    equipmentInformationContainer.appendChild(addToCartButton)

    equipmentContainer.appendChild(equipmentImageContainer)
    equipmentContainer.appendChild(equipmentInformationContainer)
    gymStoreContainer.appendChild(equipmentContainer)
  })
  // add to cart
  let addButtonArray = document.querySelectorAll('.add-to-cart')
  addButtonArray.forEach((button) => {
    button.addEventListener('click', (e) => {
      let buttonName = e.target.name
      let item = list.find((item) => {
        return item.name === buttonName
      })
      let itemCopy = { ...item }
      itemCopy.id = randomId()
      cart.push(itemCopy)
      localStorage.setItem('cart', JSON.stringify(cart))
      document.querySelector('#cart-amount').textContent = cart.length
    })
  })
}

//Create Element
function createElement(element, className) {
  let newElement = document.createElement(element)
  newElement.classList.add(className)
  return newElement
}

// On Opening Website
render(gymEquipment)

// random id
function randomId() {
  return Math.random().toString(16).substr(2, 16)
}
