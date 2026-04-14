# Feature: Player registration

#   Background:
#     Given player has completed authentication flow on identity provider

#   Rule: Nickname must contain at least one letter

#     Scenario: Reject registration if nickname contains no letter
#       Given nickname typed by visitor is "123456"
#       When registration is requested
#       Then registration should be rejected
#       And error message should be "Nickname must contain at least one letter, 123456 given"

#   Rule: Nickname must only contain alphanumeric characters, hyphens and underscores

#     Scenario: Reject registration if nickname contains forbidden character
#       Given nickname typed by visitor is "toto$"
#       When registration is requested
#       Then registration should be rejected
#       And error message should be "Nickname can only contain letters, digits, hyphens and underscores, toto$ given"

#   Rule: Nickname minimum length is 5

#     Scenario: Reject registration request if nickname is shorter than 5 characters
#       Given nickname typed by visitor is "toto"
#       When registration is requested
#       Then registration should be rejected
#       And error message should be "Nickname must be at least 5 characters long, toto given"

#   Rule: Nickname maximum length is 15

#     Scenario: Reject registration request if nickname is longer than 15 characters
#       Given nickname typed by visitor is "Iamexcedingfifteencharacters"
#       When registration is requested
#       Then registration should be rejected
#       And error message should be "Nickname must be at most 15 characters long, Iamexcedingfifteencharacters given"

#   Rule: Nickname can only be claimed by one player

#     Scenario: Reject registration request if nickname is already claimed
#       Given nickname "player" is already claimed by a player
#       And nickname typed by visitor is "player"
#       When registration is requested
#       Then registration should be rejected
#       And error message should be "Nickname is already claimed"

#   Rule: Registration process should create player internal identity

#     Scenario: Create player internal identity on registration process
#       Given a registration request
#       When registration is completed
#       Then player internal identity should have been created

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
