export class DateService{
	
 static  getDaysDiff = function (date1, date2) {
       var _date1 = new Date(date1);
        var _date2 = new Date(date2);
        var timeDiff = Math.abs(_date2.getTime() - _date1.getTime());
        var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24)); 
        return diffDays;
 }
 
  static  getDiffInWeeks =  function(date1, date2) {
      
        var t2 = date1.getTime();
        var t1 = date2.getTime();
        var timeDiff = Math.abs(date2.getTime() - date1.getTime());
        var diffDays = Math.ceil(timeDiff / (24*3600*1000*7)); 
   }
 
    static getDiffInMonths =  function(d1, d2) {
        var d1Y = d1.getFullYear();
        var d2Y = d2.getFullYear();
        var d1M = d1.getMonth();
        var d2M = d2.getMonth();
 
        return (d2M+12*d2Y)-(d1M+12*d1Y);
    }
 
    static getDiffInYears = function(d1, d2) {
        return d2.getFullYear()-d1.getFullYear();
    }
    
    static getDateString = function(date:Date) {
         var date2 = date.toISOString()
                                      .replace(/T/, ' ')    // replace T with a space
                                      .replace(/\..+/, '')     // delete the dot and everything after
         var datePart2 = date2.split(" ")[0];
        return datePart2;
    }
}