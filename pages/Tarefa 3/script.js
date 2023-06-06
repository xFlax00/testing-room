let orderedItems = []

// Render items
const renderItems = (arr) => {
  const ordereds = document.querySelector(".ordereds_items")
  const selectItems = document.getElementById("select_items")
  ordereds.innerHTML = ""
  selectItems.innerHTML = ""

  arr.forEach((item) => {
    let rowItem = document.createElement("div")
    let columnItem1 = document.createElement("p")
    columnItem1.innerText = item.name
    let columnItem2 = document.createElement("p")
    columnItem2.innerText = `R$${((Number(item.price)).toFixed(2).toLocaleString("pt-BR"))}`
    let columnItem3 = document.createElement("p")
    columnItem3.innerText = item.qtd
    let columnItem4 = document.createElement("p")
    columnItem4.innerText = item.participants

    rowItem.appendChild(columnItem1)
    rowItem.appendChild(columnItem2)
    rowItem.appendChild(columnItem3)
    rowItem.appendChild(columnItem4)

    ordereds.appendChild(rowItem)

    
    let optItem = document.createElement("option")
    optItem.setAttribute("value", item.name)
    optItem.innerText = item.name
    selectItems.appendChild(optItem)
  })
}

// Creating item
const addItem = () => {
  const product = document.getElementById('product');
  const valueProduct = document.getElementById('value_product');
  const qtdProduct = document.getElementById('qtd_product');

  if(product.value.trim() === "") return alert(`Preencha o campo "Produto".`)
  if(valueProduct.value.trim() === "") return alert(`Preencha o campo "Preço".`)
  if(qtdProduct.value.trim() === "") return alert(`Preencha o campo "Quantidade".`)
  
  let item = {
    name: product.value,
    price: valueProduct.value,
    qtd: qtdProduct.value,
    participants: []
  }
  
  orderedItems.push(item)
  renderItems(orderedItems)

  product.value = ""
  valueProduct.value = ""
  qtdProduct.value = ""
}

// Rendering participants
const personServiceRate = (arr) => {
  const rateContainer = document.querySelector(".rate_container")
  rateContainer.innerHTML = ""
  
  arr.forEach((person) => {
    let checkTax = document.createElement("input")
    checkTax.setAttribute("type", "checkbox")
    checkTax.setAttribute("value", `${person.name}`)
    
    let labelTax = document.createElement("label")
    labelTax.appendChild(checkTax)
    labelTax.innerHTML += ` ${person.name}`
    
    rateContainer.appendChild(labelTax)
  })
}


// Adding people to the list of participants
let peopleCheck = []
const addPerson = () => {
  orderedItems.forEach((item) => {
    item.participants.forEach((person) => {
      if(!peopleCheck.find((p) => p.name === person)){
        peopleCheck.push({name: person, total: 0})
      }
    })
  })
}

// Inserting pessoas to orders
const insertPerson = () => {
  const optSelected = document.getElementById("select_items").value
  const personAdded = document.getElementById("person")
  
  if(personAdded.value.trim() === "") return alert(`Preencha o campo "Participante".`)
  
  orderedItems.map((item) => {
    if(optSelected === item.name) { 
      if(!item.participants.find((participant) => participant === personAdded.value)) {
        item.participants.push(personAdded.value)
      }  
      return 
    }
  })
  
  renderItems(orderedItems)
  addPerson()
  personServiceRate(peopleCheck)
  
  personAdded.value = ""
}

// Generating final bill
const checkResult = () => {
  const rateContainer = document.querySelector(".rate_container")

  let checkParticipantsInProducts = false
  orderedItems.forEach((item) => {
   if(item.participants.length === 0) {
    checkParticipantsInProducts = true
   }
  })
  if(checkParticipantsInProducts) return alert("Cada produto precisa de pelo menos 1 participante!")

  let peopleTaxList = []
  let peopleTaxChecked = rateContainer.childNodes
  peopleTaxChecked.forEach((person) => {
    if(person.childNodes <= 0) return
    if(person.children[0].checked){
      peopleTaxList.push(person.innerText)
    }
  })

  peopleCheck.forEach((p) => {
    p.total = 0
  })

  orderedItems.forEach((item) => {
    let totalValue = item.price * item.qtd
    let partOfEach = totalValue / item.participants.length

    peopleCheck.forEach((p) => {
      if(item.participants.find((person) => person === p.name)){
        if(peopleTaxList.find((person) => person.trim() === p.name)) {
          let rate = 1.1
          p.total += partOfEach * rate
          return
        }
        p.total += partOfEach
      }
    })
  })

  const checkResult = document.querySelector(".check_result")
  checkResult.innerHTML = ""
  checkResult.innerHTML = "<h3>Conta: </h3>"

  peopleCheck.forEach((person) => {
    let personResult = document.createElement("p")
    personResult.innerText = `${person.name}: R$${((person.total).toFixed(2)).toLocaleString("pt-BR")}`
    checkResult.appendChild(personResult)
  })
}