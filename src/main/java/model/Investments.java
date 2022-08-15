package model;

public class Investments {

    public Schedule compute(double amount, double rate, double contribution, int period) {
        Schedule s = new Schedule();
        double juros = 0.0;
        s.addItem(new Item(0, amount, 0, 0));
        for (int j = 1; j <= period; j++) {
            double rend = amount * rate;
            juros += rend;
            amount += rend + contribution;
            s.addItem(new Item(j, amount, contribution, rend));
        }
        s.setTotals(new Item(0, amount, contribution * period, juros));
        return s;
    }
}
