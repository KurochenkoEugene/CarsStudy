Ext.onReady(function(){
    Ext.QuickTips.init();

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

   function auth(){
        var name, pas;
        if(Ext.getCmp('inpLogin').getValue() == "" || Ext.getCmp('inpPas').getValue() == ""){
            alert('Fill the fields!')
        } else {
            name = Ext.getCmp('inpLogin').getValue();
            pas = Ext.getCmp('inpPas').getValue();
        }
        var login = false;
        for(var i=0; i<users.length; i++){
            if(users[i].login != name){
                continue;
            } else {
                login = true;
                if(users[i].password == pas){
                    window.location.href = "grid.html";
                    return;
                } else {
                    alert("Password is incorrect. Please, tree again!");
                    return;
                }
            }   
        }
        if(!login){ alert(False) }     
    }
})
;