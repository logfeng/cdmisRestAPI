
var mongoose = require('mongoose')

var reportSchema = new mongoose.Schema({
  patientId: {type: mongoose.Schema.Types.ObjectId, ref: 'alluser'},
  type: String, // 报表类型：周报，月报，季报，年报
  time: String, // 报表时间： 周，2017年1月第2周：201701_02；月，2017年1月：201701；季，2017年第1季：2017_1;年，2017年：2017
  itemType: String, // 血压，体重，尿量，体温，(血糖，用药)，心率，血管通路，腹透，浮肿，化验，医生报告
  recordDays: Number, // 记录天数
  recordTimes: Number, // 记录次数
  standardTimes: Number, // 达标次数  季年报
  notStandardTimes: Number, // 未达标次数 季年报
  average1: Number, // 平均值1
  max1: Number, // 最大值1
  min1: Number, // 最小值1
  average2: Number, // 平均值2
  max2: Number, // 最大值2
  min2: Number, // 最小值2
  outOfRangeTimes: Number, // 超出范围次数1
  outOfRangeTime: [{ time: Date }], // 超出范围时间1
  outOfRangeTimes2: Number, // 超出范围次数2
  outOfRangeTime2: [{ time: Date }], // 超出范围时间2
  recommendValue1: Number, // 建议值1
  recommendValue2: Number, // 建议值2
  recommendValue3: Number, // 建议值3
  recommendValue4: Number, // 建议值4
  averageBMI: Number, // 平均BMI
  changeRatio: Number, // 增比 %
  changeRatioBMI: Number, // BMI增比 %
  drugRegimen: String, // 用药方案
  drugConcentration: Number, // 药物浓度
  bestControlMonth: Number, // 控制最佳月份 季年报
  worstControlMonth: Number, // 控制最差月份 季年报
  mostCompleteRecordMonth: Number, // 记录最完整月份 季年报
  worstCompleteRecordMonth: Number, // 记录最差月份 季年报
  doctorReport: String // 医生报告
})

var ReportModel = mongoose.model('report', reportSchema)

function Report (report) {
  this.report = report
}

Report.prototype.save = function (callback) {
  var report = this.report
  var newReport = new ReportModel(report)
  newReport.save(function (err, reportItem) {
    if (err) {
      return callback(err)
    }
    callback(null, reportItem)
  })
}

Report.getOne = function (query, callback, opts, fields, populate) {
  var options = opts || {}
  var _fields = fields || null
  var _populate = populate || ''

  ReportModel
    .findOne(query, _fields, options)
    .populate(_populate)
    .exec(function (err, reportInfo) {
      if (err) {
        return callback(err)
      }
      callback(null, reportInfo)
    })
}

Report.getSome = function (query, callback, opts, fields, populate) {
  var options = opts || {}
  var _fields = fields || null
  var _populate = populate || ''

  ReportModel
    .find(query, _fields, options)
    .populate(_populate)
    .exec(function (err, upreport) {
      if (err) {
        return callback(err)
      }
      callback(null, upreport)
    })
}

Report.updateOne = function (query, obj, callback, opts, populate) {
  var options = opts || {}
  var _populate = populate || ''

  ReportModel
    .findOneAndUpdate(query, obj, options)
    .populate(_populate)
    .exec(function (err, upreport) {
      if (err) {
        return callback(err)
      }
      callback(null, upreport)
    })
}

Report.update = function (query, obj, callback, opts, populate) {
  var options = opts || {}
  var _populate = populate || ''

  ReportModel
    .update(query, obj, options)
    .populate(_populate)
    .exec(function (err, upreport) {
      if (err) {
        return callback(err)
      }
      callback(null, upreport)
    })
}

module.exports = Report
