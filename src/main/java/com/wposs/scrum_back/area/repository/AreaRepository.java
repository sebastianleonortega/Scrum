package com.wposs.scrum_back.area.repository;

import com.wposs.scrum_back.area.entity.Area;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface AreaRepository extends JpaRepository<Area, UUID> {

    Boolean existsByAreaName(String areaName);


}
