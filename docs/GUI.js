class GUI {
    constructor() {
        this.formatter = new Intl.NumberFormat('pt-br', {
            style: 'currency',
            currency: 'BRL'
        });
    }
    registerEvents() {
        let form = document.forms[0];
        form.amount.onkeyup = this.compute.bind(this);
        form.period.onkeyup = this.compute.bind(this);
        form.rate.onkeyup = this.compute.bind(this);
        form.contribution.onkeyup = this.compute.bind(this);
        form.amount.focus();
    }
    compute() {
        let form = document.forms[0];
        let amount = parseFloat(form.amount.value);
        let period = parseInt(form.period.value, 10);
        let rate = parseFloat(form.rate.value) / 100;
        let contribution = parseFloat(form.contribution.value);
        if (amount > 0 && period > 0 && rate > 0 && contribution > 0) {
            this.cleanTable();
            let result = this.innerCompute(amount, rate, contribution, period);
            this.print(result);
        }
    }
    cleanTable() {
        let tbody = document.querySelector("tbody");
        tbody.innerHTML = "";
    }
    innerCompute(amount, rate, contribution, period) {
        let s = [];
        let juros = 0.0;
        s.push([0, 0, 0, amount]);
        for (let j = 1; j <= period; j++) {
            let rend = amount * rate;
            juros += rend;
            amount += rend + contribution;
            s.push([j, contribution, rend, amount]);
        }
        s.push([0, contribution * period, juros, amount]);
        return s;
    }
    print(matrix) {
        let tbody = document.querySelector("tbody"), i;
        for (i = 0; i < matrix.length - 1; i++) {
            let row = matrix[i];
            let tr = document.createElement("tr");
            for (let j = 0; j < row.length; j++) {
                let cell = row[j];
                this.createRows(tr, j === 0 ? cell : this.formatter.format(cell));
            }
            tbody.appendChild(tr);
        }
        this.setTotals(matrix[i]);
    }
    createRows(row, text) {
        let cell = document.createElement("td");
        let textNode = document.createTextNode(text);
        cell.appendChild(textNode);
        row.appendChild(cell);
    }
    setTotals(row) {
        let table = document.querySelector("table");
        let footnote = table.tFoot.rows[0];
        for (let i = 1; i < row.length; i++) {
            footnote.cells[i].innerHTML = this.formatter.format(row[i]);
        }
    }
}
let gui = new GUI();
gui.registerEvents();