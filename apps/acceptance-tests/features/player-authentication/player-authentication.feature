Feature: Player authentication

  Scenario: User is not authenticated
    Given user is not authenticated with an external account
    When player authentication is requested
    And authentication status will be set as unauthenticated

  Scenario: Authenticate an existing player
    Given user is authenticated with an external account
    And player exists on game platform for this user
    When player authentication is requested
    Then current player will be set
    And authentication status will be set as authenticated
