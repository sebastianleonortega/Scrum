package com.wposs.scrum_back.board.controller;

import com.wposs.scrum_back.board.dto.BoardDto;
import com.wposs.scrum_back.board.service.BoardService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@RequestMapping("board")
public class BoardController {
    @Autowired
    private BoardService boardService;

    @PostMapping("/saveboard")
    @Operation(summary = "Save to Board")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "201",description = ""),
            @ApiResponse(responseCode = "400",description = ""),
            @ApiResponse(responseCode = "500",description = "")
    })
    public ResponseEntity<BoardDto> saveBoard(@Valid @RequestBody BoardDto boardDto){
        return new ResponseEntity<>(boardService.saveBoard(boardDto),HttpStatus.CREATED);
    }
}
