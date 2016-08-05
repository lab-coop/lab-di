Feature: DI system

  As a developer I want to be able to build
  a set of dependencies for my project

  Scenario: I see the parsed dependencies from a directory
    Given a directory with a lab- prefixed service "lab-test"
    When I start the application
    Then I am able to use the "lab-test" dependency in my internal service

  Scenario: I can use different implementations of a registered service
    Given a directory with a lab- prefixed service "lab-testWithImplementations"
    Given an implemenation "implementationA" in service "lab-testWithImplementations"
    Given an implemenation "implementationB" in service "lab-testWithImplementations"
    When I use service "lab-testWithImplementations" with "implementationA"
    Then I see result "result A" for service "lab-testWithImplementations" with implementation "implementationA"

