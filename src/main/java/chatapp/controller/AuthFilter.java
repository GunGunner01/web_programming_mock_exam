package chatapp.controller;

import jakarta.servlet.*;
import jakarta.servlet.annotation.WebFilter;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.util.Base64;

@WebFilter("/api/messages/*")
public class AuthFilter implements Filter {

    @Override
    public void init(FilterConfig filterConfig) throws ServletException {
        // Initialization code here if needed
    }

    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain)
            throws IOException, ServletException {

        HttpServletRequest req = (HttpServletRequest) request;
        HttpServletResponse res = (HttpServletResponse) response;

        // Proceed with the chain only if it's not a DELETE request or if it's authorized
        if (!req.getMethod().equalsIgnoreCase("DELETE") || isAuthorized(req)) {
            chain.doFilter(request, response);
        } else {
            res.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
        }
    }

    private boolean isAuthorized(HttpServletRequest req) {
        String authHeader = req.getHeader("Authorization");
        if (authHeader != null && authHeader.startsWith("Basic")) {
            // Extract and decode the base64 credentials
            String base64Credentials = authHeader.substring("Basic".length()).trim();
            String credentials = new String(Base64.getDecoder().decode(base64Credentials),
                    StandardCharsets.UTF_8);
            // Split credentials into username and password
            final String[] values = credentials.split(":", 2);
            // Check if the username and password match
            return "admin".equals(values[0]) && "12345".equals(values[1]);
        }
        return false;
    }

    @Override
    public void destroy() {
        // Clean up any resources here if needed
    }
}
