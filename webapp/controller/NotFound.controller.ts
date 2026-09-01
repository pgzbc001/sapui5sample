import Controller from "sap/ui/core/mvc/Controller";
import UIComponent from "sap/ui/core/UIComponent";

export default class NotFound extends Controller {
    public onInit(): void {
        // super.onInit()
    }
    public onNavToMain(): void {
        // (this.getOwnerComponent() as UIComponent).getRouter().navTo("RouteMain", {}, false)

        const oRouter = (this.getOwnerComponent() as UIComponent).getRouter()
        // console.log("======Current hash:", oRouter.getHashChanger().getHash());
        // oRouter.getHashChanger().setHash("")
        // oRouter.navTo("RouteMain", {}, false)
        oRouter.getTargets()?.display("TargetMain")
    }
}