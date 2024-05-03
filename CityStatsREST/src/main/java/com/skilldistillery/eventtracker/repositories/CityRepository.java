package com.skilldistillery.eventtracker.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.skilldistillery.eventtracker.entities.City;

public interface CityRepository extends JpaRepository<City, Integer> {

	// City findCityById(int id);

	// List<City> findCityByState(String state);

	// List<City> findCityByPopulationGreaterThan(int population);

	// List<City> findCityByPopulationLessThan(int population);

	// List<City> findCityByPopulationBetween(int low, int high);

	// List<City> findCityByTimezoneLike(String timezone);

	// List<City> findCityByZipsContaining(String zip);

}
