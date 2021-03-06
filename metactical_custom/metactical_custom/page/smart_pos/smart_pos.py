import frappe
from frappe import utils
import json

@frappe.whitelist()
def get_items(item_name = None, item_group = None, pos_profile=None):
	query = "select name, item_name, image, thumbnail, sales_uom, stock_uom from tabItem where is_sales_item = 1 and disabled = 0"
	if item_group:
		query += " and item_group = '{}'".format(item_group)
	if item_name:
		query += " and (item_name like '%%{0}%%' or item_code like '%%{0}%%')".format(item_name)
	query += " limit 20"
	# return query

	data = frappe.db.sql(query, as_dict=1)
	output = ""
	row = 1
	for d in data:
		uom_prices = {}
		uom_data = frappe.db.sql("select uom from `tabUOM Conversion Detail` where parent = %s",(d.name))
		uom_length = len(uom_data)
		if uom_data and len(uom_data) >= 2:
			for u in uom_data:
				uom_prices[u[0]] = get_price(d.name, u[0])
		price = get_price(d.name)
		bin_data = get_stock(d.name,pos_profile)
		stock = bin_data.get("stock")
		# valuation_rate = bin_data.get("valuation_rate")
		image = d.thumbnail
		if not image:
			image = "/files/image-not-available.png"
		if row == 1:
			output += '<div class="image-view-row">'
		output += '''<div class="pos-item-wrapper image-view-item" data-uom_prices="{uom_prices}" data-uom_length="{uom_length}" data-item-code="{item_code}" data-price="{price}" data-item-name="{item_name}" data-stock="{stock}" data-uom="{stock_uom}">
						<div class="image-view-header">
							<div>
								<a class="grey list-id" data-name="{item_code}" title="{item_code}">
									{item_code}
								</a>
							</div>
						</div>
						<div class="image-view-body">
							<a data-item-code="{item_code}" title="{item_code}">
								<div class="image-field" style=" border: 0px;">
									
									<img src="{image}" alt="{item_code}">
								</div>
								<span class="price-info">
									$ {price}
								</span>
							</a>
						</div>
					</div>'''.format(item_code=d.name, item_name=d.item_name, uom_length=uom_length,uom_prices=uom_prices, image=image, price=price, stock_uom= d.sales_uom or d.stock_uom, stock=stock)
		if row%4 == 0:
			output+= '</div><div class="image-view-row">'
		row+=1

	return output

@frappe.whitelist()
def get_price(item, uom=None, list_type="Selling", supplier=None):
	cond = " and selling = 1"
	if list_type == "Buying": cond= " and buying = 1"
	if uom:
		cond += " and (uom = '{}')".format(uom)
	rate = 0
	date = frappe.utils.nowdate()
	r = frappe.db.sql("select price_list_rate from `tabItem Price` where '{}' between valid_from and valid_upto and item_code = '{}' {} limit 1".format(date, item, cond))
	if r:
		if r[0][0]:
			rate = r[0][0]
	else:
		r = frappe.db.sql("select price_list_rate from `tabItem Price` where (valid_from <= '{}' or valid_upto >= '{}') and item_code = '{}' {} limit 1".format(date, date, item, cond))
		if r:
			if r[0][0]:
				rate = r[0][0]
		else:
			r = frappe.db.sql("select price_list_rate from `tabItem Price` where valid_from IS NULL and valid_upto IS NULL and item_code = '{}' {} limit 1".format(item, cond))
			if r:
				if r[0][0]:
					rate = r[0][0]
	if not rate: rate = 0
	return rate

def get_stock(item,pos_profile = None):
	qty = 0
	data = {}
	filters = {"item_code": item}
	print(pos_profile)
	if pos_profile:
		warehouse = frappe.db.get_value("POS Profile", pos_profile, "warehouse")
		if warehouse:
			filters.update({"warehouse": warehouse})
	qty = frappe.db.get_value("Bin", filters, "actual_qty")
	if not qty: qty = 0
	data["stock"] = qty
	# valuation_rate = frappe.db.get_value("Bin", filters, "valuation_rate")
	# if not valuation_rate: valuation_rate = 0
	# data["valuation_rate"] = valuation_rate
	print(filters)
	return data
	# return qty


