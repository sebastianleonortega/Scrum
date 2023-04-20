package com.wposs.scrum_back.subProject.service;

import com.wposs.scrum_back.Exception.exceptions.InternalServerException;
import com.wposs.scrum_back.Exception.exceptions.MessageGeneric;
import com.wposs.scrum_back.subProject.dto.SubProjectDto;
import com.wposs.scrum_back.subProject.entity.SubProject;
import com.wposs.scrum_back.subProject.repository.SubProjectRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class SubProjectServiceImpl implements SubProjectService{
    @Autowired
    private SubProjectRepository subProjectRepository;
    @Autowired
    private ModelMapper modelMapper;

    @Override
    public List<SubProjectDto> gatAllSubProject() {
        return subProjectRepository.findAll().stream().map(subProject -> {
            return modelMapper.map(subProject,SubProjectDto.class);
        }).collect(Collectors.toList());
    }

    @Override
    public List<SubProjectDto> getSubProjectToProject(UUID idProject) {
        return subProjectRepository.getByProjectId(idProject).stream().map(subProject -> {
            return modelMapper.map(subProject,SubProjectDto.class);
        }).collect(Collectors.toList());
    }

    @Override
    public Optional<SubProjectDto> gatSubProjectId(UUID idSubProject) {
        return Optional.of(subProjectRepository.findById(idSubProject).map(subProject -> {
            return modelMapper.map(subProject,SubProjectDto.class);
        })).orElseThrow(()->new MessageGeneric("No se encuentra Disponible el SubProyecto Solicitado","404", HttpStatus.NOT_FOUND));
    }

    @Override
    public SubProjectDto saveSubProject(SubProjectDto subProjectDto) {
        SubProject subProject = modelMapper.map(subProjectDto,SubProject.class);
        Boolean subProjectDto1 = subProjectRepository.findBySubProjectName(subProject.getSubProjectName());
        /*if(subProjectRepository.existsBySubProjectName(subProjectDto.getProjectId(),subProjectDto.getSubProjectName())){
            System.out.println("hola");
        }*/
        /*if ((subProjectDto.getSubProjectName()!=null) && subProjectRepository.existsBySubProjectName(subProjectDto.getProjectId(),subProjectDto.getSubProjectName())){
            throw new MessageGeneric("Ya existe un SubProjecto con este nombre: "+subProjectDto.getProjectName(),"409",HttpStatus.CONFLICT);
        }*/
        try {
            return modelMapper.map(subProjectRepository.save(modelMapper.map(subProjectDto,SubProject.class)),SubProjectDto.class);
        }catch (Exception ex){
            throw new InternalServerException("Error inesperado al intentar registrar el SubProyecto,JSON mal estructurado","500",HttpStatus.INTERNAL_SERVER_ERROR);
        }
        //return null;
    }

    @Override
    public SubProjectDto updateSubProject(UUID idSubProject, SubProjectDto subProjectDto) {
        return subProjectRepository.findById(idSubProject).map(subProject -> {
            subProject.setSubProjectName((subProjectDto.getSubProjectName()!=null)?subProjectDto.getSubProjectName():subProject.getSubProjectName());
            subProject.setProjectId((subProjectDto.getProjectId()!=null)?subProjectDto.getProjectId():subProject.getProjectId());
            return modelMapper.map(subProjectRepository.save(subProject),SubProjectDto.class);
        }).orElseThrow(()->new MessageGeneric("Error, No se encontro el SubProjecto a Actualizar","404",HttpStatus.NOT_FOUND));
    }
}
