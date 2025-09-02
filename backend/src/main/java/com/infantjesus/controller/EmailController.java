package com.infantjesus.controller;

import com.infantjesus.dto.QueryRequest;
import com.infantjesus.dto.EmailSendRequest;
import com.infantjesus.service.EmailService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/")
@CrossOrigin
public class EmailController {
	private final EmailService emailService;

	public EmailController(EmailService emailService) {
		this.emailService = emailService;
	}

	@GetMapping
	public String healthCheck() {
		return "🚀 Server is running. Use POST /api/send-query to send data.";
	}

	@PostMapping("/send-query")
	public ResponseEntity<Response> sendQuery(@RequestBody QueryRequest query) {
		boolean success = emailService.sendQuery(query);
		if (success) {
			return ResponseEntity.ok(new Response(true, "Query sent successfully"));
		} else {
			return ResponseEntity.status(500).body(new Response(false, "Email failed to send"));
		}
	}

	@PostMapping("/email/send")
	public ResponseEntity<Response> sendEmail(@RequestBody EmailSendRequest req) {
		if (req.getTo() == null || req.getTo().trim().isEmpty()) {
			return ResponseEntity.badRequest().body(new Response(false, "'to' is required"));
		}
		if (req.getSubject() == null) req.setSubject("");
		if (req.getBody() == null) req.setBody("");

		boolean success = emailService.sendEmail(req.getTo(), req.getSubject(), req.getBody());
		if (success) {
			return ResponseEntity.ok(new Response(true, "Email sent successfully"));
		} else {
			return ResponseEntity.status(500).body(new Response(false, "Email failed to send"));
		}
	}

	record Response(boolean success, String message) {}
}
