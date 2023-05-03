package com.wposs.scrum_back.board.controller;

import com.wposs.scrum_back.board.service.BoardService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("board")
public class BoardController {
    @Autowired
    private BoardService boardService;

    @GetMapping("/relationsboard/{id}")
    @Operation(summary = "Get Board Relations")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200",description = "Board Success"),
            @ApiResponse(responseCode = "404",description = "Not Foud")
    })
    public ResponseEntity<?> getRelationsBoard(@PathVariable("id")UUID idTeam){
        List<?> boards = boardService.getAllBoard(idTeam);
        if (!boards.isEmpty()){
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(boards,HttpStatus.OK);
    }
}
