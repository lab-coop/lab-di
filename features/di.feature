Feature: DI system

  As a developer I want to be able to build
  a set of dependencies for my project

  Scenario: I see the parsed dependencies from a directory
    Given a directory with a service "test"
    When I start the application
    Then I am able to use the "test" dependency in my internal service

  Scenario: I can use different implementations of a registered service
    Given a directory with a service "testWithImplementations"
    Given an implemenation "implementationA" in service "testWithImplementations"
    Given an implemenation "implementationB" in service "testWithImplementations"
    When I use service "testWithImplementations" with "implementationA"
    Then I see result "result A" for service "testWithImplementations"
