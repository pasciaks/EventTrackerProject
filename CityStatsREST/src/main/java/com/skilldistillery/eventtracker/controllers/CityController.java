package com.skilldistillery.eventtracker.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.skilldistillery.eventtracker.entities.City;
import com.skilldistillery.eventtracker.entities.CityLocation;
import com.skilldistillery.eventtracker.services.CityPageableService;
import com.skilldistillery.eventtracker.services.CityService;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@RestController
@RequestMapping("api")
public class CityController {

	private CityService cityService;

	@Autowired
	private CityPageableService cityPageableService;

	public CityController(CityService cityService) {
		this.cityService = cityService;
	}

	// Always use plural URI names for end points

	/*
	 * When returning documentation for a REST API endpoint at the route /api using
	 * the HTTP GET method, the content you return should typically be in a format
	 * that's easy for developers to consume and understand. Here are a few options:
	 * 
	 * OpenAPI (formerly Swagger) Specification: Return the OpenAPI specification
	 * document in JSON or YAML format. This document provides a detailed
	 * description of your API endpoints, including paths, parameters, request and
	 * response schemas, authentication requirements, and more. Developers can use
	 * this document to generate client SDKs, documentation, and even perform
	 * automated testing. API Blueprint: Similar to OpenAPI, API Blueprint is
	 * another format for describing APIs. You can return your API documentation in
	 * API Blueprint format, which is a Markdown-based format. Tools like Apiary or
	 * Aglio can parse API Blueprint documents and generate documentation. HTML
	 * Documentation: Return HTML documentation that describes your API endpoints.
	 * This documentation can include details such as endpoint paths, supported
	 * methods, request and response schemas, example requests and responses,
	 * authentication details, and usage guidelines. Markdown Documentation: Return
	 * Markdown files that describe your API endpoints. Markdown is a lightweight
	 * markup language that's easy to read and write. Developers can view Markdown
	 * documentation in any text editor or render it into HTML for better
	 * readability.
	 */
	@GetMapping("")
	public String docs(HttpServletResponse response) {
		response.setStatus(HttpServletResponse.SC_OK); // 200
		response.setContentType("text/html");
		return "https://github.com/pasciaks/EventTrackerProject#readme";
	}

	@GetMapping("ping")
	public String ping(HttpServletResponse response) {
		response.setStatus(HttpServletResponse.SC_OK); // 200
		return "pong";
	}

	@GetMapping("cities")
	public List<City> index(HttpServletResponse response) {
		response.setStatus(HttpServletResponse.SC_OK); // 200
		return cityService.findAll();
	}

	// Get one city by id
	@GetMapping("cities/{cityId}")
	public City show(@PathVariable("cityId") int cityId, HttpServletResponse response) {

		City foundCity = null;

		foundCity = cityService.findById(cityId);

		if (foundCity == null) {
			response.setStatus(HttpServletResponse.SC_NOT_FOUND); // 404
		} else {
			response.setStatus(HttpServletResponse.SC_OK); // 200
		}

		return foundCity;
	}

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

	// Update a city
	@PutMapping("cities/{cityId}")
	public City update(@PathVariable("cityId") int cityId, @RequestBody City city, HttpServletRequest request,
			HttpServletResponse response) {
		City updatedCity = cityService.update(cityId, city);
		if (updatedCity == null) {
			response.setStatus(HttpServletResponse.SC_NOT_FOUND);
		} else {
			response.setStatus(HttpServletResponse.SC_OK);
			response.setHeader("Location", request.getRequestURL().toString());
		}
		return updatedCity;
	}

	// Delete a city
	@DeleteMapping("cities/{cityId}")
	public void delete(@PathVariable("cityId") int cityId, HttpServletResponse response) {
		if (cityService.delete(cityId)) {
			response.setStatus(HttpServletResponse.SC_NO_CONTENT); // 204 is the status code for successful delete
		} else {
			response.setStatus(HttpServletResponse.SC_NOT_FOUND); // 404 is the status for not found or delete failed
		}
	}

	// Get all distinct states
	@GetMapping("cities/states")
	public List<String> findDistinctStateNames(HttpServletResponse response) {
		response.setStatus(HttpServletResponse.SC_OK); // 200
		return cityService.findDistinctState();
	}

	// Get all cities in one state
	@GetMapping("cities/states/{state}")
	public List<City> findDistinctStateNames(@PathVariable("state") String state, HttpServletResponse response) {
		response.setStatus(HttpServletResponse.SC_OK); // 200
		return cityService.findCityByStateOrderByCityAsc(state);
	}

	// Get all cities with lat and lng coordinates and city name only
	// get string from query parameter
	@GetMapping("cities/coordinates")
	public List<CityLocation> findAllCityLatLngCoordinates(
			@RequestParam(value = "city", required = false) String searchByCityName, HttpServletResponse response) {
		response.setStatus(HttpServletResponse.SC_OK); // 200
		if (searchByCityName == null) {
			searchByCityName = "";
		}
		List<CityLocation> cityLocations = cityService.findAllCityLocationLatLng(searchByCityName);
		return cityLocations;
	}

	@GetMapping("/citypages")
	public Page<City> getEntities(
			@RequestParam(value = "pageNumber", required = false, defaultValue = "0") int pageNumber,
			@RequestParam(value = "pageSize", required = false, defaultValue = "10") int pageSize) {
		return cityPageableService.findAll(pageNumber, pageSize);
	}

}
