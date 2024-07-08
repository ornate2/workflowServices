/*global QUnit*/

sap.ui.define([
	"poformdata/workflow-ui-module/controller/POForm.controller"
], function (Controller) {
	"use strict";

	QUnit.module("POForm Controller");

	QUnit.test("I should test the POForm controller", function (assert) {
		var oAppController = new Controller();
		oAppController.onInit();
		assert.ok(oAppController);
	});

});
