Feature: Player registration from social account authentication
    
    Background:
        Given a player is authenticated with a social account
        And this player does not yet exist on the game platform

    Rule: Nickname must contain at least 3 letters
        @debug
        Scenario Outline: Reject registration if nickname contains fewer than 3 letters
            Given nickname "nickname" has been provided
            When registration is requested
            Then registration is rejected because nickname contains fewer than 3 letters

            Examples:
                | nickname  |
                | 12345     |
                | 12_45     |
                | --___--12 |
                | 1_2-3     |

    # Rule: Nickname must only contain letters, digits, hyphens and underscores
    #     Scenario Outline: Reject registration if nickname contains forbidden characters
    #         Given nickname "<nickname>" has been provided
    #         When registration is requested
    #         Then registration is rejected because nickname contains forbidden characters

    #         Examples:
    #             | nickname    |
    #             | toto$       |
    #             | hello@world |
    #             | space man   |
    #             | jean.pierre |

    # Rule: Nickname must be at least 5 characters long
    #     Scenario Outline: Reject registration if nickname is shorter than 5 characters
    #         Given nickname "<nickname>" has been provided
    #         When registration is requested
    #         Then registration is rejected because nickname is shorter than 5 characters

    #         Examples:
    #             | nickname |
    #             | abc      |
    #             | ab       |
    #             | x        |
    #             | a1b      |

    # Rule: Nickname must not be longer than 20 characters
    #     Scenario Outline: Reject registration if nickname is longer than 20 characters
    #         Given nickname "<nickname>" has been provided
    #         When registration is requested
    #         Then registration is rejected because nickname is longer than 20 characters

    #         Examples:
    #             | nickname                  |
    #             | nicknamenicknamenickname  |
    #             | abcdefghijklmnopqrstuvwxy |

    # Rule: Nickname can only be claimed by one player
    #     Scenario: Reject registration if nickname is already claimed
    #         Given nickname "player_123" has been provided
    #         And nickname "player_123" is already reserved by another player
    #         When registration is requested
    #         Then registration is rejected because nickname is already claimed

    # Rule: Successful registration reserves nickname, creates player and declares player online
    #     Scenario: Register player successfully
    #         Given nickname "-nickname_123-" has been provided
    #         When registration is requested
    #         Then nickname "-nickname_123-" is reserved
    #         And player account is created
    #         And player profile is created
    #         And player is declared online