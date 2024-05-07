package com.skilldistillery.eventtracker.services;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.skilldistillery.eventtracker.entities.City;
import com.skilldistillery.eventtracker.repositories.CityPageableRepository;

@Service
public class CityPageableServiceImpl implements CityPageableService {

	private CityPageableRepository cityPageableRepository;

	public CityPageableServiceImpl(CityPageableRepository cityPageableRepository) {
		this.cityPageableRepository = cityPageableRepository;
	}

	public Page<City> findAll(int pageNumber, int pageSize) {
		Pageable pageable = PageRequest.of(pageNumber, pageSize);
		return cityPageableRepository.findAll(pageable);
	}

}
