package com.skilldistillery.eventtracker.services;

import java.util.List;

import com.skilldistillery.eventtracker.entities.City;

public interface CityService {

	// findById
	// findAll
	// create
	// update
	// delete

	City findById(int id);

	List<City> findAll();

	City create(City city);

	City update(int id, City city);

	void delete(int id);

}
