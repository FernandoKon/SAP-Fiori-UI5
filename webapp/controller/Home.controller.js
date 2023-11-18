sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, JSONModel) {
        "use strict";

        return Controller.extend("com.lab2dev.firstapp.controller.Home", {
            onInit: function () {

                const list = [
                    {
                        name: "Apple",
                        color: "Red",
                        quantity: 5
                    },
                    {
                        name: "Orange",
                        color: "Orange",
                        quantity: 9
                    },
                    {
                        name: "Banana",
                        color: "Yellow",
                        quantity: 3
                    },
                    {
                        name: "Watermelon",
                        color: "Green",
                        quantity: 6
                    },
                    {
                        name: "Strawberry",
                        color: "Red",
                        quantity: 1
                    },
                    {
                        name: "Banana",
                        color: "Yellow",
                        quantity: 3
                    },
                    
                ]

                var oModel = new JSONModel(list);
                this.getView().setModel(oModel, "listModel");

            },
            onHello: function(){
                console.log("Hello World")
            }
        });
    });
