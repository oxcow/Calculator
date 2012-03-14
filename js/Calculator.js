var num_array = {
	one : '0',
	oper : null
};
$(function() {
	// 控制按钮
	renderingCtrlPanl();
	// 控制按钮绑定事件
	bindClickEventToCtrlPanlBtns();

	// 数字按钮
	renderingNumPanl();
	// 数字按钮绑定事件
	$.each($(".numPanl > button"), function(idx, val) {
		if (idx == 9) {
			$(val).css('width', '90px');
		}
		$(val).bind("click", function() {
			var showval = $("#showval").val();
			var clicknum = $(val).text();
			if (num_array.oper) {
				showval = 0;
				$("#showval").val(showval);
			}
			// console.log("num_array2", num_array);
			if (showval && showval != '0') {
				$("#showval").val(showval + clicknum);
			} else {
				$("#showval").val(clicknum);
			}
		});
	});
	// bindClickEventToNumPanlBtns();
	// 操作按钮
	renderingOperPanl();

	// 操作绑定事件
	$.each($(".operPanl > button"), function(idx, val) {
		if (idx == 8) {
			$(val).css("width", "90px");
		}
		$(val).bind("click", function() {
			switch (idx) {
			case 0:
				var cur_val = $("#showval").val();
				var fval = cur_val.substring(0, 1);
				if (fval != '0') {
					if (fval == '-') {
						$("#inputVal").val(cur_val.slice(1, cur_val.length));
					} else {
						$("#inputVal").val("-" + cur_val);
					}
				}
				break;
			case 1:
				var cur_val = parseFloat($("#showval").val());
				$("#showval").val(Math.sqrt(cur_val));
				break;
			case 2:
				break;
			case 3:
				break;
			case 4:
				break;
			case 5:// 分数,单目运算
				var cur_val = parseFloat($("#showval").val());
				$("#showval").val(1 / cur_val);
				break;
			case 6:// 减号
				num_array.oper = "-";
				num_array = jsval(num_array);
				break;
			case 7: // 加号
				num_array.oper = "+";
				num_array = jsval(num_array);
				break;
			case 8: // 等号
				var one = parseFloat($("#showval").data("showval").one);
				var two = parseFloat($("#showval").val());
				console.log(one + " + " + two + " = ", one + two);
				$('#showval').val(one + two);
				$("#showval").data("showval", {
					one : '0'
				});
				break;
			}
		});

	});
});
function addButton(aBtnNames, targetDivClass) {
	var sBtn = "";
	$.each(aBtnNames, function(idx, val) {
		sBtn += "<button>" + val + "</button>";
	});
	$("." + targetDivClass).append(sBtn);
}
// 渲染控制按钮
function renderingCtrlPanl() {
	addButton([ '<—', 'CE', 'C' ], "ctrlPanl");
}
// 渲染数字按钮
function renderingNumPanl() {
	addButton([ '7', '8', '9', '4', '5', '6', '1', '2', '3', '0', '.' ],
			"numPanl");
}
// 渲染操作按钮
function renderingOperPanl() {
	addButton([ '±', '√', '÷', '%', '×', '1/x', '-', '+', '=' ], "operPanl");
}
// 绑定事件到目标按钮
function bindEventToButton(targetBtnDivClass, eventName, aEventFns) {
	$.each($("." + targetBtnDivClass + " > button"), function(idx, sElem) {
		if ($.isArray(aEventFns)) {
			$(sElem).bind(eventName, aEventFns[idx]);
		} else {
			$(sElem).bind(eventName, aEventFns);
		}
	});
}
// 绑定click事件到控制面板按钮
function bindClickEventToCtrlPanlBtns() {
	bindEventToButton("ctrlPanl", "click", [ rollBackInput, clearInput,
			clearInput ]);
}
// 绑定click事件到数字面板按钮
function bindClickEventToNumPanlBtns() {
	bindEventToButton("numPanl", "click", inputNum);
}

function rollBackInput() {
	var inputval = $("#showval").val();
	var inputval_len = inputval.length;
	if (inputval_len <= 1) {
		$("#showval").val("0");
	} else {
		$("#showval").val(inputval.slice(0, inputval.length - 1));
	}
}
function clearInput() {
	$("#showval").val("0");
}
function inputNum() {
	var showval = $("#showval").val();
	var clicknum = $(val).text();
	if (num_array.oper) {
		showval = 0;
		$("#showval").val(showval);
	}
	if (showval && showval != '0') {
		$("#showval").val(showval + clicknum);
	} else {
		$("#showval").val(clicknum);
	}
}

function jsval(numarray) {
	var showval = $("#showval").val();
	var express = numarray.one + numarray.oper + showval;
	console.log("express->", express);
	var result = eval(express);
	console.log("result->", result);
	$("#showval").val(result);
	numarray.one = result;
	return numarray;
}
function test() {

}