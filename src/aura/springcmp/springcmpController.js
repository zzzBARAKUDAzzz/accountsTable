({
    doInit : function(component, event, helper) {
        let actions = [
            {label: 'View', name: 'view'},
            {label: 'Edit', name: 'edit'},
            {label: 'Delete', name: 'delete'}
        ];
        component.set('v.mycolumns', [
            {label: 'Name', fieldName: 'Name', type: 'text'},
            {label: 'AccountNumber', fieldName: 'AccountNumber', type: 'text'},
            {label: 'Industry', fieldName: 'Industry', type: 'text'},
            {label: 'Phone', fieldName: 'Phone', type: 'phone'},
            {type: 'action', typeAttributes: { rowActions: actions } } 
        ]);
        helper.pullData(component);
    },
    
    handleRowAction: function (component, event, helper) {
        let action = event.getParam('action');
        switch (action.name) {
            case 'view':
                helper.viewRecord(component, event);
                break;
            case 'edit':
                helper.editRecord(component, event);
                break;
            case 'delete':
                helper.deleteRecord(component, event);
                break;
        }
    },
    
    searchText:function(component,event,helper){
        let nameSegment=component.get("v.selectRecordName");
        helper.searchbyText(component,nameSegment);
    }
    
    
    
})