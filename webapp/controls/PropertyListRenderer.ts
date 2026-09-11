import RenderManager from "sap/ui/core/RenderManager";
import PropertyList from "./PropertyList";
import Title from "sap/m/Title";
import Item from "sap/ui/core/Item";

export default{
    apiVersion: 2,
    render: function(rm: RenderManager, control: PropertyList) {
        rm.openStart("div", control);
        rm.openEnd();

        // @ts-ignoreignore
        const mainLabel = control.getMainLabel(),
            label = new Title({ 
                text: mainLabel
             });
        
        rm.renderControl(label);
        rm.openStart("ul");
        rm.openEnd();
        
        // @ts-ignoreignore
        const propertyItems: Item[] = control.getPropertyItems();

        propertyItems.forEach((propertyItem: Item) => {
           const text = `${propertyItem.getKey()}:${propertyItem.getText()}`
           rm.openStart("li")
           rm.openEnd()
           rm.text(text)
           rm.close("li")
        });

        rm.close("ul")
        rm.close("div")

    }
}