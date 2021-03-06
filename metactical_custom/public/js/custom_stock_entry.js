frappe.ui.form.on('Stock Entry', {
	refresh(frm) {
        var target = frm.doc.items[0].t_warehouse;
        var warehouses = {
                    "R01-Gor-ReceivedStock - ICL": "R01-Gor-Active Stock - ICL",
                    "R02-Edm-ReceivedStock - ICL": "R02-Edm-Active Stock - ICL",
                    "R03-Vic-ReceivedStock - ICL": "R03-Vic-Active Stock - ICL",
                    "R04-Mon-ReceivedStock - ICL": "R04-Mon-Active Stock - ICL",
                    "R05-DTN-ReceivedStock - ICL": "R05-DTN-Active Stock - ICL",
                    "R06-AMB-ReceivedStock - ICL": "R06-AMB-Active Stock - ICL",
                    "R07-Queen-ReceivedStock - ICL": "R07-Queen-Active Stock - ICL",
                    "W01-WHS-ReceivedStock - ICL": "W01-WHS-Active Stock - ICL",
                }
        if(target.includes("ReceivedStock")){
    	    if(frm.doc.docstatus == 1 && frm.doc.stock_entry_type == "Material Transfer"){
        	    frm.add_custom_button(__('Receive Stock'), function() {
        	        var new_item = frappe.model.copy_doc(frm.doc);
            		// new_item.from_warehouse = frm.doc.to_warehouse;
            		// new_item.to_warehouse = frm.doc.from_warehouse;
                    for(var i in frm.doc.items){
                        var s = frm.doc.items[i].s_warehouse;
                        var t = frm.doc.items[i].t_warehouse;
                        new_item.items[i].s_warehouse = t;
                        new_item.items[i].t_warehouse = warehouses[t];
                    }
            		frappe.set_route('Form', 'Stock Entry', new_item.name);
        	    });
    	    }
        }
	},
});