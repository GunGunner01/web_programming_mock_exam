// ---------------------------- task 2 ------------------------------------
// http://localhost:8080/api/topics
package chatapp.controller;

import chatapp.model.ChatService;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.List;
import java.util.logging.Logger;

@WebServlet("/api/topics")
public class TopicServlet extends HttpServlet {

    private static final ChatService chatService = ChatService.getInstance();
    private static final ObjectMapper objectMapper = ObjectMapperFactory.createObjectMapper();
    private static final Logger logger = Logger.getLogger(TopicServlet.class.getName());

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {
        logger.info("Fetching topics");
        List<String> topics = chatService.getTopics();
        response.setStatus(HttpServletResponse.SC_OK);
        response.setContentType("application/json");
        objectMapper.writeValue(response.getOutputStream(), topics);
    }
}
// ------------------------ end task 2 ------------------------------------
