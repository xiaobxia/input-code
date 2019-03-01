function NumberInput(config) {
  this.defaultValue = config.defaultValue || ''
  this.lastValue = config.defaultValue || ''
  // 是否负数
  this.negative = config.negative || false
  // 小数点
  this.decimal = config.decimal || 0
  this.min = config.min
  this.max = config.max
}
NumberInput.prototype.formatNumber = function(number) {
  if (number === undefined || number === '') {
    this.lastValue = ''
    return number
  }
  // 只能是整数
  var reg = ''
  if (this.decimal === 0) {
     //只能是整数
      reg = '(^0$)' +
        '|(^[1-9][0-9]*$)'
      if (this.negative) {
        // 你得保证只输入-也是对的
        reg = '(^0$)' +
          '|(^[1-9][0-9]*$)' +
          '|(^-[1-9][0-9]*$)' +
          '|(^-$)'
      }
  } else {
    // 可以是整数
    reg = '(^0$)' +
      '|(^0(\\.)?$)' +
      '|(^0(\\.\\d{0,decimal})?$)' +
      '|(^[1-9][0-9]*(\\.)?$)' +
      '|(^[1-9][0-9]*(\\.\\d{0,decimal})?$)'
    if (this.negative) {
      // 你得保证只输入-也是对的
      reg = '(^0$)' +
        '|(^0(\\.)?$)' +
        '|(^0(\\.\\d{0,decimal})?$)' +
        '|(^[1-9][0-9]*(\\.)?$)' +
        '|(^[1-9][0-9]*(\\.\\d{0,decimal})?$)' +
        '|(^-$)' +
        '|(^-0(\\.)?$)' +
        '|(^-0(\\.\\d{0,decimal})?$)' +
        '|(^-[1-9][0-9]*(\\.)?$)' +
        '|(^-[1-9][0-9]*(\\.\\d{0,decimal})?$)'
    }
    reg = reg.replace(/decimal/g, this.decimal)
  }

  if (new RegExp(reg).test(number)) {
    this.lastValue = number
    return number
  } else {
    return this.lastValue
  }
}

var inputOne = new NumberInput({
  defaultValue: '',
  negative: true,
  decimal: 2,
  min: -100,
  max: 100
})
$('#input-1').on('input', function (e) {
  $('#input-1').val(inputOne.formatNumber(e.target.value))
  console.log('input')
})
