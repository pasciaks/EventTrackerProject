# EventTrackerProject

### Overview

'Event Tracker' is a broad term for anything that keeps track of information over time. Examples of these applications are 'Mint' (financial tracking) and 'MyFitnessPal' (diet and exercise tracker). These are very involved applications with a huge feature set.

You are embarking on a weekend project that you may or may not come back to afterwards, thus we would caution you to limit your scope significantly. Examples of limited scope would be 'Gas Tracker' (keep track of your fill ups and total mileage to determine dollar/gallon in your car) or 'Timesheet' (track time in and time out to calculate total hours at some rate of pay).

### Learning Objectives

- Create a JPA Project

  - Create a Java entity class POJO that models your database table.
  - Map your POJO using JPA.

- Configure a Spring Boot app to publish a REST API.
  - Use Spring REST annotations.
  - Use Spring Data JPA to perform all CRUD operations.
  - Send and receive JSON.

# Description

# Technologies Used

# Lessons Learned

# API Routes

## REST Endpoints

| HTTP Verb | URI                | Request Body                                   | Response Body                                         | Purpose                             |
| --------- | ------------------ | ---------------------------------------------- | ----------------------------------------------------- | ----------------------------------- |
| GET       | `/api/v1/books`    |                                                | Collection of representations of all _book_ resources | **List** or **collection** endpoint |
| GET       | `/api/v1/books/17` |                                                | Representation of _book_ `17`                         | **Retrieve** endpoint               |
| POST      | `/api/v1/books`    | Representation of a new _book_ resource        | Description of the result of the operation            | **Create** endpoint                 |
| PUT       | `/api/v1/books/17` | Representation of a new version of _book_ `17` |                                                       | **Replace** endpoint                |
| PATCH     | `/api/v1/books/17` | Description of changes to make to _book_ `17`  |                                                       | **Update** endpoint                 |
| DELETE    | `/api/v1/books/17` |                                                |                                                       | **Delete** route                    |
| GET       | `/api/v1`          |                                                | Description of the API and its endpoints              | **Index** endpoint                  |

#### Stub and test your entity

1. Choose an approriate package name for your project and change the `<class>` declaration with a new package name and the name of your entity class.
1. Create the new package and entity class in `src/main/java`.
1. Add the id field and one other field in the class (leave the rest for later).
1. Add no-arg ctor, gets/sets, toString, etc.
1. Annotate your entity.
1. Create a matching package under `src/test/java` and create a new JUnit test case for your entity.
1. Build out the JUnit test until it passes.

### Create a Spring Boot REST Project for your REST API controller(s), service, and Spring Data JPA repository

1. Copy the base package name from your entity class (the package name up to but not including `.entities`)
1. Create a new _Spring Starter Project_.
1. Paste the base package name into the _Package_ field.
1. Give the project an appropriate name (this project name will appear in the URL once you deploy the project.)
1. Set the build _Type_ to **Gradle** and _Packaging_ to **War**.
1. Add the _Spring Web_, _Spring Data JPA_, and _MySQL Driver_ dependencies.
1. Edit the boot projects `settings.gradle` and `build.gradle` to add the JPA project dependency.
1. Copy `application.properties` from XtremeRest; pick an unused port number, and change the database connect information (schema name in URL, username, and password) to match your schema.

### Where to start?

1. Finish building out your entity table(s) in MySQL workbench.
1. Finish building and testing your Java entity class to match.
1. Create repository(s), service(s), and REST controller(s).
1. Create controller and service logic to perform the basic CRUD operations of a REST API.
   - Test these routes using _Postman_
1. Deploy your project to your EC2 instance, and link to it from your portfolio web site.

### Goal

Your objective for this project should be to do as much as you can. That is not to say as many features, but as much as you actually understand.

Do not move onto the next step until you actually know what you just did and feel comfortable with what is happening. If you reach a point and are confused about what you are doing, or what you have done, ask questions, look for resources, or start over on that piece to ensure that you are comfortable with it.

Make sure to commit and push once you have an MVP with full CRUD operations working.

##### Stretch Goals

- JUnit tests for your repository, service, and controller layers.
- Supplemental tables, mappings, and controller routes for nested CRUD.

#### Grading

This is a graded project. You are expected to have your project completed by noon on Monday.

Your project must be pushed to a Github repo named **EventTrackerProject**.

You must include a _README.md_ that describes your program and how to access it on AWS. This must document your REST route URIs and HTTP methods, and what they do.

You must also deploy your app to your AWS server.

You will be given either a pass or fail based on whether your code works given all of the following test conditions:

- A new event object implements full CRUD.
- All interactions with the database are done so RESTfully.

If the project does work with all of the above test conditions, you will be given a _1_ for this week's project.

If the project does not work with the above test conditions, you will be given a _0_ for this week's project.

If you get a zero on the project, you can upgrade to a score of _.5_ if you turn in a working project by the start of class the following Monday morning AND notify an instructor that you wish to get partial credit.

#### Deployment

- [Deploying Spring Boot Apps](bootDeployment.md)

<hr>

[Up](../README.md) | [Next](bootDeployment.md)
