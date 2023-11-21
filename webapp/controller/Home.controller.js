sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/m/MessageBox",
    "./Formatter",
	"sap/m/MessageToast"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, JSONModel, Formatter, MessageBox, MessageToast) {
        "use strict";

        return Controller.extend("com.lab2dev.firstapp.controller.Home", {
            onInit: function () {

                const list = [
                    {name: "Notebook 1", Price: 956.00, CurrencyCode: "BRL", Status: "Available", WeightMeasure: 4.5, WeightUnit: "KG", Width: 35, Depth: 19, Height: 3, DimUnit: "cm"},
                    {name: "Notebook 2", Price: 1200.00, CurrencyCode: "BRL", Status: "Available", WeightMeasure: 4.2, WeightUnit: "KG", Width: 25, Depth: 18, Height: 2, DimUnit: "cm"},
                    {name: "Notebook 3", Price: 1155.40, CurrencyCode: "BRL", Status: "Out of Stock", WeightMeasure: 4.5, WeightUnit: "KG", Width: 30, Depth: 20, Height: 4, DimUnit: "cm"},
                    {name: "Notebook 4", Price: 2999.00, CurrencyCode: "BRL", Status: "Available", WeightMeasure: 4.2, WeightUnit: "KG", Width: 29, Depth: 22, Height: 3, DimUnit: "cm"},
                    {name: "Notebook 5", Price: 1854.00, CurrencyCode: "BRL", Status: "Discontinued", WeightMeasure: 4.5, WeightUnit: "KG", Width: 32, Depth: 25, Height: 2, DimUnit: "cm"},
                    {name: "Notebook 6", Price: 999.99, CurrencyCode: "BRL", Status: "Out of Stock", WeightMeasure: 4.2, WeightUnit: "KG", Width: 30, Depth: 19, Height: 4, DimUnit: "cm"}
                ]

                var oModel = new JSONModel(list);
                this.getView().setModel(oModel, "listModel");

            },

            onHello: function(){
                console.log("Hello World")
            },

            // onPress: function(oEvent){
            //     // Origem do evento
            //     const item = oEvent.getSource();
            //     // Titulo do item
            //     const itemTitle = item.getTitle();
            //     // Menssagem a ser exibida
            //     const message = `O item "${itemTitle}" foi clicado`;
            //     // Exibe uma mensagem na tela
            //     MessageToast.show(message);
            // }

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

        });
    });
