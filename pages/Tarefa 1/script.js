// Checking if number is a possible Romano
const verifyRomano = (arr) => {
  let checkIfRomano = 0
  arr.forEach((item, i) => {
    if(item === arr[i + 1]) {
      checkIfRomano++
      return
    }
    if(checkIfRomano >= 3){
      return
    }

    checkIfRomano = 0
  })

  return checkIfRomano
}
// Convert the repetitives figures
const convertReps = (rep) => {
  switch(rep) {
    case "C":
      return "CD"
    
    case "X":
      return "XL"
  
    default:
      break
  }
}
// Check if roman numerals are valid
const verifyFailures = (arr) => {
  let check = false
  arr.forEach((item, i) => {
    if(item === 1 && arr[i + 1] === 1 && arr[i + 2] && arr[i + 2] !== 1) {
      return check = true
    }else if(item === 1 && arr[i + 1] > 10) {
      return check = true
    }else if(item == 1 && (arr[i + 1] === 5  || arr[i + 1] === 10) && arr[i + 2]) {
      return check = true
    }else if(item == 10 && arr[i + 1] > 100) {
      return check = true
    }else if(item == 10 && (arr[i + 1] === 50 || arr[i + 1] === 100) && arr[i + 2] && arr[i + 2] > 99) {
      return check = true
    }else if(item == 100 && arr[i + 1] > 1000) {
        return check = true
    }else if(item == 100 && (arr[i + 1] === 500 || arr[i + 1] === 1000)  && arr[i + 2] && arr[i + 2] > 99) {
      return check = true
    }
  })
  return check
}

const convertionToRomano = () => {
  let num1 = document.getElementById("num2").value;

  if(num1.trim() === "") return alert("Insira o número que deseja converter!")

  num1 = Number(num1)

  if(num1 > 3999|| num1 <= 0) return alert("Insira um número inteiro positivo maior que 0 e menor ou igual a 3999!")

  // Converting number to romanos
  let figures = []
  while(num1 >= 1000) {
    figures.push("M")
    num1 = num1 - 1000
  }
  while(num1 >= 900) {
    figures.push("CM")
    num1 = num1 - 900
  }
  while(num1 >= 500) {
    figures.push("D")
    num1 = num1 - 500
  }
  while(num1 >= 100) {
    figures.push("C")
    num1 = num1 - 100 
  }
  while(num1 >= 90) {
    figures.push("XC")
    num1 = num1 - 90 
  }
  while(num1 >= 50) {
    figures.push("L")
    num1 = num1 - 50
  }
  while(num1 >= 10) {
    figures.push("X")
    num1 = num1 - 10
  }
  while(num1 < 10 && num1 > 0) {
    switch(num1) {
      case 9:
        num1 = num1 - 9
        figures.push("IX")
        break

      case 8:
        figures.push("VIII")
        num1 = num1 - 8
        break

      case 7:
        figures.push("VII")
        num1 = num1 - 7
        break

      case 6:
        figures.push("VI")
        num1 = num1 - 6
        break

      case 5:
        figures.push("V")
        num1 = num1 - 5
        break

      case 4:
        figures.push("IV")
        num1 = num1 - 4
        break

      case 3:
        figures.push("III")
        num1 = num1 - 3
        break

      case 2:
        figures.push("II")
        num1 = num1 - 2
        break

      case 1:
        figures.push("I")
        num1 = num1 - 1
        break

      default:
        break
    }
  }

  // Replacing repetitives figures
  let cont = 0
  let newFigures = figures.join('')
  figures.forEach((item, i) => {
    if(item === figures[i + 1]){
      cont++
      return
    }
    if(cont === 3){
      let newItem = convertReps(item)
      if(i === 0){
        newFigures = newFigures.replace(`${item}${item}${item}${item}`, `${newItem}`)
      }
      newFigures = newFigures.replace(`${item}${item}${item}${item}`, `${newItem}`)
    }
    cont = 0
  })

  // Rendering result
  let divResult = document.querySelector(".result")
  divResult.innerHTML = `Romano: ${newFigures}`
}

const convertionToArabico = () => {
  let num1 = document.getElementById("num1").value;

  const arrStr = num1.split("").map((item) => item.toUpperCase());

  // Checking if number is a possible Roma
  let repetions = verifyRomano(arrStr)
  if (repetions >= 3) {
    // Rendering result
    let divResult = document.querySelector(".result")
    divResult.innerHTML = "Número incorreto"
    return
  }

  const romanNumerals = ["I","V","X","L","C","D","M"]
  let invalidNumeral = false
  arrStr.forEach((letter) => {
    if(!romanNumerals.find((num) => num === letter)){
      invalidNumeral = true
    }
  })
  if(invalidNumeral) return alert("Número romano invalido!")
  
  // Creating array of converted numbers
  let convertedToArabic = []
  arrStr.forEach((num) => {
    switch(num) {
      case "M":
        return convertedToArabic.push(1000)
    
      case "D":
        return convertedToArabic.push(500)
    
      case "C":
        return convertedToArabic.push(100)
      
      case "L":
        return convertedToArabic.push(50)
    
      case "X":
        return convertedToArabic.push(10)
  
      case "V":
        return convertedToArabic.push(5)
    
      case "I":
        return convertedToArabic.push(1)
    
      default:
        return
    }
  })

  // Checking if exist failures
  const checkFail = verifyFailures(convertedToArabic)
  if(checkFail) {
     // Rendering result
     let divResult = document.querySelector(".result")
     divResult.innerHTML = "Número incorreto"
     return
  }
  
  // Revert array
  listReverse = [...convertedToArabic.reverse()]
  
  // Converting and adding numbers
  let somaRes = 0
  if(listReverse.length == 2 && listReverse[1] < listReverse[0]){
    somaRes = listReverse[0] - listReverse[1]
  }else if(listReverse.length > 1){
    listReverse.forEach((num, i) => {
      if(i < listReverse.length - 1) {
        if(num < listReverse[i - 1]) return;
    
        if(num <= listReverse[i + 1]) {
          somaRes += num
          return
        }

        let newNum = num - listReverse[i + 1]
        somaRes += newNum
      }else{
        if(num < listReverse[i - 1]){
          return
        }
        somaRes += num
      }
    })
  }else {
    somaRes += listReverse[0]
  }
  
  // Rendering result
  let divResult = document.querySelector(".result")
  divResult.innerHTML = `Arábico: ${somaRes}`
}