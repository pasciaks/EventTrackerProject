package com.skilldistillery.eventtracker.services;

import org.springframework.data.domain.Page;

import com.skilldistillery.eventtracker.entities.City;

public interface CityPageableService {

	Page<City> findAll(int pageNumber, int pageSize);

}
