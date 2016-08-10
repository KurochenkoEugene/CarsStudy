Ext.onReady(function(){
    Ext.QuickTips.init();

    var cars = [
        ['Nissan', 'GTR', 17000],
        ['KIA', 'RIO', 8000],
        ['Toyota', 'Supra', 18000]
    ];


    var users = [{
        "login": 'User1',
        "password": "123456"
    }, {
        "login": 'User2',
        "password": "12345689" 
    }, 
    {
        "login": 'User3',
        "password": "123" 
    }];
    
    var panel = new Ext.Panel({
        title: "Login",
        width: 300,
        style: {
            margin: "10px"
        },
        renderTo: Ext.getBody(),
        layout: "form",
        items: [
            {
                xtype: "field",
                id: "inpLogin",
                fieldLabel: "Your login",
                style: {
                    width: "65%",
                    boxShadow: "0 0 5px rgba(0, 0, 250, 0.6)",
                    borderRadius: "5px",
                    marginTop: "10px"
                }
            },
            {
                xtype: "field",
                id: "inpPas",
                fieldLabel: "Your password",
                style: {
                    width: "65%",
                    boxShadow: "0 0 5px rgba(0, 0, 250, 0.6)",
                    borderRadius: "5px",
                    marginTop: "10px"
                }
            },

            new Ext.Button({
                id: 'login_button',
                text: "Sign in",
                width: "80%", 
                height: 30,
                style: {
                    borderRadius:"5px",
                    boxShadow: "0 0 5px rgba(0, 0, 250, 0.6",
                    marginTop: "20px",
                    marginBottom: "20px"
                },
                listeners: {
                    click: auth
                } 
            }) 
        ]

    });
    
    var store = Ext.data.ArrayStore({
        fields: ['Car', 'Model',  'Price']
    });

    store.loadData(cars);

    var grid = Ext.grid.GridPanel({
        ddGroup: 'currentGridDDGroup',
        id: 'gridCars',
        store: store,
        height: 500,
        enableDragDrop: true,
        layout: 'auto',
        stripeRows: true,
        stateId: 'grid',
        columns: [
            { header: "Car", width: 200, sortable:  true, dataIndex: "Car" },
            { header: "Model", width: 200, sortable:  true, dataIndex: "Model"},
            { header: "Price", width: 200, sortable:  true, dataIndex: "Price" }
        ],
        stripeRows: true,
        autoExpandColumn: 'action',
        layout: 'fit',
        width: 900,
        height: 250,
        title: 'Cars',
        stateful: true,
        stateId: 'grid',
        viewConfig: {
            scroll: false,
            style: {overflow: 'auto', overflowX: 'hidden'}

        },

    });


   function auth(){
        var name, pas;
        if(Ext.getCmp('inpLogin').getValue() == "" || Ext.getCmp('inpPas').getValue() == ""){
            alert('Fill the fields!')
        } else {
            name = Ext.getCmp('inpLogin').getValue();
            pas = Ext.getCmp('inpPas').getValue();
        }

        for(var i=0; i<users.length; i++){
            if(users[i].login != name){
                continue;
            } else {
                if(users[i].password == pas){
                    alert("Welcome!!!");
                    return;
                } else {
                    alert("Password is incorrect. Please, tree again!");
                    return;
                }
            }   
        }     
    }
})