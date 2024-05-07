package com.skilldistillery.eventtracker.entities;

import java.util.Objects;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "city")
public class CityLocation {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;

	@Column(name = "city")
	private String city;

	@Column(name = "state_name")
	private String state;

	@Column(name = "county_name")
	private String county;

	@Column(name = "lat")
	private Double lat;

	@Column(name = "lng")
	private Double lng;

	public CityLocation() {
		super();
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getCity() {
		return city;
	}

	public void setCity(String city) {
		this.city = city;
	}

	public String getState() {
		return state;
	}

	public void setState(String state) {
		this.state = state;
	}

	public String getCounty() {
		return county;
	}

	public void setCounty(String county) {
		this.county = county;
	}

	public Double getLat() {
		return lat;
	}

	public void setLat(Double lat) {
		this.lat = lat;
	}

	public Double getLng() {
		return lng;
	}

	public void setLng(Double lng) {
		this.lng = lng;
	}

	@Override
	public String toString() {
		return "CityLocation [id=" + id + ", city=" + city + ", state=" + state + ", county=" + county + ", lat=" + lat
				+ ", lng=" + lng + "]";
	}

	@Override
	public int hashCode() {
		return Objects.hash(city, county, id, lat, lng, state);
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		CityLocation other = (CityLocation) obj;
		return Objects.equals(city, other.city) && Objects.equals(county, other.county) && id == other.id
				&& Objects.equals(lat, other.lat) && Objects.equals(lng, other.lng)
				&& Objects.equals(state, other.state);
	}

}
