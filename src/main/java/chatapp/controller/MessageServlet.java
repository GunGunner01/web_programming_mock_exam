package chatapp.controller;

import chatapp.model.ChatMessage;
import chatapp.model.ChatService;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.List;
import java.util.logging.Logger;

@WebServlet("/api/messages")
public class MessageServlet extends HttpServlet {

	private static final ChatService chatService = ChatService.getInstance();
	private static final ObjectMapper objectMapper = ObjectMapperFactory.createObjectMapper();
	private static final Logger logger = Logger.getLogger(MessageServlet.class.getName());

	@Override
	public void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {
		logger.info("Getting messages");
		List<ChatMessage> messages = chatService.getMessages();
		response.setStatus(HttpServletResponse.SC_OK);
		response.setContentType("application/json");
		objectMapper.writeValue(response.getOutputStream(), messages);
	}

	@Override
	public void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException {
		try {
			// parse and validate message
			ChatMessage message = objectMapper.readValue(request.getInputStream(), ChatMessage.class);
			if (message.getId() != null || message.getText() == null || message.getText().isEmpty()) {
				response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
				return;
			}
			// add message
			logger.info("Adding message");
			chatService.addMessage(message);
			response.setStatus(HttpServletResponse.SC_CREATED);
			response.setContentType("application/json");
			objectMapper.writeValue(response.getOutputStream(), message);
		} catch (JsonProcessingException ex) {
			response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
		}
	}
}
