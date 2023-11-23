sap.ui.define([
    './Formatter',
    'sap/ui/core/mvc/Controller',
    'sap/ui/model/json/JSONModel',
    'sap/m/library'
], function(Formatter, Controller, JSONModel, mobileLibrary) {
"use strict";

var PopinLayout = mobileLibrary.PopinLayout;

var TableController = Controller.extend("sap.m.sample.Table.Table", {

    onInit: function () {
        const products = [
            {Name: "Notebook 1", ProductId: 1, Supplier: "Titanium", Price: 956.00, CurrencyCode: "BRL", WeightMeasure: 4.5, WeightUnit: "KG", Width: 35, Depth: 19, Height: 3, DimUnit: "cm"},
            {Name: "Notebook 1", ProductId: 1, Supplier: "Titanium", Price: 956.00, CurrencyCode: "BRL", WeightMeasure: 4.5, WeightUnit: "KG", Width: 35, Depth: 19, Height: 3, DimUnit: "cm"},
            {Name: "Notebook 1", ProductId: 1, Supplier: "Titanium", Price: 956.00, CurrencyCode: "BRL", WeightMeasure: 4.5, WeightUnit: "KG", Width: 35, Depth: 19, Height: 3, DimUnit: "cm"},
            {Name: "Notebook 1", ProductId: 1, Supplier: "Titanium", Price: 956.00, CurrencyCode: "BRL", WeightMeasure: 4.5, WeightUnit: "KG", Width: 35, Depth: 19, Height: 3, DimUnit: "cm"},
            {Name: "Notebook 1", ProductId: 1, Supplier: "Titanium", Price: 956.00, CurrencyCode: "BRL", WeightMeasure: 4.5, WeightUnit: "KG", Width: 35, Depth: 19, Height: 3, DimUnit: "cm"},
        ]

        // set explored app's demo model on this sample
        var oModel = new JSONModel(products);
        this.getView().setModel(oModel, "products");
    },

    onPopinLayoutChanged: function() {
        var oTable = this.byId("idProductsTable");
        var oComboBox = this.byId("idPopinLayout");
        var sPopinLayout = oComboBox.getSelectedKey();
        switch (sPopinLayout) {
            case "Block":
                oTable.setPopinLayout(PopinLayout.Block);
                break;
            case "GridLarge":
                oTable.setPopinLayout(PopinLayout.GridLarge);
                break;
            case "GridSmall":
                oTable.setPopinLayout(PopinLayout.GridSmall);
                break;
            default:
                oTable.setPopinLayout(PopinLayout.Block);
                break;
        }
    },

    onSelect: function(oEvent) {
        var bSelected = oEvent.getParameter("selected"),
            sText = oEvent.getSource().getText(),
            oTable = this.byId("idProductsTable"),
            aSticky = oTable.getSticky() || [];

        if (bSelected) {
            aSticky.push(sText);
        } else if (aSticky.length) {
            var iElementIndex = aSticky.indexOf(sText);
            aSticky.splice(iElementIndex, 1);
        }

        oTable.setSticky(aSticky);
    },

    onToggleInfoToolbar: function(oEvent) {
        var oTable = this.byId("idProductsTable");
        oTable.getInfoToolbar().setVisible(!oEvent.getParameter("pressed"));
    }
});


return TableController;

});