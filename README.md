# EventTrackerProject

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

| HTTP Verb | URI             | Request Body                                       | Response Body                                   | Purpose                              |
| --------- | --------------- | -------------------------------------------------- | ----------------------------------------------- | ------------------------------------ |
| GET       | `/api/ping`     |                                                    | Text `pong`                                     | **Test** endpoint                    |
| GET       | `/api/cities`   |                                                    | List containing Representation of _city_ entity | **Retrieve** **List** City endpoint  |
| POST      | `/api/cities`   | Representation of a new _city_ resource            | Representation of _city_ entity                 | **Create** City endpoint             |
| PUT       | `/api/cities/1` | Representation of updates of a _city_ resource `1` | Representation of _city_ entity                 | **Replace** City endpoint            |
| PATCH     | `/api/cities/1` | Representation of updates of a _city_ resource `1` | Representation of _city_ entity                 | **Update** City endpoint             |
| DELETE    | `/api/cities/1` |                                                    | No content                                      | **Delete** City endpoint             |
| GET       | `/api`          |                                                    | Description of the API and its endpoints        | API **Index** Documentation endpoint |

# API Maturity

- Care has been taken to create this as a Mature API reflecting the principals of the Richardson maturity model.

```
A model (developed by Leonard Richardson) that breaks down the principal elements of a REST approach into three steps. These introduce resources, http verbs, and hypermedia controls.
```

```Java
	// Get one city by id
	@GetMapping("cities/{id}")
	public City show(int id, HttpServletResponse response) {

		City foundCity = null;

		foundCity = cityService.findById(id);

		if (foundCity == null) {
			response.setStatus(HttpServletResponse.SC_NOT_FOUND); // 404
		} else {
			response.setStatus(HttpServletResponse.SC_OK); // 200
		}

		return foundCity;
	}
```

#### Deployment

- Private Reference: https://github.com/SkillDistillery/SD43/blob/main/rest/EventTracker/bootDeployment.md

<hr>

[About The Developer (Sheldon Pasciak)](https://www.linkedin.com/in/sheldonpasciak/)
