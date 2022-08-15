package controller;

import java.io.IOException;
import java.util.Enumeration;

import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import model.Investments;
import model.Schedule;

@WebServlet("/InvestmentsServlet")
public class InvestmentsServlet extends HttpServlet {

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp)
            throws ServletException, IOException {

        Enumeration<String> names = req.getParameterNames();
        int period = 0;
        double amount = 0, rate = 0, contribution = 0;
        if (names.hasMoreElements()) {
            amount = Double.parseDouble(req.getParameter("amount"));
            period = Integer.parseInt(req.getParameter("period"));
            rate = Double.parseDouble(req.getParameter("rate"));
            contribution = Double.parseDouble(req.getParameter("contribution"));
            Investments am = new Investments();
            Schedule schedule = am.compute(amount, rate / 100.0, contribution, period);
            req.setAttribute("schedule", schedule);
        }
        req.getRequestDispatcher("index.jsp").forward(req, resp);
    }
}
