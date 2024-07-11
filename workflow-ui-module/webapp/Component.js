sap.ui.define(
  [
    "sap/ui/core/UIComponent",
    "sap/ui/Device",
    "poformdata/workflowuimodule/model/models",
    "sap/m/Dialog",
  ],
  function (UIComponent, Device, models, Dialog) {
    "use strict";

    return UIComponent.extend(
      "poformdata.workflowuimodule.Component",
      {
        metadata: {
          manifest: "json",
        },

        /**
         * The component is initialized by UI5 automatically during the startup of the app and calls the init method once.
         * @public
         * @override
         */
        init: function () {
          // call the base component's init function
          UIComponent.prototype.init.apply(this, arguments);

          // enable routing
          this.getRouter().initialize();

          // set the device model
          this.setModel(models.createDeviceModel(), "device");

          this.setTaskModels();
          this.getInboxAPI().addAction(
            {
              action: "APPROVE",
              label: "Submit",
              type: "accept", // (Optional property) Define for positive appearance
            },
            function () {
              this.completeDataTask(true);
            },
            this
          );

          this.getInboxAPI().addAction(
            {
              action: "APPROVE",
              label: "Approve",
              type: "accept", // (Optional property) Define for positive appearance
            },
            function () {
              this.completeTask(true);
            },
            this
          );

          this.getInboxAPI().addAction(
            {
              action: "REJECT",
              label: "Reject",
              type: "reject", // (Optional property) Define for negative appearance
            },
            function () {
              this.completeTask(false);
            },
            this
          );
        },

        setTaskModels: function () {
          // set the task model
          var startupParameters = this.getComponentData().startupParameters;
          this.setModel(startupParameters.taskModel, "task");

          // set the task context model
          var taskContextModel = new sap.ui.model.json.JSONModel(
            this._getTaskInstancesBaseURL() + "/context"
          );
          this.setModel(taskContextModel, "context");
        },

        _getTaskInstancesBaseURL: function () {
          return (
            this._getWorkflowRuntimeBaseURL() +
            "/task-instances/" +
            this.getTaskInstanceID()
          );
        },

        _getWorkflowRuntimeBaseURL: function () {
          var appId = this.getManifestEntry("/sap.app/id");
          var appPath = appId.replaceAll(".", "/");
          var appModulePath = jQuery.sap.getModulePath(appPath);

          return appModulePath + "/bpmworkflowruntime/v1";
        },

        getTaskInstanceID: function () {
          return this.getModel("task").getData().InstanceID;
        },

        getInboxAPI: function () {
          var startupParameters = this.getComponentData().startupParameters;
          return startupParameters.inboxAPI;
        },

        completeTask: function (approvalStatus) {
          this.getModel("context").setProperty("/approved", approvalStatus);
          this._patchTaskInstance();
          this._refreshTaskList();
        },
        completeDataTask: function(){
      var data =  this.getModel("context").getData();
      var data_po = data.POCurrency;
      var data_CreateSaving = data.CreateSaving;
      var data_BFMValidation = data.BFMValidation;
      var data_YOYSavingFunction = data.YOYSavingFunction;
        if(data_po === "" || data_CreateSaving === "" || data_BFMValidation === "" || data_YOYSavingFunction === ""){
          var text = "Please fill the mandatory field";
	    	  var Confirmation = "Confirmation";
	    	  var btnOk = "ok";
	    	  var btnCancel = "Cancel";
	    	  
	    	  var informationDialog = new Dialog({
	                title: Confirmation,
	                type: 'Message',
	                content: new sap.m.Text({
	                    text: text
	                }),
	                beginButton: new sap.m.Button({
	                    text: btnOk,
	                    type: 'Emphasized',
	                    press: function() {
	                    	informationDialog.close();
	                    	//this.SearchGetData();
	                    }
	                }),
	                endButton: new sap.m.Button({
	                    text: btnCancel,
	                    type: 'Default',
	                    press: function() {
	                    	informationDialog.close();
	                    }
	                }),
	                afterClose: function() {
	                	informationDialog.destroy();
	                }
	            });
				informationDialog.open();
        }
        },

        _patchTaskInstance: function () {
          var data = {
            status: "COMPLETED",
            context: this.getModel("context").getData(),
          };

          jQuery.ajax({
            url: this._getTaskInstancesBaseURL(),
            method: "PATCH",
            contentType: "application/json",
            async: false,
            data: JSON.stringify(data),
            headers: {
              "X-CSRF-Token": this._fetchToken(),
            },
          });
        },

        _fetchToken: function () {
          var fetchedToken;

          jQuery.ajax({
            url: this._getWorkflowRuntimeBaseURL() + "/xsrf-token",
            method: "GET",
            async: false,
            headers: {
              "X-CSRF-Token": "Fetch",
            },
            success(result, xhr, data) {
              fetchedToken = data.getResponseHeader("X-CSRF-Token");
            },
          });
          return fetchedToken;
        },

        _refreshTaskList: function () {
          this.getInboxAPI().updateTask("NA", this.getTaskInstanceID());
        },
      }
    );
  }
);
