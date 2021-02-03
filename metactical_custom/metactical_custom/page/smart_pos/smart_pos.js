frappe.pages['smart-pos'].on_page_load = function(wrapper) {
	var page = frappe.ui.make_app_page({
		parent: wrapper,
		title: 'Smart POS',
		single_column: true
	});

	wrapper = $(wrapper).find('.layout-main-section');

	const assets = [
			'assets/erpnext/js/pos/clusterize.js',
			'assets/erpnext/css/pos.css',
			'assets/metactical_custom/bootstrap-toggle.min.css',
			'assets/metactical_custom/bootstrap-toggle.min.js'
		];

	frappe.require(assets);

	wrapper.append(`
		<div class="row">
			<div class="pos-cart col-md-12">
				<br>
				<div class="row fields_group">
						<div class="pos_profile hide col-md-3"></div>
						<div class="customer_balance hide col-md-3"></div>
						<div class="branch hide col-md-3"></div>
					<div class="col-md-5">
						<div class="barcode col-md-6"></div>
						<div class="item col-md-6"></div>
					</div>
					<div class="col-md-7">
						<div class="customer col-md-3"></div>
						<div class="col-md-2">
							<input type="checkbox" data-toggle="toggle" id="toggle-checkbox" data-on="Paid" data-off="Unpaid" checked>
						</div>
						<div class="serial_no col-md-3"></div>
						<div class="col-md-4 date_group">
							<div class="date col-md-12"></div>
							<div class="due_date hide col-md-6"></div>
						</div>
					</div>
				</div>
				<hr>
				<div class="row first-row-fields">
					<div class="col-md-6 left_section">
						<div class="row" style="padding-left:50px; padding-right:50px">
							<div class="item hide col-md-6"></div>
							
						</div>
						<div class="row">
							<div class="col-md-4">
								<button class="btn btn-warning hide btn-block show_stock">Show Stock</button>
							</div>
							<div class="col-md-4">
								<button class="btn btn-primary hide btn-block show_uom">Show UOM</button>
							</div>
							<div class="col-md-4">
								<button class="btn btn-success hide btn-block toggle_itemgrid">Toggle Item Grid</button>
							</div>
						</div>
						<br>
						<div class="cart-wrapper">
							<div class="tableFixHead">
								<table style="width:100%;" class="table" border="1">
									<thead>
									<tr>
										<th style="background-color:black; width:5%;" class="aagekaro">
											No.
										</th>
										<th style="background-color:black; width:35%;" class="aagekaro">
											Item Name
										</th>
										<th style="background-color:black; width:5%;" class="aagekaro">
											UOM
										</th>
										<th style="background-color:black; width:25%;" class="aagekaro">
											Qty
										</th>
										<th style="background-color:black; width:15%;" class="aagekaro">
											Rate
										</th>
										<th style="background-color:black; width:15%;" class="aagekaro">
											Amount
										</th>
										<th style="background-color:black; width:5%;" class="aagekaro">
											<i class="fa fa-trash"></i>
										</th>
									</tr>
									</thead>
									<tbody class="cart-items">
										<tr>
											<td colspan="100%" class="text-center"><b>No Items added to cart</b></td>
										</tr>
									</tbody>
								</table>
							</div>
							<table style="width:100%;" class="table" border="1">
								<thead class="cart-items-total">
									<tr>
										<th style="background-color:black; width:40%;" colspan=3>
											Total
										</th>
										<th style="background-color:black; width:30%;" colspan=2>
											0
										</th>
										<th style="background-color:black; width:30%;" colspan=2>
											$0
										</th>
									</tr>
								</thead>
								<thead class="cart-items-total2">
									<tr>
										<th style="background-color:black; width:70%;" colspan=5>
											Discount
										</th>
										<th style="background-color:black; width:30%;" colspan=2>
											<input class="form-control discount_amount2" type="number" value="0">
										</th>
									</tr>
									<tr>
										<th style="background-color:black; width:70%;" colspan=5>
											Grand Total
										</th>
										<th class="net_amount2" style="background-color:black; width:30%;" colspan=2>
											$0
										</th>
									</tr>
								</thead>
								<thead class="cart-items-total2 paid_section">

								</thead>
								<thead class="cart-items-total2">
									<tr>
										<th style="background-color:black;  width:70%;" colspan=5>
											Balance
										</th>
										<th class="balance2" style="background-color:black; width:30%;" colspan=2>
											$0
										</th>
									</tr>
								</thead>
							</table>
						</div>
						<div class="row">
							<div class="net_total hide col-md-6" style="padding-left:50px;"></div>
							<div class="discount_amount col-md-6" style="padding-left:50px;"></div>
							<div class="paid col-md-6" style="padding-right:50px;"></div>
						</div>
						<div class="row">
							<div class="net_amount col-md-6" style="padding-left:50px;"></div>
							<div class="balance col-md-6" style="padding-right:50px;"></div>
						</div>
						<div class="row">
							<div class="suspend hide col-md-6"></div>
							<div class="col-md-6"></div>
							<div class="credit_paid hide col-md-6" style="padding-right:50px;"></div>
						</div>
						<div class="row">
							<div class="col-md-6">
								<button class="btn btn-lg btn-block btn-primary save">Save</button>
							</div>
							<div class="col-md-6">
								<button class="btn btn-lg btn-block btn-success save_and_print">Save & Print</button>
							</div>
						</div>
						<div class="row">
							<div class="col-md-6">
								<button class="btn btn-lg btn-block btn-danger cancel_invoice">Cancel Invoice</button>
							</div>
							<div class="col-md-6">
								<button class="btn btn-lg btn-block btn-warning suspend_invoice">Hold Invoice</button>
							</div>
						</div>
					</div>
					<div class="col-md-6 right_section">
						<div class="row">
							<div class="item_name hide col-md-6"></div>
							<div class="item_group col-md-12"></div>
						</div>
						<div class="list-item-table pos-items-wrapper">
							<div class="pos-items image-view-container" tabindex="0">
								
							</div>
						</div>
					</div>
					<div class="col-md-6 summary hide">
						<div class="row">
							<div class="customer_searchbox hide col-md-12"></div>
							<div class="supplier_searchbox hide col-md-12"></div>
						</div>
						<div class="summary_data">

						</div>
					</div>
				</div>
			</div>
		</div>
	`);


	var make_field = function(class_name,fieldtype,label,options,read_only=0){
		var description = "";
		// if(class_name == "customer"){
		// 	description = "Balance = 0 | Mobile = "
		// }
        page[class_name] = frappe.ui.form.make_control({
            df: {
                fieldtype: fieldtype,
                label: label,
                fieldname: class_name,
                options: options,
                read_only:read_only,
                description:description,
                onchange: () => {
                  // filters[class_name]
					var value = null;
					if(fieldtype != "Select"){
						value = $('input[data-fieldname='+class_name+']').val();
					}
					else{
						value = $("."+class_name).find('.control-value').text();
					}
					filters[class_name] = value

					if(class_name == "item_name" || class_name == "item_group"){
                  		get_items();
              		}

              		else if(class_name == "barcode"){
                  		add_item_by_barcode();
              		}

              		else if(class_name == "item"){
              			add_item_by_item_code();
              		}

              		else if(class_name == "serial_no"){
              			// frappe.msgprint("No Serial Found.")
              		}

              		else if(class_name == "discount_amount"){
              			calculate_discount_amount();
              		}
              		else if(class_name == "paid"){
              			calculate_paid_amount();
              		}
              		else if(class_name == "credit_paid"){
              			calculate_paid_amount();
              		}

              		else if(class_name == "pos_profile"){
              			get_default_customer();
              		}
              		else if(class_name == "customer_searchbox"){
              			var customer_searchbox = $("input[data-fieldname=customer_searchbox]").val();
              			ds(customer_searchbox);
              		}
              		else if(class_name == "supplier_searchbox"){
              			var supplier_searchbox = $("input[data-fieldname=supplier_searchbox]").val();
              			cs(supplier_searchbox);
              		}
              		else if(class_name == "customer"){
              			var customer = $("input[data-fieldname=customer]").val();
              			$("[data-fieldname=customer]").find(".help-box").html("");
              			$("[data-fieldname=customer]").find(".control-label").html("Customer");
              			if(customer){
	              			frappe.call({
				    	        method:"metactical_custom.metactical_custom.page.smart_pos.smart_pos.get_balance",
				    	        args:{'party':customer, "party_type": "Customer"},
				    	        callback:function(r){
				    	            if(r.message){
				    	                console.log(r.message)
				    	                $('[data-fieldname=customer_balance]').find('.control-value').html("$ "+r.message);
				    	                // var description = "Mobile = "+r.message.mobile
				    	                // $("[data-fieldname=customer]").find(".help-box").html(description);
				    	                $("[data-fieldname=customer]").find(".control-label").html("Customer ($"+r.message.balance+")");
				    	 //                let scan_barcode_field = frm.fields_dict["customer"];

										// let show_description = function (idx, exist = null) {
										// 	scan_barcode_field.set_new_description(__('Balance - ', [r.message]));
										// }
				    	            }
				    	        }
				    	    })
	              		}
              		}

                }
              },
              get_query:()=>{
              	if(class_name == "customer" || class_name == "customer_searchbox"){
	                return {
	                  query: "erpnext.controllers.queries.customer_query"
	                }
	            }
	            // else if(class_name == "supplier_searchbox"){
	            //     return {
	            //       query: "erpnext.controllers.queries.supplier_query"
	            //     }
	            // }
              },
              parent: wrapper.find('.'+class_name),
              render_input: true
          });
    }

    make_field("pos_profile", "Link", "POS Profile", "POS Profile")
    make_field("branch", "Link", "Branch", "Branch")
    make_field("customer", "Link", "Customer", "Customer")
    make_field("customer_balance", "Currency", "Customer Balance", "", 1)
    make_field("date", "Date", "Date")
    make_field("due_date", "Date", "Due Date")
    make_field("serial_no", "Data", "Serial No")

    make_field("item", "Link", "Item", "Item")
    make_field("barcode", "Data", "Item / Barcode")

    make_field("item_group", "Link", "Item Group", "Item Group")
    make_field("customer_searchbox", "Link", "Search by Customer", "Customer")
    make_field("supplier_searchbox", "Link", "Search by Supplier", "Supplier")
    // make_field("item_name", "Data", "Item Name")

    // make_field("discount_amount", "Currency", "Discount Amount")
    // make_field("net_amount", "Currency", "Grand Total", "", 1)
    // make_field("paid", "Currency", "Cash")
    // make_field("credit_paid", "Currency", "Credit")
    // make_field("balance", "Currency", "Balance", "", 1)
    make_field("net_total", "Currency", "Net Total")
    make_field("suspend", "Link", "Suspended Invoice", "Suspended Invoice")

    var filters = {".stock_data": "hide", ".uom_data": "hide"}

    var items = []


    var get_items = function(){
    	console.log("new_items")
	    frappe.call({
	        method: "metactical_custom.metactical_custom.page.smart_pos.smart_pos.get_items",
	        args: {
	        	item_name : $('input[data-fieldname="barcode"]').val(),
	            item_group : $('input[data-fieldname="item_group"]').val(),
	            pos_profile : $('input[data-fieldname="pos_profile"]').val(),
	        },
	        callback: function(response) {
	             var r = response.message;
	             
	             $(".image-view-container").html(r);
	        }
	    });
	}

	var add_item_by_barcode = function(){
		var barcode = $('input[data-fieldname="barcode"]').val();
		var pos_profile = $('input[data-fieldname="pos_profile"]').val();
		if(barcode){
			frappe.call({
		        method: "metactical_custom.metactical_custom.page.smart_pos.smart_pos.add_item_by_barcode",
		        args: {
		        	barcode : barcode,
		        	pos_profile: pos_profile
		        },
		        callback: function(response) {
		             var r = response.message;
		             if(r){
		             	var item = {"item_code": r.item_code, "valuation_rate": r.valuation_rate, "barcode": barcode, "item_name": r.item_name, "qty": 1, "rate": r.price, "amount": r.price, "stock": r.stock, "uom": r.uom, "minimum_selling_price": r.minimum_selling_price}
		             	var new_item = 1;
						for(var d in items){
							if(items[d].item_code == item["item_code"]){
								items[d].qty += 1;
								items[d].amount = items[d].rate*items[d].qty;
								new_item = 0;
							}
						}
						if(new_item){
							items.push(item);
						}
						read_items();
						$('input[data-fieldname="barcode"]').val("");
		             	$('input[data-fieldname="barcode"]').focus();
		             }
		             else{
		             	get_items();
		             }
		        }
		    });
		}
		else{
			get_items();
		}
	}

	var add_item_by_item_code = function(){
		var item = $('input[data-fieldname="item"]').val();
		var pos_profile = $('input[data-fieldname="pos_profile"]').val();
		if(item){
			frappe.call({
		        method: "metactical_custom.metactical_custom.page.smart_pos.smart_pos.add_item_by_item_code",
		        args: {
		        	item : item,
		        	pos_profile: pos_profile
		        },
		        callback: function(response) {
		             var r = response.message;
		             if(r){
		             	var item = {"item_code": r.item_code, "valuation_rate": r.valuation_rate, "item_name": r.item_name, "qty": 1, "rate": r.price, "amount": r.price, "stock": r.stock, "uom": r.uom, "minimum_selling_price": r.minimum_selling_price}
		             	var new_item = 1;
						for(var d in items){
							if(items[d].item_code == item["item_code"]){
								items[d].qty += 1;
								items[d].amount = items[d].rate*items[d].qty;
								new_item = 0;
							}
						}
						if(new_item){
							items.push(item);
						}
						read_items();
		             }
		             else{
		             	frappe.msgprint("No item found.")
		             }
		             $('input[data-fieldname="item"]').val("");
		             $('input[data-fieldname="barcode"]').focus();
		        }
		    });
		}
	}

	$('input[data-fieldname="barcode"]').attr("placeholder", "Search by Barcode, Item Code or Item Name");

	$(document).delegate('#toggle-checkbox', 'change', function(){
		var mode = $('#toggle-checkbox').parent().hasClass('off');
		console.log(mode)

		var net_total = parseFloat($("input[data-fieldname=net_total]").val());
    	if(!net_total){
    		net_total = 0;
    	}


		var discount_amount = parseFloat($(".discount_amount2").val());
    	if(!discount_amount){
    		discount_amount = 0;
    	}

    	var net_amount = net_total- discount_amount;


		if(mode){
			$(".paid2").val(0);
			$('.balance2').html("$ "+net_amount);
			$(".due_date").removeClass("hide");
			$(".serial_no").removeClass("col-md-3");
			$(".serial_no").addClass("col-md-2");
			$(".date_group").removeClass("col-md-4");
			$(".date_group").addClass("col-md-5");
			$(".date").removeClass("col-md-12");
			$(".date").addClass("col-md-6");
		}
		else{

			$(".paid2").val(net_amount);
			$('.balance2').html("$ "+0);
			$(".due_date").addClass("hide");
			$(".serial_no").addClass("col-md-3");
			$(".serial_no").removeClass("col-md-2");
			$(".date_group").addClass("col-md-4");
			$(".date_group").removeClass("col-md-5");
			$(".date").addClass("col-md-12");
			$(".date").removeClass("col-md-6");	
		}
	});

	$(document).delegate('.pos-item-wrapper', 'click', function(){
		var price = this.getAttribute('data-price');
		var item_code = this.getAttribute('data-item-code');
		var item_name = this.getAttribute('data-item-name');
		var stock = this.getAttribute('data-stock');
		var uom = this.getAttribute('data-uom');
		var valuation_rate = this.getAttribute('data-valuation_rate');
		var uom_prices = this.getAttribute('data-uom_prices');
		var uom_length = this.getAttribute('data-uom_length');
		var item = {"item_code": item_code, "uom_length": uom_length, "uom_prices":uom_prices, "selected_uom": uom, "valuation_rate": valuation_rate, "item_name": item_name, "qty": 1, "rate": price, "amount": price, "stock": stock, "uom": uom}
		var new_item = 1;
		for(var d in items){
			if(items[d].item_code == item["item_code"]){
				items[d].qty += 1;
				items[d].amount = items[d].rate*items[d].qty;
				new_item = 0;
			}
		}
		if(new_item){
			items.push(item);
		}
        read_items();
    });

    var read_items = function(){
    	var hide_stock_data = filters[".stock_data"]
    	var hide_uom_data = filters[".uom_data"]
    	if(items){
	    	$(".cart-items").empty()
	    	$(".cart-items-total").empty()
	    	var total_qty = 0;
	    	var net_total = 0;
	    	var count =0;

	    	for(var i in items){
	    		count+=1
	    		var value = items[i];
	    		total_qty += parseFloat(value.qty);
	    		net_total += parseFloat(value.amount);
	    		uoms = ""
	    		if(parseFloat(value.uom_length) >= 2){
	    			var uom_prices = value.uom_prices.replace(/\'/g, '"')
	    			console.log(uom_prices)
	    			var uom_prices = JSON.parse(uom_prices);
	    			uoms+= "<select class='uom_select'>"
	    			console.log("selected_uom")
	    			console.log(value.selected_uom)
	    			var selected = {}
	    			if(!value.selected_uom){
	    				value.selected_uom = value.uom;
	    			}
	    			selected[value.selected_uom] = "selected";
	    			for(var u in uom_prices){
	    				uoms+="<option data-price="+uom_prices[u]+" data-item_code="+value.item_code+" "+selected[u]+">"+u+"</option>";
	    			}
	    			uoms+= "</select>"
	    		}
	    		else{
	    			uoms = value.uom;
	    		}
	    		var barcode = value.barcode || "";
					$(".cart-items").append('<tr title="Stock Balance : '+value.stock+'">\
						<td>\
							'+count+'\
						</td>\
						<td>\
							'+value.item_name+'\
						</td>\
						<td>\
							'+uoms+'\
						</td>\
						<td>\
							<div class="input-group">\
								<span class="input-group-btn">\
                                    <button type="button" class="quantity-left-minus btn btn-danger btn-number" data-item_code="'+value.item_code+'" data-type="minus" data-field="">\
                                      <span class="glyphicon glyphicon-minus"></span>\
                                    </button>\
                                </span>\
								<input class="form-control item-qty input-number" data-item_code="'+value.item_code+'" type="number" value="'+value.qty+'">\
								<span class="input-group-btn">\
                                    <button type="button" class="quantity-right-plus btn btn-success btn-number" data-item_code="'+value.item_code+'" data-type="plus" data-field="">\
                                        <span class="glyphicon glyphicon-plus"></span>\
                                    </button>\
                                </span>\
							</div>\
						</td>\
						<td>\
							<input class="form-control item-rate" data-item_code="'+value.item_code+'" type="number" value="'+value.rate+'">\
						</td>\
						<td class="text-right">\
							<input class="form-control item-amount" data-item_code="'+value.item_code+'" type="number" value="'+value.amount+'">\
						</td>\
						<td>\
							<i class="fa fa-trash remove-item" data-item_code="'+value.item_code+'"></i>\
						</td>\
					</tr>');
	    	}
	    	$(".cart-items-total").append('\
					<tr>\
						<th style="background-color:black; width:40%;" colspan=3>\
							Total\
						</th>\
						<th style="background-color:black; width:30%;" colspan=2>\
							'+total_qty+'\
						</th>\
						<th style="background-color:black; width:30%;" colspan=2>\
							$'+net_total+'\
						</th>\
					</tr>'
					);
	    	$('input[data-fieldname=net_total]').val(net_total);

	    	// var discount_amount = parseFloat($("input[data-fieldname=discount_amount]").val());
	    	// if(!discount_amount){
	    	// 	discount_amount = 0;
	    	// }

	    	var discount_amount = parseFloat($(".discount_amount2").val());
	    	if(!discount_amount){
	    		discount_amount = 0;
	    	}

	    	var net_amount = net_total - discount_amount;

	    	// $('[data-fieldname=net_amount]').find('.control-value').html("$ "+net_amount);
	    	$(".net_amount2").html("$"+net_amount)
	    	var mode = $('#toggle-checkbox').parent().hasClass('off');
	    	if(!mode){
	    		$(".paid2").val(net_amount)
	    		$(".balance2").html("$0")
		    	// $('input[data-fieldname=paid]').val(net_amount);
		    	// $('[data-fieldname=balance]').find('.control-value').html("$ "+0);
		    }
		    else{
		    	$(".balance2").html("$"+net_amount)
		    	// $('[data-fieldname=balance]').find('.control-value').html("$ "+net_amount);
		    }
    	}
    }

    var calculate_discount_amount = function(){
    	var net_total = parseFloat($("input[data-fieldname=net_total]").val());
    	if(!net_total){
    		net_total = 0;
    	}

    	var discount_amount = parseFloat($(".discount_amount2").val());
    	if(!discount_amount){
    		discount_amount = 0;
    	}

    	var net_amount = net_total - discount_amount;

	    // $('[data-fieldname=net_amount]').find('.control-value').html("$ "+net_amount);
	    $(".net_amount2").html("$"+net_amount)
	    var mode = $('#toggle-checkbox').parent().hasClass('off');
    	if(!mode){
    		$(".paid2").val(net_amount)
	    	$(".balance2").html("$0")
	    	// $('input[data-fieldname=paid]').val(net_amount);
	    	// $('[data-fieldname=balance]').find('.control-value').html("$ "+0);
	    }
	    else{
	    	$(".balance2").html("$"+net_amount)
	    	// $('[data-fieldname=balance]').find('.control-value').html("$ "+net_amount);	
	    }
    }

    var calculate_paid_amount = function(){
    	var net_total = parseFloat($("input[data-fieldname=net_total]").val());
    	if(!net_total){
    		net_total = 0;
    	}

    	var discount_amount = parseFloat($(".discount_amount2").val());
    	if(!discount_amount){
    		discount_amount = 0;
    	}

    	var paid = parseFloat($(".paid2").val());
    	if(!paid){
    		paid = 0;
    	}

    	var net_amount = net_total - discount_amount;
    	var total_paid = paid;
    	var balance = net_amount-total_paid;
    	$(".balance2").html("$"+balance)
	    // $('[data-fieldname=balance]').find('.control-value').html("$ "+balance);
    }

    var submit_invoice = function(print){
    	console.log(items.length)
    	if(!items && !items.length && !items[0].item_name){
    		frappe.throw("Atleast one item is required.")
    	}

    	var pos_profile = $("input[data-fieldname=pos_profile]").val();
    	if(!pos_profile){
    		frappe.throw("POS Profile is mandatory.")
    	}

    	var customer = $("input[data-fieldname=customer]").val();
    	if(!customer){
    		frappe.throw("Customer is mandatory.")
    	}

    	var date = $("input[data-fieldname=date]").val();
    	var due_date = $("input[data-fieldname=due_date]").val();
    	var suspend = $("input[data-fieldname=suspend]").val();
    	var serial_no = $("input[data-fieldname=serial_no]").val();
    	
    	var discount_amount = parseFloat($(".discount_amount2").val());
    	if(!discount_amount){
    		discount_amount = 0;
    	}

    	var net_total = parseFloat($("input[data-fieldname=net_total]").val());
    	if(!net_total){
    		net_total = 0;
    	}

    	var paid = parseFloat($(".paid2").val());
    	if(!paid){
    		paid = 0;
    	}

    	console.log(net_amount)
    	console.log(paid)

    	var net_amount = net_total - discount_amount;
    	var total_paid = paid;
    	if(total_paid > net_amount){
    		console.log("there")
    		frappe.throw("Paid amount cannot be greater than Net Amount.")
    	}

    	date = date.split("/");
    	date = date[2]+"-"+date[1]+"-"+date[0];

    	if(!date){
    		frappe.throw("Date is mandatory.")
    	}

    	if(due_date){
			due_date = due_date.split("/");
			due_date = due_date[2]+"-"+due_date[1]+"-"+due_date[0];
		}

    	frappe.call({
	        method: "metactical_custom.metactical_custom.page.smart_pos.smart_pos.submit_invoice",
	        freeze: true,
	        args: {
	        	pos_profile: pos_profile,
	        	customer: customer,
	        	date: date,
	        	items: items,
	        	discount_amount: discount_amount,
	        	paid: paid,
	        	suspend: suspend,
	        	serial_no: serial_no,
	        	due_date:due_date
	        },
	        callback: function(response) {
	             var r = response.message;
	             console.log(r)
	             if(r){
	             	frappe.show_alert({
						indicator: 'green',
						message: 'Invoice Submitted.'
					});
					if(print){
						var print_format = "POS Print QR";
						window.open("/printview?doctype=Sales Invoice&name="+r+"&trigger_print=1&format="+print_format+"&no_letterhead=0&_lang=en")
					}
	             }
	             else{
	             	frappe.show_alert({
						indicator: 'red',
						message: 'Invoice not created.'
					});
	             }

	             new_cart();
	        }
	    });

    }


    var suspend_invoice = function(print){
    	console.log(items.length)
    	if(!items && !items.length && !items[0].item_name){
    		frappe.throw("Atleast one item is required.")
    	}

    	var pos_profile = $("input[data-fieldname=pos_profile]").val();

    	var customer = $("input[data-fieldname=customer]").val();
    	if(!customer){
    		frappe.throw("Customer is mandatory.")
    	}

    	var date = $("input[data-fieldname=date]").val();
    	var due_date = $("input[data-fieldname=due_date]").val();
    	
    	var discount_amount = parseFloat($(".discount_amount2").val());
    	if(!discount_amount){
    		discount_amount = 0;
    	}

    	var net_total = parseFloat($("input[data-fieldname=net_total]").val());
    	if(!net_total){
    		net_total = 0;
    	}

    	var paid = parseFloat($(".paid2").val());
    	if(!paid){
    		paid = 0;
    	}

    	var net_amount = net_total - discount_amount;

    	date = date.split("/");
    	date = date[2]+"-"+date[1]+"-"+date[0];

    	if(!date){
    		frappe.throw("Date is mandatory.")
    	}

    	if(due_date){
			due_date = due_date.split("/");
			due_date = due_date[2]+"-"+due_date[1]+"-"+due_date[0];
		}

    	var mode = $('#toggle-checkbox').parent().hasClass('off');

    	frappe.call({
	        method: "metactical_custom.metactical_custom.page.smart_pos.smart_pos.suspended_invoice",
	        freeze: true,
	        args: {
	        	pos_profile: pos_profile,
	        	customer: customer,
	        	date: date,
	        	items: items,
	        	discount_amount: discount_amount,
	        	paid: paid,
	        	net_total: net_total,
	        	due_date:due_date,
	        	mode:mode
	        },
	        callback: function(response) {
	            var r = response.message;
	            console.log(r)
	            if(r){
	             	frappe.show_alert({
						indicator: 'orange',
						message: 'Invoice Suspended.'
					});
					new_cart();
				}
	        }
	    });

    }

    page.set_primary_action(__("Refresh"), function() {
		$(".right_section").removeClass("hide");
    	$(".summary").addClass("hide");
    	$(".supplier_searchbox").addClass("hide");
    	$(".customer_searchbox").addClass("hide");
    	cs_on=0
    	ds_on =0
	   new_cart();

	}, "octicon octicon-plus");


	$(document).delegate('.remove_supended_invoice', 'click', function(){
		if(this.getAttribute('data-name')){
			frappe.db.set_value("Suspended Invoice", this.getAttribute('data-name'), "used", 1)
			$(".modal-backdrop").click();
			frappe.call({
		        method: "metactical_custom.metactical_custom.page.smart_pos.smart_pos.get_suspended_invoice",
		        freeze: true,
		        args: {

		        },
		        callback: function(response) {
		            var r = response.message;
		        }
		    });
		}
	});

    page.add_inner_button(__("Pick Held Invoice"), function() {
        frappe.call({
	        method: "metactical_custom.metactical_custom.page.smart_pos.smart_pos.get_suspended_invoice",
	        freeze: true,
	        args: {

	        },
	        callback: function(response) {
	            var r = response.message;
	        }
	    });
    }).addClass('btn-warning');

    // page.add_inner_button(__("Register Detail"), function() {
    //     frappe.call({
	   //      method: "metactical_custom.metactical_custom.page.smart_pos.smart_pos.get_register_detail",
	   //      freeze: true,
	   //      args: {

	   //      },
	   //      callback: function(response) {
	   //          var r = response.message;
	   //      }
	   //  });
    // }).addClass('btn-primary');

    // page.add_inner_button(__("Today's Revenue"), function() {
    //     frappe.call({
	   //      method: "metactical_custom.metactical_custom.page.smart_pos.smart_pos.get_revenue",
	   //      freeze: true,
	   //      args: {

	   //      },
	   //      callback: function(response) {
	   //          var r = response.message;
	   //      }
	   //  });
    // }).addClass('btn-primary');

    var ds_on = 0
    var cs_on = 0
    // page.add_inner_button(__("Debtors Summary"), function() {
    // 	var customer_searchbox = $("input[data-fieldname=customer_searchbox]").val()
    // 	if(ds_on == 0){
    // 		ds(customer_searchbox);
    // 		ds_on = 1
    // 		cs_on = 0
    // 	}
    // 	else{
    // 		$(".right_section").removeClass("hide");
    //     	$(".summary").addClass("hide");
    //     	$(".supplier_searchbox").removeClass("hide");
    //     	$(".customer_searchbox").addClass("hide");
    //     	ds_on = 0
    //     	cs_on = 0
    // 	}
    // }).addClass('btn-primary');

    var ds = function(customer){
    	frappe.call({
	        method: "metactical_custom.metactical_custom.page.smart_pos.smart_pos.get_debtors_summary",
	        freeze: true,
	        args: {
	        	branch : $("input[data-fieldname=branch]").val(),
	        	customer: customer
	        },
	        callback: function(response) {
	            var r = response.message;
	            if(r){
	            	$(".summary_data").html(r);
	            	$(".right_section").addClass("hide");
	            	$(".summary").removeClass("hide");
	            	$(".supplier_searchbox").addClass("hide");
	            	$(".customer_searchbox").removeClass("hide");
	            }
	        }
	    });
    }

    // page.add_inner_button(__("Creditors Summary"), function() {
    // 	var supplier_searchbox = $("input[data-fieldname=supplier_searchbox]").val()
    //     if(cs_on == 0){
    // 		cs(supplier_searchbox);
    // 		cs_on = 1
    // 		ds_on = 0
    // 	}
    // 	else{
    // 		$(".right_section").removeClass("hide");
    //     	$(".summary").addClass("hide");
    //     	$(".supplier_searchbox").removeClass("hide");
    //     	$(".customer_searchbox").addClass("hide");
    //     	cs_on = 0
    //     	ds_on = 0
    // 	}
    // }).addClass('btn-primary');

    var cs = function(supplier){
		frappe.call({
	        method: "metactical_custom.metactical_custom.page.smart_pos.smart_pos.get_creditors_summary",
	        freeze: true,
	        args: {
	        	branch : $("input[data-fieldname=branch]").val(),
	        	supplier: supplier
	        },
	        callback: function(response) {
	            var r = response.message;
	            $(".summary_data").html(r);
            	$(".right_section").addClass("hide");
            	$(".summary").removeClass("hide");
            	$(".supplier_searchbox").removeClass("hide");
            	$(".customer_searchbox").addClass("hide");
	        }
	    });
    }


    $(document).delegate('.payment', 'click', function(){
	    if(parseFloat(this.getAttribute('data-balance')) > 0){
			  frappe.new_doc("Receipt Entry", {"customer": this.getAttribute('data-customer')})
	    }
	    else{
	      frappe.msgprint("Cannot receive without any balance.");
	    }
	});

	$(document).delegate('.search_by_customer', 'click', function(){
	    $(".modal-backdrop").click();
	    frappe.prompt([
            {
              fieldname: 'new_customer',
              fieldtype: 'Link',
              label: 'Customer',
              options:'Customer',
              reqd: 1,
              get_query:()=>{
                return {
                  query: "erpnext.controllers.queries.customer_query"
                }
              }
            }
          ],
          function (d) {
              if(d.new_customer){
                frappe.call({
			        method: "metactical_custom.metactical_custom.page.smart_pos.smart_pos.get_debtors_summary",
			        freeze: true,
			        args: {
			        	branch : $("input[data-fieldname=branch]").val(),
			        	customer:d.new_customer
			        },
			        callback: function(response) {
			            var r = response.message;
			            // if(r){
			            // 	frappe.msgprint(r)
			            // 	make_field("customer_search", "Link", "Search Customer", "Customer")
			            // }
			        }
			    });
              }
          },
          'Search by Customer',
          'Search'
        )
	});


	$(document).delegate('.payment_supplier', 'click', function(){
	    // if(parseFloat(this.getAttribute('data-balance')) != 0){
			  frappe.new_doc("Payments Entry", {"party": this.getAttribute('data-supplier')})
	    // }
	    // else{
	    //   frappe.msgprint("Cannot receive without any balance.");
	    // }
	});


	$(document).delegate('.search_by_supplier', 'click', function(){
	    $(".modal-backdrop").click();
	    frappe.prompt([
            {
              fieldname: 'new_customer',
              fieldtype: 'Link',
              label: 'Supplier',
              options:'Supplier',
              reqd: 1,
              get_query:()=>{
                return {
                  query: "erpnext.controllers.queries.supplier_query"
                }
              }
            }
          ],
          function (d) {
              if(d.new_customer){
                frappe.call({
			        method: "metactical_custom.metactical_custom.page.smart_pos.smart_pos.get_creditors_summary",
			        freeze: true,
			        args: {
			        	branch : $("input[data-fieldname=branch]").val(),
			        	supplier:d.new_customer
			        },
			        callback: function(response) {
			            var r = response.message;
			            // if(r){
			            // 	frappe.msgprint(r)
			            // 	make_field("customer_search", "Link", "Search Customer", "Customer")
			            // }
			        }
			    });
              }
          },
          'Search by Supplier',
          'Search'
        )
	});

	$(document).delegate('.statement', 'click', function(){
	    console.log("There")
	    window.location = "/desk#query-report/Customer Statement?customer="+this.getAttribute('data-customer')+"&party="+this.getAttribute('data-customer')
	  });

	$(document).delegate('.statement_supplier', 'click', function(){
	    console.log("There")
	    window.location = "/desk#query-report/Supplier Statement?supplier="+this.getAttribute('data-supplier')+"&party="+this.getAttribute('data-supplier')
	  });


	// page.add_inner_button(__("Expense Entry"), function() {
 //        frappe.new_doc("Expense Entry")
 //    }).addClass('btn-primary');

 //    page.add_inner_button(__("Journal Entry"), function() {
 //        frappe.new_doc("Journal Entry")
 //    }).addClass('btn-primary');

 //    page.add_inner_button(__("Purchase Invoice"), function() {
 //        frappe.new_doc("Purchase Invoice")
 //    }).addClass('btn-primary');


    page.add_inner_button(__("POS Closing"), function() {
        frappe.new_doc("POS Closing Voucher", {"pos_profile": $("input[data-fieldname=pos_profile]").val() })
    }).addClass('btn-primary');

    page.add_inner_button(__("Toggle Item Grid"), function() {
        // $(".left_section").toggleClass("col-md-6");
	   	// $(".left_section").toggleClass("col-md-12");
	   	$(".right_section").toggleClass("hide");
    }).addClass('btn-warning');

    var new_cart = function(){
    	items = [];
    	$(".cart-items").empty()
    	$(".cart-items").append('<tr>\
				<td colspan="100%" class="text-center"><b>No Items added to cart</b></td>\
			</tr>')
    	$(".cart-items-total").empty()
    	$(".cart-items-total").append('<tr>\
				<tr>\
					<th style="background-color:black; width:40%;" colspan=3>\
						Total\
					</th>\
					<th style="background-color:black; width:30%;" colspan=2>\
						0\
					</th>\
					<th style="background-color:black; width:30%;" colspan=2>\
						$0\
					</th>\
				</tr>\
			</tr>')
         $(".discount_amount2").val(0);
         $(".paid2").val(0);
         $("input[data-fieldname=suspend]").val("");
         // $("input[data-fieldname=due_date]").val("");
         $(".balance2").html("$0")
         $(".net_amount2").html("$0")
         // $('[data-fieldname=balance]').find('.control-value').html("$ "+0);
         // $('[data-fieldname=net_amount]').find('.control-value').html("$ "+0);
         $("input[data-fieldname=serial_no]").val("");

	    frappe.call({
	        method: "metactical_custom.metactical_custom.page.smart_pos.smart_pos.get_pos_profile",
	        args: {
	        	
	        },
	        callback: function(response) {
	             var r = response.message;
	             $("input[data-fieldname=customer]").val(r.customer);
	             $("[data-fieldname=customer]").find(".help-box").html("");
              	$("[data-fieldname=customer]").find(".control-label").html("Customer");
	        }
	    });

	    $('input[data-fieldname="barcode"]').focus();
	    $('#toggle-checkbox').parent().addClass("btn-primary");
		$('#toggle-checkbox').parent().removeClass("btn-default");
		$('#toggle-checkbox').parent().removeClass("off");

		$(".due_date").addClass("hide");
		$(".serial_no").addClass("col-md-3");
		$(".serial_no").removeClass("col-md-2");
		$(".date_group").addClass("col-md-4");
		$(".date_group").removeClass("col-md-5");
		$(".date").addClass("col-md-12");
		$(".date").removeClass("col-md-6");
    }

    $(document).delegate('.uom_select', 'change', function(){
    	var selected_uom = $( ".uom_select option:selected" ).text();
		var price = $( ".uom_select option:selected" ).attr('data-price');
		var item = $( ".uom_select option:selected" ).attr('data-item_code');
		console.log(selected_uom)
		price = parseFloat(price)
		if(price > 0){
			for(var d in items){
				if(items[d].item_code == item){
					items[d].selected_uom = selected_uom;
					items[d].rate = price;
					items[d].amount = items[d].rate*items[d].qty;
					break;
				}
			}
			read_items();
		}
	});

    $(document).delegate('.item-qty', 'change', function(){
    	for(var d in items){
			if(items[d].item_code == this.getAttribute("data-item_code")){
				items[d].qty = parseFloat($(this).val());
				items[d].amount = items[d].rate*items[d].qty;
				break;
			}
		}
		read_items();
	});

	$(document).delegate('.item-rate', 'change', function(){
    	for(var d in items){
			if(items[d].item_code == this.getAttribute("data-item_code")){
				var minimum_selling_price = parseFloat(this.getAttribute("data-minimum_selling_price"))
				var this_val = parseFloat($(this).val());
				if(this_val < minimum_selling_price){
					$(this).val(items[d].rate)
					frappe.throw("Selling Price Cannot be less than "+minimum_selling_price+" for Item "+items[d].item_code)
				}
				items[d].rate = this_val;
				items[d].amount = items[d].rate*items[d].qty;
			}
		}
		read_items();
	});

	$(document).delegate('.item-amount', 'change', function(){
    	for(var d in items){
			if(items[d].item_code == this.getAttribute("data-item_code")){
				var minimum_selling_price = parseFloat(this.getAttribute("data-minimum_selling_price"))
				var amount = parseFloat($(this).val());
				var rate = amount/items[d].qty;
				if(rate < minimum_selling_price){
					$(this).val(items[d].rate*items[d].qty)
					frappe.throw("Selling Price Cannot be less than "+minimum_selling_price+" for Item "+items[d].item_code)
				}
				items[d].amount = amount;
				items[d].rate = rate;
			}
		}
		read_items();
	});

	$(document).delegate('.discount_amount2', 'change', function(){
    	calculate_discount_amount();
	});

	$(document).delegate('.paid2', 'change', function(){
    	calculate_paid_amount();
	});

	$(document).delegate('.item-qty', 'focus', function(){
	   $(this).select();
	});

	$(document).delegate('.item-rate', 'focus', function(){
	   $(this).select();
	});

	$(document).delegate('.item-amount', 'focus', function(){
	   $(this).select();
	});

	$(document).delegate('.discount_amount2', 'focus', function(){
	   $(this).select();
	});

	$(document).delegate('.paid2', 'focus', function(){
	   $(this).select();
	});

	$(document).delegate('.toggle_itemgrid', 'click', function(){
	   $(".left_section").toggleClass("col-md-6");
	   $(".left_section").toggleClass("col-md-12");
	   $(".right_section").toggleClass("hide");
	});

	$(document).delegate('.quantity-right-plus', 'click', function(){
	    var quantity = parseFloat($(this).parent().parent().find('.item-qty').val());
        for(var d in items){
			if(items[d].item_code == this.getAttribute("data-item_code")){
				items[d].qty = quantity + 1;
				items[d].amount = items[d].rate*items[d].qty;
				break;
			}
		}
		read_items();
	});

	$(document).delegate('.quantity-left-minus', 'click', function(){
	    var quantity = parseFloat($(this).parent().parent().find('.item-qty').val());
	    if(quantity > 1){
	        for(var d in items){
				if(items[d].item_code == this.getAttribute("data-item_code")){
					items[d].qty = quantity - 1;
					items[d].amount = items[d].rate*items[d].qty;
					break;
				}
			}
			read_items();
		}
	});

	$(document).delegate('.show_stock', 'click', function(){
	   $(".stock_data").toggleClass("hide")
	   if(filters[".stock_data"] == "hide"){
	   		filters[".stock_data"] = "";
	   }
	   else{
	   		filters[".stock_data"] = "hide";
	   }
	   console.log(filters[".stock_data"])
	});

	$(document).delegate('.show_uom', 'click', function(){
	   $(".uom_data").toggleClass("hide")
	   if(filters[".uom_data"] == "hide"){
	   		filters[".uom_data"] = "";
	   }
	   else{
	   		filters[".uom_data"] = "hide";
	   }
	   console.log(filters[".uom_data"])
	});

	$(document).delegate('.change_qty', 'click', function(){
	   $(".item-qty").toggleClass('readonly');
	});

	$(document).delegate('.change_price', 'click', function(){
	   $(".item-rate").toggleClass('readonly');
	});

	$(document).delegate('.cancel_invoice', 'click', function(){
		var suspend = $("input[data-fieldname=suspend]").val();
		if(suspend){
			frappe.db.set_value("Suspended Invoice", suspend, "used", 1)
		}
	   new_cart();
	});

	$(document).delegate('.save', 'click', function(){
	   submit_invoice();
	});

	$(document).delegate('.save_and_print', 'click', function(){
	   submit_invoice("print");
	});

	$(document).delegate('.suspend_invoice', 'click', function(){
	   suspend_invoice();
	});

	$(document).delegate('.fetch_suspended', 'click', function(){
		var me = this;
	   	frappe.call({
	        method: "metactical_custom.metactical_custom.page.smart_pos.smart_pos.get_suspended_invoice_data",
	        freeze: true,
	        args: {
	        	name: me.getAttribute("data-name")
	        },
	        callback: function(response) {
	            var r = response.message;
	            if(r){
					$("input[data-fieldname=pos_profile]").val(r.pos_profile);
		            $("input[data-fieldname=customer]").val(r.customer);
		            var date = r.posting_date
		            var d = date.split("-")
		            var new_date = d[2]+"/"+d[1]+"/"+d[0]
		            $("input[data-fieldname=suspend]").val(r.name);
		            $("input[data-fieldname=date]").val(new_date);

		            var date = r.due_date
		            if(date){
			            var d = date.split("-")
			            var new_date = d[2]+"/"+d[1]+"/"+d[0]
			            $("input[data-fieldname=due_date]").val(new_date);
		            }

		            if(r.mode == "true"){
		            	$('#toggle-checkbox').parent().removeClass("btn-primary");
						$('#toggle-checkbox').parent().addClass("btn-default");
						$('#toggle-checkbox').parent().addClass("off");

						$(".paid2").val(0);
						$(".due_date").removeClass("hide");
						$(".serial_no").removeClass("col-md-3");
						$(".serial_no").addClass("col-md-2");
						$(".date_group").removeClass("col-md-4");
						$(".date_group").addClass("col-md-5");
						$(".date").removeClass("col-md-12");
						$(".date").addClass("col-md-6");
		            }
		            else{
		            	$('#toggle-checkbox').parent().addClass("btn-primary");
						$('#toggle-checkbox').parent().removeClass("btn-default");
						$('#toggle-checkbox').parent().removeClass("off");

						$(".due_date").addClass("hide");
						$(".serial_no").addClass("col-md-3");
						$(".serial_no").removeClass("col-md-2");
						$(".date_group").addClass("col-md-4");
						$(".date_group").removeClass("col-md-5");
						$(".date").addClass("col-md-12");
						$(".date").removeClass("col-md-6");	
		            }

		            $(".discount_amount2").val(r.discount_amount);
		            // $("input[data-fieldname=paid]").val(r.paid);
		            // $("input[data-fieldname=credit_paid]").val(r.credit_paid);
		            items = r.items
					read_items();
	            }
	        }
	    });
	});

	$(document).delegate('.print_register', 'click', function(){
	   	var print_format = "Register Detail";
	   	var name = this.getAttribute("data-name");
		window.open("/printview?doctype=POS Print Data&name="+name+"&trigger_print=1&format="+print_format+"&no_letterhead=0&_lang=en")
	});

	$(document).delegate('.print_revenue', 'click', function(){
	   	var print_format = "Revenue";
	   	var name = this.getAttribute("data-name");
		window.open("/printview?doctype=POS Print Data&name="+name+"&trigger_print=1&format="+print_format+"&no_letterhead=0&_lang=en")
	});

	$(document).delegate('.remove-item', 'click', function(){
		var i = 0;
	    while (i < items.length) {
	        if(items[i].item_code === this.getAttribute("data-item_code")) {
	            items.splice(i, 1);
	        } else {
	            ++i;
	        }
	    }
		read_items();
	});

	$(document).delegate('.show_details', 'click', function(){
		output = ""
		output += "<table style='width:100%'>"
		output += "<tr>\
					<td colspan='100%' class='text-center'>Item : <b>"+this.getAttribute("data-item_code")+"</b></td> \
				</tr>\
				"
		output += "<tr>\
						<td><b>Stock</b></td>\
						<td>"+this.getAttribute("data-stock")+"</td> \
					</tr>"
		output += "<tr>\
						<td><b>Cost</b></td>\
						<td>"+this.getAttribute("data-valuation_rate")+"</td> \
					</tr>"
		output += "<tr>\
						<td><b>Price</b></td>\
						<td>"+this.getAttribute("data-rate")+"</td> \
					</tr>"
		output += "<tr>\
						<td><b>UOM</b></td>\
						<td>"+this.getAttribute("data-uom")+"</td> \
					</tr>"
		output += "</table>"
		frappe.msgprint(output)
	});

	var payments={}

	var prepare = function(){
		frappe.call({
	        method: "metactical_custom.metactical_custom.page.smart_pos.smart_pos.get_pos_profile",
	        args: {
	        	
	        },
	        callback: function(response) {
	             var r = response.message;
	             if(r.name){
	             	$("input[data-fieldname=pos_profile]").attr("readonly", true);
	             }
	             $("input[data-fieldname=pos_profile]").val(r.name);
	             $("input[data-fieldname=customer]").val(r.customer);
	             $("input[data-fieldname=branch]").val(r.branch);

	             console.log(r)
	             var default_mp = {}
	             for(var i in r.payments){
	             	var mp  = r.payments[i].mode_of_payment.replace(/\s+/g, '_').toLowerCase();
	             	payments[mp] = 0;
	             	if(r.payments[i].default){
	             		default_mp[mp] = "default";
	             	}
	             	console.log(mp)
	             	$(".paid_section").append('<tr>\
							<th style="background-color:black; width:70%;" colspan=5>\
								'+r.payments[i].mode_of_payment+'\
							</th>\
							<th style="background-color:black; width:30%;" colspan=2>\
								<input class="form-control payments '+default_mp[mp]+' '+mp+'" type="number" value="0">\
							</th>\
						</tr>')
	             }

	             var date = frappe.datetime.get_today();
	             var d = date.split("-")
	             var new_date = d[2]+"/"+d[1]+"/"+d[0]
	             $("input[data-fieldname=date]").val(new_date);

	             var date = frappe.datetime.get_today();
	             var date = frappe.datetime.add_months(date, 1)
	             var d = date.split("-")
	             var new_date = d[2]+"/"+d[1]+"/"+d[0]
	             $("input[data-fieldname=due_date]").val(new_date);
	             // $("input[data-fieldname=discount_amount]").val(0);
	             $(".discount_amount2").val(0);
	             $(".paid2").val(0);
	             $(".balance2").html("$0")
	             $(".net_amount2").html("$0")
	             // $("input[data-fieldname=credit_paid]").val(0);
	             // $('[data-fieldname=balance]').find('.control-value').html("$ "+0);
	             // $('[data-fieldname=net_amount]').find('.control-value').html("$ "+0);
	             $('input[data-fieldname="barcode"]').focus();
	             get_items();
	        }
	    });
	}

	var get_default_customer = function(){
		var pos_profile = $('input[data-fieldname="pos_profile"]').val();
		if(pos_profile){
			frappe.call({
		        method: "metactical_custom.metactical_custom.page.smart_pos.smart_pos.get_default_customer",
		        args: {
		        	pos_profile : $('input[data-fieldname="pos_profile"]').val()
		        },
		        callback: function(response) {
		             var r = response.message;
		             $("input[data-fieldname=customer]").val(r);
		        }
		    });
		}
	}

	$(document.body).addClass('full-width');

	// var get_title_image = function(){
	// 	if(location.hash == "#ikit-pos-smart"){
 //        	$(".page-title").children().addClass("hide");
 //        	style = "style='height:80px; padding: 5px; border-radius: 15px;'"
 //        	$(".page-title").append("<img src='/files/ikit_pos_logo.jpeg' class='pos_image' "+style+" >");
 //        	frappe.call({
 //                  method: 'frappe.client.get_value',
 //                  args: {
 //                    doctype: 'Company',
 //                    filters: {
 //                      'name': frappe.defaults.get_user_default("company")
 //                    },
 //                    fieldname: ['company_logo']
 //                  },
 //                  callback: function (r) {
 //                  		var r = r.message
	// 					if(r && r.company_logo){
	// 						$(".page-title").append("<img src='"+r.company_logo+"' class='pos_image' "+style+" >");
	// 					}
 //                  }
 //            });
 //        }
 //        else{
 //        	$(".page-title").children().removeClass("hide");
 //        	$("img.pos_image").addClass("hide");
 //        }
	// }

	// $(window).on('hashchange', function(e){
 //        get_title_image();
 //    });



    // get_title_image()
	prepare();
}