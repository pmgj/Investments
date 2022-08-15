package model;

import java.util.ArrayList;
import java.util.List;

public class Schedule {
    private List<Item> items = new ArrayList<>();
    private Item totals;

    public void addItem(Item item) {
        items.add(item);
    }

    public void setTotals(Item totals) {
        this.totals = totals;
    }

    public List<Item> getItems() {
        return items;
    }

    public Item getTotals() {
        return totals;
    }    
}
