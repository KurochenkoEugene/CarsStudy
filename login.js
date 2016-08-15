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

function auth(){
        var name, pas;
        var login;
        if(Ext.getCmp('inpLogin').getValue() == "" || Ext.getCmp('inpPas').getValue() == ""){
            alert('Fill the fields!')
        } else {
            name = Ext.getCmp('inpLogin').getValue();
            pas = Ext.getCmp('inpPas').getValue();
        
            
            for(var i=0; i<users.length; i++){
                if(users[i].login != name){
                    login = false;
                } else {
                    login = true;
                    if(users[i].password == pas){
                        window.location.href = "grid.html";
                        return;
                    } else {
                        alert("Password or login is incorrect. Please, tree again!");
                        return;
                    }
                }   
            }
        }
        if( login == false ){ 
            alert("Sory, user with this login is not registered. Please, try again enter login!") 
        }     
    }

Ext.onReady(function(){
    Ext.QuickTips.init();
    
    var panel = new Ext.Panel({
        title: "Login",
        width: 300,
        style: {
            margin: "10px",
            position: "absolute",
            left: "45%",
            top: "40%"
        },
        renderTo: Ext.getBody(),
        layout: "form",
        bodyStyle:'padding: 10px',
        items: [
            {
                xtype: "field",
                id: "inpLogin",
                fieldLabel: "Your login",
                autoCreate: {
                    tag: "input",
                    type: "text",
                    maxlength: 20,
                    size: 20,
                    autocomplete: "off"
                },
                style: {
                    width: "65%",
                    boxShadow: "0 0 5px rgba(0, 0, 250, 0.6)",
                    borderRadius: "5px",
                }
            },
            {
                xtype: "textfield",
                id: "inpPas",
                fieldLabel: "Your password",
                autoCreate: {
                    tag: "input",
                    maxlength: 50,
                    type: "text",
                    size: 20,
                    autocomplete: "off"
                },
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
                    marginBottom: "20px",
                    marginLeft: "10%"
                },
                listeners: {
                    click: auth
                } 
            }) 
        ]

    });

   
})
;