@frappe.whitelist()
def add_item_by_barcode(barcode, pos_profile=None, branch=None):
	item = frappe.db.get_value("Item Barcode", {"barcode": barcode}, "parent")
	if item:
		data = {"item_code": item}
		data["item_name"] = frappe.db.get_value("Item", item, "item_name")
		data["uom"] = frappe.db.get_value("Item", item, "sales_uom") or frappe.db.get_value("Item", item, "stock_uom")
		bin_data = get_stock(item, pos_profile)
		data["stock"] = bin_data.get("stock")
		# data["valuation_rate"] = bin_data.get("valuation_rate")
		data["price"] = get_price(item)
		return data

@frappe.whitelist()
def add_item_by_item_code(item, pos_profile=None):
	item = frappe.db.get_value("Item", {"name": item}, "name")
	if item:
		data = {"item_code": item}
		data["item_name"] = frappe.db.get_value("Item", item, "item_name")
		data["uom"] = frappe.db.get_value("Item", item, "sales_uom") or frappe.db.get_value("Item", item, "stock_uom")
		bin_data = get_stock(item, pos_profile)
		data["stock"] = bin_data.get("stock")
		# data["valuation_rate"] = bin_data.get("valuation_rate")
		data["price"] = get_price(item)
		return data

@frappe.whitelist()
def get_pos_profile():
	data = {}
	data["pos_profile"] = frappe.db.get_value("POS Profile User", {"user": frappe.session.user, "default": 1}, "parent")
	if frappe.session.user == "Administrator":
		data["pos_profile"] = frappe.db.get_value("POS Profile", {"disabled": 0}, "name")
	if data.get("pos_profile"):
		data = frappe.get_doc("POS Profile", data.get("pos_profile"))
	else:
		data["pos_profile"] = frappe.db.get_value("POS Profile User", {"user": frappe.session.user}, "parent")
		if data.get("pos_profile"):
			data = frappe.get_doc("POS Profile", data.get("pos_profile"))
	return data

@frappe.whitelist()
def get_default_customer(pos_profile):
	return frappe.db.get_value("POS Profile", pos_profile, "customer")

@frappe.whitelist()
def submit_invoice(pos_profile, customer, items, date = None, discount_amount=0, paid=0, credit_paid=0, suspend = None, serial_no=None, due_date=None):
	doc = frappe.new_doc("Sales Invoice")
	doc.set_posting_time=1
	doc.customer = customer
	# cash_mode = frappe.db.get_value("Ikit Smart POS Setting", "Ikit Smart POS Setting", "cash")
	# credit_mode = frappe.db.get_value("Ikit Smart POS Setting", "Ikit Smart POS Setting", "credit")
	# if not cash_mode: frappe.throw("Please map Mode of Payments in Ikit Smart POS Setting")
	doc.payments = []
	paid = float(paid)
	if paid:
		# doc.append("payments", {"mode_of_payment": cash_mode, "amount": paid})
		doc.is_pos = 1
		doc.pos_profile = pos_profile
	doc.posting_date = frappe.utils.getdate(date)
	doc.submitted = 1
	doc.invoice_no = serial_no
	if due_date: doc.due_date = frappe.utils.getdate(due_date)
	pos = frappe.get_doc("POS Profile", pos_profile)
	items = json.loads(items)
	if not items: frappe.throw("Atleast one item is mandatory.")
	for d in items:
		if d:
			doc.append("items", {"item_code": d.get("item_code"), "qty": d.get("qty"), "rate": d.get("rate"), "amount": d.get("amount")})
	doc.flags.ignore_mandatory = True
	doc.set_missing_values()
	doc.discount_amount = float(discount_amount)
	# doc.append("payments", {"mode_of_payment": credit_mode, "amount": credit_paid})
	p = 1
	if doc.payments:
		for d in doc.payments:
			if d.default:
				d.amount = paid
				p = 0
				break
	else:
		for d in pos.payments:
			if d.default:
				doc.append("payments", {"default": d.default, "mode_of_payment": d.mode_of_payment, "amount": paid})
				p=0
				break
	if p: frappe.throw("Please set default mode of payment in pos Profile")
	doc.save(ignore_permissions=True)
	doc.submit()
	if suspend:
		frappe.db.set_value("Suspended Invoice", suspend, "used", 1)
	return doc.name

