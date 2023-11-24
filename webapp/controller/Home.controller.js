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
    function (Controller,JSONModel, MessageBox, Formatter, Filter, FilterOperator, ResourceModel, mobileLibrary, oDataModel) {
        "use strict";

        const PopinLayout = mobileLibrary.PopinLayout;

        return Controller.extend("com.lab2dev.firstapp.controller.Home", {
            formatter: Formatter,
            
            onInit: function () {
                
                var oModel = new oDataModel("/northwind/Northwind.svc/");


                this.getView().setModel(oModel);    

            },

            onNavTo: function(){
                this.getOwnerComponent().getRouter().navTo("ProductDetail")
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
                    var filter = new Filter("ProductName", FilterOperator.Contains, sQuery);
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
