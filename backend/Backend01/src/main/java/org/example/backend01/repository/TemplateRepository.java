package org.example.backend01.repository;

import org.example.backend01.model.Template;
import org.springframework.data.mongodb.repository.MongoRepository;
import java.util.List;
public interface TemplateRepository extends MongoRepository<Template, String> {

    List<Template> findByUserId(String userId); //
}
