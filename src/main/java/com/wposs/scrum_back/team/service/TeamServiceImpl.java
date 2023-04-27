package com.wposs.scrum_back.team.service;

import com.wposs.scrum_back.Exception.exceptions.MessageGeneric;
import com.wposs.scrum_back.Exception.exceptions.RequestException;
import com.wposs.scrum_back.employe.dto.EmployeDto;
import com.wposs.scrum_back.team.dto.TeamDto;
import com.wposs.scrum_back.team.entity.Team;
import com.wposs.scrum_back.team.repository.TeamRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class TeamServiceImpl implements TeamService{
    @Autowired
    private TeamRepository teamRepository ;
    @Autowired
    private ModelMapper modelMapper;
    @Override
    public List<TeamDto> getAllTeam() {
        return teamRepository.findAll().stream().map(team -> {
            return modelMapper.map(team,TeamDto.class);
        }).collect(Collectors.toList());
    }

    @Override
    public List<TeamDto> getTeamToArea(UUID idArea) {
        return teamRepository.getByAreaId(idArea).stream().map(team -> {
            return modelMapper.map(team,TeamDto.class);
        }).collect(Collectors.toList());
    }

    @Override
    public Optional<TeamDto> getTeamByiId(UUID idTeam) {
        return Optional.ofNullable(teamRepository.findById(idTeam).map(team -> {
            return modelMapper.map(team,TeamDto.class);
        }).orElseThrow(()->new MessageGeneric("No esta disponible el Equipo que esta solcitando","404", HttpStatus.NOT_FOUND)));
    }

    @Override
    public TeamDto saveTeam(TeamDto teamDto) {
        Team team = modelMapper.map(teamDto,Team.class);
        if (teamRepository.existsByTeamName(team.getTeamName())){
            throw new MessageGeneric("Ya se encuentra Registrada una Historia de Usuario: "+team.getTeamName()+" Registrada","409",HttpStatus.CONFLICT);
        }
        try {
            return modelMapper.map(teamRepository.save(team),TeamDto.class);
        }catch (Exception ex){
            throw new RequestException("Surjio un error al intentar Registrar el equipo,JSON mal estructurado","400",HttpStatus.BAD_REQUEST);
        }
    }

    @Override
    public TeamDto updateTeam(UUID idTeam, TeamDto teamDto) {
        return teamRepository.findById(idTeam).map(team -> {
            team.setTeamName((teamDto.getTeamName()!=null)?teamDto.getTeamName():team.getTeamName());
            team.setAreaId((teamDto.getAreaId()!=null)?teamDto.getAreaId():team.getTeamId());
            return modelMapper.map(teamRepository.save(team),TeamDto.class);
        }).orElseThrow(()-> new MessageGeneric("Error al intentar actualizar el Equipo no esta Disponible","404",HttpStatus.NOT_FOUND));
    }

    @Override
    public List<EmployeDto> saveEmployeToTeam(List<UUID> employeId, UUID idTeam) {
        Optional<Team> team = teamRepository.findById(idTeam);
        if (teamRepository.findById(idTeam).isPresent()){

        }
        return null;
    }


}
