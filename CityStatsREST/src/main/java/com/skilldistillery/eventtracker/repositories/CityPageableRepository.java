package com.skilldistillery.eventtracker.repositories;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.PagingAndSortingRepository;

import com.skilldistillery.eventtracker.entities.City;

public interface CityPageableRepository extends PagingAndSortingRepository<City, Long> {
	Page<City> findAll(Pageable pageable);
}
