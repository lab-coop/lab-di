Feature: DI system

  As a developer I want to be able to inject
  a set of services for my project

  Scenario: I see the parsed dependencies from a directory
    Given a directory with a service "lab-test"
    When I inicialize the DI
    Then I am able to use the "lab-test" dependency in my internal service

  Scenario: I can use different implementations of a registered service
    Given a directory with a service "lab-testWithImplementations"
    Given an implemenation "implementationA" in service "lab-testWithImplementations"
    Given an implemenation "implementationB" in service "lab-testWithImplementations"
    When I inicialize the DI
    Then I see result "result A" for service "lab-testWithImplementations" with implementation "implementationA"
