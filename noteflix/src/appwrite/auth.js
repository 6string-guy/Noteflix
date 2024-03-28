import {Client, Account, ID } from "appwrite"
export class AuthService{

    client= new Client()
    
   account;
    constructor()
    {
        this.client
            .setEndpoint(import.meta.env.VITE_APPWRITE_URL)
            .setProject(import.meta.env.VITE_APPWRITE_PROJECT_ID)
           
            this.account=new Account(this.client)

    }

    async createAccount({email, password,name} )
    {
        try {
          const userAccount=  await this.account.create(ID.unique(), email, password)
          if( userAccount)
          {
              return this.login({email,password})
          }
          else
          {
               return userAccount
          }
        } 
        catch (error) {
            throw error;
        }
    }

    async login({email, password})
    {
            try {
                return await this.account.createEmailPasswordSession(email, password)
            } catch (error) {
                throw error;
                
            }

     }

     async getCurrentUser()
     {
        try {
            return await this.account.get();
            
        } catch (error) {
            throw error
        }

     }
     async logout()
     {
        try {
             await this.account.deleteSession()
            
        } catch (error) {
            throw error
        }
     }

};

//we are exporting oblject of class "AuthService"
export const authService=new AuthService();