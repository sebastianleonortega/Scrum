package com.wposs.scrum_back.userstorystatus.service;

import com.wposs.scrum_back.userstorystatus.dto.UserStoryStatusDto;
import com.wposs.scrum_back.userstorystatus.repository.UserStoryStatusRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class UserStoryStatusServiceImpl implements UserStoryStatusService {
    @Autowired
    private UserStoryStatusRepository userStoryStatusRepository;
    @Autowired
    private ModelMapper modelMapper;

    @Override
    public List<UserStoryStatusDto> gatAll() {
        return userStoryStatusRepository.findAll().stream().map(userStoryStatusRepository1 -> {
            return modelMapper.map(userStoryStatusRepository1,UserStoryStatusDto.class);
        }).collect(Collectors.toList());
    }
}