@frappe.whitelist()
def suspended_invoice(pos_profile, customer, items, date = None, discount_amount=0, paid=0, credit_paid=0, net_total=0, due_date=None, mode=None):
	doc = frappe.new_doc("Suspended Invoice")
	doc.customer = customer
	doc.pos_profile = pos_profile
	doc.posting_date = frappe.utils.getdate(date)
	if due_date: doc.due_date = frappe.utils.getdate(due_date)
	doc.mode = mode
	items = json.loads(items)
	if not items: frappe.throw("Atleast one item is mandatory.")
	for d in items:
		if d:
			doc.append("items", {"item_code": d.get("item_code"), "item_name": d.get("item_name"), "qty": d.get("qty"), "rate": d.get("rate"), "amount": d.get("amount"), "barcode": d.get("barcode"), "uom": d.get("uom"), "stock": d.get("stock")})
	doc.discount_amount = float(discount_amount)
	doc.paid = float(paid)
	doc.credit_paid = float(credit_paid)
	doc.net_total = float(net_total)
	doc.save(ignore_permissions=True)
	return doc.name

@frappe.whitelist()
def get_suspended_invoice():
	data = frappe.db.sql("select name, customer, net_total from `tabSuspended Invoice` where used = 0 and owner = %s",(frappe.session.user))
	if not data: frappe.msgprint("No Suspended Invoices Found.")
	output = "<table style='width:100%'>"
	output+= "<tr>"
	output+= """
		<th style="background-color:black;">
			<b class="">Customer</b>
		</td>
		<th style="background-color:black;">
			<b>Grand Total</b>
		</td>
		<th style="background-color:black;">
			<i class="fa fa-trash"></i>
		</th>
	"""
	output+= "</tr>"
	for d in data:
		output+= "<tr>"
		output+= """
			<td>
				<b class="fetch_suspended" style="cursor:pointer;" data-name={name}>{customer}</b>
			</td>
			<td>
				<b>${net_total}</b>
			</td>
			<td>
				<i class="fa fa-trash remove_supended_invoice" data-name={name}></i>
			</td>
		""".format(name=d[0], customer=d[1], net_total=d[2])
		output+= "</tr>"
	output+= "</table>"
	frappe.msgprint(output, "Suspended Invoices")

@frappe.whitelist()
def get_suspended_invoice_data(name):
	return frappe.get_doc("Suspended Invoice", name)

@frappe.whitelist()
def get_register_detail():
	data = frappe.db.sql("""select c.mode_of_payment, SUM(c.amount) from `tabSales Invoice` p 
		inner join `tabSales Invoice Payment` c on p.name = c.parent
		where p.docstatus = 1 and p.posting_date = %s and p.owner = %s group by 1""",(frappe.utils.nowdate(), frappe.session.user))
	# if not data: frappe.throw("No Data.")
	doc = frappe.new_doc("POS Print Data")
	p = {}
	total = 0.0
	output= ""
	output += "<table style='width:100%' id='register' class='table'><tbody>"
	for d in data:
		p[d[0]] = d[1]
		# total += d[1]

	output+= "<tr>"
	output+= """
		<td colspan="100%">
			<b>{date}</b>
		</td>
	""".format(date=frappe.utils.nowdate())
	total_sales = frappe.db.sql("""select SUM(p.grand_total) from `tabSales Invoice` p 
		where p.docstatus = 1 and p.posting_date = %s and p.owner = %s""",(frappe.utils.nowdate(), frappe.session.user))
	if total_sales: total = total_sales[0][0]
	if not total: total = 0.0
	doc.date = frappe.utils.nowdate()
	output+= "</tr>"

	output+= "<tr>"
	output+= """
		<td>
			<b>Total Sales</b>
		</td>
		<td>
			<b>${total}</b>
		</td>
	""".format(total=total)
	output+= "</tr>"
	doc.append("payments",{"keys1": "Total Sales", "values1": total})

	for i,d in p.items():
		output+= "<tr>"
		output+= """
			<td>
				{mode}
			</td>
			<td>
				${amount}
			</td>
		""".format(mode=i, amount=d)
		output+= "</tr>"
		doc.append("payments",{"keys1": i, "values1": d})

	output+= "</tbody></table>"
	frappe.msgprint(output)
	doc.insert(ignore_permissions=True)
	print_button= """
			<button class="print_register btn btn-primary" data-name="{name}">Print</button>
	""".format(name=doc.name)
	frappe.msgprint(print_button)


