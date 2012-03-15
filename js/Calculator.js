$(function() {
	// 控制按钮
	renderingCtrlPanl();
	// 控制按钮绑定事件
	bindClickEventToCtrlPanlBtns();
	// 数字按钮
	renderingNumPanl();
	// 数字按钮绑定事件
	bindClickEventToNumPanlBtns();
	// 操作按钮
	renderingOperPanl();
	// 操作绑定事件
	bindClickEventToOperPanlBtns();
});

function addButton(aBtnNames, targetDivClass) {
	var sBtn = "";
	$.each(aBtnNames, function(idx, val) {
		sBtn += "<button id='" + targetDivClass + "c_btn_" + idx + "'>" + val
				+ "</button>";
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
// 绑定click事件到操作面板按钮
function bindClickEventToOperPanlBtns() {
	bindEventToButton("operPanl", "click", [ oneSubX, sqrtUnary, null, null,
			null, oneDivX ]);
}
var Calculator = {
	__data : [],
	__isDecimalPoint : function(val) { // 判断是否为小数点
		return val == "." ? true : false;
	},
	__dealWithdecimalPoint : function() {
		if (this.getDataLen() == 0) {
			this.__data.push(0);
		}
		if (this.__data.toString().indexOf(".") == -1) {
			this.__data.push(".");
		}
	},
	getDataLen : function() {
		return this.__data.length;
	},
	pushData : function(val) {// 将输入的数据存放到计算器的数据里
		if (this.__isDecimalPoint(val)) {
			this.__dealWithdecimalPoint();
		} else {
			if (this.getDataLen() == 1 && this.__data[0] == "0") {
				if (val != '0') {
					this.__data[0] = val;
				}
			} else {
				this.__data.push(val);
			}
		}
		return this;
	},
	popData : function() {// 删除计算器的最后一位数据并返回
		this.getDataLen() > 0 ? this.__data.pop() : null;
		return this;
	},
	eraseData : function() {
		this.__data = [];
		return this;
	},
	setData : function(aData) {
		if ($.isArray(aData)) {
			this.__data = aData;
		} else {
			this.__data = String(aData).split("");
		}
		return this;
	},
	getDatas : function() {
		return this.getDataLen() > 0 ? this.__data.join("") : "0";
	},
	showData : function(positionId) {
		$("#" + positionId).val(this.getDatas());
	}
};

// ctrlPanl-回退输入事件
function rollBackInput() {
	Calculator.popData().showData("showval");
}
// ctrlPanl-清空输入事件
function clearInput() {
	Calculator.eraseData().showData("showval");
}
// numPanl-输入事件
function inputNum() {
	Calculator.pushData($(this).text()).showData("showval");
}
// 0-x
function oneSubX() {
	var val = Number(Calculator.getDatas());
	Calculator.eraseData().setData(0 - val).showData("showval");
}
// sqrt(x)
function sqrtUnary() {
	var val = Number(Calculator.getDatas());
	if (val < 0) {
		console.log("Math.sqrt(" + val + ")输入非法");
		return false;
	} else {
		Calculator.eraseData().setData(Math.sqrt(val)).showData("showval");
	}
}
// 1/x
function oneDivX() {
	var val = Number(Calculator.getDatas());
	if (val == 0) {
		console.log("0 不能做除数");
		return false;
	} else {
		Calculator.eraseData().setData(1 / val).showData("showval");
	}
}