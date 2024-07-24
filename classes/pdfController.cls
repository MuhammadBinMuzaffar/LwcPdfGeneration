public with sharing class pdfController {
    public String pdfText { get; set; }

    public pdfController() {
        pdfText = String.escapeSingleQuotes(ApexPages.currentPage().getParameters().get('pdfText'));
    }
    @AuraEnabled
    public static String generatePDF(Id recordId, String htmlData) {
        PageReference page = Page.renderAsPDF;
        page.getParameters().put('pdfText', htmlData);

        ContentVersion contentVersion = new ContentVersion();
        contentVersion.Title = 'invoice';
        contentVersion.PathOnClient = 'invoice.pdf';
        contentVersion.VersionData = page.getContentAsPDF();
        contentVersion.FirstPublishLocationId = recordId;
        insert contentVersion;

        // Querying the ContentDocumentId related to the ContentVersion
        ContentVersion cv = [SELECT Id, ContentDocumentId FROM ContentVersion WHERE Id = :contentVersion.Id LIMIT 1];

        // Returning the URL for the ContentVersion
        String fullUrl = getExperienceURL() + '/sfc/servlet.shepherd/version/download/' + cv.Id;
        return fullUrl;
    }

    public static String getExperienceURL() {
        String baseURL = Url.getOrgDomainUrl().toExternalForm();
        if (Network.getNetworkId() != null) {
            baseURL = Network.getLoginUrl(Network.getNetworkId());
        }
        baseURL = baseURL.replace('/s/login', '');
        baseURL = baseURL.replace('/s/Login', '');
        baseURL = baseURL.replace('/login', '');
        baseURL = baseURL.replace('/Login', '');
        return baseURL;
    }
}