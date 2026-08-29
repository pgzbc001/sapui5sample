import MessageBox from "sap/m/MessageBox";
import Controller from "sap/ui/core/mvc/Controller";
import UIComponent from "sap/ui/core/UIComponent";

export default class Detail extends Controller {

    public onInit(): void {
        const oRouter = (this.getOwnerComponent() as UIComponent).getRouter();
        const oRoute = oRouter.getRoute("RouteDetail");

        oRoute?.attachPatternMatched(this.onPatternMatched, this);
    }

    private onPatternMatched(oEvent: any): void {
        const oArgs = oEvent.getParameters().arguments;
        const sParam1 = oArgs.p1;

        MessageBox.show("P1: " + sParam1, {
            title: "Routing param"
        });
    }
}