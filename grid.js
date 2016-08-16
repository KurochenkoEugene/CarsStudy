function getClientsInGrid(grid){
     //for displaing grids on tabs
    var gridOfClients = new Ext.grid.GridPanel({
        store: storeClients,

        title: "Clients",
        columns: [
            {
                header: "Action",
                xtype: "actioncolumn",
                items: [
                    {
                        //button delete
                        icon: 'shared/icons/fam/cross.gif',
                        tooltip: 'delete',
                        handler: function(gridOfClients, rowIndex, colIndex){
                            var rec = storeClients.getAt(rowIndex);
                            Ext.MessageBox.confirm("Confirm", "Delete client?", deleteRecord);

                            function deleteRecord(btn){
                                if(btn = "yes"){
                                    storeClients.remove(rec);
                                    gridOfClients.getView().refresh()
                                }
                                
                            }

                        },
                    }, {
                        //button edit
                        icon: 'shared/icons/fam/user_edit.png',
                        tooltip: "Edit",
                        handler: function(gridOfClients, rowIndex, colIndex){
                            var rec = storeClients.getAt(rowIndex);
                            var editTabClient = new Ext.form.FormPanel({
                                id: "editClientTab",
                                title: "Edit client: " + rec.data.FirstName + ' ' + rec.data.LastName,
                                width: 500,
                                frame: true,
                                items: [
                                    new Ext.form.TextField({
                                        id: "f_FirstName",
                                        value: rec.get("FirstName"),
                                        fieldLabel: "Last Name",
                                        readOnly: false,
                                        width: 200

                                    }),
                                    new Ext.form.TextField({
                                        id: "f_LastName",
                                        fieldLabel: "Last Name",
                                        value: rec.get("LastName"),
                                        readonly: false,
                                        width: 200
                                    }),

                                    new Ext.form.TextField({
                                        id: "f_MiddleName",
                                        value: rec.get("MiddleName"),
                                        readonly: false,
                                        fieldLabel: "Middle Name",
                                        width: 200
                                    }),
                                    new Ext.form.DateField({
                                        id: "f_DOB",
                                        value: rec.get("DOB"),
                                        fieldLabel: "Date of Birth",
                                        readonly: false,
                                        width: 200
                                    }),

                                    new Ext.form.ComboBox({
                                        id: "cmb_Car",
                                        typeAhead: true,
                                        triggerAction: 'all',
                                        lazyRender:true,
                                        mode: 'local',
                                        store: store,
                                        valueField: 'Model',
                                        displayField: ('Model'),
                                        value: rec.get("Car"),
                                        width: 200,
                                        fieldLabel: "Car"
                                    }),  
                                ],
                                buttons: [
                                {
                                    text: "Save client",
                                    listeners: {
                                        click: function(){
                                            addOrEditRecord(grid, rowIndex, ["f_FirstName", "f_LastName", "f_MiddleName", "f_DOB", 'cmb_Car'], storeClients);
                                            Ext.getCmp("formClientsDetail").close();
                                        }
                                    }
                                }],
                            });
                            
                            var clientDetail = new Ext.Window({
                                id: "formClientsDetail",
                                layout: 'auto',
                                modal: true,
                                closeAction: 'destroy',
                                items: [ editTabClient]
                            });

                            clientDetail.show();
                        }   

                                            
                    }
                ]
            },
            {header: "Name", width: 100, sortable:  true, dataIndex: "FirstName"},
            {header: "Last Name", width: 100, sortable: true, dataIndex: "LastName"},
            {header: "Midle Name", width: 100, sortable: true, dataIndex: "MiddleName"},
            {header: "Date Of Birth", width: 100, sortable: true, renderer: Ext.util.Format.dateRenderer('d-M-Y'), dataIndex: "DOB"},
            {header: "Car", width: 200, sortable: true, dataIndex: "Car" }

        ],
        tbar: [ {
            text: "Add new client",
            icon: "shared/icons/fam/add.gif",
            listeners: {
                'click': function(){
                    var createTabClient = new Ext.form.FormPanel({
                        id: "createClientTab",
                        title: "New client",
                        width: 500,
                        frame: true,
                        items: [
                            new Ext.form.TextField({
                                id: "f_FirstName_create",
                                fieldLabel: "Last Name",
                                readOnly: false,
                                width: 200

                            }),
                            new Ext.form.TextField({
                                id: "f_LastName_create",
                                fieldLabel: "Last Name",
                                readonly: false,
                                width: 200
                            }),

                            new Ext.form.TextField({
                                id: "f_MiddleName_create",
                                readonly: false,
                                fieldLabel: "Middle Name",
                                width: 200
                            }),
                            new Ext.form.DateField({
                                id: "f_DOB_create",
                                fieldLabel: "Date of Birth",
                                readonly: false,
                                width: 200
                            }),

                            new Ext.form.ComboBox({
                                id: "cmb_Car_create",
                                typeAhead: true,
                                triggerAction: 'all',
                                lazyRender:true,
                                mode: 'local',
                                store: store,
                                valueField: 'Model',
                                displayField: ('Model'),
                                width: 200,
                                fieldLabel: "Car"
                            }),  
                        ],
                        buttons: [
                            {
                                text: "Save client",
                                listeners: {
                                    "click": function(){
                                        addOrEditRecord(grid, undefined, ["f_FirstName_create", "f_LastName_create", "f_MiddleName_create", "f_DOB_create", 'cmb_Car_create'], storeClients);
                                        Ext.getCmp('createClient').close();
                                    }
                                }

                            }

                        ]
                    })

                    var createTabWindow = new Ext.Window({
                        id: "createClient",
                        modal: true,
                        layout: 'auto',
                        closeAction: 'destroy',
                        items: { items: createTabClient }
                    });

                    createTabWindow.show();  
                }        
            }
        }],
        height: 900,
        layout: 'auto',
        stripeRows: true

    });
    return gridOfClients;
}
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
                            addOrEditRecord(grid, rowIndex, ["car_field", "model_field", "price_field"], store);
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

