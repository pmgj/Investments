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
        form.inflation.onkeyup = this.compute.bind(this);
        form.amount.focus();
    }
    compute() {
        let form = document.forms[0];
        let amount = form.amount.valueAsNumber;
        let period = form.period.valueAsNumber;
        let rate = form.rate.valueAsNumber / 100;
        let contribution = form.contribution.valueAsNumber;
        let inflation = form.inflation.valueAsNumber / 100;
        if ((amount > 0 || contribution > 0) && period > 0 && rate > 0) {
            this.cleanTable();
            amount = (isNaN(amount)) ? 0 : amount;
            contribution = (isNaN(contribution)) ? 0 : contribution;
            inflation = (isNaN(inflation)) ? 0 : inflation;
            let result = this.innerCompute(amount, rate, contribution, period, inflation);
            this.print(result);
        }
    }
    cleanTable() {
        let tbody = document.querySelector("tbody");
        tbody.innerHTML = "";
    }
    innerCompute(amount, rate, contribution, period, inflation) {
        let s = [];
        let juros = 0.0;
        s.push([0, 0, 0, amount]);
        for (let j = 1; j <= period; j++) {
            let rend = amount * rate;
            contribution = j % 12 === 0 ? contribution * (1 + inflation) : contribution;
            juros += rend;
            amount += rend + contribution;
            s.push([j, contribution, rend, amount]);
        }
        s.push([0, contribution * period, juros, amount]);
        return s;
    }
    print(matrix) {
        let tbody = document.querySelector("tbody"), i;
        let t = document.querySelector('#row');
        let tds = t.content.querySelectorAll("td");
        for (i = 0; i < matrix.length - 1; i++) {
            let row = matrix[i];
            for (let j = 0; j < row.length; j++) {
                let cell = row[j];
                tds[j].textContent = j === 0 ? cell : this.formatter.format(cell);
            }
            let clone = document.importNode(t.content, true);
            tbody.appendChild(clone);
        }
        this.setTotals(matrix[i]);
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