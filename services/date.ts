export class DateServices{

    public formatDate(date : Date):string {
        var yyyy = date.getFullYear().toString();                                    
        var mm = (date.getMonth()+1).toString();       
        var dd  = date.getDate().toString();             
        return yyyy + '-' + (mm[1]?mm:"0"+mm[0]) + '-' + (dd[1]?dd:"0"+dd[0]);
    }

    public yesterday(date : Date):string {
        let yesterday = new Date(date);
        yesterday.setDate(yesterday.getDate() - 1);
        return this.formatDate(yesterday);
    }

    public daysAgo(date : Date, daysInDB : number):string {
        let daysAgo = new Date(date);
        daysAgo.setDate(daysAgo.getDate() -(daysInDB+1));
        return this.formatDate(daysAgo);
    }
    
}