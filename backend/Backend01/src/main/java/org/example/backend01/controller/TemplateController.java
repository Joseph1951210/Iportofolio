package org.example.backend01.controller;


import org.example.backend01.model.Template;
import org.example.backend01.model.TemplateObject;
import org.example.backend01.model.User;
import org.example.backend01.repository.TemplateRepository;
import org.example.backend01.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.Optional;
import java.util.List;
import java.util.stream.Collectors;

import com.google.gson.Gson;




@RestController
@RequestMapping("/templates")
public class TemplateController {




    private final TemplateRepository templateRepository;

    @Autowired
    public TemplateController(TemplateRepository templateRepository) {
        this.templateRepository = templateRepository;
    }

    // api for saving a template
    @PostMapping("/save")
    public ResponseEntity<Template> saveTemplate(@RequestBody Template template) {
        Template savedTemplate = templateRepository.save(template);
        return ResponseEntity.ok(savedTemplate);
    }

    // api for getting all templates
    @GetMapping("/all")
    public ResponseEntity<List<Template>> getAllTemplates() {
        List<Template> templates = templateRepository.findAll();
        return ResponseEntity.ok(templates);
    }

    @PutMapping("/update")
    public ResponseEntity<Template> updateTemplate(@RequestBody Template updatedTemplate) {
        // check if the template exists
        Optional<Template> existingTemplate = templateRepository.findById(updatedTemplate.getId());
        if (existingTemplate.isPresent()) {
            // update the template
            Template savedTemplate = templateRepository.save(updatedTemplate);
            return ResponseEntity.ok(savedTemplate);
        } else {
            // return 404 if the template does not exist
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
    }

    //save template with user
    @Autowired
    private UserRepository userRepository;
    @PostMapping("/saveWithUser")
    public ResponseEntity<String> saveTemplateWithUser(@RequestBody Map<String, Object> requestData) {
        // analyze the request data
        String username = (String) requestData.get("username");
        String templateName = (String) requestData.get("templateName");
        //Map<String, Object> jsonData = (Map<String, Object>) requestData.get("data");
        // 获取 data 字段的值
        Object dataObject = requestData.get("jsonData");


        // Serialize jsonData to JSON string
        String jsonData;
        if (dataObject instanceof Map) {
            jsonData = new Gson().toJson(dataObject);

        } else if (dataObject instanceof List) {
            jsonData = new Gson().toJson(dataObject);

        } else {
            jsonData = "[]"; // Default empty array
        }



        // validate the user
        Optional<User> user = userRepository.findByUsername(username);
        if (user.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found");
        }

        // create a new template
        Template template = new Template();
        template.setUserId(user.get().getId()); // set the user id
        template.setName(templateName); // set the template name
        //template.setJsonData(new Gson().toJson(jsonData)); // set the JSON data (serialize the JSON data to a string)
        template.setJsonData(jsonData !=null? jsonData:"{}");
        //template.setJsonData(jsonData != null ? new Gson().toJson(jsonData) : "{}");// set the JSON data (serialize the JSON data to a string)
        templateRepository.save(template);

        return ResponseEntity.status(HttpStatus.CREATED).body("Template saved successfully");
    }


    // Get a template by id
    @GetMapping("/history/{userId}")
    public ResponseEntity<List<TemplateObject>> getTemplateHistory(@PathVariable String userId) {
        // Validate if user exists
        Optional<User> user = userRepository.findById(userId);
        if (user.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }

        // Query templates by userId
        List<Template> templates = templateRepository.findByUserId(userId);

        // Map Template to TemplateObject
        List<TemplateObject> templateHistory = templates.stream()
                .map(template -> new TemplateObject(
                        userId,
                        template.getCreatedAt(),
                        template.getName(),
                        template.getId()
                ))
                .collect(Collectors.toList());

        return ResponseEntity.ok(templateHistory);
    }

    //delete template by template id
    @DeleteMapping("/delete/{templateId}")
    public ResponseEntity<String> deleteTemplateById(@PathVariable String templateId) {
        // check if the template exists
        Optional<Template> existingTemplate = templateRepository.findById(templateId);
        if (existingTemplate.isPresent()) {
            // delete
            templateRepository.deleteById(templateId);
            return ResponseEntity.ok("Template deleted successfully");
        } else {

            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Template not found");
        }
    }

    //search template by template id
// Search template by template id
    @GetMapping("/search/{templateId}")
    public ResponseEntity<Map<String, Object>> searchTemplateById(@PathVariable String templateId) {
        // Check if the template exists
        Optional<Template> optionaltemplate = templateRepository.findById(templateId);
        if (optionaltemplate.isPresent()) {

            Template template =  optionaltemplate.get();
            // Map Template to TemplateObject
            TemplateObject templateObject = new TemplateObject(
                    template.getUserId(),
                    template.getCreatedAt(),
                    template.getName(),
                    template.getId()
            );

            // Deserialize jsonData
            String jsonData = template.getJsonData() != null && !template.getJsonData().isBlank()
                    ? template.getJsonData()
                    : "[]";

            // Attempt to parse jsonData as JSON string
            Object parsedData;
            try {
                // 去掉外层的双引号
                if (jsonData.startsWith("\"") && jsonData.endsWith("\"")) {
                    jsonData = jsonData.substring(1, jsonData.length() - 1); // 去掉起始和末尾的引号
                }

                // 反转义 JSON 数据
                jsonData = jsonData.replace("\\\"", "\""); // 将 \" 替换为 "

                // 解析为 JSON 对象
                if (jsonData.startsWith("[")) {
                    parsedData = new Gson().fromJson(jsonData, List.class); // 解析为 List
                } else if (jsonData.startsWith("{")) {
                    parsedData = new Gson().fromJson(jsonData, Map.class); // 解析为 Map
                } else {
                    parsedData = List.of(); // 默认空列表
                }
            } catch (Exception e) {

                System.out.println("Error parsing jsonData: " + e.getMessage());
                parsedData = List.of();
            }

            // Prepare response with TemplateObject and JSON data
            Map<String, Object> response = Map.of(
                    "templateObject", templateObject,
                    "data", parsedData // Deserialize JSON data
            );

            return ResponseEntity.ok(response);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Map.of("error", "Template not found"));
        }
    }

}
