service POService {
    function fetchData() returns String;

    @readonly
    @cds.persistence.exists
    entity SavingsPO {
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