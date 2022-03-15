function histogramNormal(graphVal) {
  /**
   * 選択範囲すべてのデータをhistgram表示
   * @param  {Array} graphVal 可視化対象のarray
   *
   */
  console.log('histogram input data');
  console.log(graphVal);

  var trace1 = {
    x: graphVal,
    name: 'control',
    autobinx: true,
    histnorm: 'count',
    marker: {
      color: 'rgba(255, 100, 102, 0.7)',
      line: {
        color: 'rgba(255, 100, 102, 1)',
        width: 1,
      },
    },
    opacity: 0.5,
    type: 'histogram',
    xbins: {
      end: 2.8,
      size: 1.5,
      start: 0.5,
    },
  };

  var data = [trace1];
  var layout = {
    bargap: 0.05,
    bargroupgap: 0.2,
    barmode: 'overlay',
    title: 'histogram',
    xaxis: { title: 'Value' },
    yaxis: { title: 'Count' },
  };
  Plotly.newPlot('histogram', data, layout, {
    scrollZoom: true,
    editable: true,
    displaylogo: false,
    responsive: true,
  });

  //---------------------plotly end---------------------
}

function histogramResultLabel(graphValPass, graphValFail) {
  /**
   * 選択範囲のデータをpass/failに集計してヒストグラム表示する。
   * @param  {Array} graphValPass 可視化対象のarray passデータ
   * @param  {Array} graphValFail 可視化対象のarray passデータ
   */

  console.log('histogram input data with grouping result');
  console.log(graphValPass);
  console.log(graphValFail);

  var trace1 = {
    x: graphValPass,
    name: 'pass',
    autobinx: true,
    histnorm: 'count',
    marker: {
      color: 'rgba(255, 100, 102, 0.7)',
      line: {
        color: 'rgba(255, 100, 102, 1)',
        width: 1,
      },
    },
    opacity: 0.5,
    type: 'histogram',
    xbins: {
      end: 2.8,
      size: 1.5,
      start: 0.5,
    },
  };
  var trace2 = {
    x: graphValFail,
    name: 'fail',
    autobinx: true,
    histnorm: 'count',
    marker: {
      color: 'rgba(100, 200, 102, 0.7)',
      line: {
        color: 'rgba(100, 200, 102, 1)',
        width: 1,
      },
    },
    opacity: 0.5,
    type: 'histogram',
    xbins: {
      end: 2.8,
      size: 1.5,
      start: 0.5,
    },
  };
  var data = [trace1, trace2];

  var layout = {
    bargap: 0.05,
    bargroupgap: 0.2,
    barmode: 'overlay',
    title: 'histogram',
    xaxis: { title: 'Value' },
    yaxis: { title: 'Count' },
  };
  Plotly.newPlot('histogram', data, layout, {
    scrollZoom: true,
    editable: true,
    displaylogo: false,
    responsive: true,
  });

  //---------------------plotly end---------------------
}
