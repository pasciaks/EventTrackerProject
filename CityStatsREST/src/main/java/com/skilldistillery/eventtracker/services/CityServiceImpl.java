package com.skilldistillery.eventtracker.services;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.skilldistillery.eventtracker.entities.City;
import com.skilldistillery.eventtracker.repositories.CityRepository;

@Service
public class CityServiceImpl implements CityService {

	private CityRepository cityRepo;

	public CityServiceImpl(CityRepository cityRepo) {
		this.cityRepo = cityRepo;
	}

	@Override
	public City findById(int id) {

		City foundCity = null;

		Optional<City> cityOpt = cityRepo.findById(id);

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
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public City update(int id, City city) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public boolean delete(int id) {

		boolean wasDeleted = false;

		try {
			cityRepo.deleteById(id);
			wasDeleted = true;
		} catch (Exception e) {
			e.printStackTrace();
		}

		return wasDeleted;

	}

}
