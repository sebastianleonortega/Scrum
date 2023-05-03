package com.wposs.scrum_back.board.service;

import com.wposs.scrum_back.Exception.exceptions.InternalServerException;
import com.wposs.scrum_back.Exception.exceptions.MessageGeneric;
import com.wposs.scrum_back.board.dto.BoardDto;
import com.wposs.scrum_back.board.entity.Board;
import com.wposs.scrum_back.board.repository.BoardRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class BoardServiceImpl implements BoardService{
    @Autowired
    private ModelMapper modelMapper;
    @Autowired
    private BoardRepository boardRepository;

    @Override
    public BoardDto saveBoard(BoardDto boardDto) {
        Board board = modelMapper.map(boardDto,Board.class);
        if (!boardRepository.existsByIdTeamAndIdUserStoryAndIdTaskTeamAndIdEmployee(board.getIdTeam(),board.getIdUserStory(),board.getIdTaskTeam(),board.getIdEmployee())){
            throw new MessageGeneric("Ya existe un tablero con la infomacion ingresada","409", HttpStatus.CONFLICT);
        }
        try {
            return modelMapper.map(boardRepository.save(board),BoardDto.class);
        }catch (Exception ex){
            throw new InternalServerException("error en el servidor,JSON mal estructurado","500",HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
