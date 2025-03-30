const categories = {
    "Faculdade": [
    "Qual o seu curso?",
    "Qual o período que cursa?*",
    "Você trabalha?",
    "Qual é seu vínculo com o emprego?",
    "Qual a área do seu trabalho?",
    "Qual é o seu regime de trabalho?",
    "Como você ficou sabendo da FATEC Franca?",
    "Por que você escolheu este curso?",
    "Qual sua maior expectativa quanto ao curso?",
    "Qual sua expectativa após se formar?",
    "Você já estudou nesta instituição?",
    "Você já fez algum curso técnico?",
    "Qual meio de transporte você utiliza para ir à faculdade?"
    ],
    "Pessoal": [
    "Qual o estado você nasceu?*",
    "Em qual cidade você reside?",
    "Qual é o seu gênero?",
    "Qual é o seu estado civil?",
    "Você possui alguma necessidade especial? (Caso tenha mais de uma, pode selecionar todas as opções que se aplicam)",
    "Quantos filhos você tem?",
    "Com quem você mora atualmente?",
    "Quantas pessoas, incluindo você, moram no seu domicílio?",
    "Qual é a situação do domicílio em que você reside?",
    "Há quanto tempo você mora neste domicílio?",
    "Qual é a faixa de renda mensal da sua família?",
    "Você tem plano de saúde privado?",
    "Qual é o grau de escolaridade da sua mãe?",
    "Qual é o grau de escolaridade do seu pai?",
    "Na sua vida escolar, você estudou....",
    "Não considerando os livros acadêmicos, quantos livros você lê por ano (em média)?",
    "Se você lê livros literários, qual(is) o(s) gênero(s) preferido(s)?",
    "Você dedica parte do seu tempo para atividades voluntárias?",
    "Qual religião você professa?",
    "Quais fontes de entretenimento cultural você usa?"
    ],
    "Eletrodomésticos, Veículos e Serviços": [
    "Televisor",
    "Vídeo cassete e(ou) DVD",
    "Rádio",
    "Automóvel",
    "Motocicleta",
    "Máquina de lavar roupa e(ou) tanquinho",
    "Geladeira",
    "Celular e(ou) Smartphone",
    "Microcomputador de mesa/Desktop",
    "Notebook",
    "Telefone fixo",
    "Internet",
    "TV por assinatura e(ou) Serviços de Streaming",
    "Empregada mensalista"
    ],
    "Onde Utiliza": [
    "Em casa",
    "No trabalho",
    "Na escola",
    "Em outros lugares",
    "Para trabalhos profissionais",
    "Para trabalhos escolares",
    "Para entretenimento (música, redes sociais,...)",
    "Para comunicação por e-mail",
    "Para operações bancárias",
    "Para compras eletrônicas",
    "Em casa2",
    "No trabalho2",
    "Na escola2",
    "Em outros lugares2",
    "Para trabalhos profissionais2",
    "Para trabalhos escolares2",
    "Para entretenimento (música, redes sociais,...)2",
    "Para comunicação por e-mail2",
    "Para operações bancárias2",
    "Para compras eletrônicas2",
    "Em casa3",
    "No trabalho3",
    "Na escola3",
    "Em outros lugares3",
    "Para trabalhos profissionais3",
    "Para trabalhos escolares3",
    "Para entretenimento (música, redes sociais,...)3",
    "Para comunicação por e-mail3",
    "Para operações bancárias3",
    "Para compras eletrônicas3"
    ],
    "Classificação de conhecimento em": [
    "Como você classifica seu conhecimento em informática?",
    "Windowns",
    "Linux",
    "Editores de textos (word, writer, ...)",
    "Planilhas Eletrônicas (Excel, Cal, ...)",
    "Apresentadores (PowerPoint, Impress, ...)",
    "Sistemas de Gestão Empresarial",
    "Inglês",
    "Espanhol",
    "Outros Idiomas"
    ],
    "Busca de Informações": [
    "TV",
    "Internet2",
    "Revistas",
    "Jornais",
    "Rádio2",
    "Redes Sociais",
    "Conversas com Amigos"
    ]
};

let data = [];

