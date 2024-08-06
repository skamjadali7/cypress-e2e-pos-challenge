import {Given, Then, When} from '@badeball/cypress-cucumber-preprocessor'
//import { CashierPage } from './pos-Page/cashier'
//const cashierPage = new CashierPage()
Given('I am on pos cashoir page',()=>{
    cy.visit('/')
})

Then('I Select Cashier {string}',function (cashierValue:string) {
    cy.get('[type="radio"]').each(($radio)=>{
        if ($radio.val()===cashierValue){
            cy.wrap($radio).check()
        }
    })
})

When('I Click {string} button',function (buttonName:string){
    cy.contains('button',buttonName).click()
})

Then('I Add item in {string} with quantity {int}',function(itemName:string,qty:number){
    for (let i=0;i<qty;i++){
    cy.get('tbody tr').contains('td',itemName).parent().within(($row)=>{
        cy.get('td button').eq(1).click()
    })
}
})

Then('I Calculate {string} total cost',function(itemName:string){
    cy.get('tbody tr').contains('td',itemName).parent().within(($row)=>{
        let formatTotalPrice: number
        let formatPrice:number
        let quantity:any
        cy.get('td').last().invoke('text').then((text)=>{
            formatTotalPrice = parseFloat(text.replace('$',''))
        })
        cy.get('td').eq(1).invoke('text').then((text)=>{
            formatPrice  = parseFloat(text.replace('$',''))
        })
        cy.get('input[type="number"]').invoke('attr','value').then((value)=>{
            quantity = value
        }).then(()=>{
            console.log(quantity,formatPrice,formatTotalPrice)
            expect(quantity*formatPrice).to.equal(formatTotalPrice)
        })
    })
})

Then('I Calculate total item',function(){
    let totalItem:number =0
    let items: number
    cy.get('tbody tr').parent().within(($row)=>{
        cy.get('input[type="number"]').each(($qty)=>{
            cy.wrap($qty).invoke('attr','value').then((value:any)=>{
                const numValue = parseInt(value)
                if (!isNaN(numValue)){
                    totalItem = totalItem + numValue
                }
                console.log(totalItem)
            })
        })
    })
        cy.get('h6').eq(0).invoke('text').then((text:any)=>{
            items = parseFloat(text.replace('Items: ','').trim())
            console.log(items)
            expect(items).to.equal(totalItem)
        })
})

Then('I Calculate total cost',function(){
        // add the logic
        let totalCost:number =0
        let finalCost:number
        cy.get('tbody tr td:nth-child(4)').each(($ele)=>{
            cy.wrap($ele).invoke('text').then((text)=>{
                const cost:any = parseFloat(text.replace('$',''))
                totalCost = totalCost +cost
            })
        })
        cy.get('h6').eq(1).invoke('text').then((text:any)=>{
            finalCost = parseFloat(text.replace('Cost: $',''))
            expect(finalCost.toFixed(2)).to.equal(totalCost.toFixed(2))
        })
})

