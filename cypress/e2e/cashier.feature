Feature: e2e pos sale
Background: pos home page
      Given I am on pos cashoir page

  Scenario Outline: Cashier Sale Report
    Then I Select Cashier "<CashierNumber>"
    When I Click "Next" button
    When I Click "Add Sale" button
    Then I Add item in "<ItemName1>" with quantity <Quantity1>
    And I Calculate "<ItemName1>" total cost
    Then I Add item in "<ItemName2>" with quantity <Quantity2>
    And I Calculate "<ItemName2>" total cost
    Then I Add item in "<ItemName3>" with quantity <Quantity3>
    And I Calculate "<ItemName3>" total cost
    And I Calculate total item
    And I Calculate total cost
    Then I Click "Submit" button

  Examples:
    | CashierNumber | ItemName1    | Quantity1 | ItemName2 | Quantity2 | ItemName3    | Quantity3 |
    | 1             | Apple        | 2         | Orange    | 2         | Strawberries | 2         |
    | 2             | Apple        | 2         | Orange    | 2         | Strawberries | 2         |
    | 3             | Apple        | 2         | Orange    | 2         | Strawberries | 2         |
