package org.example.backend01.controller;

import org.example.backend01.model.MediaFile;
import org.example.backend01.repository.MediaFileRepository;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;

import java.io.File;
import java.io.IOException;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.time.LocalDateTime;

@RestController
@RequestMapping("/media")
public class MediaController {

    @Value("${upload.dir}")
    private String uploadDir;

    private final MediaFileRepository mediaFileRepository;

    public MediaController(MediaFileRepository mediaFileRepository) {
        this.mediaFileRepository = mediaFileRepository;
    }

    @PostMapping("/upload")
    public ResponseEntity<String> uploadFile(@RequestParam("file") MultipartFile[] files) {
        // create directory if not exists
        StringBuilder responseMessage = new StringBuilder();
        for (MultipartFile file : files) {

            File directory = new File(uploadDir);
            if (!directory.exists()) {
                directory.mkdirs();
            }

            try {
                // save file to uploads directory
                file.transferTo(new File(uploadDir + "/"+ file.getOriginalFilename()));
                // save metadata to MongoDB
                MediaFile mediaFile = new MediaFile();
                mediaFile.setFileName(file.getOriginalFilename());
                mediaFile.setFilePath(uploadDir + "/" + file.getOriginalFilename());
                mediaFile.setFileType(file.getContentType());
                mediaFile.setFileSize(file.getSize());
                mediaFile.setUploadTime(LocalDateTime.now());

                // Generate URL for the file
                String fileUrl = "http://localhost:8083/uploads/" + URLEncoder.encode(file.getOriginalFilename(), StandardCharsets.UTF_8.toString());

                mediaFile.setFileUrl(fileUrl);


                mediaFileRepository.save(mediaFile);


                responseMessage.append("files upload successfully：").append( fileUrl ).append("\n");
            } catch (IOException e) {
                responseMessage.append("files upload failed：").append( file.getOriginalFilename()).append("\n");
            }
        }
        return new ResponseEntity<>(responseMessage.toString(), HttpStatus.OK);
    }
}