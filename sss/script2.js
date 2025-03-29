let data = [];
    
    // Funções para criação dos gráficos com tooltips personalizadas
    function createPieChart(context, title, dataArr, labels, colors) {
      return new Chart(context, {
        type: 'pie',
        data: {
          labels: labels,
          datasets: [{
            label: title,
            data: dataArr,
            backgroundColor: colors,
            borderWidth: 1
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: true,
          plugins: {
            tooltip: {
              callbacks: {
                label: function(context) {
                  const dataset = context.chart.data.datasets[0];
                  const total = dataset.data.reduce((acc, cur) => acc + cur, 0);
                  const currentValue = dataset.data[context.dataIndex];
                  const percentage = Math.round((currentValue / total) * 100);
                  return `${context.label}: ${percentage}% (${currentValue} respostas)`;
                }
              }
            },
            legend: { position: 'top' },
            title: {
              display: true,
              text: title,
              font: { size: 16 }
            }
          }
        }
      });
    }
    
    function createBarChart(context, title, dataArr, labels, colors) {
      return new Chart(context, {
        type: 'bar',
        data: {
          labels: labels,
          datasets: [{
            label: title,
            data: dataArr,
            backgroundColor: colors,
            borderWidth: 1
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: true,
          scales: { y: { beginAtZero: true } },
          plugins: {
            tooltip: {
              callbacks: {
                label: function(context) {
                  const dataset = context.chart.data.datasets[0];
                  const total = dataset.data.reduce((acc, cur) => acc + cur, 0);
                  const currentValue = dataset.data[context.dataIndex];
                  const percentage = Math.round((currentValue / total) * 100);
                  return `${context.label}: ${percentage}% (${currentValue} respostas)`;
                }
              }
            },
            legend: { position: 'top' },
            title: {
              display: true,
              text: title,
              font: { size: 16 }
            }
          }
        }
      });
    }
    
    // Função auxiliar para contar ocorrências de uma chave
    function countOccurrences(arr, key) {
      return arr.reduce((acc, item) => {
        const value = item[key];
        acc[value] = (acc[value] || 0) + 1;
        return acc;
      }, {});
    }
    
    // Cria dinamicamente um canvas dentro do container "chartContainer"
    function createCanvas(id) {
      const canvas = document.createElement('canvas');
      canvas.id = id;
      document.getElementById('chartContainer').appendChild(canvas);
      return canvas.getContext('2d');
    }
    
    // Gera gráficos dinâmicos com base em cada chave (exceto as com valores únicos)
    function generateDynamicCharts(dataArray) {
      if (dataArray.length === 0) return;
      // Limpa gráficos anteriores
      document.getElementById('chartContainer').innerHTML = '';
      const keys = Object.keys(dataArray[0]);
      keys.forEach(key => {
        const counts = countOccurrences(dataArray, key);
        const labels = Object.keys(counts);
        const countsArr = Object.values(counts);
        // Ignora chaves com valores únicos (ex: RG)
        if (Math.max(...countsArr) <= 1) return;
        const canvasId = `chart_${key}`;
        const ctx = createCanvas(canvasId);
        const colors = labels.map(() => '#' + Math.floor(Math.random()*16777215).toString(16));
        // Se poucas categorias, usa gráfico de pizza; se muitas, gráfico de barras
        if (labels.length <= 5) {
          createPieChart(ctx, key, countsArr, labels, colors);
        } else {
          createBarChart(ctx, key, countsArr, labels, colors);
        }
      });
    }
    
    // Atualiza os gráficos estáticos (se os canvas existirem)
    function updateCharts(filteredData) {
      if (document.getElementById('estadoCivilChart')) {
        const estadoCivilData = countOccurrences(filteredData, 'EstadoCivil');
        const estadoCivilLabels = Object.keys(estadoCivilData);
        const estadoCivilCounts = Object.values(estadoCivilData);
        const estadoCivilColors = ['#4CAF50', '#2196F3', '#9C27B0', '#FFC107'];
        createPieChart(document.getElementById('estadoCivilChart').getContext('2d'),
                       'Estado Civil', estadoCivilCounts, estadoCivilLabels, estadoCivilColors);
      }
      if (document.getElementById('filhosChart')) {
        const filhosData = countOccurrences(filteredData, 'TemFilhos');
        const filhosLabels = Object.keys(filhosData);
        const filhosCounts = Object.values(filhosData);
        const filhosColors = ['#FF5252', '#3F51B5'];
        createPieChart(document.getElementById('filhosChart').getContext('2d'),
                       'Tem Filhos', filhosCounts, filhosLabels, filhosColors);
      }
      if (document.getElementById('locomocaoChart')) {
        const locomocaoData = countOccurrences(filteredData, 'MeioLocomocao');
        const locomocaoLabels = Object.keys(locomocaoData);
        const locomocaoCounts = Object.values(locomocaoData);
        const locomocaoColors = ['#00BCD4', '#FFC107', '#795548', '#9E9E9E'];
        createBarChart(document.getElementById('locomocaoChart').getContext('2d'),
                       'Meio de Locomoção', locomocaoCounts, locomocaoLabels, locomocaoColors);
      }
      if (document.getElementById('rendaFamiliarChart')) {
        const rendaFamiliarData = countOccurrences(filteredData, 'RendaFamiliar');
        const rendaFamiliarLabels = ['Até 1 SM', '2 SM', '3 SM', '4 SM', '5 SM', 'Acima de 5 SM'];
        const rendaFamiliarCounts = rendaFamiliarLabels.map(label => rendaFamiliarData[label] || 0);
        const rendaFamiliarColors = ['#8BC34A', '#CDDC39', '#FFEB3B', '#FFC107', '#FF9800', '#FF5722'];
        createBarChart(document.getElementById('rendaFamiliarChart').getContext('2d'),
                       'Renda Familiar', rendaFamiliarCounts, rendaFamiliarLabels, rendaFamiliarColors);
      }
      if (document.getElementById('trabalhaChart')) {
        const trabalhaData = countOccurrences(filteredData, 'Trabalha');
        const trabalhaLabels = Object.keys(trabalhaData);
        const trabalhaCounts = Object.values(trabalhaData);
        const trabalhaColors = ['#009688', '#E65100'];
        createPieChart(document.getElementById('trabalhaChart').getContext('2d'),
                       'Trabalha', trabalhaCounts, trabalhaLabels, trabalhaColors);
      }
      if (document.getElementById('escolaridadeChart')) {
        const escolaridadeData = countOccurrences(filteredData, 'Escolaridade');
        const escolaridadeLabels = Object.keys(escolaridadeData);
        const escolaridadeCounts = Object.values(escolaridadeData);
        const escolaridadeColors = ['#3F51B5', '#D32F2F'];
        createPieChart(document.getElementById('escolaridadeChart').getContext('2d'),
                       'Escolaridade', escolaridadeCounts, escolaridadeLabels, escolaridadeColors);
      }
    }
    
    // Evento para o botão "Filtrar"
    document.getElementById('filtrar').addEventListener('click', () => {
      if (data.length === 0) {
        alert("Importe uma planilha com dados válidos primeiro!");
        return;
      }
      const estadoCivilFilter = document.getElementById('estadoCivil').value;
      const temFilhosFilter = document.getElementById('temFilhos').value;
      const meioLocomocaoFilter = document.getElementById('meioLocomocao').value;
      const rendaFamiliarFilter = document.getElementById('rendaFamiliar').value;
      const trabalhaFilter = document.getElementById('trabalha').value;
      const escolaridadeFilter = document.getElementById('escolaridade').value;
      const concluiuEMFilter = document.getElementById('concluiuEM').value;
      
      const filteredData = data.filter(item => {
        return (
          (!estadoCivilFilter || item.EstadoCivil === estadoCivilFilter) &&
          (!temFilhosFilter || item.TemFilhos === temFilhosFilter) &&
          (!meioLocomocaoFilter || item.MeioLocomocao === meioLocomocaoFilter) &&
          (!rendaFamiliarFilter ||
            (rendaFamiliarFilter === '1' && item.RendaFamiliar <= 1212) ||
            (rendaFamiliarFilter === '2' && item.RendaFamiliar > 1212 && item.RendaFamiliar <= 2424) ||
            (rendaFamiliarFilter === '3' && item.RendaFamiliar > 2424 && item.RendaFamiliar <= 3636) ||
            (rendaFamiliarFilter === '4' && item.RendaFamiliar > 3636 && item.RendaFamiliar <= 4848) ||
            (rendaFamiliarFilter === '5' && item.RendaFamiliar > 4848 && item.RendaFamiliar <= 6060) ||
            (rendaFamiliarFilter === '6' && item.RendaFamiliar > 6060)
          ) &&
          (!trabalhaFilter || item.Trabalha === trabalhaFilter) &&
          (!escolaridadeFilter || item.Escolaridade === escolaridadeFilter) &&
          (!concluiuEMFilter || item.ConcluiuEM === concluiuEMFilter)
        );
      });
      
      updateCharts(filteredData);
      generateDynamicCharts(filteredData);
    });
    
    // Função para processar o arquivo Excel e gerar os gráficos
    function processExcel(file) {
      const reader = new FileReader();
      reader.onload = function(e) {
        const arrayBuffer = e.target.result;
        const workbook = XLSX.read(arrayBuffer, { type: 'array' });
        const firstSheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[firstSheetName];
        const sheetData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
        
        // Validação: deve haver pelo menos 2 linhas e a primeira linha com as chaves
        if (sheetData.length < 2 || sheetData[0].length === 0) {
          document.getElementById('import-message').innerText = "Importe uma planilha com dados válidos";
          return;
        }
        
        const keys = sheetData[0];
        const jsonObjects = [];
        for (let i = 1; i < sheetData.length; i++) {
          const row = sheetData[i];
          if (row.filter(cell => cell !== undefined && cell !== null && cell !== "").length === 0) continue;
          const obj = {};
          keys.forEach((key, index) => {
            obj[key] = row[index];
          });
          jsonObjects.push(obj);
        }
        
        if (jsonObjects.length === 0 || Object.keys(jsonObjects[0]).length === 0) {
          document.getElementById('import-message').innerText = "Importe uma planilha com dados válidos";
          return;
        }
        
        document.getElementById('import-message').innerText = "Planilha importada com sucesso!";
        console.log("JSON Gerado:", jsonObjects);
        data = jsonObjects; // Atualiza a variável global com os dados importados
        updateCharts(data);
        generateDynamicCharts(data);
      };
      
      reader.onerror = function() {
        document.getElementById('import-message').innerText = "Erro ao ler o arquivo.";
      };
      
      reader.readAsArrayBuffer(file);
    }
    
    // Evento para o botão de processar a planilha
    document.getElementById('process-btn').addEventListener('click', () => {
      const fileInput = document.getElementById('file-input');
      const file = fileInput.files[0];
      if (!file) {
        document.getElementById('import-message').innerText = "Por favor, selecione um arquivo .xlsx.";
        return;
      }
      const fileExtension = file.name.split('.').pop().toLowerCase();
      if (fileExtension !== 'xlsx') {
        document.getElementById('import-message').innerText = "O arquivo deve ser um .xlsx.";
        return;
      }
      processExcel(file);
    });