function countOccurrencesAdvanced(arr, key) {
    return arr.reduce((acc, item) => {
    let value = item[key];
    if (value !== undefined && value !== null && value !== "") {
        if (typeof value === "string" && value.indexOf(";") !== -1) {
        let parts = value.split(";").map(s => s.trim()).filter(s => s !== "");
        parts.forEach(part => {
            acc[part] = (acc[part] || 0) + 1;
        });
        } else {
        let trimmed = value.toString().trim();
        acc[trimmed] = (acc[trimmed] || 0) + 1;
        }
    }
    return acc;
    }, {});
}

function formatTitle(title) {
    const maxLen = 20;
    if (title.length <= maxLen) return title;
    let mid = Math.floor(title.length / 2);
    let breakIndex = title.lastIndexOf(" ", mid);
    if (breakIndex === -1) breakIndex = mid;
    return [title.substring(0, breakIndex).trim(), title.substring(breakIndex).trim()];
}

function createPieChart(ctx, title, dataArr, labels) {
    let slices = labels.map((label, i) => ({ label: label, count: dataArr[i] }));
    slices.sort((a, b) => b.count - a.count);
    const palette = ['#5DADE2', '#F5B041', '#58D68D', '#AF7AC5', '#F1948A', '#7FB3D5', '#F7DC6F', '#82E0AA', '#D7BDE2'];
    const assignedColors = slices.map((slice, i) => palette[i % palette.length]);
    const sortedLabels = slices.map(slice => slice.label);
    const sortedData = slices.map(slice => slice.count);
    let formattedTitle = formatTitle(title);
    return new Chart(ctx, {
    type: 'pie',
    data: {
        labels: sortedLabels,
        datasets: [{
        label: title,
        data: sortedData,
        backgroundColor: assignedColors,
        borderWidth: 1
        }]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
        tooltip: {
            callbacks: {
            label: function(context) {
                const dataset = context.chart.data.datasets[0];
                const total = dataset.data.reduce((acc, cur) => acc + cur, 0);
                const currentValue = dataset.data[context.dataIndex];
                const percentage = ((currentValue / total) * 100).toFixed(2);
                return `: ${percentage}% (${currentValue} respostas)`;
            }
            }
        },
        legend: { position: 'top' },
        title: {
            display: true,
            text: formattedTitle,
            font: { size: 15 }
        }
        }
    }
    });
}

function generateCategoryFilters() {
    const container = document.getElementById("categoryFilterContainer");
    container.innerHTML = "";
    Object.keys(categories).forEach(cat => {
    const btn = document.createElement("button");
    btn.className = "toggle-button active";
    btn.textContent = cat;
    btn.dataset.category = cat;
    btn.addEventListener("click", () => {
        btn.classList.toggle("active");
        updateCategoryDisplay();
    });
    container.appendChild(btn);
    });
}

function updateCategoryDisplay() {
    const buttons = document.querySelectorAll("#categoryFilterContainer .toggle-button");
    const selectedCategories = Array.from(buttons)
    .filter(btn => btn.classList.contains("active"))
    .map(btn => btn.dataset.category);
    generateChartsByCategory(selectedCategories);
}

