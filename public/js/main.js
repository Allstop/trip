
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
  Td.innerHTML='<input class="startTime" type="text" size="10">';
  Td = Tr.insertCell(Tr.cells.length);
  Td.innerHTML='<input class="endTime" type="text" size="10">';
  Td = Tr.insertCell(Tr.cells.length);
  Td.innerHTML='<input class="planPlaceId" type="text" size="10">';
  Td = Tr.insertCell(Tr.cells.length);
  Td.innerHTML='<input class="category" type="text" size="10">';
  Td = Tr.insertCell(Tr.cells.length);
  Td.innerHTML='<input class="itemDescription" type="text" size="10">';
  Td = Tr.insertCell(Tr.cells.length);
  Td.innerHTML='<input class="defaultCost" type="text" size="10">';
  Td = Tr.insertCell(Tr.cells.length);
  Td.innerHTML='<input class="cost" type="text" size="10">';
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
var planId;

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
//執行瀏覽/del事件
$(document).on("click",".planLists button",function(){
  var $touch=$(this).attr("class"),
      touchEvent = $touch.split('_class_'),
      plan_Event=touchEvent[0],
      plan_id = touchEvent[1];
  if (plan_Event == 'item') {
    listsItem(plan_id);
    $('.item_list_'+ plan_id).html('');
    $('.item_list_'+ plan_id).append('<div class="itemLists"></div>');
  }else if(plan_Event == 'delete') {
    delPlan(plan_id);
  }
});
//建立item～執行儲存事件
$(document).on("click","#submitItem",function(){
    var startTimeVaule = $(".startTime").val();
    var endTimeVaule = $(".endTime").val();
    var placeVaule = $(".planPlaceId").val();
    var categoryVaule = $(".category").val();
    var descriptionVaule = $(".itemDescription").val();
    var defaultCostVaule = $(".defaultCost").val();
    var costVaule = $(".cost").val();
    var itemList = {
        planId : planId,
        startTime : startTimeVaule,
        endTime : endTimeVaule,
        category : categoryVaule,
        planPlaceId : placeVaule,
        description : descriptionVaule,
        defaultCost : defaultCostVaule,
        cost : costVaule
      }
  newItem(itemList);
});
//建立
var newPlan = function() {
  $.ajax({
    url: "http://trip/plan/new",
    type: "POST",  //POST or GET 大寫
    dataType: "JSON",
    data: list,    // 要傳入的json 物件
    success: function (response) {
      console.log(response) //成功時在主控台印出 response     --- 主控台按 f12 -> console
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
  console.log(id)
  $.ajax({
    url: "http://trip/plan/del",
    type: "POST",
    dataType: "JSON",
    data:{id : id} ,

    success: function (response) {
      console.log(response)
      listsPlan();
    },
    error: function (response) {
      console.log(response)
    }
  })
};
//檢查
var insertPlanCheck = function(id) {
  $.ajax({
    url: "http://trip//plan/insertCheck",
    type: "POST",
    dataType: "JSON",
    data: {id : id},
    success: function(response) {
      if (response.status == 'success') {
        newPlan();
      } else {
        alert('123');
      }
    },
    error: function () {
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
        var $Div = $('<div class="plan plan_'+response.status[key].id+'"></div>'),
          temp = response.status[key];
        i = 0;
        for (var j in temp ) {
          var $Span = $('<span></span>');
          $Span.text(title[i]+temp[j]);
          $Div.append($Span);
          $Div.append('<br/>');
          i++;
        }
        planId = temp.id;
        $('.planLists').append($Div);
        $('.planLists').append('<button class="item_class_'+ planId +'" >瀏覽</button>');
        $('.planLists').append('<button class="delete_class_'+ planId +'" >刪除</button>');
        $('.planLists').append('<div class="item_list_'+ planId +'" ></div>');
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
          $('.planLists').append('<button class="item_class_'+ id +'" >瀏覽</button>');
          $('.planLists').append('<button class="delete_class_'+ id +'" >刪除</button>');
          $('.planLists').append('<div class="itemLists_'+ id +'" </div>');
        }
      },
      error: function () {
        console.log("unList fail")
      }
    })
};
//建立item
var newItem = function(itemList) {
  $.ajax({
    url: "http://trip/planItem/new",
    type: "POST",
    dataType: "JSON",
    data: itemList,
    success: function (response) {
      //console.log(response)
      listsItem(response.status);
    },
    error: function () {
      console.log("newItem fail")
    }
  })
};
//瀏覽item
var listsItem = function(plan_id) {
  var title = ["起始","結束","地點","分類","描述","預算","實際"];
  var $itemLists_id = $('<div class="itemLists_'+plan_id+'"></div>');
  var $table = $('<table id="listsItem" border="0" width="700px" ></table>');
  var $Tr = $('<tr></tr>');
  for (var m in title ) {
    var $Td = $('<td width="100" bgcolor="#7F9DB9" size="10">'+title[m]+'</td>');
    $Td.text(title[m]);
    $Tr.append($Td);
    $table.append($Tr);
    $itemLists_id.append($table);
    m++;
  }
  $.ajax({
    url: "http://trip/planItem/lists",
    type: "GET",
    dataType: "JSON",
    data:{planId:plan_id} ,
    success: function (response) {
      //console.log(response)
      for (var key in response.status) {
        var $Tr = $('<tr></tr>'),
            itemTitle = ["startTime","endTime","planPlaceId","category","description","defaultCost","cost"],
            temp = response.status[key];
        o=0;
        for ( o in itemTitle ) {
          var $Td = $('<td width="100"></td>');
          $Td.text(temp[itemTitle[o]]);
          $Tr.append($Td);
          $table.append($Tr);
          $itemLists_id.append($table);
          o++;
        }
      }
      $itemLists_id.append('<input type="button" value="增加" onclick="addItem()">');
      $itemLists_id.append('<input type="button" value="刪除" onclick="delItem()">');
      $itemLists_id.append('<input type="submit" id="submitItem" value="儲存">');
      $('.itemLists').html('');
      $('.itemLists').append($itemLists_id);

    },
    error: function () {
      console.log("listsItem fail")
    }
  })
};

listsPlan();