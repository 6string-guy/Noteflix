import {Client, ID, Databases, Storage, Query} from "appwrite"

export class Service{
    client =new Client()
    database;
    bucket;
    constructor()
    {
        this.client
            .setEndpoint(import.meta.env.VITE_APPWRITE_URL)
            .setProject(import.meta.env.VITE_APPWRITE_PROJECT_ID)
            this.database=  new Databases( client)
            this.bucket =new Storage( client)
    }

    async createPost ({title,slug, content, featuredImage,status, userId})
    {
        try {

            await this.database.createDocument(
                import.meta.env.VITE_APPWRITE_DATABASE_ID,
                import.meta.env.VITE_APPWRITE_COLLECTION_ID,
                slug,
                {title,content, featuredImage, status, userId}
            )
            
        } catch (error) {
            throw error;
        }
    }
    async updatePost(slug,{title, content, featuredImage,status})
    {
        try {

            return await this.database.updateDocument(
                import.meta.env.VITE_APPWRITE_DATABASE_ID,
                import.meta.env.VITE_APPWRITE_COLLECTION_ID,
                slug,
                {
                    title, content, featuredImage, status
                }
            )
            
        } catch (error) {
            throw error
        }

    }
    async deletePost(slug)
    {
        try {
            await this.database.deleteDocument(
                import.meta.env.VITE_APPWRITE_DATABASE_ID,
                import.meta.env.VITE_APPWRITE_COLLECTION_ID,
                slug
            )

            return true
            
        } catch (error) {
           console.log( "Deletion failed")
            return false;
        }
    }
    async getPost ( slug)
    {
        try{
            return await this.database.getDocument(
                import.meta.env.VITE_APPWRITE_DATABASE_ID,
                import.meta.env.VITE_APPWRITE_COLLECTION_ID,
                slug

            )
        }
        catch(error)
        {
            throw error
        }
    }
    async getPosts(quries=[Query.equal("status", "active")]) {
        try {
            return  await this.database.listDocuments.listDocuments(
                import.meta.env.VITE_APPWRITE_DATABASE_ID,
                import.meta.env.VITE_APPWRITE_COLLECTION_ID,
                quries
            )
            
        } catch (error) {
            throw error
            return false;
        }
    }



    //file upload method
    async uploadFile( file)
    {
        try {
            return await this.bucket.createFile(
                import.meta.env.VITE_APPWRITE_BUCKET_ID,
                ID.unique(),
                file
            ) 
            
        } catch (error) {
            throw error
            return false;
        }
    }

    async delete ( fileId){
        try {
            await this.bucket.deleteFile(fileId)
            
        } catch (error) {
            throw error
            return false;
        }
    }
    getFilePreview(fileId)
    {
        return this.bucket.getFilePreview(
            import.meta.env.VITE_APPWRITE_BUCKET_ID,
            fileId
        )

    }
    
}
const service =new Service()

export default service;
