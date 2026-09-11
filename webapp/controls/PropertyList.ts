import Control from "sap/ui/core/Control";
//@ts-ignore
import type { MetadataOptions } from "sap/ui/core/Element";
import PropertyListRenderer from "./PropertyListRenderer";

/**
 * @namespace at.clouddna.demo
 */
export default class PropertyList extends Control {
    static readonly metadata: MetadataOptions = {
        properties: {
            mainLabel: { type: "string", defaultValue: "" }
        },
        defaultAggregation: "propertyItems",
        aggregations: {
            propertyItems: { type: "sap.ui.core.Item", multiple: true, singularName: "propertyItem" }
        }
    }

    static renderer: typeof PropertyListRenderer = PropertyListRenderer;

    init(): void {}
}