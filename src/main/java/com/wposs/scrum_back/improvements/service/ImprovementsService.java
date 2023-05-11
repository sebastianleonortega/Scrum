package com.wposs.scrum_back.improvements.service;

import com.wposs.scrum_back.improvements.dto.ImprovementsDto;

import java.util.List;
import java.util.UUID;

public interface ImprovementsService {
    List<ImprovementsDto> getAllImprovements();
    ImprovementsDto saveImprovements(ImprovementsDto improvementsDto);
    Boolean deleteImprovements(UUID idImprovements);
}
