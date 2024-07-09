service POService {
    function fetchData() returns String;

    @readonly
    @cds.persistence.exists
    entity SavingsPO {
        CreateSaving: String;
        Cluster: String;
        Category: String;
        ProjectDes: String;
        Region: String;
        LastYearPONo: String;
        LastYearPOValue: String;
        Attachment: String;
        QuatedValue: String;
        Currency: String;
        OrderValue: String;
        Savings: String;
        SavingsPer: String;
        SavingType: String;
        BFMValidation: String;
        SavingsDistribution: Boolean;
        YOYSavingFunction: String;
        PONumber: String;
        Buyer: String;
        POValue: String;
        POCurrency: String;
        Vendor: String;
        StartDate: String;
        EndDate: String;
        VendorName: String;
    }

    entity SavingsPOSet as projection on SavingsPO;
}