function boxplotNormal(graphVal) {
  /**
   * boxplotを描画する。
   * @param  {Array} graphVal 可視化対象のarray
   */

  console.log('boxplot input data');
  console.log(graphVal);
  var trace1 = {
    y: graphVal,
    boxpoints: 'all',
    jitter: 0.3,
    pointpos: -1.8,
    type: 'box',
  };

  var layout = { title: 'boxplot' };
  data = [trace1];

  Plotly.newPlot('boxplot', data, layout, {
    scrollZoom: true,
    editable: true,
    displaylogo: false,
    responsive: true,
  });
}

function boxplotResultLabel(graphValPass, graphValFail) {
  /**
   * pass/failにグループ分けしてboxplotを描画する。
   * @param  {Array} graphValPass 可視化対象のPassデータのarray
   * @param  {Array} graphValFail 可視化対象のFailデータのarray
   *
   */

  console.log('boxplot input data with result labeling');
  console.log(graphValPass);
  console.log(graphValFail);

  var trace1 = {
    y: graphValPass,
    boxpoints: 'all',
    jitter: 0.3,
    pointpos: -1.8,
    type: 'box',
    name: 'pass',
  };
  var trace2 = {
    y: graphValFail,
    boxpoints: 'all',
    jitter: 0.3,
    pointpos: -1.8,
    type: 'box',
    name: 'fail',
  };

  var layout = { title: 'boxplot' };

  var data = [trace1, trace2];

  Plotly.newPlot('boxplot', data, layout, {
    scrollZoom: true,
    editable: true,
    displaylogo: false,
    responsive: true,
  });
}
