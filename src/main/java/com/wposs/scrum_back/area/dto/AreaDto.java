package com.wposs.scrum_back.area.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.util.UUID;

@JsonInclude(JsonInclude.Include.NON_NULL)
public class AreaDto {

    @JsonProperty(value ="areaId", access = JsonProperty.Access.READ_ONLY)
    private UUID areaId;

    @JsonProperty(value = "areaName")
    @NotNull
    @NotEmpty
    @Size(max = 100)
    private String areaName;



    public UUID getAreaId() {
        return areaId;
    }

    public void setAreaId(UUID areaId) {
        this.areaId = areaId;
    }

    public String getAreaName() {
        return areaName;
    }

    public void setAreaName(String areaName) {
        this.areaName = areaName;
    }

}
