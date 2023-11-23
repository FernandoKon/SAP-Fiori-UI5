sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/m/MessageBox",
    "./Formatter",
    "sap/ui/model/Filter",         
    "sap/ui/model/FilterOperator",
    "sap/ui/model/resource/ResourceModel",
    'sap/m/library'
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, JSONModel, MessageBox, ResourceModel, Filter, FilterOperator, Formatter, mobileLibrary) {
        "use strict";

        const PopinLayout = mobileLibrary.PopinLayout;

        return Controller.extend("com.lab2dev.firstapp.controller.Home", {
            onInit: function () {

                const list = [
                    {Name: "Notebook 1", Price: 956.00, CurrencyCode: "BRL", Status: "Available", WeightMeasure: 4.5, WeightUnit: "KG", Width: 35, Depth: 19, Height: 3, DimUnit: "cm"},
                    {Name: "Notebook 2", Price: 1200.00, CurrencyCode: "BRL", Status: "Available", WeightMeasure: 4.2, WeightUnit: "KG", Width: 25, Depth: 18, Height: 2, DimUnit: "cm"},
                    {Name: "Notebook 3", Price: 1155.40, CurrencyCode: "BRL", Status: "Out of Stock", WeightMeasure: 4.5, WeightUnit: "KG", Width: 30, Depth: 20, Height: 4, DimUnit: "cm"},
                    {Name: "Notebook 4", Price: 2999.00, CurrencyCode: "BRL", Status: "Available", WeightMeasure: 4.2, WeightUnit: "KG", Width: 29, Depth: 22, Height: 3, DimUnit: "cm"},
                    {Name: "Notebook 5", Price: 1854.00, CurrencyCode: "BRL", Status: "Discontinued", WeightMeasure: 4.5, WeightUnit: "KG", Width: 32, Depth: 25, Height: 2, DimUnit: "cm"},
                    {Name: "Notebook 6", Price: 999.99, CurrencyCode: "BRL", Status: "Out of Stock", WeightMeasure: 4.2, WeightUnit: "KG", Width: 30, Depth: 19, Height: 4, DimUnit: "cm"},
                    {Name: "iPhone 8", Price: 999.99, CurrencyCode: "BRL", Status: "Out of Stock", WeightMeasure: 4.2, WeightUnit: "KG", Width: 30, Depth: 19, Height: 4, DimUnit: "cm"},
                    {Name: "Iphone 12", Price: 1999.99, CurrencyCode: "BRL", Status: "Available", WeightMeasure: 4.2, WeightUnit: "KG", Width: 30, Depth: 19, Height: 4, DimUnit: "cm"}
                ]

                const products = [
                    {Name: "Notebook 1", ProductId: 1, Supplier: "Titanium", Price: 956.00, CurrencyCode: "BRL", WeightMeasure: 4.5, WeightUnit: "KG", Width: 35, Depth: 19, Height: 3, DimUnit: "cm"},
                    {Name: "Notebook 1", ProductId: 2, Supplier: "Titanium", Price: 956.00, CurrencyCode: "BRL", WeightMeasure: 10.5, WeightUnit: "KG", Width: 35, Depth: 19, Height: 3, DimUnit: "cm"},
                    {Name: "Notebook 1", ProductId: 3, Supplier: "Titanium", Price: 956.00, CurrencyCode: "BRL", WeightMeasure: 0.5, WeightUnit: "KG", Width: 35, Depth: 19, Height: 3, DimUnit: "cm"},
                    {Name: "iPhone 8", ProductId: 4, Supplier: "Titanium", Price: 956.00, CurrencyCode: "BRL", WeightMeasure: 2.5, WeightUnit: "KG", Width: 35, Depth: 19, Height: 3, DimUnit: "cm"},
                    {Name: "Notebook 1", ProductId: 5, Supplier: "Titanium", Price: 956.00, CurrencyCode: "BRL", WeightMeasure: 3.5, WeightUnit: "KG", Width: 35, Depth: 19, Height: 3, DimUnit: "cm"},
                ]
                
                var oModel = new JSONModel(products);
                this.getView().setModel(oModel, "products");    

            },

            onHello: function(){
                console.log("Hello World")
            },

            onPress: function (oEvent) {
                // Origem do evento
                const item = oEvent.getSource();
                // Titulo do item
                const itemTitle = item.getTitle();
                // Menssagem a ser exibida
                const message = `O item "${itemTitle}" foi clicado`;
                // Exibe uma mensagem na tela
                sap.m.MessageBox.information(message,{
                    title: "Informação do item"
                });
            },
            
            onSearch: function (oEvent) {
                // add filter for search
                var aFilters = [];
                var sQuery = oEvent.getSource().getValue();
                if (sQuery && sQuery.length > 0) {
                    var filter = new Filter("Name", FilterOperator.Contains, sQuery);
                    aFilters.push(filter);
                }
    
                // update list binding
                var oList = this.byId("idProductTable");
                var oBinding = oList.getBinding("items");
                oBinding.filter(aFilters);
            },

            onSelectionChange: function (oEvent) {
                var oList = oEvent.getSource();
                var oLabel = this.byId("idFilterLabel");
                var oInfoToolbar = this.byId("idInfoToolbar");
    
                // With the 'getSelectedContexts' function you can access the context paths
                // of all list items that have been selected, regardless of any current
                // filter on the aggregation binding.
                var  aContexts = oList.getSelectedContexts(true);
    
                // update UI
                var bSelected = (aContexts && aContexts.length > 0);
                var sText = (bSelected) ? aContexts.length + " selected" : null;
                oInfoToolbar.setVisible(bSelected);
                oLabel.setText(sText);
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
    });
