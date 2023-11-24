sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/m/MessageBox",
    "com/lab2dev/firstapp/model/Formatter",
    "sap/ui/model/Filter",         
    "sap/ui/model/FilterOperator",
    "sap/ui/model/resource/ResourceModel",
    'sap/m/library',
    'sap/ui/model/odata/v2/ODataModel'
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, JSONModel, MessageBox, Formatter, Filter, FilterOperator, ResourceModel, mobileLibrary, oDataModel) {
        "use strict";


        return Controller.extend("com.lab2dev.firstapp.controller.ProductDetail", {
            
            onInit: function () {    

            },

            onSearch: function (oEvent) {
                // add filter for search
                var aFilters = [];
                var sQuery = oEvent.getSource().getValue();
                if (sQuery && sQuery.length > 0) {
                    var filter = new Filter("ProductName", FilterOperator.Contains, sQuery);
                    aFilters.push(filter);
                }
    
                // update list binding
                var oList = this.byId("idProductDetail");
                var oBinding = oList.getBinding("items");
                oBinding.filter(aFilters);
            },
        });
    });
