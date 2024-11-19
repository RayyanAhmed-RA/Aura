import { Avatars, Client, Databases, Query } from 'react-native-appwrite';
import { Account, ID } from 'react-native-appwrite';


export const config = {
    
    endpoint: "https://cloud.appwrite.io/v1",
    platform: "com.Aura.Aura",
    projectId: "6721e626000fe6c7e30f",
    databaseId: "6721e812003061563593",
    userCollectionId: "6721e840000c1221057c",
    videoCollectionId: "6721e87800345a89bb53",
    storageId: "6721ea550028bf792d08"

}
// Init your React Native SDK
const client = new Client();

client
    .setEndpoint(config.endpoint) // Your Appwrite Endpoint
    .setProject(config.projectId) // Your project ID
    .setPlatform(config.platform) // Your application ID or bundle ID.
;


const account = new Account(client);
const avatars = new Avatars(client);
const databases = new Databases(client); 

export async function createUser(email, username, password) {
    try {
        const newAccount = await account.create(
            ID.unique(), 
            email, 
            password,
            username
        );

        if (!newAccount) throw Error;

        const avatarUrl = avatars.getInitials(username);
        
        
        await signIn(email, password);

        const newUser = await databases.createDocument(
            config.databaseId,
            config.userCollectionId, 
            ID.unique(),
            {
                accountId: newAccount.$id, 
                email: email, 
                username: username, 
                avatar: avatarUrl

            }

        )
        return newUser;

    } catch (error) {
        console.log(error);
        throw new Error(error)
        
    }
}


export async function signIn(email, password){
    try {
        
        const session = await account.createEmailPasswordSession(email, password)
        return session; 
        
    } 
    
    catch (error) {
        throw new Error(error); 
        
    }


}



export async function getAccount() {
    try {
      const currentAccount = await account.get();
  
      return currentAccount;
    } catch (error) {
      throw new Error(error);
    }
  }



export async function getCurrentUser() {
    try {
      const currentAccount = await getAccount();
      if (!currentAccount) throw Error;
  
      const currentUser = await databases.listDocuments(
        config.databaseId,
        config.userCollectionId,
        [Query.equal("accountId", currentAccount.$id)]
      );
  
      if (!currentUser) throw Error;
  
      return currentUser.documents[0];
    } catch (error) {
      console.log(error);
      return null;
    }
  }