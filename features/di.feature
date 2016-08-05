Feature: DI system

  As a developer I want to be able to build
  a set of dependencies for my project

  Scenario: I see the parsed dependencies from a directory
    Given a directory with a service "test"
    When I start the application
    Then I am able to use the "test" dependency in my internal service

