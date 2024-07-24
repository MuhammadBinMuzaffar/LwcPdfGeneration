/**
 * Created by muhammad.binmuzaffar on 18/7/2024.
 */

import generatePDF from '@salesforce/apex/pdfController.generatePDF'
import LightningModal from "lightning/modal";
import {api, track} from "lwc";
export default class PdfModal extends LightningModal {
    @api recordId;
    total;
    @track formattedInvoiceDate;
    invoiceData ={
        invoiceNo :'123',
        invoiceCreated : 'January 10, 2022',
        companyName : 'Sparksuit ,Inc',
        address1 : '12345 sunny road',
        address2 : 'sunny villa , CA 12345'
    }
    clientData = {
        client : 'Acne Corp',
        userName : 'John Doe',
        email : 'john@example.com'
    }
    services = [
        {name : 'consultant Fee', amount : 1000.00 },
        {name : 'WebSite Design', amount : 300.00 },
        {name : 'Hosting(3 months)', amount : 75.00 }

    ];
    connectedCallback() {
        this.formatInvoiceDate();
    }
    formatInvoiceDate() {
        const date = new Date(this.invoiceData.invoiceCreated);
        const options = { year: '2-digit', month: 'short', day: '2-digit' };
        this.formattedInvoiceDate = new Intl.DateTimeFormat('en-US', options).format(date);
    }
    get totalAmount()
    {
        return this.services.reduce((total,service) =>{
            return total = total+service.amount
        },0)
    }

    pdfHandler()
    {
        let content =this.template.querySelector(".container")
        console.log(content.outerHTML)
        generatePDF({recordId:this.recordId,htmlData:content.outerHTML}).then(result =>
        {
            console.log('attachment id : ',result);
            window.open(result);
        })
    }
}