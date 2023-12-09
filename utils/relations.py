   ## CONNECT TO MONGODB PYTHON
import pymongo
from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi
import mongodb_python_neo4j as neo4j
from neo4j import GraphDatabase, RoutingControl

##################################################### MONGO
URIn = "neo4j+ssc://a4403cef.databases.neo4j.io"
AUTH = ("neo4j", "NuBLxLVxnXt7jUlC9sknOMCImY0JB1_uY-QJ4tf8fsI")
GraphDatabase.driver(URIn, auth=AUTH) 

#############################
uri = "mongodb+srv://applogin:wCl6QndJsayuLtOq@cluster0.ygx79sq.mongodb.net/?retryWrites=true&w=majority"
# Create a new client and connect to the server
client = MongoClient(uri, server_api=ServerApi('1'))

    
db = client["FamTree"]
collection = db["profiles"]

def buildRelationship(pnodeName,pGen,id,rel):
    ## Loop through the collection of rows returned from Mongo DB . Davies remember to add filter to this for loop
    for coll in collection.find({"userId":id},{"_id":False}):
        res = {key: coll[key] for key in coll.keys()  & {'firstName', 'lastName','middleName','email','phone','birthDate','userId','country','city','gender'}}
        nodeName2 = str(res['lastName'])+str(res['birthDate'])+str(res['firstName'])+str(res['middleName'])

        #create relating node if not exist
        fCheck ='False'
        rCheck = 'True'
        name = neo4j.matchNodeNew(nodeName2)
        #print(type(str(name)))
        if fCheck in str(name) :
            neo4j.addNode(nodeName2)
        ## Create the Node Properties
        createNameNode=neo4j.addNodeProperty(nodeName2,res['lastName'],res['firstName'],res['middleName'],res['email'],res['phone'],res['birthDate'],res['userId'],res['country'],res['city'],res['gender'])

        if fCheck in str(createNameNode):
            return ' Node has NOT been created'
        else:
            if str(rel) =='Sister':
                neo4j.addSisRelationship(pnodeName,nodeName2 )
                checkReverseRelationship(pnodeName,pGen,res['userId'],res['gender'],rel)
            elif str(rel) =='Brother':
                neo4j.addBroRelationship(pnodeName,nodeName2 )
            elif str(rel) =='Daughter':
                neo4j.addDaughterRelationship(pnodeName,nodeName2 )
            elif str(rel) =='Father':
                neo4j.addFatherRelationship(pnodeName,nodeName2 )
            elif str(rel) =='Mother':
                neo4j.addMotherRelationship(pnodeName,nodeName2 )
            elif str(rel) =='Wife':
                neo4j.addWifeRelationship(pnodeName,nodeName2 )
            elif str(rel) =='Son':
                neo4j.addSonRelationship(pnodeName,nodeName2 )
            elif str(rel) =='Husband':
                neo4j.addHusbandRelationship(pnodeName,nodeName2 )
            else:
                print("could not add relationship")
        ##Add Relationships
        
def checkReverseRelationship(pName,pGen,sUserId,sGen,rel):
    pId = neo4j.getUserId(pName)
    #print(pId)
    #print(sUserId)
    ## Davies - Calculate gender for Secondary node to be written to Mongo DB
    gender_result = getRelationGender(pGen,sGen)
    if gender_result =='Male' and rel =='Sister':
        new_rel = 'Brother'
    elif gender_result =='Female' and rel =='Sister':
        new_rel = 'Sister'
    elif gender_result =='Male' and rel =='Brother':
        new_rel = 'Brother'
    elif gender_result =='Female' and rel =='Brother':
        new_rel = 'Sister'
    elif gender_result =='Female' and rel =='Mother':
        new_rel = 'Daughter'
    elif gender_result =='Male' and rel =='Mother':
        new_rel = 'Son'
    elif gender_result =='Female' and rel =='Father':
        new_rel = 'Daughter'
    elif gender_result =='Male' and rel =='Father':
        new_rel = 'Son'
    elif gender_result =='Female' and rel =='Son':
        new_rel = 'Mother'
    elif gender_result =='Male' and rel =='Son':
        new_rel = 'Father'
    elif gender_result =='Female' and rel =='Daughter':
        new_rel = 'Mother'
    elif gender_result =='Male' and rel =='Daughter':
        new_rel = 'Father'
    filter = {'userId':sUserId}
    # Values to be updated.
    newvalues = { "$push": { 'relations': {'userId':pId,
                                           'relationshipType':new_rel} } }
    rel_exists = collection.count_documents({'userId':sUserId, 'relations.userId':pId});
    if rel_exists < 1:
        collection.update_one(filter,newvalues)
        return True
    else:
        return False

def getRelationGender(primaryGender,secondaryGender):
    if primaryGender =='Male' and secondaryGender == 'Male':
        gender = 'Male'
    elif primaryGender =='Female' and secondaryGender == 'Female':
        gender = 'Female'
    elif primaryGender =='Male' and secondaryGender == 'Female':
        gender = 'Male'
    elif primaryGender =='Female' and secondaryGender == 'Male':
        gender = 'Female'
    
    return gender



#buildRelationship('Sema1989-08-26SalimAbdulanam','9b7f785a-11b2-4cb2-b248-859fc45b4581','sister')
#result=checkReverseRelationship('Sema1989-08-26SalimAbdulanam','Male','9b7f785a-11b2-4cb2-b248-859fc45b4581','Female','Sister')
#print(str(result))