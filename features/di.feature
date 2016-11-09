Feature: DI system

  As a developer I want to be able to inject
  a set of 'lab-' prefixed services for my project

  Scenario: I see the parsed dependencies from a directory
    Given a directory with a lab- prefixed service "lab-test"
    When I inicialize the DI
    Then I am able to use the "lab-test" dependency in my internal service

  Scenario: I can use different implementations of a registered service
    Given a directory with a lab- prefixed service "lab-testWithImplementations"
    Given an implemenation "implementationA" in service "lab-testWithImplementations"
    Given an implemenation "implementationB" in service "lab-testWithImplementations"
    When I inicialize the DI
    Then I see result "result A" for service "lab-testWithImplementations" with implementation "implementationA"

  Scenario: I can not register a non-lab- prefixed module
    Given a directory without a lab- prefix "other-module" exists
    When I inicialize the DI
    Then I see the module "other-module" is undefined in the di

