sap.ui.define([
    "sap/ui/core/mvc/Controller"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller) {
        "use strict";

        return Controller.extend("com.lab2dev.firstapp.controller.Home", {
            onInit: function () {

            },
            onHello: function(){
                console.log("Hello World")
            }
        });
    });
