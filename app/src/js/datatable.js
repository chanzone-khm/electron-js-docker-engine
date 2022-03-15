// ----------------- Global Variant -----------------
var table;
var statisticPassFlg = 0;
var statisticFailFlg = 0;
var statisticAllFlg = 0;
// var timeSeries = [];
// const dfd = require("danfojs-node");

// ----------------- Global Variant -----------------

$(function () {
  $('#graph').click(function () {
    jQuery(function ($) {
      table = $('#CSVtable').DataTable({
        // DOMの設定
        dom:
        "<'row'<'col-sm-1 col-md-1'f><'col-sm-12 col-md-9'l>>" +
        "<'row'<'col-sm-12'tr>>" +
        "<'row'<'col-sm-12 col-md-5'i><'col-sm-12 col-md-7'p>>",
        // // // 件数切替機能 無効
        // lengthChange: true,
        // // 検索機能 無効
        // searching: true,
        // // ソート機能 無効
        // ordering: true,
        // 自動ソートにしない
        order:[],
        // // 情報表示 無効
        // info: true,
        // // ページング機能 無効
        paging: false,
        // // 横スクロールバーを有効にする (scrollXはtrueかfalseで有効無効を切り替えます)
        scrollX: true,
        // 縦スクロールバーを有効にする (scrollYは200, "200px"など「最大の高さ」を指定します)
        scrollY: "400px",
        scrollCollapse: true,
        // pagingType: "full_numbers",
        // select: true,
        // orderCellsTop: true,
        fixedHeader: true,
      });
    });
    //   })
    // })

    // select拡張機能を有効 cell選択モードにする。
    table.select.style('os');
    table.select.items('cell');

    // searchボックス状態に応じた列データを取得する。
    table.on('select', function (e, dt, type, indexes) {
      var tabledataArray = [];
      table
        .column(indexes['0'].column, { search: 'applied' }) // search : "applied" で検索ボックスが反映されたあとのテーブルデータを取得する。
        .data()
        .each(function (value, index) {
          tabledataArray.push(value);
        });
      graphData1D = tabledataArray.map(Number);

      let resultArray = [];
      let dateArray = [];
      [resultArray, dateArray] = getDateAndResultArrayFunc();

      // danfoにてdate/result/graphData1D のテーブルを作る
      graph_df = arr2df(graphData1D, resultArray, dateArray);

      // checkboxが押されなければ、データを集計せずプロット
      // ToDo 変数checkbox はダミー
      let checkbox = document.getElementById('PassFail').checked;
      // alert(checkbox);

      if((statisticAllFlg == 0) && (statisticPassFlg == 0) && (statisticFailFlg == 0)){
        outPutStaticHead();
      }
      // let checkbox = false;
      console.log(checkbox);
      if (checkbox == false) {
        [graphResult, graphDate, graphVal] = arr2GraphArrFunc(
          graph_df,
          (resultSplit = false)
        );

        [graphResultScat, graphDateScat, graphPassValScat, graphFailValScat] =
          arr2GraphArrFuncforScatter(graph_df);

        // グラフ描画
        histogramNormal(graphVal);
        boxplotNormal(graphVal);
        scatterNormal(graphPassValScat, graphFailValScat, graphDateScat);

        // 統計量の出力
        // [mean, median, std] = getStatic(graph_df);
        // OutPutStaticData("all", mean,median,std);
        staticTable(graph_df);

      } else {
        [
          graphResultPass,
          graphDatePass,
          graphValPass,
          graphResultFail,
          graphDateFail,
          graphValFail,
        ] = arr2GraphArrFunc(graph_df, (resultSplit = true));
        [graphResultScat, graphDateScat, graphPassValScat, graphFailValScat] =
          arr2GraphArrFuncforScatter(graph_df);

        // グラフ描画
        histogramResultLabel(graphValPass, graphValFail);
        boxplotResultLabel(graphValPass, graphValFail);
        scatterNormal(graphPassValScat, graphFailValScat, graphDateScat); // scatterはPass/Failに依存しない。

        // 統計量の出力
        // [meanPass, medianPass, stdPass, meanFail, medianFail, stdFail] = getStaticResultLabel(graph_df)
        // console.log(meanPass, medianPass, stdPass, meanFail, medianFail, stdFail);
        // OutPutStaticData("pass", meanPass,medianPass,stdPass);
        // OutPutStaticData("fail", meanFail,medianFail,stdFail);
        staticTable(graph_df);
      }
    });
  });
});

// 1Dを2Dに変換する関数
function splitArray(array, part) {
  var tmp = [];
  for (var i = 0; i < array.length; i += part) {
    tmp.push(array.slice(i, i + part));
  }
  return tmp;
}
