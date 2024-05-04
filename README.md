# EventTrackerProject - Sheldon Pasciak, Skill Distillery, May the 4th be with you, 2024!

![Dataset Credits](0.png)

### Overview

'Event Tracker' is a broad term for anything that keeps track of information over time.

This project will use a MySQL database to practice the concepts of a well formed REST API. Included will be the prinicpal route handlers common for API Development.

This application includes an 'creative commons' dataset of over 31k Cities which are used with the API to demonstrate the REST API methods and data gathering.

### Learning Objectives

- Create a JPA Project

  - Create a Java entity class POJO that models your database table.
  - Map your POJO using JPA.

- Configure a Spring Boot app to publish a REST API.
  - Use Spring REST annotations.
  - Use Spring Data JPA to perform all CRUD operations.
  - Send and receive JSON.

# Credits

- The dataset that was used to populate the 31k + cities for this project was downloaded for free from https://simplemaps.com/data/us-cities.
- This dataset (free version) asks that the source be linked and is therefore noted here.
- If you use the Basic (free) database, you must link back to this page: https://simplemaps.com/data/us-cities from a public webpage where you are using the data.
- If you want to use the data internally, you must link back to this page from your firm's website on a page that can be easily found though links on the root domain.
- The link must be clearly visible to the human eye.

![Dataset Credits](1.png)

# Technologies Used

- Java
- MySql
- Spring Boot
- JPA

# Lessons Learned

- Practice of complete REST API Development.
- Deploying Spring Boot application and Database to Tomcat10/Apache server hosted on AWS.

# API Routes / REST Endpoints

| HTTP Verb | URI                          | Request Body                                   | Response Body                            | Purpose                                |
| --------- | ---------------------------- | ---------------------------------------------- | ---------------------------------------- | -------------------------------------- |
| GET       | `/api`                       |                                                | Description of the API and its endpoints | API **Index**                          |
| GET       | `/api/ping`                  |                                                | Text `pong`                              | **Test** endpoint                      |
| GET       | `/api/cities`                |                                                | List < City >                            | **Retrieve** **List** City endpoint    |
| POST      | `/api/cities`                | Representation of a new _city_ resource        | { City }                                 | **Create** City endpoint               |
| PUT       | `/api/cities/{id}`           | Representation of updates to a _city_ resource | { City }                                 | **Replace** / **Update** City endpoint |
| DELETE    | `/api/cities/{id}`           |                                                | No content                               | **Delete** City endpoint               |
| GET       | `/api/cities/states`         |                                                | List < String > states                   | State Names endpoint                   |
| GET       | `/api/cities/states/{state}` |                                                | List < City > cities                     | List of cities in state endpoint       |

# API Maturity

- Care has been taken to create this as a Mature API reflecting the principals of the Richardson maturity model.

```
A model (developed by Leonard Richardson) that breaks down the principal elements of a REST approach into three steps. These introduce resources, http verbs, and hypermedia controls.
```

```Java

	// Create a city
	@PostMapping("cities")

	public City create(@RequestBody City city, HttpServletRequest request, HttpServletResponse response) {

		City createdCity = cityService.create(city);

		if (createdCity == null) {
			response.setStatus(HttpServletResponse.SC_BAD_REQUEST); // 400
		} else {
			response.setStatus(HttpServletResponse.SC_CREATED); // 201
			response.setHeader("Location", request.getRequestURL().append("/").append(createdCity.getId()).toString());

		}

		return createdCity;

	}

```

### API Endpoint tests/sample screenshots.

# Endpoint Sample: POSTMAN COLLECTION

![endpoint example](2.png)

# Endpoint Sample: /api/ping - TEST

![endpoint example](3.png)

# Endpoint Sample: /api - DOCUMENTATION

![endpoint example](4.png)

# Endpoint Sample: /api/cities - GET ALL CITIES

![endpoint example](5.png)

# Endpoint Sample: /api/cities/states - GET DISTINCT LIST OF STATES

![endpoint example](6.png)

# Endpoint Sample: /api/cities/states/New Hampshire - GET CITIES in a SPECIFIC STATE

![endpoint example](6b.png)

# Endpoint Sample: /api/cities/{cityId} - GET ONE CITY

![endpoint example](7.png)

# Endpoint Sample: /api/cities - CREATE CITY

![endpoint example](8.png)

# Endpoint Sample: /api/cities - CREATE CITY - MATURELY UPDATES 201 HEADER - HATEOAS

![endpoint example](8b.png)

# Endpoint Sample: /api/cities - UPDATE CITY

![endpoint example](9.png)

# Endpoint Sample: /api/cities/{cityId} - (SUCCESSFUL DELETE EXAMPLE)

![endpoint example](10.png)

# Endpoint Sample: /api/cities/{cityId} - (UNSUCCESSFUL DELETE EXAMPLE)

![endpoint example](11.png)

# JUnit and Gradle Tests Passing

![JUnit example](j1.png)

# JUnit and Gradle Tests Passing

![Gradle example](j2.png)

#### Deployment

- Private Reference: https://github.com/SkillDistillery/SD43/blob/main/rest/EventTracker/bootDeployment.md

![Deployed](live1.png)

![Deployed](live2.png)

![Deployed](live0.png)

<hr>

[About The Developer (Sheldon Pasciak)](https://www.linkedin.com/in/sheldonpasciak/)