@frappe.whitelist()
def get_revenue():
	data = frappe.db.sql("""select c.mode_of_payment, SUM(c.amount) from `tabSales Invoice` p 
		inner join `tabSales Invoice Payment` c on p.name = c.parent
		where p.docstatus = 1 and p.posting_date = %s and p.owner = %s group by 1""",(frappe.utils.nowdate(), frappe.session.user))
	valuation = frappe.db.sql("""select sum(c.valuation_rate) from `tabSales Invoice` p 
		inner join `tabSales Invoice Item` c on p.name = c.parent
		where p.docstatus = 1 and p.posting_date = %s and p.owner = %s
		""",(frappe.utils.nowdate(), frappe.session.user))
	valuation_rate = 0.0
	if valuation: valuation_rate = valuation[0][0]
	if not valuation_rate: valuation_rate = 0.0

	expense = frappe.db.sql("""select sum(c.amount) from `tabExpense Entry` p 
		inner join `tabExpense Entry Account` c on p.name = c.parent
		where p.docstatus = 1 and p.posting_date = %s and p.owner = %s
		""",(frappe.utils.nowdate(), frappe.session.user))
	expense_amount = 0.0
	if expense: expense_amount = expense[0][0]
	if not expense_amount: expense_amount = 0.0

	discount = frappe.db.sql("""select sum(p.discount_amount) from `tabSales Invoice` p 
		where p.docstatus = 1 and p.posting_date = %s and p.owner = %s
		""",(frappe.utils.nowdate(), frappe.session.user))
	discount_amount = 0.0
	if discount: discount_amount = discount[0][0]
	if not discount_amount: discount_amount = 0.0

	doc = frappe.new_doc("POS Print Data")
	p = {}
	total = 0.0
	output= ""
	output += "<table style='width:100%' id='register' class='table'><tbody>"
	for d in data:
		p[d[0]] = d[1]
		# total += d[1]

	# output+= "<tr>"
	# output+= """
	# 	<td colspan="100%">
	# 		<b>{date}</b>
	# 	</td>
	# """.format(date=frappe.utils.nowdate())
	doc.date = frappe.utils.nowdate()

	total_sales = frappe.db.sql("""select SUM(p.grand_total) from `tabSales Invoice` p 
		where p.docstatus = 1 and p.posting_date = %s and p.owner = %s""",(frappe.utils.nowdate(), frappe.session.user))
	if total_sales: total = total_sales[0][0]
	if not total: total = 0.0
	revenue = (total-valuation_rate)-discount_amount
	profit = revenue-expense_amount


	# output+= "</tr>"

	output+= "<tr>"
	output+= """
		<th colspan=2 style="background-color: black">
			<b style="text-align:center; color:white;">Today's Summary ({date})</b>
		</th>
	""".format(revenue=revenue,date=frappe.utils.nowdate())
	output+= "</tr>"
	doc.append("payments",{"keys1": "Today's Revenue", "values1": revenue})

	output+= "<tr>"
	output+= """
		<td>
			<b>Total Sales</b>
		</td>
		<td>
			<b>${total}</b>
		</td>
	""".format(total=total)
	output+= "</tr>"
	doc.append("payments",{"keys1": "Total Sales", "values1": total})

	for i,d in p.items():
		output+= "<tr>"
		output+= """
			<td>
				{mode}
			</td>
			<td>
				${amount}
			</td>
		""".format(mode=i, amount=d)
		output+= "</tr>"
		doc.append("payments",{"keys1": i, "values1": d})

	output+= "<tr>"
	output+= """
		<td>
			Discount
		</td>
		<td>
			${discount_amount}
		</td>
	""".format(discount_amount=discount_amount)
	output+= "</tr>"
	doc.append("payments",{"keys1": "Discount", "values1": discount_amount})

	output+= "<tr>"
	output+= """
		<td>
			Product Valuation
		</td>
		<td>
			${valuation_rate}
		</td>
	""".format(valuation_rate=valuation_rate)
	output+= "</tr>"
	doc.append("payments",{"keys1": "Product Valuation", "values1": valuation_rate})

	output+= "<tr>"
	output+= """
		<td>
			Expenses
		</td>
		<td>
			${expense_amount}
		</td>
	""".format(expense_amount=expense_amount)
	output+= "</tr>"
	doc.append("payments",{"keys1": "Expenses", "values1": expense_amount})

	output+= "<tr>"
	output+= """
		<td>
			<b>Profit</b>
		</td>
		<td>
			<b>${profit}</b>
		</td>
	""".format(profit=profit)
	output+= "</tr>"
	doc.append("payments",{"keys1": "Profit", "values1": profit})

	output+= "</tbody></table>"
	frappe.msgprint(output)
	doc.insert(ignore_permissions=True)
	print_button= """
			<button class="print_revenue btn btn-primary" data-name="{name}">Print</button>
	""".format(name=doc.name)
	frappe.msgprint(print_button)

