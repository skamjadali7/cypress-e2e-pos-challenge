export class CashierPage {
    // defining locators 
    private cashierRadioCheckBox = cy.get('[type="radio"]')

    // generic reusable method to check cashier based on value
    selectCashier = (cashierValue:string) => {
        this.cashierRadioCheckBox.each(($radio)=>{
            if ($radio.val()===cashierValue){
                cy.wrap($radio).check()
            }
        })
    }
}