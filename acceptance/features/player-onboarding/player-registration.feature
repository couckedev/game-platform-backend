Feature: Player registration

  Background:
    Given player has completed authentication flow on identity provider
    And player id has been generated

  Rule: Nickname must contain at least one letter

    Scenario: Reject registration if nickname contains no letter
      Given nickname typed by visitor is "123456"
      When registration is requested
      Then registration should be rejected
      And error message should be "Nickname 123456 must contain at least 3 letters"

  Rule: Nickname must only contain alphanumeric characters, hyphens and underscores

    Scenario: Reject registration if nickname contains forbidden character
      Given nickname typed by visitor is "toto$"
      When registration is requested
      Then registration should be rejected
      And error message should be "Nickname toto$ must only contain alphanumeric characters, hyphens and underscores"

  Rule: Nickname minimum length is 5

    Scenario: Reject registration request if nickname is shorter than 5 characters
      Given nickname typed by visitor is "toto"
      When registration is requested
      Then registration should be rejected
      And error message should be "Nickname minimum lenght is 5, toto is too short"

  Rule: Nickname maximum length is 15

    Scenario: Reject registration request if nickname is longer than 20 characters
      Given nickname typed by visitor is "nicknamenicknamenicknamenickname"
      When registration is requested
      Then registration should be rejected
      And error message should be "Nickname maximum lenght is 20, nicknamenicknamenicknamenickname is too long"

  Rule: Nickname can only be claimed by one player

    Scenario: Reject registration request if nickname is already claimed
      Given nickname "player" is already claimed by player with player id "some player id"
      And nickname typed by visitor is "player"
      When registration is requested
      Then registration should be rejected
      And error message should be "Nickname player is already claimed by another player"

  # Rule: Registration process should create player internal identity

  #   Scenario: Create player account on registration process
  #     Given visitor has typed valid nickname
  #     When registration is requested
  #     Then player account should have been created
#   Rule: Registration process should create player resources
#     Scenario: Create player profile on registration process
#       Given a registration request
#       When registration is completed
#       Then player profile should have been created
#   Rule: Player should be declared online directly after successful registration
#     Scenario: Declare player online directly after successful registration
#       Given a registration request
#       When registration is completed
#       Then player should be declared online