function getCarInGrid(){
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
                                                addOrEditRecord(grid, undefined, ["car_field", "model_field", "price_field"], store);
                                                Ext.getCmp('create_tab_window').close();
                                            }}
                                        } 
                                ]  
                            });
                            var createTabWindow = new Ext.Window({
                                id: "create_tab_window",
                                modal: true,
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
    return grid;
}

function getStore(mas, fieldOfStore){  
    var store = new Ext.data.ArrayStore({
        fields: fieldOfStore
    });
    
    store.loadData(mas);
    return store;
}


/**
* function save the new data of record (edit or create new record)
* @params grid - grid where displaying data from store
* @params rowIndex - if record is editing
*/
function addOrEditRecord(grid, rowIndex, masID, store){
    var masOfValues = [];
    var keys = [];
    var keys_2 = [];
    var obj = {};
    /*var car = Ext.getCmp('car_field').getValue();
    var model = Ext.getCmp('model_field').getValue();
    var price = Ext.getCmp('price_field').getValue();*/
    for(var i=0; i<masID.length; i++){
        masOfValues.push(Ext.getCmp(masID[i]).getValue())
    };

    if(rowIndex != undefined){
        record = store.getAt(rowIndex);       
        for(var key in record.data){
           keys.push(key)
        }
        for(var i=0; i<masOfValues.length; i++){
            record.set(keys[i], masOfValues[i]);
        };
        /*record.set("Car", car);
        record.set("Model", model);
        record.set("Price", price);*/
        record.commit();
    } else {
        
        for(var key in store.data.items[0].data ){
            keys_2.push(key)
        }

        for(var i = 0; i<keys_2.length; i++){
            obj[keys_2[i]] = masOfValues[i]
        };        
            
        store.add(new store.recordType(
            obj
            /*Car: car,
            Model: model,
            Price: price*/
        ));
    }
    grid.getView().refresh();
}


Ext.onReady(function(){
    Ext.QuickTips.init(); 
    var cars = [
        ['Nissan', 'GTR', 17000],
        ['KIA', 'RIO', 8000],
        ['Toyota', 'Supra', 18000]
    ]; 

    var clients = [
        ["Nikolas", "Quege", "X3", "9.5.1987", cars[2]],
        ["Domminik", "Toredo", "x4", "12.09.1979", cars[0]]
    ];     

    var storeClients = getStore(clients, [{name: "FirstName"}, {name: "LastName"}, {name: "MiddleName"}, {name: "DOB", type: "date"}, {name: "Car"}]);
    var store = getStore(cars, [{name: 'Car'}, {name: 'Model'}, {name: 'Price', type: 'integer'}]);
    
    var gridCars = getCarInGrid();
     
    var tabs = new Ext.TabPanel({
        renderTo: Ext.getBody(),
        activeTab: 0,
        items: [
            gridCars,
            getClientsInGrid(gridCars)
        ]
    });


})
;
