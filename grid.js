function colorPrice(price){
    if(price > 2000){
        return "<span style='color: red'>" + price + ' $' + "</span>"; 
    } else {
        return "<span style='color: green'>" + price + ' $' + "</span>";
    }
}

/**
*Display detail panel of record from grid
*/
function showForm(grid, rowIndex, colIndex, rec){
    var editTab = new Ext.form.FormPanel({
            title: "Edit car: " + rec.data.Car,
            width: 300,
            frame: true,
            items: [
                     new Ext.form.TextField({
                            id: "car_field",
                            fieldLabel: "Car",
                            value: rec.get("Car"),
                            readOnly: false
                    }),
                    new Ext.form.TextField({
                            id: "model_field",
                            fieldLabel: "Model",
                            value: rec.get("Model"),
                            readOnly: false
                    }),
                    new Ext.form.TextField({
                            id: "price_field",
                            fieldLabel: "Price",
                            value: rec.get("Price"),
                            readOnly: false
                    })
            ],
            buttons: [
                {
                    text: "Save record",
                    listeners: { 
                        "click" : function(){
                            addOrEditRecord(grid, rowIndex);
                            Ext.getCmp('edit_Win').close();
                        }
                    }
                } 
            ]  
        });
                            
        var editWin = new Ext.Window({
                id: "edit_Win",
                layout: 'auto',
                modal: true,
                closeAction: 'destroy',
                items: {items: editTab}
        });

        editWin.show();
}

function getStore(mas){
    var store = new Ext.data.ArrayStore({
        fields: [
        {name: 'Car'}, 
        {name: 'Model'}, 
        {name: 'Price', type: 'integer'}
        ]
    });

    store.loadData(mas);
    return store;
}

/**
* function save the new data of record (edit or create new record)
* @params grid - grid where displaying data from store
* @params rowIndex - if record is editing
*/
function addOrEditRecord(grid, rowIndex){
    var car = Ext.getCmp('car_field').getValue();
    var model = Ext.getCmp('model_field').getValue();
    var price = Ext.getCmp('price_field').getValue();
    if(rowIndex != undefined){
        record = store.getAt(rowIndex);

        record.set("Car", car);
        record.set("Model", model);
        record.set("Price", price);
        record.commit();

    } else {        
        store.add(new store.recordType({
            Car: car,
            Model: model,
            Price: price
        }));
    }
    grid.getView().refresh();
}

var cars = [
        ['Nissan', 'GTR', 17000],
        ['KIA', 'RIO', 8000],
        ['Toyota', 'Supra', 18000]
    ];  


Ext.onReady(function(){
    Ext.QuickTips.init();
    store = getStore(cars);
    var grid = new Ext.grid.GridPanel({
        store: store,
        title: 'Cars',
        columns: [
            {   id: "actions",
                header: "Actions",
                width: 200,
                sortable: false,
                xtype: "actioncolumn",
                items: [
                    {   //button edit
                        icon: 'shared/icons/fam/user_edit.png',
                        tooltip: 'edit',
                        handler: function(grid,  rowIndex, colIndex){
                            var rec = store.getAt(rowIndex);
                            showForm(grid,  rowIndex, colIndex, rec);
                        }
                        
                    }, {
                        //button delete
                        icon: 'shared/icons/fam/cross.gif',
                        tooltip: 'delete',
                        handler: function(grid, rowIndex, colIndex){
                            var rec = store.getAt(rowIndex);

                            Ext.MessageBox.confirm("Confirm", "Delete record?", deleteRecord);

                            function deleteRecord(btn){
                                if(btn == 'yes'){
                                    store.remove(rec);
                                    grid.getView().refresh();
                                }
                            }

                        }

                    }
                ]
            },
            { header: "Car", width: 200, sortable:  true, dataIndex: "Car" },
            { header: "Model", width: 200, sortable:  true, dataIndex: "Model"},
            { header: "Price", width: 200, sortable:  true, dataIndex: "Price", align: 'center', renderer: colorPrice}
        ],
        tbar: [
                {
                    text: "Add new car",
                    icon: "shared/icons/fam/add.gif",
                    listeners: {
                        "click": function(){
                           var createTab = new Ext.form.FormPanel({
                                title: "New car",
                                width: 300,
                                frame: true,
                                items: [
                                        new Ext.form.TextField({
                                            id: "car_field",
                                            fieldLabel: "Car",                                           
                                            readOnly: false
                                        }),
                                       new Ext.form.TextField({
                                            id: "model_field",
                                            fieldLabel: "Model",
                                            readOnly: false
                                        }),
                                       new Ext.form.TextField({
                                            id: "price_field",
                                            fieldLabel: "Price",
                                            readOnly: false
                                        })
                                ],
                                buttons: [
                                        {
                                            text: "Save record",
                                            listeners: { "click" : function(){
                                                addOrEditRecord(grid);
                                                Ext.getCmp('create_tab_window').close();
                                            }}
                                        } 
                                ]  
                            });
                            var createTabWindow = new Ext.Window({
                                id: "create_tab_window",
                                modal: false,
                                layout: 'auto',
                                closeAction: 'destroy',
                                items: { items: createTab }
                            });

                            createTabWindow.show();
                                
                        }
                    }
                }
        ],
        listeners: {
            rowdblclick: function(grid, rowIndex, colIndex, rec){ 
                var rec = store.getAt(rowIndex);
                showForm(grid, rowIndex, colIndex, rec);
            }
        },
        height: 900,
        layout: 'auto',
        stripeRows: true

    });

    var tabPanel = new Ext.form.FormPanel({
        renderTo: document.body,
        activeTab: 0,
        width: 1000,
        height: 600,
        plain: true,
        defaults: {autoScroll: true},
        items: [
            grid
        ],
         viewConfig: {
            scroll: false,
            style: {overflow: 'auto', overflowX: 'hidden'}
        }
    });


})
;
