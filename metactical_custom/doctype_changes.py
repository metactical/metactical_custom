import frappe

def stock_entry_before_submit(self, method):
	if self.stock_entry_type == "Material Transfer":
		for d in self.items:
			available_qty = get_qty(d.item_code, d.s_warehouse)
			if d.qty > available_qty:
				frappe.throw("""Cannot Transfer Qty {} for Item {}, Available Qty is {}, at Row {}
					""".format(str(d.qty), d.item_code, str(available_qty), str(d.idx)))

def get_qty(item, warehouse):
	qty = 0
	data= frappe.db.sql("""select actual_qty-reserved_qty from `tabBin`
		where item_code = %s and warehouse=%s
		""",(item,warehouse))
	if data:
		qty = data[0][0] or 0
	return qty