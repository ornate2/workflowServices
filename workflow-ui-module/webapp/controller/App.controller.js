sap.ui.define(
    [
        "sap/ui/core/mvc/Controller",
        "sap/m/MessageToast"
    ],
    function(BaseController, MessageToast) {
      "use strict";
  
      return BaseController.extend("poformdata.workflowuimodule.controller.App", {
        onInit() {
          //this.getView().setModel(models.createviewInfoModel(), "viewInfo")
          // for table data
          var data = {
            "Tabledetails":[{
              "Quarter": "0001",
              "Saving": "10",
              },
              {
                "Quarter": "0002",
                "Saving": "20",
                },
                {
                  "Quarter": "003",
                  "Saving": "30",
                  },
                  {
                    "Quarter": "004",
                    "Saving": "40",
                    }],
          "clusterdetails": [
                      {
                        "Cluster": "Acquired Entity"  
                      },
                      {
                        "Cluster": "CIS & PASS" 
                      },
                      {
                        "Cluster": "CIS & PASS - APMEA" 
                      },
                      {
                        "Cluster": "Geo Spend" 
                      },
                  {
                        "Cluster": "Global Ops"
                      },
                  {
                        "Cluster": "IBU"
                      },
                      {
                        "Cluster": "IMG"
                      },
                  {
                        "Cluster": "Manpower Contracting"
                      },
                      {
                        "Cluster": "Support Services"
                      },
                  {
                        "Cluster": "Training & Recruitment"
                      }
                    ],
            "Categorydetails": [
                      {"Category": "Alight" },
                      {"Category": "Appirio"},
                      {"Category": "ATCO" },
                      { "Category": "CIS"},
                      {"Category": "Civil" },
                      {"Category": "Facilities Management"},
                      {"Category": "GIMS" },
                      { "Category": "Hopitality"},
                      {"Category": "HPS" },
                      {"Category": "HRSS"},
                      {"Category": "IBU ITS India" },
                      { "Category": "IBU Trading (SI) India"},
                      {"Category": "IBU-ESLO" },
                      {"Category": "Insurance"},
                      {"Category": "International operations" },
                      { "Category": "IPT"},
                       {"Category": "IT Hardware" },
                      {"Category": "IT Software"},
                      {"Category": "Legal" },
                      { "Category": "Logistics Services"},
                       {"Category": "ME ITS" },
                      { "Category": "ME SI"},
                       {"Category": "Non Technical Contracting" },
                      { "Category": "Opus"},
                       {"Category": "PASS" },
                      { "Category": "Professional Consulting"},
                       { "Category": "Recruitment"},
                        { "Category": "Rental - India"},
                         { "Category": "Rental - Outside India"},
                          { "Category": "Service - Marketing"},
                           { "Category": "Service - Telecom"},
                            { "Category": "Technical Contracting"},
                             { "Category": "Training"},
                              { "Category": "Transportation"},
                              { "Category": "Travel"},
                              { "Category": "ITI"},
                              { "Category": "Infocrossing"},
                              { "Category": "Metro"},
                              { "Category": "4C"},
                              { "Category": "Topcoder"},
                               { "Category": "Leanswift"},
                                { "Category": "Rational"}
                    ],
       "CreateSavingdetails": [
                      {
                        "CreateDetails": "001" ,
                        "CreateSaving": "PO"   
                      },
                      {
                        "CreateDetails": "002",
                        "CreateSaving": "PO"  
                      },
                      {
                        "CreateDetails": "004",
                        "CreateSaving": "PO"  
                      },
                      {
                        "CreateDetails": "005",
                        "CreateSaving": "PO"  
                      }
                    ], 
        "SavingTypedetails":  [
                      {
                        "SavingType": "Cost Avoidance" },
                      {
                        "SavingType": "Ledger Impact"}  
                      ]

          };
          var oModel = new sap.ui.model.json.JSONModel(data);
          this.getView().setModel(oModel, "TableModel");
          // for cluster
          // var oModelCluster = new sap.ui.model.json.JSONModel(cluster);
          // this.getView().setModel(oModelCluster, "ClusterModel");


          this.getView().byId("POValue_").attachBrowserEvent("keydown", function(oEvent) {
            var key = oEvent.charCode || oEvent.keyCode || 0;
            return(key == 8 || key == 9 || key == 13 || key == 46 || key == 110 || key == 190 || (key >= 35 && key <= 40) || (key >= 48 && key <= 57) || (key >= 96 && key <= 105));
          });
          this.getView().byId("Quated").attachBrowserEvent("keydown", function(oEvent) {
            var key = oEvent.charCode || oEvent.keyCode || 0;
            return(key == 8 || key == 9 || key == 13 || key == 46 || key == 110 || key == 190 || (key >= 35 && key <= 40) || (key >= 48 && key <= 57) || (key >= 96 && key <= 105));
          });
          this.getView().byId("Order_Value").attachBrowserEvent("keydown", function(oEvent) {
            var key = oEvent.charCode || oEvent.keyCode || 0;
            return(key == 8 || key == 9 || key == 13 || key == 46 || key == 110 || key == 190 || (key >= 35 && key <= 40) || (key >= 48 && key <= 57) || (key >= 96 && key <= 105));
          });


          this.getView().byId("PODate_").setValue("20240102");
          this.getView().byId("POValue_").setValue("5");
          // for saving percentage
          var input01 = this.getView().byId("Quated");
          var input02 = this.getView().byId("Order_Value");
          var input03 = this.getView().byId("po_Savings_auto");
          
          var iValue1 = parseFloat(input01.getValue());
          var iValue2 = parseFloat(input02.getValue());
         if (!isNaN(iValue1) && !isNaN(iValue2) && iValue2 !== 0) {
           // Calculate percentage difference
           var iDifference = iValue1 - iValue2;
           this.getView().byId("po_Savings").setValue(iDifference);
           var iPercentageDifference = (iDifference / iValue1) * 100;
           input03.setValue(iPercentageDifference.toFixed(2) + "%");
       } else {
           // Handle invalid input or zero division
           input03.setValue("Invalid value");
       }

        },
        onAfterRendering: function(oEvent){
               
          var startDate =  this.getView().byId("Saving_start").getDateValue();
          var endDate =  this.getView().byId("Saving_End").getDateValue();
  
  if (startDate && endDate) { // Check if dates are valid
      var diff = Math.abs(startDate.getTime() - endDate.getTime());
      var diffD = Math.ceil(diff / (1000 * 60 * 60 * 24)); // Difference in days
  
      var table = this.getView().byId("table_column");
  
      if (diffD === 90) {
          table.setVisibleRowCount(1);
          table.setVisible(true);
      } else if (diffD >= 91 &&  diffD <= 179 ) {
          table.setVisibleRowCount(2);
          table.setVisible(true);
      } else if (diffD >= 180 &&  diffD <= 269) {
          table.setVisibleRowCount(3);
          table.setVisible(true);
      }else if (diffD >= 270 &&  diffD <= 359) {
          table.setVisibleRowCount(4);
          table.setVisible(true);
      } else {
          // Handle other cases or set default behavior
          table.setVisibleRowCount(0); // Hide the table or set to default state
          table.setVisible(false);
      }
  } else {
      // Handle case where dates are not valid
      console.error("Invalid dates selected");
  }
           
      },
      formatInput: function(value){
        let numericValue = value.replace(/[^\d.]/g, '');

       
        let integerValue = Math.floor(Number(numericValue));
    
      
        return integerValue.toString();
      },
      onPOValueChange: function(){
        var oInput = oEvent.getSource();
        var sValue = oInput.getValue();

        // Format the input value
        var sFormattedValue = formatInput(sValue);

        // Set the formatted value back to the input
        oInput.setValue(sFormattedValue);
      },
      
      handleUploadComplete: function(oEvent) {
        var sResponse = oEvent.getParameter("response"),
          aRegexResult = /\d{4}/.exec(sResponse),
          iHttpStatusCode = aRegexResult && parseInt(aRegexResult[0]),
          sMessage;
  
        if (sResponse) {
          sMessage = iHttpStatusCode === 200 ? sResponse + " (Upload Success)" : sResponse + " (Upload Error)";
          MessageToast.show(sMessage);
        }
      },
      onCalculatePercentageDifference: function(){
       var input01 = this.getView().byId("Quated");
       var input02 = this.getView().byId("Order_Value");
       var input03 = this.getView().byId("po_Savings_auto");
       
       var iValue1 = parseFloat(input01.getValue());
       var iValue2 = parseFloat(input02.getValue());
      if (!isNaN(iValue1) && !isNaN(iValue2) && iValue2 !== 0) {
        // Calculate percentage difference
        var iDifference = iValue1 - iValue2;
        this.getView().byId("po_Savings").setValue(iDifference);
        var iPercentageDifference = (iDifference / iValue1) * 100;
        input03.setValue(iPercentageDifference.toFixed(2) + "%");
    } else {
        // Handle invalid input or zero division
        input03.setValue("Invalid value");
    }
      }
  
      // handleUploadPress: function() {
      //   var oFileUploader = this.byId("fileUploader");
      //   oFileUploader.checkFileReadable().then(function() {
      //     oFileUploader.upload();
      //   }, function(error) {
      //     MessageToast.show("The file cannot be read. It may have changed.");
      //   }).then(function() {
      //     oFileUploader.clear();
      //   });
      // }
      });
    }
  );
  