import DatePicker from "sap/m/DatePicker";
import Input from "sap/m/Input";
import MessageBox from "sap/m/MessageBox";
import MessageToast from "sap/m/MessageToast";
import Controller from "sap/ui/core/mvc/Controller";
import UIComponent from "sap/ui/core/UIComponent";
import JSONModel from "sap/ui/model/json/JSONModel";

import List from "sap/m/List";
import ListBinding from "sap/ui/model/ListBinding";
import Select from "sap/m/Select";
import Filter from "sap/ui/model/Filter";

/**
 * @namespace at.clouddna.demo.controller
 */
export default class Main extends Controller {

    private oSkillSelectModel : JSONModel;
    public onInit(): void {
        // let oView = this.getView(),
        //     oInputFirstname = oView?.byId("inputFirstname") as Input;
        //     oInputFirstname.setValue("Daniel")

        const datePicker: DatePicker = this.getView()?.byId("datePicker_sample") as DatePicker;
        datePicker.setMinDate(new Date(2026, 7, 23)); // Set minimum date to January 1, 2024
        datePicker.setMaxDate(new Date(2026, 7, 25)); // Set maximum date to December 31, 2024

        const model: JSONModel = new JSONModel({
            books:[{
                name:"Call of cthulhu",
                author:"H.P. Lovecraft",
                price: 10.99,
                priceUint: "USD",
                releaseYear: 1928,
                inStock: true
            },
            {
                name:"The Great Gatsby",
                author:"F. Scott Fitzgerald",
                price: 12.99,
                priceUint: "USD",
                releaseYear: 1925,
                inStock: false
            },
            {
                name:"To Kill a Mockingbird",
                author:"Harper Lee",
                price: 14.99,
                priceUint: "USD",
                releaseYear: 1960,
                inStock: true
            },]
        });

        this.getView()?.setModel(model, "booksModel");

        let data = {
            "employee": {
                "firstName": "Max",
                "lastName": "Mustermann",
                "age": 40,
                "birthDate": new Date(1983, 5, 15)
            }
        }
        // set model data
        // let modelData = new JSONModel(data);

        let modelData = new JSONModel();
        modelData.setData(data);

        let filterData = new JSONModel();
        filterData.loadData("/data/testdata.json");
        this.getView()?.setModel(filterData, "filterModel");


        this.getView()?.setModel(modelData, "employeeModel");
        let outAge = this.getView()?.byId("i3") as Input;
        outAge.unbindProperty("value", false);

        // formart
        sap.ui.define([
            "sap/ui/core/mvc/Controller",
            "sap/ui/model/json/JSONModel"
        ], function(Controller : any, JSONModel : any) {
            "use strict";
            return Controller.extend("at.clouddna.demo.controller.Main", {
                formatDate: function(fvalue: string | Date | undefined) {
                    if (fvalue) {
                        return new Date(fvalue).toLocaleDateString()
                    }
                    return ""
                }
            })
        })

        let emp_exp = {
            "emp_exp": {
                "firstName": "Max",
                "lastName": "Mustermann",
                "age": 40,
                "birthDate": new Date(1983, 5, 15)
            }
        }

        // element binding
        let firstNameInput = this.getView()?.byId("firstName_sample") as Input;
        // this.getView()?.bindElement("/employee");
        firstNameInput.bindElement("/emp_exp");
        firstNameInput.bindProperty("value", "firstName");

        // expression example
        let age = 90
        this.getView()?.setModel(new JSONModel({age: age}), "ageModel");

        //
        this.oSkillSelectModel = new JSONModel({
            selectedSkillLevel: "",
            skillLevels: [
                { key: "1"},
                { key: "2"},
                { key: "3"}
            ]
        });
        this.getView()?.setModel(this.oSkillSelectModel, "filter");

    }

    private onSavePressed() {
        MessageToast.show("Successfully saved")
    }

    private onCancelPressed() {
        MessageBox.warning("Are you sure you want to cancel?", {
            actions: [MessageBox.Action.YES, MessageBox.Action.NO],
            emphasizedAction: MessageBox.Action.YES,
            onClose: (sSlectedAction: String | null) => {
                if (MessageBox.Action.YES == sSlectedAction) {
                    MessageBox.success("Successfully canceled.")
                }
            }
        })
    }

    private onNavigateToDetail(oEvent : Event) :void {
        let oRouter = (this.getOwnerComponent() as UIComponent).getRouter();
        let onBindingContext = (oEvent as any).getSource().getBindingContext()
        // let oObject = onBindingContext?.getObject()
        let spath = onBindingContext?.getPath()
        oRouter.navTo("RouteDetail",
            {
                path: encodeURIComponent(spath),
                p1:"value12345",
                queryParam: {
                    value1: "Asdf",
                    value2: 1234,
                }
            }
        );
    }

    private notFoundTest(oEvent: Event) : void {
        let oRouter = (this.getOwnerComponent() as UIComponent).getRouter()
        oRouter.parse("/nothavethispath")
    }

    private onSearch() : void {

        let oList = this.getView()?.byId("d_list") as List,
        oListBinding = oList?.getBinding("items") as ListBinding,
        // oSelectSkillLevel = this.getView()?.byId("select_hobby") as Select,
        // oSelectedKey = oSelectSkillLevel?.getSelectedKey(),
        aFilters : Array<Filter> = [],
        sSelectedKey = this.oSkillSelectModel.getProperty("/selectedSkillLevel");

        if (sSelectedKey) {
            aFilters.push(new Filter({path: "skillLevel", operator: "EQ", value1: sSelectedKey}))
        }
        oListBinding.filter(aFilters)

    }

    private onClear() : void {
        let oList = this.getView()?.byId("d_list") as List,
        oListBinding = oList?.getBinding("items") as ListBinding;
        // oSelectSkillLevel = this.getView()?.byId("select_hobby") as Select;
        // oSelectSkillLevel.setSelectedKey("")
        this.oSkillSelectModel.setProperty("/selectedSkillLevel", "");
        oListBinding.filter([])
    }
}