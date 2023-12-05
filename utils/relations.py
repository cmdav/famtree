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

def buildRelationship(pnodeName,id,rel):
    ## Loop through the collection of rows returned from Mongo DB
    for coll in collection.find({"userId":id},{"_id":False}):
        res = {key: coll[key] for key in coll.keys()  & {'firstName', 'lastName','middleName','email','phone','birthDate','userId','country','city'}}
        nodeName2 = str(res['lastName'])+str(res['birthDate'])+str(res['firstName'])+str(res['middleName'])

        #create relating node
        neo4j.addNode(nodeName2)
        ## Create the Node Properties
        createNameNode=neo4j.addNodeProperty(nodeName2,res['lastName'],res['firstName'],res['middleName'],res['email'],res['phone'],res['birthDate'],res['userId'],res['country'],res['city'])
        fCheck ='False'
        rCheck = 'True'

        if fCheck in str(createNameNode):
            return ' Node has NOT been created'
        else:
            if str(rel) =='Sister':
                neo4j.addSisRelationship(pnodeName,nodeName2 )
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
        

buildRelationship('Sema1989-08-26SalimAbdulanam','9b7f785a-11b2-4cb2-b248-859fc45b4581','sister')

    #print(str(res['firstName']))