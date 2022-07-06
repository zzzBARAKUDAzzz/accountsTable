({  
    pullData:function(component){
        component.set("v.isLoading", true);
        let action=component.get("c.getAccountData");       
        action.setCallback(this,function(response){
            component.set("v.isLoading", false);
            if(response.getState()=='SUCCESS'){
                let results=response.getReturnValue();
                if(results.length>0){
                    component.set('v.results', results);                                                           
                }
                else{
                    component.set('v.results', []);                                        
                }
            }
            else{
                this.showToast("ERROR","error",JSON.stringify(e.getError()));   
            }
        });
        $A.enqueueAction(action);
    },
    
    viewRecord : function(component, event) {
        let row = event.getParam('row');
        let recordId = row.Id;
        let viewRec=$A.get("event.force:navigateToSObject");
        viewRec.setParams({
            recordId: recordId,
            slideDevName: "detail"
        });
        viewRec.fire();
    },
    
    editRecord : function(component, event) {
        let row = event.getParam('row');
        console.log('row.Id',row.Id);
        let navEvt = $A.get("e.force:editRecord");
        navEvt.setParams({
            recordId: row.Id
        });
        navEvt.fire();
    },  
    
    deleteRecord : function(component, event) {
        component.set("v.isLoading", true);
        let accountId = event.getParam('row');
        console.log('accountRec', accountId.Id);
        let action = component.get('c.delAccount');
        action.setParams({
            accId:accountId.Id
        });
        action.setCallback(this, function(response) {
            component.set("v.isLoading", false);            
            if (response.getState() === "SUCCESS") {
                window.location.reload();
            }
            else{     
                this.showToast("ERROR","error",JSON.stringify(response.getError())); 
            }
        });
        $A.enqueueAction(action);
    },
    
    showToast:function(title,type,message){
        let toastEvent = $A.get("e.force:showToast");
        if(toastEvent){
            toastEvent.setParams({"title": title,"type": type,"message": message}).fire();
        }
        else{
            alert(message);
        }
    },
    
    searchbyText:function(component,nameSegment){
        let action = component.get('c.searchAccounts');
        action.setParams({
            nameSegment : nameSegment
        });
        action.setCallback(this,$A.getCallback(function(response){
            if(response.getState()==="SUCCESS"){
                component.set('v.results',response.getReturnValue());
            } else if(response.getState()==="ERROR"){
                var errors = response.getError();
                console.errror(errors);
                
            }   
        }));
        $A.enqueueAction(action);
    }
    
    
})