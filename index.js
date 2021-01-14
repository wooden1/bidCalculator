const BiddingCalculator = (function () {
  ;('use strict')
  let inputs = document.querySelectorAll('input')

  const addRowButton = document.querySelector('.add-row')

  const costOfGoodsValue = document.querySelectorAll('.cost-of-goods-sold')

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

  function eventListeners() {
    addRowButton.addEventListener('click', (event) => addRow(event))

    sumOverheadBtn.addEventListener('click', (event) => {
      totalOverhead.value = overheadCost(event)
    })
    goodsSoldBtn.addEventListener('click', (event) => {
      totalCostOFGoodsSold.value = goodsCost(event)
    })
    getSum.addEventListener('click', (event) => {
      total.value = sumOFTotals(event)
    })
    formSubmitBtn
      .addEventListener('click', (event) => {
        console.log('SEND FORM DATA!!')
      })

      .addEventListener('change', () => {
        console.log('get values')
      })
  }

  function collapseFields() {
    const fieldset = document.getElementsByTagName('fieldset')
    Array.from(fieldset).forEach((element) => {
      element.addEventListener('click', () => {
        console.log(element.ch)
        element.classList.toggle('collapsible')
      })
    })
  }
  // Allow for collapsing of fields
  function collapsibleFields() {
    console.log('called')
    console.log(collapsibleContent)
    collapsibleContent.forEach((element) => {
      element.addEventListener('click', (event) => {
        console.log('click')
        if (event.target.tagName != 'fieldset') return
        element.classList.toggle('active')
        let content = event.target

        // content.style.display = "block"
        content.classList.toggle('collapsed')
      })
    })
  }

  // Adds a new cost of goods sold row
  function addRow() {
    const newRow = document.createElement('div')
    newRow.classList.add('cost-for-goods-sold')
    newRow.innerHTML = costForGoodsSold.innerHTML
    return contractorInfoForm.appendChild(newRow)
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
    const costOfGoodsValArr = []
    for (let i = 0; i < costOfGoodsValue.length; i++) {
      if (typeof costOfGoodsValue[i].value !== NaN) {
        costOfGoodsValArr.push(parseFloat(costOfGoodsValue[i].value))
      } else {
        // TODO: Create UI error message
        console.log('Error: Please enter Numbers only')
      }
    }

    return costOfGoodsValArr
      .filter((value) => !Number.isNaN(value))
      .reduce((accumulator, currentValue) => accumulator + currentValue)
      .toFixed(2)
  }
  function zeroedInputs() {
    fixedZero = 0
    fixedZero.toFixed(2)
    for (const input in inputs) {
      input.value = input.value || fixedZero
    }
  }
  function sumOFTotals() {
    return (
      parseFloat(totalCostOFGoodsSold.value) +
      parseFloat(totalOverhead.value) +
      parseFloat(profit.value)
    ).toFixed(2)
  }
  // zeroedInputs()
  collapseFields()
  collapsibleFields()
  eventListeners()

  // pseudo code for connecting to backend api.

  const url = 'http://backend-api.com/contract-bid_calculator-data.json'
  const bidForm = document.querySelector('.bid-form')
  const BidCalculatorPostData = {
    contractorName: name,
    contractorEmail: email,
    contractorIndustry: industry,
    contractorCostForGoodsSold: costForGoodsSold,
    contractorTotalOverhead: overhead,
    contractorTotalCostForGoodsSold: TotalCostForGoodsSold,
    contractorProfit: profit,
    contractorOverheadSum: overheadSum,
  }
  // send data to backend
  const postReq = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(BidCalculatorPostData),
  }

  function listener(event) {}
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

  // takes a url and checks for ok status, then returns json data
  function fetchData(url) {
    return fetch(url)
      .then(checkStatus)
      .then((res) => res.json())
  }
  function doSomethingwithThis() {
    console.log('do something with data')
  }
  // post data to tbe backend
  fetch(url, postReq)
    .then((response) => {
      if (!status(response)) {
        console.log('bad request')
      }
      return response.json()
    })
    .then((data) => {
      doSomethingwithThis(data)
    })
    .catch((err) => {
      console.log(err)
    })
})()
