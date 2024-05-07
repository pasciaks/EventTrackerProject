package com.skilldistillery.eventtracker.services;

import java.util.List;

import com.skilldistillery.eventtracker.entities.City;

public interface CityService {

	City findById(int cityId);

	List<City> findAll();

	City create(City city);

	City update(int cityId, City city);

	boolean delete(int cityId);

	List<String> findDistinctState();

	List<City> findCityByStateOrderByCityAsc(String state);

	List<City> findAllCityLatLng(String search);

}
