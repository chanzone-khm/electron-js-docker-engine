function getStatic(graphdf) {
  /**
   * dataframeのデータから統計量を返す
   * @param {dataframe} graphdf dataframeから生成したdatatable
   * @return {Array} dateArray,resultArray, graphArray   mean,median,std,CPKを返す
   */

  let mean = Math.round(graphdf['Val'].mean() * 100) / 100;
  let median = Math.round(graphdf['Val'].median() * 100) / 100;
  let std = Math.round(graphdf['Val'].std() * 100) / 100;

  return [mean, median, std];
}

function getStaticResultLabel(graphdf) {
  /**
   * dataframeのデータからpassデータとfailデータに分けて統計量を返す
   * @param {dataframe} graphdf dataframeから生成したdatatable
   * @return {Array} dateArray,resultArray, graphArray   mean,median,std,CPKを返す
   */

  resultPassdf = df.loc({ rows: graphdf['Result'].eq('PASS').values });
  resultFaildf = df.loc({ rows: graphdf['Result'].eq('FAIL').values });

  try {
    // passしたデータのアレイを取得
    meanPass = Math.round(resultPassdf['Val'].mean() * 100) / 100;
    medianPass = Math.round(resultPassdf['Val'].median() * 100) / 100;
    stdPass = Math.round(resultPassdf['Val'].std() * 100) / 100;
  } catch (e) {
    if (e instanceof TypeError) {
      // datatablesの検索窓でpassがヒットしない検索をした場合に、アレイは空にする。
      console.log(e.message);
      meanPass = NaN;
      medianPass = NaN;
      stdPass = NaN;
    }
  }

  try {
    // failしたデータのアレイを取得
    meanFail = Math.round(resultFaildf['Val'].mean() * 100) / 100;
    medianFail = Math.round(resultFaildf['Val'].median() * 100) / 100;
    stdFail = Math.round(resultFaildf['Val'].std() * 100) / 100;
  } catch (e) {
    if (e instanceof TypeError) {
      // datatablesの検索窓でFailがヒットしない検索をした場合に、アレイは空にする。
      console.log(e.message);
      meanFail = NaN;
      medianFail = NaN;
      stdFail = NaN;
    }
  }
  return [meanPass, medianPass, stdPass, meanFail, medianFail, stdFail];
}

//統計量の表のヘッダー
function outPutStaticHead(){
  var tableHead = document.getElementById('staticsDataHeadRow');

  var th = document.createElement('th');
  th.innerText = '-';
  tableHead.append(th);

  var th = document.createElement('th');
  th.innerText = 'mean';
  tableHead.append(th);

  var th = document.createElement('th');
  th.innerText = 'median';
  tableHead.append(th);

  var th = document.createElement('th');
  th.innerText = 'standard';
  tableHead.append(th);
}

//統計量 all,pass,failごとに場合分け
function OutPutStaticData(Type,Mean,Median,Std){

    if(Type == 'all'){
      if(statisticAllFlg == 0){
        createOutPutStaticData(Type,Mean,Median,Std)
      }else{
        addOutPutStaticData(Type,Mean,Median,Std)
      }
      statisticAllFlg += 1;
    }else if(Type == 'pass'){
      if(statisticPassFlg == 0){
        createOutPutStaticData(Type,Mean,Median,Std)
      }else{
        addOutPutStaticData(Type,Mean,Median,Std)
      }
      statisticPassFlg += 1;
    }else if(Type == 'fail'){
      if(statisticFailFlg == 0){
        createOutPutStaticData(Type,Mean,Median,Std)
      }else{
        addOutPutStaticData(Type,Mean,Median,Std)
      }
      statisticFailFlg += 1;
    }

}

// 初めて要素つくるとき
function createOutPutStaticData(Type,Mean,Median,Std){
  if(Type == 'pass'){
    var addRow = document.getElementById('staticsDataPassRow');
  }else if(Type == 'fail'){
    var addRow = document.getElementById('staticsDataFailRow');
  }else{
    var addRow = document.getElementById('staticsDataAllRow');
  }

  var tdType = document.createElement('td');
  tdType.id = Type;
  tdType.innerText = Type;
  addRow.append(tdType);

  var tdMean = document.createElement('td');
  tdMean.id = Type + "Mean";
  tdMean.innerText = Mean;
  addRow.append(tdMean);

  var tdMedian = document.createElement('td');
  tdMedian.id = Type + "Median";
  tdMedian.innerText = Median;
  addRow.append(tdMedian);

  var tdStd = document.createElement('td');
  tdStd.id = Type + "Std";
  tdStd.innerText = Std;
  addRow.append(tdStd);
}

// 要素内のテキストを変更するとき
function addOutPutStaticData(Type,Mean,Median,Std){
  var tdType = document.getElementById(Type);
  tdType.innerText = Type;

  var tdMean = document.getElementById(Type + "Mean");
  tdMean.innerText = Mean;

  var tdMedian = document.getElementById(Type + "Median");
  tdMedian.innerText = Median;

  var tdStd = document.getElementById(Type + "Std");
  tdStd.innerText = Std;
}

function staticTable(graph_df){
  [mean, median, std] = getStatic(graph_df);
  OutPutStaticData("all", mean,median,std);

  [meanPass, medianPass, stdPass, meanFail, medianFail, stdFail] = getStaticResultLabel(graph_df)
  console.log(meanPass, medianPass, stdPass, meanFail, medianFail, stdFail);
  OutPutStaticData("pass", meanPass,medianPass,stdPass);

  OutPutStaticData("fail", meanFail,medianFail,stdFail);

}