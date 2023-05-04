package com.wposs.scrum_back.board.controller;

import com.wposs.scrum_back.Exception.exceptions.RequestException;
import com.wposs.scrum_back.board.dto.BoardDto;
import com.wposs.scrum_back.board.service.BoardService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

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
    public ResponseEntity<BoardDto> saveBoard(@Valid @RequestBody BoardDto boardDto, BindingResult result){
        if (result.hasErrors()){
            throw new RequestException("error en estructura de JSON","400",HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity<>(boardService.saveBoard(boardDto),HttpStatus.CREATED);
    }

    @GetMapping("/allboards")
    @Operation(summary = "Get All Boards")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200",description = "Boards Success"),
            @ApiResponse(responseCode = "404",description = "Not Found Boards")
    })
    public ResponseEntity<List<BoardDto>> getAllBoards(){
        List<BoardDto> boardDtos = boardService.getAllBoards();
        if (!boardDtos.isEmpty()){
            return new ResponseEntity<>(boardDtos,HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }
}
