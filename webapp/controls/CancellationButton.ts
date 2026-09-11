import Button from "sap/m/Button";
import MessageBox from "sap/m/MessageBox";

import { MetadataOptions } from "sap/ui/core/Element";

/**
 * @namespace at.clouddna.demo
 */
export default class CancellationButton extends Button {
    static readonly metadata: MetadataOptions = {
        properties: {
            cancellationState: {
                type: "boolean",
                defaultValue: false
            }
        },
        events: {
            cancel: {}
        }
    }

    init(): void | undefined {
        this.attachPress(this.onCancel.bind(this))
    }

    private setCancellationState(cancellationState: boolean) {
        this.setProperty("cancellationState", cancellationState, true)
        if (cancellationState == true) {
            this.setText("Already cancelled")
            this.setEnabled(false)
        } else {
            this.setText("Cancel")
            this.setEnabled(true)
        }
    }

    private onCancel(event:any) {
        MessageBox.confirm("Do u want to cancel?", {
            onClose: (action: string | null)=>{
                if (action == MessageBox.Action.OK) {
                    this.fireEvent("cancel", {
                        cancellationState: this.getProperty("cancellationState")
                    })
                }
            }
        })
    }

    renderer = {}
}