package com.skilldistillery.eventtracker.controllers;

import java.util.List;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.skilldistillery.eventtracker.entities.City;
import com.skilldistillery.eventtracker.services.CityService;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@RestController
@RequestMapping("api")
public class CityController {

	private CityService cityService;

	public CityController(CityService cityService) {
		this.cityService = cityService;
	}

	// Always use plural URI names for end points

	// Return a link to the README.md file to document the API
	// Consider HTML view instead of plain text
	@GetMapping("")
	public String docs(HttpServletResponse response) {
		response.setStatus(HttpServletResponse.SC_OK); // 200
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

	// Get one city
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

	// Create a city
	@PostMapping("cities")
	public City create(@RequestBody City city, HttpServletRequest request, HttpServletResponse response) {
		City createdCity = cityService.create(city);
		if (createdCity == null) {
			response.setStatus(HttpServletResponse.SC_BAD_REQUEST); // 400
		} else {
			response.setStatus(HttpServletResponse.SC_CREATED); // 201
			// set location to include full URL of new city
			response.setHeader("Location", request.getRequestURL().append("/").append(createdCity.getId()).toString());

		}
		return createdCity;

	}

	// Update a city
	@PutMapping("cities/{id}")
	public City update(@RequestBody City city, int id, HttpServletRequest request, HttpServletResponse response) {
		City updatedCity = cityService.update(id, city);
		if (updatedCity == null) {
			response.setStatus(HttpServletResponse.SC_NOT_FOUND);
		} else {
			response.setStatus(HttpServletResponse.SC_OK);
			// set location to include full URL of updated city
			response.setHeader("Location", request.getRequestURL().append("/").append(updatedCity.getId()).toString());
		}
		return updatedCity;
	}

	// Delete a city
	@DeleteMapping("cities/{id}")
	public void delete(int id, HttpServletResponse response) {
		if (cityService.delete(id)) {
			response.setStatus(HttpServletResponse.SC_NO_CONTENT); // 204 is the status code for successful delete
		} else {
			response.setStatus(HttpServletResponse.SC_NOT_FOUND); // 404 is the status code for not found or delete
																	// failed
		}
	}

}
