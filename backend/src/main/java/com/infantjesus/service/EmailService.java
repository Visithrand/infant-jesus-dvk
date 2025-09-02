package com.infantjesus.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;
import com.infantjesus.dto.QueryRequest;

@Service
public class EmailService {
	private final JavaMailSender mailSender;

	@Value("${spring.mail.username}")
	private String fromAddress;

	@Value("${app.mail.to}")
	private String toAddress;

	public EmailService(JavaMailSender mailSender) {
		this.mailSender = mailSender;
	}

	public boolean sendQuery(QueryRequest query) {
		try {
			SimpleMailMessage message = new SimpleMailMessage();
			message.setFrom(fromAddress);
			message.setTo(toAddress);
			message.setReplyTo(query.getEmail() != null ? query.getEmail() : fromAddress);
			message.setSubject("New Query from Website");
			message.setText("Name: " + (query.getName() != null ? query.getName() : "N/A") +
					"\nEmail: " + (query.getEmail() != null ? query.getEmail() : "N/A") +
					"\nMessage: " + (query.getMessage() != null ? query.getMessage() : ""));

			mailSender.send(message);
			return true;
		} catch (Exception e) {
			System.out.println("❌ Email send failed: " + e.getMessage());
			return false;
		}
	}

	public boolean sendEmail(String to, String subject, String body) {
		try {
			SimpleMailMessage message = new SimpleMailMessage();
			message.setFrom(fromAddress);
			message.setTo(to);
			message.setSubject(subject);
			message.setText(body);
			mailSender.send(message);
			return true;
		} catch (Exception e) {
			System.out.println("❌ Email send failed: " + e.getMessage());
			return false;
		}
	}
}
