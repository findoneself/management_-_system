export const typeGetTime = value => {
    console.log(this)
    let res = ''
    if (value === 'zt') {
        res = this.$format.getTwodaysDate()
    } else if (value === 'jqt') {
        res = this.$format.getDefaultWorkDatetime()
    } else if (value === 'dy') {
        res = this.$format.getMonthStartDatetime()
    } else {
        res = this.$format.getYearStartDatetime()
    }
    return res
}