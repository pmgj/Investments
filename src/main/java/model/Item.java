package model;

public class Item {
    private int period;
    private double amount;
    private double rate;
    private double contribution;

    public Item(int period, double amount, double contribution, double rate) {
        this.period = period;
        this.amount = amount;
        this.contribution = contribution;
        this.rate = rate;
    }

    public double getContribution() {
        return contribution;
    }

    public double getRate() {
        return rate;
    }

    public double getAmount() {
        return amount;
    }

    public int getPeriod() {
        return period;
    }
}
