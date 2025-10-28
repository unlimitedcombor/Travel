//package com.project.travel.service;
//
//import com.theokanning.openai.OpenAiService;
//import com.theokanning.openai.completion.CompletionRequest;
//import org.springframework.stereotype.Service;
//
//@Service
//public class AIService {
//    private final OpenAiService openAiService;
//
//    public AIService() {
//        // 替换为你的OpenAI API密钥
//        String apiKey = "sk-4b962a59abda4ee6a0bc6f7dd37b7416";
//        this.openAiService = new OpenAiService(apiKey);
//    }
//
//    public String getAnswer(String question) {
//        CompletionRequest completionRequest = CompletionRequest.builder()
//                .prompt(question)
//                .model("text-davinci-003")
//                .maxTokens(100)
//                .build();
//        return openAiService.createCompletion(completionRequest).getChoices().get(0).getText();
//    }
//}