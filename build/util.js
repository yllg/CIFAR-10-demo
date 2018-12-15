
// 工具类，包含各种实用函数
var cnnutil = (function(exports){
  // a window stores _size_ number of values and returns averages. 
  // Useful for keeping running track of validation or training accuracy during SGD
  // 一个窗口存储_size_个值并返回平均值,有助于跟踪验证或培训的准确性
  var Window = function(size, minsize) {
    this.v = [];
    this.size = typeof(size)==='undefined' ? 100 : size;
    this.minsize = typeof(minsize)==='undefined' ? 20 : minsize;
    this.sum = 0;
  }
  Window.prototype = {
    add: function(x) {
      this.v.push(x);
      this.sum += x;
      if(this.v.length>this.size) {
        var xold = this.v.shift();
        this.sum -= xold;
      }
    },
    get_average: function() {
      if(this.v.length < this.minsize) return -1;
      else return this.sum/this.v.length;
    },
    reset: function(x) {
      this.v = [];
      this.sum = 0;
    }
  }
  // 输入Vol的w值
  // 返回5个值，最大值的索引maxi，最大值maxv，最小值的索引mini，最小值minv，最大和最小的差值dv；
  var maxmin = function(w) {
    if(w.length === 0) { return {}; } // ... ;s
    var maxv = w[0];
    var minv = w[0];
    var maxi = 0;
    var mini = 0;
    for(var i=1;i<w.length;i++) {
      if(w[i] > maxv) { maxv = w[i]; maxi = i; } 
      if(w[i] < minv) { minv = w[i]; mini = i; } 
    }
    return {maxi: maxi, maxv: maxv, mini: mini, minv: minv, dv:maxv-minv};
  }
  // returns string representation of float but truncated to length of d digits
  // 返回d位小数的字符串
  var f2t = function(x, d) {
    if(typeof(d)==='undefined') { var d = 5; }
    var dd = 1.0 * Math.pow(10, d);
    return '' + Math.floor(x*dd)/dd;
  }
  exports = exports || {};
  exports.Window = Window;
  exports.maxmin = maxmin;
  exports.f2t = f2t;
  return exports;
})(typeof module != 'undefined' && module.exports);  
// add exports to module.exports if in node.js
// 如果在node.js中导出到module.exports


