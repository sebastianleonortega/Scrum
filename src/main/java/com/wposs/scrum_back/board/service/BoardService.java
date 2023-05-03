package com.wposs.scrum_back.board.service;

import com.wposs.scrum_back.board.dto.BoardDto;
import com.wposs.scrum_back.board.entity.Board;

import java.util.List;
import java.util.UUID;

public interface BoardService {
    BoardDto saveBoard(BoardDto boardDto);

}
