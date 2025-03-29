let data = [];

 const estadoCivilCtx = document.getElementById('estadoCivilChart').getContext('2d');
 const filhosCtx = document.getElementById('filhosChart').getContext('2d');
 const locomocaoCtx = document.getElementById('locomocaoChart').getContext('2d');
 const rendaFamiliarCtx = document.getElementById('rendaFamiliarChart').getContext('2d');
 const trabalhaCtx = document.getElementById('trabalhaChart').getContext('2d');
 const escolaridadeCtx = document.getElementById('escolaridadeChart').getContext('2d');

 // Funções para criar os gráficos usando Chart.js
 function createPieChart(context, title, data, labels, colors) {
     return new Chart(context, {
         type: 'pie',
         data: {
             labels: labels,
             datasets: [{
                 label: title,
                 data: data,
                 backgroundColor: colors,
                 borderWidth: 1
             }]
         },
         options: {
             responsive: true,
             maintainAspectRatio: true,
             plugins: {
                 legend: {
                     position: 'top'
                 },
                 title: {
                     display: true,
                     text: title,
                     font: {
                         size: 16
                     }
                 }
             }
         }
     });
 }

 function createBarChart(context, title, data, labels, colors) {
     return new Chart(context, {
         type: 'bar',
         data: {
             labels: labels,
             datasets: [{
                 label: title,
                 data: data,
                 backgroundColor: colors,
                 borderWidth: 1
             }]
         },
         options: {
             responsive: true,
             maintainAspectRatio: true,
             scales: {
                 y: {
                     beginAtZero: true
                 }
             },
             plugins: {
                 legend: {
                     position: 'top'
                 },
                 title: {
                     display: true,
                     text: title,
                     font: {
                         size: 16
                     }
                 }
             }
         }
     });
 }

 // Extrai dados e cria gráficos
 function updateCharts(filteredData) {
     // Estado Civil
     const estadoCivilData = countOccurrences(filteredData, 'EstadoCivil');
     const estadoCivilLabels = Object.keys(estadoCivilData);
     const estadoCivilCounts = Object.values(estadoCivilData);
     const estadoCivilColors = ['#4CAF50', '#2196F3', '#9C27B0', '#FFC107'];
     const estadoCivilChart = createPieChart(estadoCivilCtx, 'Estado Civil', estadoCivilCounts, estadoCivilLabels, estadoCivilColors);

     // Tem Filhos
     const filhosData = countOccurrences(filteredData, 'TemFilhos');
     const filhosLabels = Object.keys(filhosData);
     const filhosCounts = Object.values(filhosData);
     const filhosColors = ['#FF5252', '#3F51B5'];
     const filhosChart = createPieChart(filhosCtx, 'Tem Filhos', filhosCounts, filhosLabels, filhosColors);

     // Meio de Locomoção
     const locomocaoData = countOccurrences(filteredData, 'MeioLocomocao');
     const locomocaoLabels = Object.keys(locomocaoData);
     const locomocaoCounts = Object.values(locomocaoData);
     const locomocaoColors = ['#00BCD4', '#FFC107', '#795548', '#9E9E9E'];
     const locomocaoChart = createBarChart(locomocaoCtx, 'Meio de Locomoção', locomocaoCounts, locomocaoLabels, locomocaoColors);

     // Renda Familiar
     const rendaFamiliarData = countOccurrences(filteredData, 'RendaFamiliar');
     const rendaFamiliarLabels = ['Até 1 SM', '2 SM', '3 SM', '4 SM', '5 SM', 'Acima de 5 SM'];
     const rendaFamiliarCounts = rendaFamiliarLabels.map(label => rendaFamiliarData[label] || 0);
     const rendaFamiliarColors = ['#8BC34A', '#CDDC39', '#FFEB3B', '#FFC107', '#FF9800', '#FF5722'];
     const rendaFamiliarChart = createBarChart(rendaFamiliarCtx, 'Renda Familiar', rendaFamiliarCounts, rendaFamiliarLabels, rendaFamiliarColors);

      // Trabalha
     const trabalhaData = countOccurrences(filteredData, 'Trabalha');
     const trabalhaLabels = Object.keys(trabalhaData);
     const trabalhaCounts = Object.values(trabalhaData);
     const trabalhaColors = ['#009688', '#E65100'];
     const trabalhaChart = createPieChart(trabalhaCtx, 'Trabalha', trabalhaCounts, trabalhaLabels, trabalhaColors);

     // Escolaridade
     const escolaridadeData = countOccurrences(filteredData, 'Escolaridade');
     const escolaridadeLabels = Object.keys(escolaridadeData);
     const escolaridadeCounts = Object.values(escolaridadeData);
     const escolaridadeColors = ['#3F51B5', '#D32F2F'];
     const escolaridadeChart = createPieChart(escolaridadeCtx, 'Escolaridade', escolaridadeCounts, escolaridadeLabels, escolaridadeColors);


     // Função auxiliar para contar ocorrências
     function countOccurrences(arr, key) {
         return arr.reduce((acc, item) => {
             const value = item[key];
             acc[value] = (acc[value] || 0) + 1;
             return acc;
         }, {});
     }
 }

 // Chamada inicial para exibir todos os dados
 updateCharts(data);

 // Aplica os filtros
 document.getElementById('filtrar').addEventListener('click', () => {
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
                 (rendaFamiliarFilter === '1' && item.RendaFamiliar <= 1212) || // Até 1 SM
                 (rendaFamiliarFilter === '2' && item.RendaFamiliar > 1212 && item.RendaFamiliar <= 2424) || // 2 SM
                 (rendaFamiliarFilter === '3' && item.RendaFamiliar > 2424 && item.RendaFamiliar <= 3636) || // 3 SM
                 (rendaFamiliarFilter === '4' && item.RendaFamiliar > 3636 && item.RendaFamiliar <= 4848) || // 4 SM
                 (rendaFamiliarFilter === '5' && item.RendaFamiliar > 4848 && item.RendaFamiliar <= 6060) || // 5 SM
                 (rendaFamiliarFilter === '6' && item.RendaFamiliar > 6060)// Acima de 5 SM
             ) &&
             (!trabalhaFilter || item.Trabalha === trabalhaFilter) &&
             (!escolaridadeFilter || item.Escolaridade === escolaridadeFilter) &&
             (!concluiuEMFilter || item.ConcluiuEM === concluiuEMFilter)
         );
     });

     updateCharts(filteredData);
 });