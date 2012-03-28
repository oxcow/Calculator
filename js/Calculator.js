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
	addButton([ '±', '√', '/', '%', '*', '1/x', '-', '+', '=' ], "operPanl");
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
	bindEventToButton("operPanl", "click", [ oneSubX, sqrtX,
			fourArithmeticOper, fourArithmeticOper, fourArithmeticOper,
			oneDivX, fourArithmeticOper, fourArithmeticOper, eqs ]);
}

var Calculator = {
	options : {
		MAX_INPUT_LEN : 17,// 最大输入长度
	},
	__x : [],
	__oper : null,
	__data : [],
	__init__ : function(x, oper, data) {
		this.__x = x;
		this.__oper = oper;
		this.__data = data;
	},
	__isDecimalPoint : function(val) { // 判断是否为小数点
		return val == "." ? true : false;
	},
	__dealWithdecimalPoint : function() {
		if (this.len(this.__data) == 0) {
			this.__data.push(0);
		}
		if (this.__data.toString().indexOf(".") == -1) {
			this.__data.push(".");
		}
	},
	len : function(array) {
		return $.isArray(array) ? array.length : 0;
	},
	pushData : function(val) {// 将输入的数据存放到计算器的数据里
		if (this.__isDecimalPoint(val)) {
			this.__dealWithdecimalPoint();
		} else {
			if (this.len(this.__data) == 1 && this.__data[0] == "0") {
				if (val != '0') {
					this.__data[0] = val;
				}
			} else {
				this.__data.push(val);
			}
		}
		return this.__data;
	},
	popData : function() {// 删除计算器的最后一位数据并返回
		if (this.len(this.__data) != 0) {
			if (this.__data[0] == '-' && this.len(this.__data) == 2) {
				this.__data = [];
			} else if (this.len(this.__data) == 1) {
				this.__data = [ 0 ];
			} else {
				this.__data.pop();
			}
		}
		return this.len(this.__data) != 0 ? this.__data : this.__x;
	},
	eraseData : function() {
		this.__init__([], null, []);
		return this.__data;
	},
	__getDatas : function(array) {
		return $.isArray(array) > 0 ? array.join("") : null;
	},

	__calculate : function(evals, x, oper, y) {
		if (!evals) {
			evals = "(" + x + ")" + oper + "(" + y + ")";
		}
		console.log(evals, "= " + eval(evals));
		return String(eval(evals)).split("");
	},
	// 一元运算
	unaryOperation : function(x) {
		var datas = this.__getDatas(this.__data) || this.__getDatas(this.__x);
		if (datas) {
			if (x === 0) {
				this.__data = this.__calculate(null, 0, "-", datas);
			} else if (x === 1) {
				// console.log("match--> ", /^[^1-9]+$/.exec(datas));
				if (/^[^1-9]+$/.test(datas)) {
					return "除数不能为0";
				}
				this.__data = this.__calculate(null, 1, "/", datas);
			} else {
				if (/^-/.test(datas)) {
					return "开平方数不能为负";
				}
				this.__data = this.__calculate(null, 0, "+", Math
						.sqrt(Number(datas)));
			}
		}
		return this.__data;
	},
	// 二元运算
	binaryOperation : function(oper) {
		if (this.len(this.__data) != 0) {
			if (this.len(this.__x) == 0) {
				this.__x = this.__data;
			} else {
				if (/^%$/.test(oper)) {
					this.__x = this.__calculate("(" + this.__getDatas(this.__x)
							+ ") * (" + this.__getDatas(this.__data)
							+ ") / 100");
					oper = null;
				} else {
					if (/^\/$/.test(this.__oper)
							&& /^[^1-9]+$/.test(this.__getDatas(this.__data))) {
						return "除数不能为0";
					}
					this.__x = this.__calculate(null,
							this.__getDatas(this.__x), this.__oper, this
									.__getDatas(this.__data));
				}
			}
			this.__data = [];
		}
		this.__oper = oper;
		return this.__x;
	},
	// 等号操作
	eqs : function() {
		if (this.len(this.__data) != 0 && this.len(this.__x) != 0
				&& this.__oper) {
			if (/\//.test(this.__oper)
					&& /^[^1-9]+$/.test(this.__getDatas(this.__data))) {
				return "除数不能为0";
			}
			this.__init__([], null, this.__calculate(null, this
					.__getDatas(this.__x), this.__oper, this
					.__getDatas(this.__data)));
		}
		return this.len(this.__data) != 0 ? this.__data : this.__x;
	},
	show : function(array, divId) {
		if ($.isArray(array)) {
			$("#" + divId).val(array.join("") || '0');
		} else {
			$("#" + divId).val(array);
		}
	}
};

// ctrlPanl-回退输入事件
function rollBackInput() {
	Calculator.show(Calculator.popData(), "showval");
}
// ctrlPanl-清空输入事件
function clearInput() {
	Calculator.show(Calculator.eraseData(), "showval");
}
// numPanl-输入事件
function inputNum() {
	Calculator.show(Calculator.pushData($(this).text()), "showval");
}
// sqrt(x)
function sqrtX() {
	Calculator.show(Calculator.unaryOperation(), "showval");
}
// 0-x
function oneSubX() {
	Calculator.show(Calculator.unaryOperation(0), "showval");
}
// 1/x
function oneDivX() {
	Calculator.show(Calculator.unaryOperation(1), "showval");
}
// x+y x-y x*y x/y Four Arithmetic Operations
function fourArithmeticOper() {
	Calculator.show(Calculator.binaryOperation($(this).text()), "showval");
}
// =
function eqs() {
	Calculator.show(Calculator.eqs(), "showval");
}
