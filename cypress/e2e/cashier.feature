Feature: Test one
Background: Page Landing
      Given I visit home page

  Scenario: Cashier 
    Then I Select Cashier "1"
    When I click "Next" button
    When I click "Add Sale" button
    Then I add item in "Apple" with quantity 2
    Then I calculate "Apple" total cost
    Then I evaluate total item

