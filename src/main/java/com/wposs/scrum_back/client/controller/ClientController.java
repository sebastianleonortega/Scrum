package com.wposs.scrum_back.client.controller;

import com.wposs.scrum_back.client.dto.ClientDto;
import com.wposs.scrum_back.client.entity.Client;
import com.wposs.scrum_back.client.service.ClientService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import org.modelmapper.ModelMapper;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/client")
public class ClientController {

    private final ClientService clientService;

    private final ModelMapper modelMapper;

    public ClientController(ClientService clientService, ModelMapper modelMapper) {
        this.clientService = clientService;
        this.modelMapper = modelMapper;
    }

    @GetMapping("/{id}")
    @Operation(summary = "Get client by String")
    @ApiResponse(responseCode = "200",description = "successful search")
    public ResponseEntity<ClientDto> findById(@PathVariable String id){
        return clientService.findById(id).map(client -> new ResponseEntity<>(modelMapper.map(client, ClientDto.class), HttpStatus.OK))
                .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @GetMapping("/all")
    @Operation(summary = "Get all clients")
    @ApiResponse(responseCode = "200",description = "successful search")
    public ResponseEntity<List<ClientDto>> findAll(){
        List<Client> clients = clientService.getAll();
        return new ResponseEntity<>(clients.stream().map(client -> modelMapper.map(client,ClientDto.class))
                .collect(Collectors.toList()),HttpStatus.OK);
    }

    @PostMapping("/save/")
    @Operation(summary = "Create client")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "201",description = "Client Created"),
            @ApiResponse(responseCode = "400",description = "client bad request")
    })
    public ResponseEntity<?> create(@Valid @RequestBody ClientDto clientDto){
        HashMap<String, String> map = new HashMap<>();
        if (clientService.existClientByName(clientDto.getClientName())){
            map.put("message", "Este nombre de cliente ya existe");
            return new ResponseEntity<>(map, HttpStatus.BAD_REQUEST);
        }
        Client client = clientService.save(modelMapper.map(clientDto, Client.class));
        return new ResponseEntity<>(modelMapper.map(client, ClientDto.class), HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    @Operation(summary = "Update the client")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200",description = "Return the updated client"),
            @ApiResponse(responseCode = "400",description = "Returns the data sent is invalid"),
            @ApiResponse(responseCode = "404",description = "Cliente Not Found")
    })
    public ResponseEntity<Map<String, Object>> updateClient(@RequestBody Client client, @PathVariable("id") String clientId){
        Map<String, Object> map = new HashMap<>();
        map.put("message","Datos invalidos");
        if(clientService.findById(clientId).isPresent()){
            System.out.println(client.getClientId());
            System.out.println(client.getClientName());
            map.put("message", modelMapper.map(clientService.updateClient(clientId, client), ClientDto.class));
            return new ResponseEntity<>(map, HttpStatus.OK);
        }
        return new ResponseEntity<>(map, HttpStatus.BAD_REQUEST);
    }

}