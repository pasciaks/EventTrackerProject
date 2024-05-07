package com.skilldistillery.eventtracker.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.skilldistillery.eventtracker.entities.City;
import com.skilldistillery.eventtracker.entities.CityLocation;

public interface CityRepository extends JpaRepository<City, Integer> {

	List<City> findCityByPopulationGreaterThan(int population);

	List<City> findCityByPopulationLessThan(int population);

	List<City> findCityByPopulationBetween(int low, int high);

	List<City> findCityByTimezoneLike(String timezone);

	List<City> findCityByZipsContaining(String zip);

	@Query("SELECT DISTINCT c.state FROM City c order by c.state asc")
	List<String> findDistinctState();

	List<City> findCityByStateOrderByCityAsc(String state);

	@Query("SELECT cl FROM CityLocation cl WHERE cl.city LIKE %:search% ORDER BY cl.city ASC")
	List<CityLocation> findAllCityLocationLatLng(@Param("search") String search);

}
