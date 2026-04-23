Feature: Player registration

  Background:
    Given a player is authenticated with external account
    And this player does not yet exist on the game platform

  Rule: Nickname must contain at least 3 letters

    Scenario Outline: Reject registration if nickname contains fewer than 3 letters
      Given nickname "<nickname>" has been provided
      When registration is requested
      Then registration will be rejected because nickname does not contain 3 letters at least

      Examples:
        | nickname  |
        |     12345 |
        |     12_45 |
        | --___--12 |
        |     1_2-3 |

  Rule: Nickname must only contain letters, digits, hyphens and underscores

    Scenario Outline: Reject registration if nickname contains invalid characters
      Given nickname "<nickname>" has been provided
      When registration is requested
      Then registration will be rejected because nickname contains invalid characters

      Examples:
        | nickname    |
        | toto$       |
        | hello@world |
        | space man   |
        | jean.pierre |

  Rule: Nickname must be at least 5 characters long

    Scenario Outline: Reject registration if nickname is shorter than 5 characters
      Given nickname "<nickname>" has been provided
      When registration is requested
      Then registration will be rejected because nickname is too short

      Examples:
        | nickname |
        | abc      |
        | ab       |
        | x        |
        | a1b      |

  Rule: Nickname must not be longer than 20 characters

    Scenario Outline: Reject registration if nickname is longer than 20 characters
      Given nickname "<nickname>" has been provided
      When registration is requested
      Then registration will be rejected because nickname is too long

      Examples:
        | nickname                  |
        | nicknamenicknamenickname  |
        | abcdefghijklmnopqrstuvwxy |

  Rule: Player is created during registration
    Scenario: Create player during player registration
      Given nickname "player_123" has been provided
      When registration is requested
      Then player with nickname "player_123" will be created

