// TODO: create btn to fill total cost of goods sold
const BiddingCalculator = (function () {
  ; ('use strict')
  const bid_info = []

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
  const contratorInfoForm = document.querySelector('#contractor-info_form')
  const goodsSoldBtn = document.querySelector('.form-send_btn')

  const overheadCosts = document.querySelectorAll('.overhead-costs')

  function eventListeners() {
    addRowButton.addEventListener('click', (event) => addRow(event))

    sumOverheadBtn.addEventListener('click', (event) => {
      totalOverhead.value = overheadCost(event)
      overheadCosts.value = ''
      // sumOFTotals(event))
    })
    goodsSoldBtn.addEventListener('click', (event) => {
      costOfGoodsSoldTotal(event)
      costOfGoodsValue.value = ''
    })
  }

  // Adds a new cost of goods sold row
  function addRow() {
    const newRow = document.createElement('div')
    newRow.classList.add('cost-for-goods-sold')
    newRow.innerHTML = costForGoodsSold.innerHTML
    return contratorInfoForm.appendChild(newRow)
  }

  // TODO:  abstract function to work with both total overhead and cost of goods sold totals
  //? input values should clear after getting total overhead
  function overheadCost() {
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

  function sumOFTotals() {
    return (total.value =
      parseFloat(totalOverhead) + parseFloat() + parseFloat(profit))
  }

  eventListeners()

  // pseudo code for connecting to backend api

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
    contracorOverheadSum: overheadSum,
  }
  // send data to backend
  const postReq = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(BidCalculatorPostData),
  }

  function listener(event) { }
  // ping server
  function status(response) {
    if (response.status >= 200 && response.status < 300) {
      return Promise.resolve(response)
    }
    return Promise.reject(new Error(response.statusText))
  }

  // checks that response status is greenlit
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