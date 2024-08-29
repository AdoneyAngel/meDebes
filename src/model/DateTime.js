export default class DateTime {
    static mysqlToApp(mysqlDate) {
        const dateData = new Date(mysqlDate)

        const date = dateData.getDate()+"/"+dateData.getMonth()+1+"/"+dateData.getFullYear()
        const hour = dateData.getHours()+":"+ (dateData.getMinutes()===0?"00":dateData.getMinutes())

        const dateForApp = date + " " + hour

        return dateForApp
    }
}