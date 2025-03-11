package org.example.backend01.model;

import java.time.LocalDateTime;

public class TemplateObject {

    private String userId;
    private LocalDateTime portfolioData; // Timestamp
    private String portfolioName;
    private String templateId;

    private String data; // store the JSON data

    // Constructor
    public TemplateObject(String userId, LocalDateTime portfolioData, String portfolioName, String templateId) {
        this.userId = userId;
        this.portfolioData = portfolioData;
        this.portfolioName = portfolioName;
        this.templateId = templateId;
        this.data = data;
    }

    // Getters and Setters
    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public LocalDateTime getPortfolioData() {
        return portfolioData;
    }

    public void setPortfolioData(LocalDateTime portfolioData) {
        this.portfolioData = portfolioData;
    }

    public String getPortfolioName() {
        return portfolioName;
    }

    public void setPortfolioName(String portfolioName) {
        this.portfolioName = portfolioName;
    }

    public String getTemplateId() {
        return templateId;
    }

    public void setTemplateId(String templateId) {
        this.templateId = templateId;
    }
}
