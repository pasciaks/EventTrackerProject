package com.skilldistillery.eventtracker.services;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.skilldistillery.eventtracker.entities.City;
import com.skilldistillery.eventtracker.entities.CityLocation;
import com.skilldistillery.eventtracker.repositories.CityRepository;

@Service
public class CityServiceImpl implements CityService {

	private CityRepository cityRepo;

	public CityServiceImpl(CityRepository cityRepo) {
		this.cityRepo = cityRepo;
	}

	@Override
	public City findById(int cityId) {

		City foundCity = null;

		Optional<City> cityOpt = cityRepo.findById(cityId);

		if (cityOpt.isPresent()) {
			foundCity = cityOpt.get();
		}

		return foundCity;
	}

	@Override
	public List<City> findAll() {

		return cityRepo.findAll();

	}

	@Override
	public City create(City city) {

		City createdCity = null;

		try {
			createdCity = cityRepo.saveAndFlush(city);
		} catch (Exception e) {
			e.printStackTrace();
		}

		return createdCity;
	}

	@Override
	public City update(int cityId, City city) {

		City updatedCity = null;

		Optional<City> cityOpt = cityRepo.findById(cityId);

		if (cityOpt.isPresent()) {
			City managedCity = cityOpt.get();

			managedCity.setCity(city.getCity());
			managedCity.setState(city.getState());
			managedCity.setCounty(city.getCounty());
			managedCity.setLat(city.getLat());
			managedCity.setLng(city.getLng());
			managedCity.setPopulation(city.getPopulation());
			managedCity.setDensity(city.getDensity());
			managedCity.setTimezone(city.getTimezone());
			managedCity.setRanking(city.getRanking());
			managedCity.setZips(city.getZips());

			updatedCity = cityRepo.saveAndFlush(managedCity);
		}

		return updatedCity;
	}

	@Override
	public boolean delete(int cityId) {

		boolean wasDeleted = false;

		Optional<City> cityOpt = cityRepo.findById(cityId);

		if (!cityOpt.isPresent()) {
			wasDeleted = false;
			return wasDeleted;
		}

		try {
			cityRepo.deleteById(cityId);
			wasDeleted = true;
		} catch (Exception e) {
			wasDeleted = false;
			e.printStackTrace();
		}

		return wasDeleted;

	}

	@Override
	public List<String> findDistinctState() {

		List<City> citiesInNewYork = cityRepo.findCityByStateOrderByCityAsc("New York");
		List<String> states = null;
		states = cityRepo.findDistinctState();
		return states;
	}

	@Override
	public List<City> findCityByStateOrderByCityAsc(String state) {
		List<City> citiesByState = cityRepo.findCityByStateOrderByCityAsc(state);
		return citiesByState;
	}

	@Override
	public List<CityLocation> findAllCityLocationLatLng(String search) {
		List<CityLocation> cities = cityRepo.findAllCityLocationLatLng(search);
		return cities;
	}

	@Override
	public List<Object[]> findAvgPopulationByState() {
		List<Object[]> avgPopByState = cityRepo.findAvgPopulationByState();
		return avgPopByState;
	}

	@Override
	public List<Object[]> findSumPopulationByState() {
		List<Object[]> sumPopByState = cityRepo.findSumPopulationByState();
		return sumPopByState;
	}

	@Override
	public List<Object[]> findCityCountByState() {
		List<Object[]> cityCountByState = cityRepo.findCityCountByState();
		return cityCountByState;
	}

	@Override
	public List<Object[]> findCityDistances(double givenLat, double givenLng, double howFar) {
		List<Object[]> cityDistances = cityRepo.findCityDistances(givenLat, givenLng, howFar);
		return cityDistances;
	}

	@Override
	public Double findCityDistance(int cityId, double givenLat, double givenLng) {
		Double cityDistance = cityRepo.findCityDistance(cityId, givenLat, givenLng);
		return cityDistance;
	}

}
