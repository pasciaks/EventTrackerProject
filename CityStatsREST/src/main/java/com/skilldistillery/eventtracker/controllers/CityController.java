package com.skilldistillery.eventtracker.controllers;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.skilldistillery.eventtracker.services.CityService;

import jakarta.servlet.http.HttpServletResponse;

@RestController
@RequestMapping("api")
public class CityController {

	private CityService cityService;

	public CityController(CityService cityService) {
		this.cityService = cityService;
	}

	@GetMapping("ping")
	public String ping(HttpServletResponse response) {
		response.setStatus(200);
		return "pong";
	}

}
