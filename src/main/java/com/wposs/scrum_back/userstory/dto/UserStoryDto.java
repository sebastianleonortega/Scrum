package com.wposs.scrum_back.userstory.dto;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.wposs.scrum_back.userstorystatus.dto.UserStoryStatusDto;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.util.Date;
import java.util.UUID;

public class UserStoryDto {

    @JsonProperty(access = JsonProperty.Access.READ_ONLY)
    private UUID userStoryId;

    @NotNull
    @NotEmpty
    @Size(max = 100)
    private String userStoryName;

    private Integer userStoryScore;

    private String userStoryArchive;

    private Long userStoryStateId;

    @JsonIgnore
    private String userStoryStateName;

    private UUID subProjectId;

    private Date date;

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }

    public String getUserStoryStateName() {
        return userStoryStateName;
    }

    public void setUserStoryStateName(String userStoryStateName) {
        this.userStoryStateName = userStoryStateName;
    }

    public UUID getUserStoryId() {
        return userStoryId;
    }

    public void setUserStoryId(UUID userStoryId) {
        this.userStoryId = userStoryId;
    }

    public String getUserStoryName() {
        return userStoryName;
    }

    public void setUserStoryName(String userStoryName) {
        this.userStoryName = userStoryName;
    }

    public Integer getUserStoryScore() {
        return userStoryScore;
    }

    public void setUserStoryScore(Integer userStoryScore) {
        this.userStoryScore = userStoryScore;
    }

    public String getUserStoryArchive() {
        return userStoryArchive;
    }

    public void setUserStoryArchive(String userStoryArchive) {
        this.userStoryArchive = userStoryArchive;
    }

    public Long getUserStoryStateId() {
        return userStoryStateId;
    }

    public void setUserStoryStateId(Long userStoryStateId) {
        this.userStoryStateId = userStoryStateId;
    }

    public UUID getSubProjectId() {
        return subProjectId;
    }

    public void setSubProjectId(UUID subProjectId) {
        this.subProjectId = subProjectId;
    }
}
