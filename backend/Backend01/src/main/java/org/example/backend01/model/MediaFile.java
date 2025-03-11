package org.example.backend01.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;

@Document(collection = "mediaFiles")
public class MediaFile {
    @Id
    private String id;
    private String fileName;
    private String filePath;
    private String fileType;
    private long fileSize;

    private String fileUrl; // New field

    private LocalDateTime uploadTime;
    // Constructors, Getters, Setters
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getFileName() {
        return fileName;
    }

    public String getFilePath() {
        return filePath;
    }

    public void setFilePath(String filePath) {
        this.filePath = fileName;
    }

    public String getFileType() {
        return fileType;
    }

    public void setFileType(String fileType) {
        this.fileType = fileType;
    }

    public long getFileSize() {
        return fileSize;
    }

    public void setFileSize(long fileSize) {
        this.fileSize = fileSize;
    }

    public LocalDateTime getUploadTime() {
        return uploadTime;
    }

    public void setUploadTime(LocalDateTime uploadTime) {
        this.uploadTime = uploadTime;
    }

    public void setFileName(String originalFilename) {
    }

    public void setFileUrl(String fileUrl) {
        this.fileUrl = fileUrl;
    }


}
