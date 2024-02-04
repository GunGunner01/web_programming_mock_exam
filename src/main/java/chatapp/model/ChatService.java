package chatapp.model;

import java.util.ArrayList;
import java.util.List;
import java.util.Scanner;
import java.util.stream.Collectors;

public class ChatService {

	private static final ChatService instance = new ChatService();

	private final List<ChatMessage> messages = new ArrayList<>();
	private int lastId = 0;

	public static ChatService getInstance() {
		return instance;
	}

	private ChatService() {
		try (Scanner scanner = new Scanner(ChatService.class.getResourceAsStream("/messages.txt"))) {
			while (scanner.hasNextLine()) {
				String[] tokens = scanner.nextLine().split(":");
				addMessage(new ChatMessage(tokens[0], tokens[1]));
			}
		} catch (Exception ex) {
			System.out.println(ex.getMessage());
		}
	}

	public List<ChatMessage> getMessages() {
		return messages;
	}

	// ---------------------------- task 1 ------------------------------------
	public List<ChatMessage> getMessages(String topic) {
		// Check if topic is null or empty, return all messages in that case
		if (topic == null || topic.trim().isEmpty()) {
			return getMessages(); // return all messages
		} else {
			// Filter messages by the specified topic
			return getMessages().stream()
					.filter(message -> topic.equals(message.getTopic()))
					.collect(Collectors.toList());

			/*
				Alternativ
			 */
//			// Create a new list to hold messages that match the topic
//			List<ChatMessage> filteredMessages = new ArrayList<>();
//			// Loop through all messages
//			for (ChatMessage message : messages) {
//				// If the message topic matches the specified topic, add it to the list
//				if (topic.equals(message.getTopic())) {
//					filteredMessages.add(message);
//				}
//			}
//			// Return the list of filtered messages
//			return filteredMessages;
		}
	}
	// ------------------------ end task 1 ------------------------------------


	// ---------------------------- task 2 ------------------------------------
	public List<String> getTopics() {
		return messages.stream()
				.map(ChatMessage::getTopic) // assuming there is a getTopic method in ChatMessage class
				.distinct()
				.collect(Collectors.toList());

		/*
			Alternativ
		 */
//		List<String> topics = new ArrayList<>();
//		for (ChatMessage message : messages) {
//			String topic = message.getTopic();
//			// Check if the list already contains the topic to avoid duplicates
//			if (!topics.contains(topic)) {
//				topics.add(topic);
//			}
//		}
//		return topics;
	}
	// ------------------------ end task 2 ------------------------------------

	public void addMessage(ChatMessage message) {
		message.setId(++lastId);
		messages.add(message);
	}

	// Task 3
	public boolean removeMessage(int id) {
		// Assuming there's a method in ChatService to get the message list
		// This is a simple implementation. The actual logic may involve more complex operations like database access.
		return messages.removeIf(message -> message.getId() == id);
	}
	// ------------------------ end task 3 ------------------------------------

}
