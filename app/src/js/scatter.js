function scatterNormal(graphVal1, graphVal2, graphDate) {
  var trace0 = {
    x: graphDate,
    y: graphVal1,
    name: 'pass',
    mode: 'markers',
    type: 'scatter',
  };

  var trace1 = {
    x: graphDate,
    y: graphVal2,
    name: 'fail',
    mode: 'markers',
    type: 'scatter',
  };

  // Todo Scatterのlayoutの使い方が不明 必要??
  var layout = { title: 'scatter' };

  var data = [trace0, trace1];
  Plotly.newPlot('scatter', data, layout, {
    showSendToCloud: true,
    scrollZoom: true,
    editable: true,
    displaylogo: false,
    responsive: true,
    // framecolor: #444 ,
  });
}
