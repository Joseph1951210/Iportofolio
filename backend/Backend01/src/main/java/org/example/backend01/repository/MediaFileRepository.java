package org.example.backend01.repository;
import org.example.backend01.model.MediaFile;
import org.springframework.data.mongodb.repository.MongoRepository;
public interface MediaFileRepository extends MongoRepository<MediaFile, String> {
}
