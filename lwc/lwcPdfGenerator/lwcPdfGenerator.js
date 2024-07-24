import {LightningElement, api, track} from 'lwc'
import generatePDF from '@salesforce/apex/pdfController.generatePDF'
import pdfModal from 'c/pdfModal'
export default class PdfGenerationDemo extends LightningElement {
    @api recordId;
    total;
    showPDFData = false;
    @track formattedInvoiceDate;
    connectedCallback() {
        this.formatInvoiceDate();
    }
    formatInvoiceDate() {
        const date = new Date(this.invoiceData.invoiceCreated);
        const options = { year: '2-digit', month: 'short', day: '2-digit' };
        this.formattedInvoiceDate = new Intl.DateTimeFormat('en-US', options).format(date);
    }
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

    ]
    get totalAmount()
    {
        return this.services.reduce((total,service) =>{
            return total = total+service.amount
        },0)
    }

    async pdfHandler() {
        try {
            const modalResult = await pdfModal.open({
                size: 'small',
                headerLabel: 'View Quote',
                recordId: this.recordId,
            });
        } catch (error) {
            console.error('Error generating PDF:', error.body.message);
        } finally {
        }
    }
    pdfToggler(){
    this.showPDFData = !this.showPDFData;
    }
}