function generateChartsByCategory(selectedCategories) {
    const sectionsContainer = document.getElementById("chartSections");
    sectionsContainer.innerHTML = "";
    selectedCategories.forEach(category => {
    if (category === "Busca de Informações") {
            const keys = categories[category];
            const numberInKeys = keys.filter(k => !/2$/.test(k));
    }
    if (category === "Onde Utiliza") {
        const keys = categories[category];
        const desktopKeys = keys.filter(k => !/\d$/.test(k));
        const notebooksKeys = keys.filter(k => /2$/.test(k));
        const smartphonesKeys = keys.filter(k => /3$/.test(k));

        const createSubSection = (groupName, keysArray) => {
        if (keysArray.length > 0) {
            const subSection = document.createElement("div");
            subSection.className = "cat-section";
            const header = document.createElement("h3");
            header.innerText = `${category} - ${groupName}`;
            subSection.appendChild(header);
            const grid = document.createElement("div");
            grid.className = "charts-grid";
            keysArray.forEach(key => {
            const chartContainer = document.createElement("div");
            chartContainer.className = "chart-container";
            const canvas = document.createElement("canvas");

            let displayKey = key.replace(/\d+$/, "").trim();
            canvas.id = `chart_${category}_${key}`;
            chartContainer.appendChild(canvas);
            grid.appendChild(chartContainer);
            const counts = countOccurrencesAdvanced(data, key);
            const labels = Object.keys(counts);
            const countsArr = Object.values(counts);
            const ctx = canvas.getContext("2d");
            if (labels.length === 0) {
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                ctx.font = "16px Inter";
                ctx.fillStyle = "#666";
                ctx.textAlign = "center";
                ctx.textBaseline = "middle";
                ctx.fillText("Sem dados", canvas.width / 2, canvas.height / 2);
            } else {
                createPieChart(ctx, displayKey, countsArr, labels);
            }
            });
            subSection.appendChild(grid);
            sectionsContainer.appendChild(subSection);
        }
        };

        createSubSection("Desktop", desktopKeys);
        createSubSection("Notebooks", notebooksKeys);
        createSubSection("Smartphones", smartphonesKeys);
    } else {
        const catSection = document.createElement("div");
        catSection.className = "cat-section";
        const header = document.createElement("h3");
        header.innerText = category;
        catSection.appendChild(header);
        const grid = document.createElement("div");
        grid.className = "charts-grid";
        categories[category].forEach(key => {
        const chartContainer = document.createElement("div");
        chartContainer.className = "chart-container";
        const canvas = document.createElement("canvas");
        canvas.id = `chart_${category}_${key}`;
        chartContainer.appendChild(canvas);
        grid.appendChild(chartContainer);
        const counts = countOccurrencesAdvanced(data, key);
        const labels = Object.keys(counts);
        const countsArr = Object.values(counts);
        const ctx = canvas.getContext("2d");
        if (labels.length === 0) {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.font = "16px Inter";
            ctx.fillStyle = "#666";
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";
            ctx.fillText("Sem dados", canvas.width / 2, canvas.height / 2);
        } else {
            createPieChart(ctx, key, countsArr, labels);
        }
        });
        catSection.appendChild(grid);
        sectionsContainer.appendChild(catSection);
    }
    });
}

function processExcel(file) {
    const reader = new FileReader();
    reader.onload = function(e) {
    const arrayBuffer = e.target.result;
    const workbook = XLSX.read(arrayBuffer, { type: "array" });
    const firstSheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[firstSheetName];

    let sheetData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
    sheetData[0] = sheetData[0].map(k => k.toString().trim());
    if (sheetData.length < 2 || sheetData[0].length === 0) {
        document.getElementById("import-message").innerText = "Importe uma planilha com dados válidos";
        return;
    }
    const keys = sheetData[0];
    const jsonObjects = [];
    for (let i = 1; i < sheetData.length; i++) {
        const row = sheetData[i];
        if (row.filter(cell => cell !== undefined && cell !== null && cell.toString().trim() !== "").length === 0) continue;
        const obj = {};
        keys.forEach((key, index) => {
        obj[key] = row[index];
        });
        jsonObjects.push(obj);
    }
    if (jsonObjects.length === 0 || Object.keys(jsonObjects[0]).length === 0) {
        document.getElementById("import-message").innerText = "Importe uma planilha com dados válidos";
        return;
    }
    document.getElementById("import-message").innerText = "Planilha importada com sucesso!";
    console.log("JSON Gerado:", jsonObjects);
    data = jsonObjects;
    generateCategoryFilters();
    updateCategoryDisplay();
    };

    reader.onerror = function() {
    document.getElementById("import-message").innerText = "Erro ao ler o arquivo.";
    };

    reader.readAsArrayBuffer(file);
}

document.getElementById("process-btn").addEventListener("click", () => {
    const fileInput = document.getElementById("file-input");
    const file = fileInput.files[0];
    if (!file) {
    document.getElementById("import-message").innerText = "Por favor, selecione um arquivo .xlsx.";
    return;
    }
    const fileExtension = file.name.split(".").pop().toLowerCase();
    if (fileExtension !== "xlsx") {
    document.getElementById("import-message").innerText = "O arquivo deve ser um .xlsx.";
    return;
    }
    processExcel(file);
});