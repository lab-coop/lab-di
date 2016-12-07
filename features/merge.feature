Feature: Merge container

  As a developer I want to be able to merge
  two container

  Scenario: I can merge containers
    Given I register a service "ServiceA" into "ContainerA"
    Given I register a service "ServiceB" into "ContainerB"
    When I merge "ContainerA" into "ContainerB"
    Then I see result "test" for service "ServiceA" using "ContainerB"
    Then I see result "test" for service "ServiceB" using "ContainerB"


