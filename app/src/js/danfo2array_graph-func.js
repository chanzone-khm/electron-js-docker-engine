function arr2df(graphData1D, resultArray, dateArray) {
  /**
   * グラフから取得したデータをresult/date/graphData 列を持つdataframeに変換
   * @param {float[]} graphData1D グラフに出力したい1次元arrayデータ
   * @param {string[]} resultArray 日付列の列
   * @param {string[]} datetArray 検査結果列
   * @return {dataframe} dateArray,resultArray, graphArray   日付/検査結果/可視化したいデータの1次元arrayを返す
   */

  let obj_data = {
    Result: resultArray,
    Date: dateArray,
    Val: graphData1D,
  };

  df = new dfd.DataFrame(obj_data);
  df.sortValues('Date', { inplace: true });
  console.log('読み取ったデータのdfは以下です。');
  df.print();

  return df;
}

function getDateAndResultArrayFunc(dateColNo = 14, resultColNo = 0) {
  /**
   * datatablesから日付列と結果列を取得し、arrayで返す
   * @param {int} [dateColNo=14] dateColNo 日付列の列番号 PSUでは14
   * @param {int} [resultColNo=0] dateColNo=14 resultColNo 検査結果列の列番号 PSUではデフォルトで0
   * @return {float[], float[]}} dateArray,resultArray, 日付/検査結果の1次元arrayを返す
   */
  let resultArray = [];
  let dateArray = [];

  table
    .column(resultColNo, { search: 'applied' })
    .data()
    .each(function (value, index) {
      resultArray.push(value);
    });

  table
    .column(dateColNo, { search: 'applied' })
    .data()
    .each(function (value, index) {
      dateArray.push(value);
    });

  console.log(Array.isArray(resultArray));
  console.log(resultArray);

  return [resultArray, dateArray];
}

function arr2GraphArrFunc(df, resultSplit = false) {
  /**
   * dataframeから紐づく日付データ、検査結果、可視化データの各arrayを返す。
   * @param  {dataframe} df
   * @param {boolean}  false で各データをそのままarrayで返す。 trueでpassとfailに分けて返す
   * @return {Array, Array, Array} DateArray,resultArray, graphArray   日付/検査結果/可視化したいデータの1次元arrayを返す
   * @return {Array, Array, Array, Array, Array, Array}
   * resultPassArray, datePassArray, graphdataPassArray, resultFailArray, dateFailArray, graphdataFailArray,
   */

  if (!resultSplit) {
    resultArray = df['Result'].values;
    dateArray = df['Date'].values;
    graphdataArray = df['Val'].values;
    console.log(graphdataArray);
    return [resultArray, dateArray, graphdataArray];
  } else {
    resultPassdf = df.loc({ rows: df['Result'].eq('PASS').values });
    resultFaildf = df.loc({ rows: df['Result'].eq('FAIL').values });

    // datatables の検索窓で検索している場合、指定したdfが存在しない可能性があるため回避（passでソートしたらfailのdfが無いのでエラーがでる）
    try {
      // passしたデータのアレイを取得
      resultPassArray = resultPassdf['Result'].values;
      datePassArray = resultPassdf['Date'].values;
      graphdataPassArray = resultPassdf['Val'].values;
    } catch (e) {
      if (e instanceof TypeError) {
        // datatablesの検索窓でpassがヒットしない検索をした場合に、アレイは空にする。
        console.log(e.message);
        resultPassArray = [];
        datePassArray = [];
        graphdataPassArray = [];
      }
    }

    try {
      // failのdfからデータを取得
      resultFailArray = resultFaildf['Result'].values;
      dateFailArray = resultFaildf['Date'].values;
      graphdataFailArray = resultFaildf['Val'].values;
    } catch (e) {
      // failのdfが存在しない場合
      if (e instanceof TypeError) {
        // datatablesの検索窓でfailがヒットしない検索をした場合、アレイは空にする
        console.log(e.message);
        resultFailArray = [];
        dateFailArray = [];
        graphdataFailArray = [];
      }
      console.log("DataFrame isn't exist");
    }

    return [
      resultPassArray,
      datePassArray,
      graphdataPassArray,
      resultFailArray,
      dateFailArray,
      graphdataFailArray,
    ];
  }
}

function arr2GraphArrFuncforScatter(graphdf) {
  y0 = [];
  y1 = [];

  for (let i = 0; i < graphdf['Result'].values.length; i++) {
    if (graphdf['Result'].values[i] === 'PASS') {
      y0.push(graphdf['Val'].values[i]);
      y1.push(NaN);
    } else {
      y0.push(NaN);
      y1.push(graphdf['Val'].values[i]);
    }
  }

  dateArray = graphdf['Date'].values;
  resultArray = graphdf['Result'].values;
  graphdataPassArray = y0;
  graphdataFailArray = y1;
  console.log(dateArray);
  console.log(resultArray);
  console.log(graphdataPassArray);
  console.log(graphdataFailArray);
  return [resultArray, dateArray, graphdataPassArray, graphdataFailArray];
}
