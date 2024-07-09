sap.ui.define(
    [
        "sap/ui/core/mvc/Controller"
    ],
    function(BaseController) {
      "use strict";
  
      return BaseController.extend("poformdata.workflowuimodule.controller.App", {
        onInit() {
          //this.getView().setModel(models.createviewInfoModel(), "viewInfo")
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
                    }]            
          };
          var oModel = new sap.ui.model.json.JSONModel(data);
          this.getView().setModel(oModel, "TableModel");


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
          
      }
      });
    }
  );
  