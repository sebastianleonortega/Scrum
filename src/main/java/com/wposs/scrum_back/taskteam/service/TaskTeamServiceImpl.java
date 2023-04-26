package com.wposs.scrum_back.taskteam.service;

import com.wposs.scrum_back.Exception.exceptions.MessageGeneric;
import com.wposs.scrum_back.Exception.exceptions.RequestException;
import com.wposs.scrum_back.taskteam.dto.TaskTeamDto;
import com.wposs.scrum_back.taskteam.entity.TaskTeam;
import com.wposs.scrum_back.taskteam.repository.TaskTeamRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class TaskTeamServiceImpl implements TaskTeamService{
    @Autowired
    private TaskTeamRepository taskTeamRepository;
    @Autowired
    private ModelMapper modelMapper;

    @Override
    public List<TaskTeamDto> getAllTaskTeam() {
        return taskTeamRepository.getAllTaskTeam().stream().map(taskTeam -> {
            return modelMapper.map(taskTeam,TaskTeamDto.class);
        }).collect(Collectors.toList());
    }

    @Override
    public List<TaskTeamDto> getTaskTeamToIdTeam(UUID idTeam) {
        return taskTeamRepository.getByIdTeam(idTeam).stream().map(taskTeam -> {
            return modelMapper.map(taskTeam,TaskTeamDto.class);
        }).collect(Collectors.toList());
    }

    @Override
    public Optional<TaskTeamDto> getTaskTeamById(UUID idTaskTeam) {
        return Optional.ofNullable(taskTeamRepository.findById(idTaskTeam)
                .map(taskTeam ->modelMapper.map(taskTeam,TaskTeamDto.class))
                .orElseThrow(()->new MessageGeneric("No esta disponible la Tarea del Equipo que esta solicitando","404", HttpStatus.NOT_FOUND)));
    }

    @Override
    public TaskTeamDto saveTaskTeam(TaskTeamDto taskTeamDto) {
        TaskTeam taskTeam = modelMapper.map(taskTeamDto,TaskTeam.class);
        if (taskTeamRepository.existsByTaskTeamNameAndIdTeam(taskTeam.getTaskTeamName(),taskTeam.getIdTeam())){
            throw new MessageGeneric("Ya se encuentra la tarea: "+taskTeam.getTaskTeamName()+" asociada al mismo equipo ","409",HttpStatus.CONFLICT);
        }
        try {
            return modelMapper.map(taskTeamRepository.save(taskTeam),TaskTeamDto.class);
        }catch (Exception ex){
            throw new RequestException("Surjio un error al intertar Registrara la Tarea,Json mal estructurado","400",HttpStatus.BAD_REQUEST);
        }
    }

    @Override
    public TaskTeamDto updateTaskTeam(UUID idTasTeam, TaskTeamDto taskTeamDto) {
        return taskTeamRepository.findById(idTasTeam).map(taskTeam -> {
            taskTeam.setTaskTeamName((taskTeamDto.getTaskTeamName()!=null)? taskTeamDto.getTaskTeamName() : taskTeam.getTaskTeamName());
            taskTeam.setTeamId((taskTeamDto.getIdTeam()!=null)?taskTeamDto.getIdTeam():taskTeam.getTeamId());
            return modelMapper.map(taskTeamRepository.save(taskTeam),TaskTeamDto.class);
        }).orElseThrow(()->new MessageGeneric("Error,No se encontro la Tarea a Actualizar","404",HttpStatus.NOT_FOUND));
    }

    @Override
    public Boolean deleteTaskTeam(UUID idTasTeam) {
        if(this.getTaskTeamById(idTasTeam).isPresent()){
            taskTeamRepository.deleteById(idTasTeam);
            return true;
        }
        return false;
    }
}
