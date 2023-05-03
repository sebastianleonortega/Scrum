package com.wposs.scrum_back.board.service;

import com.wposs.scrum_back.board.dto.BoardDto;
import com.wposs.scrum_back.board.repository.BoardRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
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
    public List<?> getAllBoard(UUID idTeam) {
       // return boardRepository.getAllBoard(idTeam);
        /*return boardRepository.getAllBoard(idTeam).stream()
                .map(board -> modelMapper.map(board,BoardDto.class)).collect(Collectors.toList());*/
        return null;
    }

    @Override
    public BoardDto saveBoard(BoardDto boardDto) {
        return null;
    }
}
