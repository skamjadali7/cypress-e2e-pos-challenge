Feature: Test one
Background: Page Landing
      Given I visit home page

  Scenario: Cashier 1
    Then I Select Cashier "1"
    When I click "Next" button
    When I click "Add Sale" button
    Then I add item in "Apple" with quantity 2
    Then I calculate "Apple" total cost
    Then I add item in "Orange" with quantity 2
    Then I calculate "Orange" total cost
    Then I add item in "Strawberries" with quantity 2
    Then I calculate "Strawberries" total cost
    Then I evaluate total item
    Then I calculate total cost
    Then I click "Submit" button

  Scenario: Cashier 2
    Then I Select Cashier "2"
    When I click "Next" button
    When I click "Add Sale" button
    Then I add item in "Apple" with quantity 2
    Then I calculate "Apple" total cost
    Then I add item in "Orange" with quantity 2
    Then I calculate "Orange" total cost
    Then I add item in "Strawberries" with quantity 2
    Then I calculate "Strawberries" total cost
    Then I evaluate total item
    Then I calculate total cost
    Then I click "Submit" button

  Scenario: Cashier 3
    Then I Select Cashier "3"
    When I click "Next" button
    When I click "Add Sale" button
    Then I add item in "Apple" with quantity 2
    Then I calculate "Apple" total cost
    Then I add item in "Orange" with quantity 2
    Then I calculate "Orange" total cost
    Then I add item in "Strawberries" with quantity 2
    Then I calculate "Strawberries" total cost
    Then I evaluate total item
    Then I calculate total cost
    Then I click "Submit" button

