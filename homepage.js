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
    equipmentInformationContainer.appendChild(equipmentName)
    equipmentInformationContainer.appendChild(equipmentPrice)
    equipmentContainer.appendChild(equipmentImageContainer)
    equipmentContainer.appendChild(equipmentInformationContainer)
    gymStoreContainer.appendChild(equipmentContainer)
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
