<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
    <%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>

        <!DOCTYPE html>
        <html xmlns="http://www.w3.org/1999/xhtml" lang="pt-br">

        <head>
            <title>Investments</title>
            <meta charset="UTF-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <link type="text/css" rel="stylesheet" href="index.css" />
            <link type="image/svg" rel="icon" href="favicon.svg" />
        </head>

        <body>
            <form action="InvestmentsServlet" method="get">
                <fieldset>
                    <legend>Investments</legend>
                        <p><label for="amount">Starting amount: </label> <input type="number" min="0" step="0.01" name="amount" id="amount" value="${param.amount}" /></p>
                        <p><label for="rate">Monthly interest rate: </label> <input type="number" min="0" step="0.01" name="rate" id="rate" value="${param.rate}" /></p>
                        <p><label for="period">Period in months: </label> <input type="number" min="0" name="period" id="period" value="${param.period}" /></p>
                        <p><label for="contribution">Additional contribution: </label> <input type="number" min="0" step="0.01" name="contribution" id="contribution" value="${param.contribution}" /></p>
                        <p><input type="submit" /></p>
                    </form>
                </fieldset>        
            </form>
            <table>
                <thead>
                    <tr>
                        <th>n</th>
                        <th>Contribution</th>
                        <th>Rate</th>
                        <th>Amount</th>
                    </tr>
                </thead>
                <c:if test="${schedule ne null}">
                    <tbody>
                        <c:forEach var="item" items="${schedule.items}">
                            <tr>
                                <td>${item.period}</td>
                                <td>
                                    <fmt:formatNumber value="${item.contribution}" type="currency" />
                                </td>
                                <td>
                                    <fmt:formatNumber value="${item.rate}" type="currency" />
                                </td>
                                <td>
                                    <fmt:formatNumber value="${item.amount}" type="currency" />
                                </td>
                            </tr>
                        </c:forEach>
                    </tbody>
                    <tfoot>
                        <tr>
                            <th></th>
                            <td>
                                <fmt:formatNumber value="${schedule.totals.contribution}" type="currency" />
                            </td>
                            <td>
                                <fmt:formatNumber value="${schedule.totals.rate}" type="currency" />
                            </td>
                            <td>
                                <fmt:formatNumber value="${schedule.totals.amount}" type="currency" />
                            </td>
                        </tr>
                    </tfoot>
                </c:if>
            </table>
        </body>

        </html>