@frappe.whitelist()
def get_debtors_summary(branch=None, customer=None):
	cond = ""
	if branch:
		cond = " and c.branch = '{}'".format(branch)
	if customer:
		cond = " and p.name = '{}'".format(customer)

	data = frappe.db.sql("""Select p.name,p.mobile,(SELECT SUM(c.debit_in_account_currency) - SUM(c.credit_in_account_currency)
		 from `tabGL Entry` c where c.party_type = 'Customer' and c.party = p.name {}) from `tabCustomer` p where (SELECT SUM(c.debit_in_account_currency) - SUM(c.credit_in_account_currency)
		 from `tabGL Entry` c where c.party_type = 'Customer' and c.party = p.name {}) > 0
		 """.format(cond,cond))
	if not data: frappe.throw("No Data")
	# output = "<button class='btn btn-primary search_by_customer'>Search by Customer</button><br>"
	output=""
	output += "<table style='width:100%;' border=1>"
	output += """
		<tr>
			<th style="background-color:purple;">
				Customer
			</th>
			<th style="background-color:purple;">
				Balance
			</th>
			<th style="background-color:purple;">
				Payment
			</th>
			<th style="background-color:purple;">
				Statement
			</th>
		</tr>
	"""
	total = 0
	for d in data:
		if d[2]:
			total += float(d[2])
		output += """
			<tr>
				<td>
					{customer}-{mobile}
				</td>
				<td>
					{balance}
				</td>
				<td>
					<button class='btn btn-primary payment' data-customer='{customer}' data-balance='{balance}'>Payment</button>
				</td>
				<td>
					<button class='btn btn-primary statement' data-customer='{customer}'>Statement</button>
				</td>
			</tr>
		""".format(customer=d[0], mobile=d[1], balance = d[2])
	output += """
		<tr>
			<td>
				<b>Total</b>
			</td>
			<td>
				{total}
			</td>
			<td>
				&nbsp;
			</td>
			<td>
				&nbsp;
			</td>
		</tr>
	""".format(total = total)
	output += "</table>"
	return output


@frappe.whitelist()
def get_creditors_summary(branch=None, supplier=None):
	cond = ""
	if branch:
		cond = " and c.branch = '{}'".format(branch)
	if supplier:
		cond = " and p.name = '{}'".format(supplier)

	data = frappe.db.sql("""Select p.name,p.mobile,(SELECT SUM(c.debit_in_account_currency) - SUM(c.credit_in_account_currency)
		 from `tabGL Entry` c where c.party_type = 'Supplier' and c.party = p.name {}) from `tabSupplier` p where (SELECT SUM(c.debit_in_account_currency) - SUM(c.credit_in_account_currency)
		 from `tabGL Entry` c where c.party_type = 'Supplier' and c.party = p.name {}) != 0
		 """.format(cond,cond))
	if not data: frappe.throw("No Data")
	# output = "<button class='btn btn-primary search_by_supplier'>Search by Supplier</button><br>"
	output=""
	output += "<table style='width:100%;' border=1>"
	output += """
		<tr>
			<th style="background-color:maroon;">
				Supplier
			</th>
			<th style="background-color:maroon;">
				Balance
			</th>
			<th style="background-color:maroon;">
				Payment
			</th>
			<th style="background-color:maroon;">
				Statement
			</th>
		</tr>
	"""
	total = 0
	for d in data:
		if d[2]:
			total += float(d[2])
		output += """
			<tr>
				<td>
					{supplier}-{mobile}
				</td>
				<td>
					{balance}
				</td>
				<td>
					<button class='btn btn-primary payment_supplier' data-supplier='{supplier}' data-balance='{balance}'>Payment</button>
				</td>
				<td>
					<button class='btn btn-primary statement_supplier' data-supplier='{supplier}'>Statement</button>
				</td>
			</tr>
		""".format(supplier=d[0], mobile=d[1], balance = d[2])
	output += """
		<tr>
			<td>
				<b>Total</b>
			</td>
			<td>
				{total}
			</td>
			<td>
				&nbsp;
			</td>
			<td>
				&nbsp;
			</td>
		</tr>
	""".format(total = total)
	output += "</table>"
	# frappe.msgprint(output)
	return output


@frappe.whitelist()
def get_balance(party, party_type = None):
	if not party_type: party_type = "Customer"
	balance = 0
	query = frappe.db.sql("SELECT SUM(debit_in_account_currency) - SUM(credit_in_account_currency) as closing from `tabGL Entry` where party_type = %s and party = %s",(party_type,party))
	if query:
		balance = query[0][0]
	if not balance: balance = 0
	data = {"balance": balance}
	# data["mobile"] = frappe.db.get_value(party_type, party, "mobile")
	return data