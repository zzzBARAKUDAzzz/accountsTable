public class DatatableHandler {
    
    @AuraEnabled
    public static List<Account> getAccountData(){
       return [SELECT Id,Name,AccountNumber,Industry,Phone FROM Account ];
    }
    
    @AuraEnabled
    public static void delAccount(String accId){
        Account accountToDelete = [SELECT Id FROM Account WHERE Id =:accId];
        delete accountToDelete;
    } 
    
    
    @AuraEnabled
    public static List<Account> searchAccounts(String nameSegment){
        String searchStr = '%' + nameSegment + '%';
        List<Account> accounts = [SELECT Id,Name,AccountNumber,Industry,Phone FROM Account WHERE Name LIKE :searchStr];
        return accounts;
    } 
 }