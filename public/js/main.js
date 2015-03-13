
$(function(){
  $( "#datepicker1" ).datepicker({dateFormat: "yy-mm-dd"});
  $( "#datepicker2" ).datepicker({dateFormat: "yy-mm-dd"});
  $("#divShow").hide();
  $('body').click(function(evt) {
    if($(evt.target).parents("#divShow").length==0 &&
      evt.target.id != "aaa" && evt.target.id != "divShow") {
      $('#divShow').hide();
    }
  });
});
//新增item
function addItem() {
  var num = document.getElementById("listsItem").rows.length;
  var Tr = document.getElementById("listsItem").insertRow(num);
  Td = Tr.insertCell(Tr.cells.length);
  Td.innerHTML='<input name="startTime[]" type="text" size="10">';
  Td = Tr.insertCell(Tr.cells.length);
  Td.innerHTML='<input name="endTime[]" type="text" size="10">';
  Td = Tr.insertCell(Tr.cells.length);
  Td.innerHTML='<input name="place[]" type="text" size="10">';
  Td = Tr.insertCell(Tr.cells.length);
  Td.innerHTML='<input name="category[]" type="text" size="10">';
  Td = Tr.insertCell(Tr.cells.length);
  Td.innerHTML='<input name="description[]" type="text" size="10">';
  Td = Tr.insertCell(Tr.cells.length);
  Td.innerHTML='<input name="defaultCost[]" type="text" size="10">';
  Td = Tr.insertCell(Tr.cells.length);
  Td.innerHTML='<input name="cost[]" type="text" size="10">';
}
//刪除item
function delItem() {
  var num = document.getElementById("listsItem").rows.length;
  if(num >2)
  {
    document.getElementById("listsItem").deleteRow(-1);
  }
}
//全域變數
var list={};
//建立plan～執行go事件
$("#submit").click(function(){
  if ($(".title").val() == '') {
    alert("遊記名稱不得為空值！");
  } else {
    var titleVaule = $(".title").val();
    var introductionVaule = $(".introduction").val();
    var nopVaule = $(".nop").val();
    var startDateVaule = $(".startDate").val();
    var endDateVaule = $(".endDate").val();
    var descriptionVaule = $(".description").val();
    list = {
      title : titleVaule,
      introduction : introductionVaule,
      nop : nopVaule,
      startDate : startDateVaule,
      endDate : endDateVaule,
      description : descriptionVaule
    }
    insertPlanCheck();
  }
});
//執行item事件
$(document).on("click",".item_class",function(){
  var $Span = $($(this).prev().find('span').get(0)),
    tmpStr = $Span.text(),
    tmp = tmpStr.split('：');
  console.log(tmp);
  $('.planLists').append(listsItem(tmp[1]));

});
//執行del事件
$(document).on("click",".delete_class",function(){
  var $Span = $($(this).prev().prev().find('span').get(0)),
      tmpStr = $Span.text(),
      tmp = tmpStr.split('：');
  delPlan(tmp[1]);
});
//全域變數
var itemList={};
//建立item～執行儲存事件
$(document).on("click","#submitItem",function(){
    var startTimeVaule = $(".startTime").val();
    var endTimeVaule = $(".endTime").val();
    var placeVaule = $(".place").val();
    var categoryVaule = $(".category").val();
    var descriptionVaule = $(".description").val();
    var defaultCostVaule = $(".defaultCost").val();
    var costVaule = $(".cost").val();
    itemList = {
      startTime : startTimeVaule,
      endTime : endTimeVaule,
      category : categoryVaule,
      place : placeVaule,
      description : descriptionVaule,
      defaultCost : defaultCostVaule,
      cost : costVaule
    }
  console.log(itemList)
  newItem();
});
//建立
var newPlan = function() {
  $.ajax({
    url: "http://trip/plan/new",
    type: "POST",  //POST or GET 大寫
    dataType: "JSON",
    data: list,    // 要傳入的json 物件
    success: function (response) {
      console.log(response) //成功時在主控台印出 response     --- 主控台按 f12 -> console   (or 右鍵---
      uniqueListsPlan(response.status);
    },
    error: function () {
      //失敗執行的方法
      console.log("new fail")
    }
  })
};
//刪除
var delPlan = function(id) {
  $.ajax({
    url: "http://trip/plan/del",
    type: "POST",  //POST or GET 大寫
    dataType: "JSON",
    data:{id : id} ,

    success: function (response) {
      console.log(response) //成功時在主控台印出 response     --- 主控台按 f12 -> console   (or 右鍵---

      listsPlan();
    },
    error: function (response) {
      //失敗執行的方法
      console.log(response)
      //console.log("del fail")
    }
  })
};
//檢查
var insertPlanCheck = function() {
  $.ajax({
    url: "http://trip//plan/insertCheck",
    type: "POST",  //POST or GET 大寫
    dataType: "JSON",
    data: {id : 20},    // 要傳入的json 物件
    success: function(response) {
      if (response.status == 'success') {
        newPlan();
      } else {
        alert('123');
      }
    },
    error: function () {
      //失敗執行的方法
      console.log("check fail")
    }
  })
};
//明細
var listsPlan = function() {
  $.ajax({
    url: "http://trip/plan/lists",
    type: "GET",
    dataType: "JSON",
    success: function (response) {

      $('.planLists').html('');
      var title = ['序：','遊記名稱：','簡介：','旅行人數：','旅行日期：','～','描述：','建立時間：'];
      for (var key in response.status) {
        var $Div = $('<div></div>'),
          temp = response.status[key];
        i = 0;
        for (var j in temp ) {
          var $Span = $('<span></span>');
          $Span.text(title[i]+temp[j]);
          $Div.append($Span);
          $Div.append('<br/>');
          i++;
        }
        $('.planLists').append($Div);
        $('.planLists').append('<button class="item_class" >瀏覽</button>');
        $('.planLists').append('<button class="delete_class" >刪除</button>');
        $('.planLists').append('<div></div>');

      }
    },
    error: function () {
      console.log("list fail")
    }
  })
};
//單一明細
var uniqueListsPlan = function(id) {
    $.ajax({
      url: "http://trip/plan/uniqueLists",
      type: "GET",
      dataType: "JSON",
      data: {"id": id},
      success: function (response) {
        $('.planLists').html('');
        var title = ["序：","遊記名稱：","簡介：","旅行人數：","旅行日期：","～","描述：","建立時間："];
        for (var key in response.status) {
          var $Div = $('<div></div>'),
            temp = response.status[key];
          i = 0;
          for (var j in temp ) {
            var $Span = $('<span></span>');
            $Span.text(title[i]+temp[j]);
            $Div.append($Span);
            $Div.append('<br/>');
            i++;
          }
          $('.planLists').append($Div);
          $('.planLists').append('<button class="item_class" >瀏覽</button>');
          $('.planLists').append('<button class="del_class" >刪除</button>');

        }
      },
      error: function () {
        console.log("unList fail")
      }
    })

};
//建立item
var newItem = function() {

  $.ajax({
    url: "http://trip/planItem/new",
    type: "POST",  //POST or GET 大寫
    dataType: "JSON",
    data: itemList,    // 要傳入的json 物件
    success: function (response) {
      console.log(response) //成功時在主控台印出 response     --- 主控台按 f12 -> console   (or 右鍵---
      uniqueListsPlan(response.status);
    },
    error: function () {
      //失敗執行的方法
      console.log("newItem fail")
    }
  })
};
//瀏覽item
var listsItem = function(id) {

  $('.itemLists').html('');
  $('.itemLists').append('<table id="listsItem" border="0" width="700" ><tr>');
  $('.itemLists').append('<td width="100" bgcolor="#7F9DB9" class="startTime" >起始</td>');
  $('.itemLists').append('<td width="100" bgcolor="#7F9DB9" class="endTime" >結束</td>');
  $('.itemLists').append('<td width="100" bgcolor="#7F9DB9" class="place" >地點</td>');
  $('.itemLists').append('<td width="100" bgcolor="#7F9DB9" class="category" >分類</td>');
  $('.itemLists').append('<td width="100" bgcolor="#7F9DB9" class="description" >描述</td>');
  $('.itemLists').append('<td width="100" bgcolor="#7F9DB9" class="defaultCost" >預算</td>');
  $('.itemLists').append('<td width="100" bgcolor="#7F9DB9" class="cost" >實際</td></tr>');
  $('.itemLists').append('<tr>');
  $('.itemLists').append('<td><input name="startTime[]" type="text" size="10"></td>');
  $('.itemLists').append('<td><input name="endTime[]" type="text" size="10"></td>');
  $('.itemLists').append('<td><input name="place[]" type="text" size="10"></td>');
  $('.itemLists').append('<td><input name="category[]" type="text" size="10"></td>');
  $('.itemLists').append('<td><input name="description[]" type="text" size="10"></td>');
  $('.itemLists').append('<td><input name="defaultCost[]" type="text" size="10"></td>');
  $('.itemLists').append('<td><input name="cost[]" type="text" size="10"></td>');
  $('.itemLists').append('</tr></table>');
  $('.itemLists').append('<input type="button" value="增加" onclick="addItem()">');
  $('.itemLists').append('<input type="button" value="刪除" onclick="delItem()">');
  $('.itemLists').append('<input type="submit" id="submitItem" value="儲存" >');

  $.ajax({
    url: "http://trip/plan/listsItem",
    type: "GET",  //POST or GET 大寫 I don't have time
    dataType: "JSON",
    data:{id : id} ,
    success: function (response) {
      console.log(response) //成功時在主控台印出 response     --- 主控台按 f12 -> console   (or 右鍵---
    },
    error: function () {
      //失敗執行的方法
      console.log()
      //console.log("del fail")
    }
  })
};

listsPlan();

//haha because today moning I'm very hungry. so think you maybe too.Then buy one for you
// JQuery
// .append()
// .html()
// .text()