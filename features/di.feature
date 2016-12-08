Feature: DI system

  As a developer I want to be able to inject
  a set of services for my project

  Scenario: I see the parsed dependencies from a directory
    Given a directory with a service "lab-test"
    When I inicialize the DI
    Then I see result "test" for service "lab-test"

  Scenario: I can use different implementations of a registered service
    Given a directory with a service "lab-testWithImplementations"
    Given an implemenation "implementationA" in service "lab-testWithImplementations"
    Given an implemenation "implementationB" in service "lab-testWithImplementations"
    Given a directory with a service "otherImplementation"
    When I inicialize the DI
    Then I see result "result A" for service "lab-testWithImplementations" with implementation "implementationA"
    Then I see result "result C" for service "lab-testWithImplementations" with implementation "implementationC"

  Scenario: I can register a module
    Given a directory with a service "lab-test"
    When I register the service "lab-test"
    Then I see result "test" for service "lab-test"

  Scenario: I can use dependencies in a factory
    Given a directory with a service "lab-test"
    Given a directory with a service "factory-test"
    When I inicialize the DI
    Then I see result "factory-test" for service "factory-test"
