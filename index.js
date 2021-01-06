
const BiddingCalculator = (function () {
  ; ('use strict')
  const bid_info = []

  const addRowButton = document.querySelector('.add-row')

  let costOfGoodsValue = document.querySelectorAll('.cost-of-goods-sold')

  const costForGoodsSold = document.querySelector('.cost-for-goods-sold')

  const totalOverhead = document.querySelector('#total-overhead')

  const totalCostOFGoodsSold = document.querySelector(
    '#total-cost-of-goods-sold'
  )

  const profit = document.querySelector('#profit')
  const total = document.querySelector('#total')
  const sumOverheadBtn = document.querySelector('#get-overhead-sum')
  const contractorInfoForm = document.querySelector('#contractor-info_form')
  const goodsSoldBtn = document.querySelector('.goods-sold_btn')
  const getSum = document.querySelector('.get-sum')
  const overheadCosts = document.querySelectorAll('.overhead-costs')
  const collapsibleContent = document.querySelectorAll('.collapsible')
  const formSubmitBtn = document.querySelector('.form-send_btn')

  // EventListeners
  function eventListeners() {
    addRowButton.addEventListener('click', (event) =>{
       addRow(event)})
      //  costOfGoodsValue.addEventListener('change', disableAddRow())

    sumOverheadBtn.addEventListener('click', (event) => {
      totalOverhead.value = overheadCost(event)
      // sumOFTotals(event))
    })
    goodsSoldBtn.addEventListener('click', (event) => {
      totalCostOFGoodsSold.value = goodsCost(event)
    })
    getSum.addEventListener('click', (event) => {
      total.value = sumOFTotals(event)
    })
    formSubmitBtn.addEventListener('click', (event) => {
  //     event.preventDefault()

  //      const url = 'back-end/database'
  // // const bidForm = document.querySelector('.bid-form')
  // const BidCalculatorPostData = {
  //   contractorName,
  //   email,         
  //   industry,
  //   costForGoodsSold,
  //   ITExpenses,
  //   computerExpenses,
  //   softwareExpenses,
  //   tools,
  //   facilityMaintenanceCosts,
  //   facilityFurnishings,
  //   RandD,
  //   marketing,
  //   businessInsurance,
  //   customerService,
  //   govRegistration,
  //   officeSupplies,
  //   accounting,
  //   legalExpenses,
  //   rent,
  //   electricity,
  //   water,
  //   gas,
  //   mgntOverhead,
  //   training,
  //   professionalDevelopment,
  //   recruitmentCosts,
  //   payrollExpenses,
  //   companyVehicle,
  //   vehicleMaintenance,
  //   vehicleFuel,
  //   autoInsurance,
  //   totalOverhead,
  //   totalCostOfGoodsSold,
  //   costForGoodsSold,
  //   profit,
  //   total
  // }
  // // send data to backend
  // const postReq = {
  //   method: 'POST',
  //   headers: {
  //     'Content-Type': 'application/json',
  //   },
  //   body: JSON.stringify(BidCalculatorPostData),
  // }

 
  //     fetch(url, postReq)
  //   .then((response) => {
  //     if (!status(response)) {
  //       // TODO: handle bad request
  //       console.log('bad request')
  //     }
  //     return response.json()
  //   })
  //   .then((data) => {
  //     doSomethingwithThis(data)
  //   })
  //   .catch((err) => {
  //     console.log(err)
  //   })

      
    })

  }
  function collapseFields() {
    const fieldset = document.getElementsByTagName('fieldset')
  Array.from(fieldset).forEach((element) => {
      element.addEventListener('click', (event) => {
        console.log(element);
        element.classList.toggle('collapsible')
    })
  })}
  // Allow for collapsing of fields
  function collapsibleFields() {
    console.log("called");
    console.log(collapsibleContent);
    collapsibleContent.forEach(element => {
      
      element.addEventListener('click', (event) => {
        console.log('click')
        if (event.target.tagName != 'fieldset') return
      element.classList.toggle('active')
      let content = event.target
  
      // content.style.display = "block"
      content.classList.toggle("collapsed")

      })
    });
     
  }
  function disableAddRow() {
    const last = costOfGoodsValue.length -1
    console.log(last);
    console.log(costOfGoodsValue);
    if (costOfGoodsValue[last].value === '') {

      addRowButton.disabled = true
      return false
    } else {
      addRowButton.disabled = false      
      return true
    }
  }
  // Adds a new cost of goods sold row
  function addRow() {
    if(!disableAddRow()) return
    const newRow = document.createElement('div')
    newRow.classList.add('cost-for-goods-sold')
    newRow.innerHTML = costForGoodsSold.innerHTML
    contractorInfoForm.appendChild(newRow)
    costOfGoodsValue = document.querySelectorAll('.cost-of-goods-sold')

    }


  // TODO:  abstract function to work with both total overhead and cost of goods sold totals
  //? input values should clear after getting total overhead
  function overheadCost(numbers) {
    const overheadValArr = []
    for (let i = 0; i < overheadCosts.length; i++) {
      if (typeof overheadCosts[i].value !== NaN) {
        overheadValArr.push(parseFloat(overheadCosts[i].value))
      } else {
        // TODO: Create UI error message
        console.log('Error: Please enter Numbers only')
      }
    }

    return overheadValArr
      .filter((value) => !Number.isNaN(value))
      .reduce((accumulator, currentValue) => accumulator + currentValue)
      .toFixed(2)
  }


  function goodsCost() {
    console.log('cogv: ', costOfGoodsValue)
    const costOfGoodsValArr = []
    for (let i = 0; i < costOfGoodsValue.length; i++) {
      if (typeof costOfGoodsValue[i].value !== NaN) {
        costOfGoodsValArr.push(parseFloat(costOfGoodsValue[i].value))
      } else if(typeof costOfGoodsValue[i].value == NaN) {
        addRowButton.disabled = true
          
        // TODO: Create UI error message
        console.log('Error: Please enter Numbers only')
      }
    }

    return costOfGoodsValArr
      .filter((value) => !Number.isNaN(value))
      .reduce((accumulator, currentValue) => accumulator + currentValue)
      .toFixed(2)
  }

  

  function sumOFTotals() {
    return (parseFloat(totalCostOFGoodsSold.value || 0) + parseFloat(totalOverhead.value || 0) + parseFloat(profit.value || 0)).toFixed(2)
  }
  // fixedPointZero()
  collapseFields()
  // collapsibleFields()
  eventListeners()


  // pseudo code for connecting to backend api.

  // function listener(event) { }
  // ping server
  function status(response) {
    if (response.status >= 200 && response.status < 300) {
      return Promise.resolve(response)
    }
    return Promise.reject(new Error(response.statusText))
  }

  // checks that response status is green lit
  function checkStatus(response) {
    if (response.ok) {
      return Promise.resolve(response)
    }
    return Promise.reject(new Error(response.statusText))
  }

  function handleStatusException(response) {
    switch (response.status) {
      case 400:
        
        break;
    
      default:
        break;
    }
  }
  // takes a url and checks for ok status, then returns json data
  function fetchData(url) {
    return fetch(url)
      .then(checkStatus)
      .then((response) => {
        response.json()
        console.log(response.json())
      })
  }

  function doSomethingwithThis() {
    console.log('do something with data')
  }
  // post data to tbe backend
  
})()