package com.skilldistillery.eventtracker.services;

import java.util.List;

import com.skilldistillery.eventtracker.entities.City;
import com.skilldistillery.eventtracker.entities.CityLocation;

public interface CityService {

	City findById(int cityId);

	List<City> findAll();

	City create(City city);

	City update(int cityId, City city);

	boolean delete(int cityId);

	List<String> findDistinctState();

	List<City> findCityByStateOrderByCityAsc(String state);

	List<CityLocation> findAllCityLocationLatLng(String search);

	// select average population from city group by state
	List<Object[]> findAvgPopulationByState();

	// select sum of population from city group by state
	List<Object[]> findSumPopulationByState();

	// count of cities in each state
	List<Object[]> findCityCountByState();

	// city distance
	List<Object[]> findCityDistances(double givenLat, double givenLng, double howFar);

}
