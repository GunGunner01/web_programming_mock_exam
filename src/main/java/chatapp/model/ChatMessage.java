package chatapp.model;

public class ChatMessage {

	private Integer id;
	private String topic;
	private String text;

	public ChatMessage() {
	}

	public ChatMessage(String topic, String text) {
		this.topic = topic;
		this.text = text;
	}

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getTopic() {
		return topic;
	}

	public void setTopic(String topic) {
		this.topic = topic;
	}

	public String getText() {
		return text;
	}

	public void setText(String text) {
		this.text = text;
	}
}
