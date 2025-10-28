//package com.project.travel.controller.AiController;
//
//import com.project.travel.service.AIService;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.web.bind.annotation.PostMapping;
//import org.springframework.web.bind.annotation.RequestBody;
//import org.springframework.web.bind.annotation.RestController;
//
//import java.util.Map;
//
//@RestController
//public class QuestionController {
//    private final AIService aiService;
//
//    @Autowired
//    public QuestionController(AIService aiService) {
//        this.aiService = aiService;
//    }
//
//    @PostMapping("/ask")
//    public String answerQuestion(@RequestBody Map<String, String> request) {
//        String question = request.get("question");
//        return aiService.getAnswer(question);
//    }
//}